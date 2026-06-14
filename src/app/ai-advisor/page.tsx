'use client';

import { useChat } from '@ai-sdk/react';
import { Leaf, Send, Sparkles, User, Bot, AlertCircle, Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { Button } from '@/components/ui/button';
import { ChatProductCard } from '@/components/chat/ChatProductCard';
import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiAdvisorPage() {
  const { messages, sendMessage, status, error } = useChat();
  const [input, setInput] = useState('');
  const isLoading = status === 'submitted' || status === 'streaming';
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isListening, isSupported, error: speechError, toggleListening } = useSpeechRecognition({
    onResult: (transcript) => {
      setInput(transcript);
      if (transcript.trim() && !isLoading) {
        sendMessage({ role: 'user', parts: [{ type: 'text', text: transcript.trim() }] });
        setInput('');
      }
    }
  });
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSuggestion = (suggestion: string) => {
    sendMessage({ role: 'user', parts: [{ type: 'text', text: suggestion }] });
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ role: 'user', parts: [{ type: 'text', text: input.trim() }] });
    setInput('');
  };

  return (
    <div className="min-h-[calc(100dvh-80px)] bg-[#F8FFF9] flex flex-col">
      {/* Header */}
      <div className="bg-primary text-white py-8 md:py-10 shrink-0 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-4xl px-4 flex items-center gap-5 relative z-10">
          <div className="bg-white text-primary p-4 rounded-2xl shadow-lg rotate-3 shrink-0">
            <Sparkles className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">AI Plant Advisor</h1>
            <p className="text-primary-foreground/90 font-medium text-lg">Your personal expert for finding and caring for the perfect plant.</p>
          </div>
          
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 container mx-auto max-w-4xl px-0 sm:px-4 py-4 sm:py-8 flex flex-col h-full relative">
        
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto hide-scrollbar space-y-6 pb-6 px-4 sm:px-0">
          {messages.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto mt-12">
              <div className="bg-primary/10 p-6 rounded-full mb-6">
                <Leaf className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl font-extrabold text-[#1B4332] mb-3 tracking-tight">How can I help you grow?</h2>
              <p className="text-muted-foreground text-lg mb-10 font-medium">Ask me about finding the right plant for your space, pet-safe options, or how to revive a struggling leaf.</p>
              
              <div className="grid grid-cols-1 gap-4 w-full">
                {["I have a dark room and a cat. What should I get?", "Why are my Monstera leaves turning yellow?", "I need an easy plant for my office desk."].map(suggestion => (
                  <button 
                    key={suggestion}
                    onClick={() => handleSuggestion(suggestion)}
                    className="bg-white border-2 border-primary/10 p-5 rounded-2xl text-[15px] font-bold text-[#1B4332] hover:bg-primary/5 hover:border-primary/30 transition-all text-left shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    "{suggestion}"
                  </button>
                ))}
              </div>

              <div className="bg-white border border-primary/10 p-6 rounded-2xl text-[14px] leading-relaxed text-stone-600 mt-8 text-center max-w-md shadow-sm font-medium">
                IndoorPlant.in's AI Plant Advisor asks three questions: your room's natural light level, how often you remember to water, and whether you have pets at home. It then recommends the most suitable plant from a curated list of 24 varieties grown and delivered across India. The tool is free and takes under a minute.
              </div>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div 
                key={m.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-md">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                )}
                
                <div className="flex flex-col gap-3 max-w-[90%] md:max-w-[85%]">
                  {/* Unified Bubble Container */}
                  {(() => {
                    const messageText = (m as any).content || ((m as any).parts || []).map((p: any) => p.text || '').join('');
                    
                    // Gather all tool invocations from m.toolInvocations or m.parts robustly
                    const tools: any[] = [];
                    if (Array.isArray((m as any).toolInvocations)) {
                      tools.push(...(m as any).toolInvocations);
                    }
                    if (Array.isArray((m as any).parts)) {
                      (m as any).parts.forEach((p: any) => {
                        if (p.type === 'tool-invocation' && p.toolInvocation) tools.push(p.toolInvocation);
                        else if (p.toolName) tools.push(p);
                        else if (p.type === 'tool-recommendProducts') {
                          tools.push({
                            ...p,
                            toolName: 'recommendProducts'
                          });
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
                        
                        if (toolInv.toolName.toLowerCase() === 'recommendproducts' && (toolInv.state === 'result' || toolInv.state === 'output-available')) {
                          return (
                            <div key={i} className="flex flex-col gap-3">
                              {outputData?.explanation && (
                                <div className="text-[15px] leading-relaxed text-muted-foreground font-medium mb-1">
                                  {outputData.explanation}
                                </div>
                              )}
                              {outputData.products && outputData.products.length > 0 && (
                                <div className="flex gap-4 overflow-x-auto hide-scrollbar py-3 -mx-4 px-4 sm:-mx-2 sm:px-2 snap-x">
                                  {outputData.products.map((product: any) => (
                                    <div key={product.id} className="snap-start shrink-0">
                                      <ChatProductCard product={product} />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        } else if (hasOutput && outputData?.success === false) {
                          return (
                            <div key={i} className="p-3 bg-red-50/50 rounded-xl text-sm italic text-red-500">
                              Error searching inventory: {outputData.error || 'Unknown error'}
                            </div>
                          );
                        } else if (!hasOutput) {
                          return (
                            <div key={i} className="flex items-center gap-2 text-sm italic text-muted-foreground p-3 bg-muted/50 rounded-xl w-fit">
                              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                              Searching our greenhouse...
                            </div>
                          );
                        }
                      }
                      return null;
                    }).filter(Boolean);

                    if (!messageText && renderedTools.length === 0) return null;

                    return (
                      <div className={`p-5 md:p-6 rounded-[24px] shadow-sm ${m.role === 'user' ? 'bg-primary text-white rounded-tr-sm' : 'bg-white border border-border/60 text-foreground rounded-tl-sm flex flex-col gap-4'}`}>
                        {messageText && (
                          <div className={`prose prose-sm md:prose-base max-w-none font-medium leading-relaxed ${m.role === 'user' ? 'text-white' : 'text-muted-foreground'} prose-p:my-2 prose-ul:my-2 prose-li:my-0`}>
                            <span className="whitespace-pre-wrap">{messageText}</span>
                          </div>
                        )}
                        
                        {renderedTools.length > 0 && (
                          <div className="flex flex-col gap-2">
                            {renderedTools}
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {m.role === 'user' && (
                  <div className="w-12 h-12 rounded-2xl bg-white border border-border/60 shadow-sm flex items-center justify-center shrink-0">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
               <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-md">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div className="bg-white border border-border/60 p-6 rounded-[24px] rounded-tl-sm shadow-sm flex items-center gap-2 h-[72px]">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </motion.div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-5 rounded-2xl flex items-start gap-3 border border-red-200 mx-auto max-w-lg shadow-sm my-4">
              <AlertCircle className="h-6 w-6 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold mb-1">API Error Encountered</p>
                <p className="text-sm font-medium opacity-90 mb-2">
                  {error.message || "Sorry, I couldn't connect to the server. Please check your API key or try again later."}
                </p>
                {error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('rate') ? (
                  <p className="text-xs font-semibold bg-red-100 p-2 rounded">
                    Tip: You have hit the API rate limit (too many requests in a short time). Please wait about 30-60 seconds and try again!
                  </p>
                ) : null}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Input Area */}
        <div className="shrink-0 sticky bottom-0 bg-[#F8FFF9]/95 backdrop-blur-md pb-4 pt-3 px-4 sm:px-0 z-20 border-t border-primary/5 sm:border-none sm:bg-transparent">
          {speechError && (
            <div className="max-w-3xl mx-auto mb-2 bg-red-50 text-red-600 p-3 rounded-xl flex items-center gap-2 border border-red-100 text-sm font-medium shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{speechError}</span>
            </div>
          )}
          <div className="bg-white p-2 sm:p-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-border/50 max-w-3xl mx-auto">
            <form onSubmit={handleCustomSubmit} className="flex gap-1 sm:gap-2 relative items-center w-full">
              <div className="flex-1 relative flex items-center">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Ask me anything..."}
                  className={`w-full bg-transparent border-none focus:outline-none pl-4 sm:pl-6 pr-[48px] text-[16px] font-medium transition-colors ${isListening ? 'text-red-600 placeholder:text-red-400' : 'placeholder:text-muted-foreground/60'}`}
                />
                {isSupported && (
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`absolute right-1 p-2 sm:p-3 rounded-full transition-colors ${isListening ? 'text-red-500 animate-pulse bg-red-50' : 'text-slate-400 hover:text-primary hover:bg-primary/5'}`}
                    title="Use Voice Input"
                  >
                    {isListening ? <Mic className="h-5 w-5 sm:h-6 sm:w-6" /> : <MicOff className="h-5 w-5 sm:h-6 sm:w-6" />}
                  </button>
                )}
              </div>
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()} 
                className="h-12 w-12 sm:h-14 sm:w-14 rounded-full shrink-0 shadow-md transition-transform hover:scale-105 bg-primary hover:bg-primary/90 disabled:opacity-50 p-0 flex items-center justify-center"
              >
                <Send className="h-5 w-5 text-white" />
              </Button>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  );
}
