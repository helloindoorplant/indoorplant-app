import { useState, useEffect, useCallback, useRef } from 'react';

// Extend window object to support webkitSpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface UseSpeechRecognitionProps {
  onResult: (transcript: string) => void;
  onEnd?: () => void;
}

export function useSpeechRecognition({ onResult, onEnd }: UseSpeechRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const isPausedRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        setIsSupported(false);
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      // Leaving lang unset or 'en-IN' allows Chrome to attempt romanized transcription 
      // of Hindi/Bengali, which the LLM can auto-detect and read natively.
      recognition.lang = 'en-IN'; 

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = (event: any) => {
        // If we are artificially paused (because AI is speaking), ignore the microphone input to prevent echo.
        if (isPausedRef.current) return;

        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        if (transcript.trim()) {
          onResult(transcript);
        }
      };

      recognition.onerror = (event: any) => {
        // Ignorable errors in continuous mode
        if (event.error === 'no-speech') return; 

        if (event.error === 'network') {
          console.warn("Speech recognition network error (often happens if offline or mic drops).");
          setError("Network issue. Speech recognition paused.");
          setIsListening(false);
          return;
        }

        console.error("Speech recognition error", event.error);
        if (event.error === 'not-allowed') {
          setError('Microphone access denied. Please allow microphone permissions.');
          setIsListening(false);
        } else {
          setError(`Microphone error: ${event.error}`);
        }
      };

      recognition.onend = () => {
        // In continuous mode, if it drops but we still want to be listening, we might need to auto-restart.
        // For now, let the user manually restart if it totally crashes, but we set state to false.
        setIsListening(false);
        if (onEnd) onEnd();
      };

      recognitionRef.current = recognition;
    }
  }, [onResult, onEnd]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        isPausedRef.current = false;
        recognitionRef.current.start();
      } catch (err) {
        console.error("Failed to start speech recognition:", err);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  const pauseListening = useCallback(() => {
    isPausedRef.current = true;
  }, []);

  const resumeListening = useCallback(() => {
    isPausedRef.current = false;
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    isSupported,
    error,
    startListening,
    stopListening,
    pauseListening,
    resumeListening,
    toggleListening
  };
}
