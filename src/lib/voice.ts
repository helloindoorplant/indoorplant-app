// TTS (Text to Speech) Utility

let preferredVoice: SpeechSynthesisVoice | null = null;

export const initVoice = () => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Prioritize Indian English female voices or fallback to good female voices
      preferredVoice = 
        voices.find(v => v.name.includes('Neerja') || v.lang === 'en-IN') ||
        voices.find(v => v.name.includes('Google UK English Female')) ||
        voices.find(v => v.name.includes('Samantha') || v.name.includes('Karen')) ||
        voices[0];
    }
  };

  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
};

export const speakText = (
  text: string, 
  onStart?: () => void, 
  onEnd?: () => void
) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  // Cancel any ongoing speech before starting new one
  window.speechSynthesis.cancel();

  // Strip Markdown, JSON blocks, and emojis for cleaner speech
  let cleanText = text
    .replace(/```[\s\S]*?```/g, '') // remove code blocks
    .replace(/\*|_|~|`|>|#/g, '') // remove markdown symbols
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // replace links with just text
    .replace(/[\u{1F600}-\u{1F6FF}]/gu, '') // remove basic emojis (optional, some engines handle them)
    .trim();

  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  utterance.lang = 'en-IN';
  utterance.pitch = 1.1; // Slightly higher for warmer female tone
  utterance.rate = 0.9;  // Slightly slower for better comprehension

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => { if (onEnd) onEnd(); };

  window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};
