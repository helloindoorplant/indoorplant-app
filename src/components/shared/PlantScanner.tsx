"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Camera, ScanLine, Loader2, AlertTriangle, CheckCircle, X, Info, Send, Bot, User, MessageSquare } from "lucide-react";

export function PlantScanner() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error" | "not_plant">("idle");
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const [plantName, setPlantName] = useState<string | null>(null);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  
  const [input, setInput] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const transport = useMemo(() => new DefaultChatTransport({ api: '/api/care/scan-chat' }), []);
  
  const { messages, sendMessage, status: chatStatus, setMessages } = useChat({
    transport
  });
  
  const isChatLoading = chatStatus === 'submitted' || chatStatus === 'streaming';

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isChatLoading]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setStatus("scanning");
    setDiagnosis(null);
    setPlantName(null);
    setSuggestedQuestions([]);
    setMessages([]);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/care/scan", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.isPlant === false) {
          setStatus("not_plant");
          setDiagnosis(data.error);
        } else {
          setStatus("success");
          setDiagnosis(data.diagnosis);
          setPlantName(data.plantName);
          setSuggestedQuestions(data.suggestedQuestions || []);
        }
      } else {
        setStatus("error");
        setDiagnosis(data.error || "Failed to analyze the image.");
      }
    } catch (err) {
      setStatus("error");
      setDiagnosis("A network error occurred while scanning.");
    }
  };

  const resetScanner = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setStatus("idle");
    setDiagnosis(null);
    setPlantName(null);
    setSuggestedQuestions([]);
    setMessages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const submitMessage = (text: string) => {
    if (!text.trim()) return;
    sendMessage({
      role: 'user',
      parts: [{ type: 'text', text }]
    }, {
      body: {
        context: { plantName, diagnosis }
      }
    });
    setInput('');
  };

  const handleSuggestedQuestionClick = (question: string) => {
    submitMessage(question);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMessage(input);
  };
  
  const getMessageText = (m: any) => {
    if (!m) return '';
    return m.content || (m.parts || []).map((p: any) => p.text || '').join('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="bg-white rounded-2xl shadow-sm border border-emerald-100 overflow-hidden transition-all">
        {/* Compact Top Bar */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ScanLine className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-[15px]">Is your plant sick?</h3>
              <p className="text-[11px] text-slate-500 font-medium">Take a photo for an instant AI diagnosis & cure.</p>
            </div>
          </div>
          
          <div className="shrink-0 w-full sm:w-auto">
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="sr-only" 
            />
            
            {status === "idle" && (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2D6A4F] hover:bg-[#1B4332] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <Camera className="w-4 h-4" /> Scan Plant
              </button>
            )}

            {(status === "scanning" || status === "success" || status === "error" || status === "not_plant") && (
              <button 
                onClick={resetScanner}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-600 px-5 py-2.5 rounded-xl text-xs font-bold transition-all"
              >
                <X className="w-4 h-4" /> Cancel
              </button>
            )}
          </div>
        </div>

        {/* Expanding Content Area */}
        <AnimatePresence>
          {status !== "idle" && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-slate-100"
            >
              <div className="p-5 bg-slate-50 flex flex-col sm:flex-row gap-5">
                
                {/* Image Preview */}
                {previewUrl && (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden relative shrink-0 border border-slate-200 shadow-sm bg-white">
                    <img src={previewUrl} alt="Scanning" className="w-full h-full object-cover" />
                    
                    {status === "scanning" && (
                      <>
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-emerald-500 shadow-[0_0_10px_#10b981] animate-[scan_2s_ease-in-out_infinite]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Analysis / Results */}
                <div className="flex-1 min-w-0">
                  {status === "scanning" && (
                    <div className="h-full flex flex-col justify-center">
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Analyzing Image...</h4>
                      <p className="text-xs text-slate-500">Identifying plant and checking for diseases.</p>
                      
                      {/* Fake Progress Bar */}
                      <div className="h-1.5 w-full bg-slate-200 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-1/2 animate-[pulse_1s_infinite]" />
                      </div>
                    </div>
                  )}

                  {status === "success" && diagnosis && (
                    <div>
                      <div className="flex items-center gap-2 text-emerald-600 mb-1">
                        <CheckCircle className="w-4 h-4 shrink-0" />
                        <h4 className="font-bold text-sm truncate">{plantName || "Plant Identified"}</h4>
                      </div>
                      <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed text-[13px] bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                        <span className="whitespace-pre-wrap">{diagnosis}</span>
                      </div>

                      {/* Suggested Questions */}
                      {suggestedQuestions.length > 0 && (
                        <div className="mt-4">
                          <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-2">Suggested Questions:</p>
                          <div className="flex flex-col gap-2">
                            {suggestedQuestions.map((q, i) => (
                              <button
                                key={i}
                                onClick={() => handleSuggestedQuestionClick(q)}
                                disabled={isChatLoading}
                                className="text-left w-full px-3 py-2 text-[11px] sm:text-xs font-semibold text-[#2D6A4F] bg-emerald-50 hover:bg-emerald-100 border border-emerald-100/50 rounded-lg transition-colors disabled:opacity-50"
                              >
                                {q}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {status === "error" && diagnosis && (
                    <div className="h-full flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-rose-600 mb-2">
                        <AlertTriangle className="w-5 h-5 shrink-0" />
                        <h4 className="font-bold text-base">Analysis Failed</h4>
                      </div>
                      <p className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-rose-100 shadow-sm">
                        {diagnosis}
                      </p>
                    </div>
                  )}

                  {status === "not_plant" && diagnosis && (
                    <div className="h-full flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-orange-600 mb-2">
                        <Info className="w-5 h-5 shrink-0" />
                        <h4 className="font-bold text-base">Not a Plant</h4>
                      </div>
                      <p className="text-sm text-slate-700 bg-white p-3 rounded-lg border border-orange-100 shadow-sm mb-3">
                        {diagnosis}
                      </p>
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="self-start px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold text-xs rounded-lg transition-colors"
                      >
                        Retake Photo
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Interface (Only when successful) */}
              {status === "success" && (
                <div className="border-t border-slate-200 bg-white">
                  {/* Chat Messages */}
                  <div className="max-h-[300px] overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center py-6 text-slate-400 text-xs flex flex-col items-center gap-2">
                        <MessageSquare className="w-6 h-6 opacity-50" />
                        <p>Ask anything about this plant or its treatment plan.</p>
                      </div>
                    ) : (
                      messages.map((m: any) => (
                        <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          {m.role === 'assistant' && (
                            <div className="w-6 h-6 rounded-md bg-[#2D6A4F] text-white flex items-center justify-center shrink-0">
                              <Bot className="w-3 h-3" />
                            </div>
                          )}
                          <div className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                            m.role === 'user' 
                              ? 'bg-slate-100 text-slate-800 rounded-tr-sm' 
                              : 'bg-white border border-slate-200 text-slate-700 shadow-sm rounded-tl-sm'
                          }`}>
                            <span className="whitespace-pre-wrap">{getMessageText(m)}</span>
                          </div>
                          {m.role === 'user' && (
                            <div className="w-6 h-6 rounded-md bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
                              <User className="w-3 h-3" />
                            </div>
                          )}
                        </div>
                      ))
                    )}
                    {isChatLoading && (
                       <div className="flex gap-3 justify-start">
                         <div className="w-6 h-6 rounded-md bg-[#2D6A4F] text-white flex items-center justify-center shrink-0">
                           <Bot className="w-3 h-3" />
                         </div>
                         <div className="p-3 bg-white border border-slate-200 shadow-sm rounded-2xl rounded-tl-sm flex items-center gap-1.5 h-8">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                           <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                           <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                         </div>
                       </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Chat Input */}
                  <div className="p-3 border-t border-slate-100 bg-slate-50/50">
                    <form onSubmit={handleSubmit} className="flex gap-2 relative">
                      <input 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        disabled={isChatLoading}
                        className="flex-1 bg-white border border-slate-200 rounded-full pl-4 pr-12 py-2.5 text-xs outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]/20 transition-all text-slate-800 disabled:opacity-50"
                      />
                      <button 
                        type="submit" 
                        disabled={!input.trim() || isChatLoading}
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#2D6A4F] hover:bg-[#1B4332] disabled:bg-slate-300 text-white flex items-center justify-center transition-colors"
                      >
                        <Send className="w-3 h-3 ml-0.5" />
                      </button>
                    </form>
                  </div>
                </div>
              )}

              {/* Privacy Footer */}
              <div className="px-5 py-2.5 bg-slate-100/50 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                <Info className="w-3 h-3 text-slate-400 shrink-0" />
                Images are temporarily analyzed and permanently deleted from our servers within 2 hours.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}} />
    </div>
  );
}
