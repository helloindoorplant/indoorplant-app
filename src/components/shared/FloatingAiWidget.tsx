'use client';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Bot, X, Send, AlertCircle, Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { Button } from '@/components/ui/button';
import { useChat } from '@ai-sdk/react';
import { ChatProductCard } from '@/components/chat/ChatProductCard';

export function FloatingAiWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, sendMessage, status, error } = useChat();
  const [input, setInput] = useState('');
  const isLoading = status === 'submitted' || status === 'streaming';

  const { isListening, isSupported, error: speechError, toggleListening } = useSpeechRecognition({
    onResult: (transcript) => {
      setInput(transcript);
      if (transcript.trim() && !isLoading) {
        sendMessage({ role: 'user', parts: [{ type: 'text', text: transcript.trim() }] });
        setInput('');
      }
    }
  });

  const handleOpenChat = () => {
    setIsOpen(true);
    const hasWelcomed = sessionStorage.getItem('hasWelcomed_AI');
    if (!hasWelcomed) {
      sessionStorage.setItem('hasWelcomed_AI', 'true');
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Only show the sticky widget on the home page
  if (pathname !== '/') return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ role: 'user', parts: [{ type: 'text', text: input.trim() }] });
    setInput('');
  };

  // Robust message rendering — same logic as the AI Advisor page
  const renderMessage = (m: any) => {
    const messageText = (m as any).content || ((m as any).parts || []).map((p: any) => p.text || '').join('');
    
    // Gather all tool invocations robustly
    const tools: any[] = [];
    if (Array.isArray((m as any).toolInvocations)) {
      tools.push(...(m as any).toolInvocations);
    }
    if (Array.isArray((m as any).parts)) {
      (m as any).parts.forEach((p: any) => {
        if (p.type === 'tool-invocation' && p.toolInvocation) tools.push(p.toolInvocation);
        else if (p.toolName) tools.push(p);
        else if (p.type === 'tool-recommendProducts') {
          tools.push({ ...p, toolName: 'recommendProducts' });
        }
      });
    }

    const uniqueTools = tools.filter((t, index, self) =>
      index === self.findIndex((obj) => (obj.toolCallId === t.toolCallId))
    );

    const renderedTools = uniqueTools.map((toolInv: any, i: number) => {
      if (toolInv.toolName && toolInv.toolName.toLowerCase().includes('recommend')) {
        const hasOutput = toolInv.state === 'output-available' || toolInv.state === 'result' || 'output' in toolInv || 'result' in toolInv;
        const outputData = toolInv.output || toolInv.result;
        
        if (hasOutput && outputData?.success) {
          return (
            <div key={i} className="flex flex-col gap-3 py-2">
              {outputData?.explanation && (
                <div className="text-[14px] leading-relaxed text-slate-600 font-medium mb-1">
                  {outputData.explanation}
                </div>
              )}
              {outputData.products && outputData.products.length > 0 && outputData.products.map((product: any) => (
                <ChatProductCard key={product.id} product={product} />
              ))}
            </div>
          );
        } else if (hasOutput && outputData?.success === false) {
          return (
            <p key={i} className="text-sm italic text-red-400 mt-1">
              Error: {outputData.error || 'Unknown error'}
            </p>
          );
        } else if (!hasOutput) {
          return (
            <div key={i} className="flex items-center gap-2 text-sm italic opacity-70 mt-1">
              <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              Searching...
            </div>
          );
        }
      }
      return null;
    }).filter(Boolean);

    if (!messageText && renderedTools.length === 0) return null;

    return (
      <div className={`flex flex-col gap-2 max-w-[85%] p-4 rounded-2xl text-[15px] font-medium leading-relaxed ${m.role === 'user' ? 'bg-primary text-white rounded-br-sm shadow-md' : 'bg-white border border-border/60 text-foreground rounded-bl-sm shadow-sm'}`}>
        {messageText && (
          <span className="whitespace-pre-wrap">{messageText}</span>
        )}
        {renderedTools.length > 0 && (
          <div className="flex flex-col gap-2">
            {renderedTools}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Sticky Bottom Chat Bar */}
      <div 
        className={`fixed bottom-0 left-0 w-full p-3 sm:p-4 bg-white/95 backdrop-blur-md border-t border-border/50 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-[50] flex justify-center items-center transition-transform duration-500 ease-out ${isOpen ? 'translate-y-full' : 'translate-y-0'}`}
      >
        <div className="flex items-center justify-between w-full max-w-5xl px-2 sm:px-4 gap-3 md:gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/15 p-2 sm:p-2.5 rounded-xl text-primary hidden sm:flex shrink-0">
              <Bot className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-800">AI Plant Advisor</h3>
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse shadow-sm">New</span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">Ask me anything about plant care, recommendations, or diagnosing issues!</p>
            </div>
          </div>
          
          <Button 
            onClick={handleOpenChat}
            className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold group"
          >
            <Bot className="h-5 w-5 mr-2 group-hover:animate-bounce" />
            Chat Now
          </Button>
        </div>
      </div>

      {/* Chat Window */}
      {/* Chat Window */}
      <div className={`fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[400px] h-[100dvh] sm:h-[600px] sm:max-h-[calc(100vh-48px)] bg-white sm:rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-0 sm:border border-border/50 flex flex-col z-[60] transition-all duration-300 sm:origin-bottom-right ${isOpen ? 'opacity-100 pointer-events-auto translate-y-0 sm:scale-100' : 'opacity-0 pointer-events-none translate-y-full sm:translate-y-8 sm:scale-90'}`}>
        
        {/* Header */}
        <div className="bg-primary text-white p-5 sm:rounded-t-3xl flex items-center justify-between shrink-0 relative overflow-hidden pt-[max(20px,env(safe-area-inset-top))]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-3 relative z-10">
            <div className="bg-white/20 p-2 rounded-xl shadow-sm">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight tracking-tight">Plant Advisor</h3>
              <p className="text-primary-foreground/80 text-xs font-medium">Online • Ask me anything</p>
            </div>
          </div>
          <div className="flex items-center gap-1 relative z-10">
            <button onClick={() => setIsOpen(false)} className="bg-transparent hover:bg-white/20 p-2 rounded-full transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#F8FFF9] hide-scrollbar flex flex-col relative">
          <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#F8FFF9] to-transparent pointer-events-none" />
          
          {messages.length === 0 ? (
            <div className="m-auto text-center opacity-70 px-4">
              <Bot className="h-10 w-10 text-primary mx-auto mb-3" />
              <p className="text-[15px] font-semibold text-[#1B4332]">Hi! I&apos;m your AI Plant Advisor. Need help finding a plant or keeping one alive?</p>
            </div>
          ) : (
            messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {renderMessage(m)}
              </div>
            ))
          )}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
             <div className="flex justify-start">
               <div className="bg-white border border-border/60 p-4 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-2 h-12">
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }} />
               </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white rounded-none sm:rounded-b-3xl border-t border-border/40 shrink-0 pb-[max(16px,env(safe-area-inset-bottom))] sm:pb-4">
           {(error || speechError) && (
            <div className="mb-3 bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 border border-red-100 text-sm font-medium">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{speechError || 'Connection error. Please try again.'}</span>
            </div>
          )}
          <form onSubmit={handleCustomSubmit} className="flex gap-2 relative w-full items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "Ask a plant question..."}
              className={`flex-1 min-w-0 bg-secondary/30 border ${isListening ? 'border-red-300 bg-red-50' : 'border-border/60'} rounded-2xl pl-5 pr-12 py-3 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60 transition-all`}
            />
            {isSupported && (
              <button
                type="button"
                onClick={toggleListening}
                className={`absolute right-[56px] top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-400 hover:text-primary hover:bg-primary/5'}`}
                title="Use Voice Input"
              >
                {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </button>
            )}
            <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="h-[46px] w-[46px] shrink-0 rounded-2xl bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
