'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  Search, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft, 
  Home, 
  Sun, 
  Droplet, 
  Send, 
  RotateCcw, 
  MessageSquare,
  ShieldCheck,
  Bot,
  User,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Plant {
  id: string;
  name: string;
  slug: string;
  description: string;
  careLevel: string;
  lightReq: string;
  waterReq: string | null;
  petFriendly: boolean;
  imageUrl: string;
}

interface CareClientProps {
  products: Plant[];
}

export default function CareClient({ products }: CareClientProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom environment details
  const [answers, setAnswers] = useState({
    location: 'Living Room',
    light: 'Bright indirect light',
    watering: 'I water regularly'
  });

  const [input, setInput] = useState('');
  const transport = useMemo(() => new DefaultChatTransport({ api: '/api/care' }), []);
  const { messages, sendMessage, status, setMessages, error } = useChat({
    transport
  });

  const isLoading = status === 'submitted' || status === 'streaming';
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, status]);

  // Filter plants based on search query
  const filteredPlants = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectPlant = (plant: Plant) => {
    setSelectedPlant(plant);
    setStep(2);
  };

  const handleGenerate = async () => {
    setStep(3);
    // Send the first trigger message with environment parameters in the request body
    sendMessage({
      role: 'user',
      parts: [{
        type: 'text',
        text: `Hello! I have a ${selectedPlant?.name} at my place. Please provide a detailed custom care guide for it based on my environment.`
      }]
    }, {
      body: {
        plantId: selectedPlant?.id,
        location: answers.location,
        lightLevel: answers.light,
        wateringHabit: answers.watering
      }
    });
  };

  const resetAll = () => {
    setMessages([]);
    setSelectedPlant(null);
    setStep(1);
    setAnswers({
      location: 'Living Room',
      light: 'Bright indirect light',
      watering: 'I water regularly'
    });
  };

  // Helper to extract message content text robustly from either content or parts
  const getMessageText = (m: any) => {
    if (!m) return '';
    return m.content || (m.parts || []).map((p: any) => p.text || '').join('');
  };

  // Parsing helper to split main content from suggested follow-up questions
  const parseMessageContent = (content: string | undefined | null) => {
    const safeContent = content || '';
    if (!safeContent.includes('---SUGGESTED_QUESTIONS---')) {
      return { mainContent: safeContent, questions: [] };
    }
    const parts = safeContent.split('---SUGGESTED_QUESTIONS---');
    const mainContent = parts[0].trim();
    const questionsPart = parts[1] || '';
    
    // Extract questions list
    const questions = questionsPart
      .split('\n')
      .map(q => q.replace(/^\d+\.\s*/, '').trim())
      .filter(q => q.length > 0);

    return { mainContent, questions };
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen py-12 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Progress Stepper Banner */}
        <div className="mb-10 max-w-xl mx-auto">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span className={step === 1 ? 'text-[#2D6A4F]' : 'text-slate-600'}>1. Choose Plant</span>
            <ChevronRight className="w-4 h-4" />
            <span className={step === 2 ? 'text-[#2D6A4F]' : step > 2 ? 'text-slate-600' : ''}>2. Environment Quiz</span>
            <ChevronRight className="w-4 h-4" />
            <span className={step === 3 ? 'text-[#2D6A4F]' : ''}>3. AI Assistant</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full mt-2 relative overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-[#2D6A4F] transition-all duration-500 rounded-full"
              style={{ width: step === 1 ? '33%' : step === 2 ? '66%' : '100%' }}
            />
          </div>
        </div>

        {/* STEP 1: SELECT PLANT */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <div className="inline-flex items-center gap-2 bg-[#E8F5E9] text-[#2D6A4F] px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase mb-3 border border-[#C8E6C9]">
                <Leaf className="w-4 h-4" /> Plant Care Guide
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold font-playfair tracking-tight mb-4 text-slate-900 leading-tight">
                AI Plant Care Assistant
              </h1>
              <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed">
                Select your plant to receive personalized, expert care guidelines generated dynamically by our AI Horticulturist.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search by plant name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-[#2D6A4F] focus:ring-1 focus:ring-[#2D6A4F]/20 shadow-sm transition-all text-slate-800"
              />
            </div>

            {/* Plant Grid Cards */}
            {filteredPlants.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 border border-slate-100 shadow-sm text-center max-w-sm mx-auto">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-4" />
                <h3 className="font-bold text-slate-800 text-lg mb-1">No plants matched</h3>
                <p className="text-xs text-slate-500">We couldn't find any products in database matching "{searchQuery}".</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPlants.map((plant) => (
                  <button 
                    key={plant.id}
                    onClick={() => selectPlant(plant)}
                    className="group bg-white border border-slate-100 rounded-2xl p-4 text-left shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col h-full focus:outline-none"
                  >
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-4 bg-slate-50 border border-slate-100">
                      <img 
                        src={plant.imageUrl} 
                        alt={plant.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-350"
                      />
                      <span className="absolute top-2 right-2 text-[9px] font-bold px-2 py-0.5 bg-white/95 rounded-full border border-slate-100 shadow-sm text-slate-600 uppercase">
                        {plant.careLevel}
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-[#2D6A4F] text-lg leading-snug transition-colors">
                          {plant.name}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                          {plant.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between border-t border-slate-50 pt-3 mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wide">
                        <span>{plant.lightReq} Light</span>
                        {plant.petFriendly && (
                          <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                            Pet Safe
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* STEP 2: ENVIRONMENT QUIZ */}
        {step === 2 && selectedPlant && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-150/50"
          >
            {/* Header / Selected Plant Summary */}
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
              <button 
                onClick={() => setStep(1)}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors"
                title="Go Back"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                <img src={selectedPlant.imageUrl} alt={selectedPlant.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider">Caring For</span>
                <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedPlant.name}</h2>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-6">Customize Your Plant Care Guide</h3>

            {/* Quiz Fields */}
            <div className="space-y-6 mb-8">
              {/* Question 1 */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Home className="w-4 h-4 text-[#2D6A4F]" /> Where will you keep the plant?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['Living Room', 'Bedroom', 'Home Office', 'Balcony', 'Bathroom', 'Kitchen'].map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setAnswers({ ...answers, location: loc })}
                      className={`py-3 px-4 border rounded-xl font-bold text-sm text-center transition-all ${
                        answers.location === loc 
                          ? 'border-[#2D6A4F] bg-emerald-50/20 text-[#2D6A4F] ring-1 ring-[#2D6A4F]' 
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-[#2D6A4F]" /> What is the light level in that spot?
                </label>
                <div className="space-y-3">
                  {[
                    { val: 'Low ambient light', desc: 'No direct sunlight ever reaches this corner; dim room ambient light.' },
                    { val: 'Bright indirect light', desc: 'Lots of natural ambient light near windows, but no hot direct sun rays fall on it.' },
                    { val: 'Direct afternoon sunlight', desc: 'Receives direct hot sun beams for several hours daily.' }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setAnswers({ ...answers, light: item.val })}
                      className={`w-full text-left p-4 border rounded-xl transition-all flex flex-col ${
                        answers.light === item.val
                          ? 'border-[#2D6A4F] bg-emerald-50/20 text-[#2D6A4F] ring-1 ring-[#2D6A4F]'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <span className="font-bold text-sm">{item.val}</span>
                      <span className="text-xs text-slate-450 mt-1 leading-relaxed">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-[#2D6A4F]" /> What are your typical watering habits?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { val: 'I water regularly', desc: 'I check on my plants weekly and keep them on schedule.' },
                    { val: 'I often forget to water', desc: 'I travel frequently or have a busy schedule, forgetting watering.' }
                  ].map((item) => (
                    <button
                      key={item.val}
                      onClick={() => setAnswers({ ...answers, watering: item.val })}
                      className={`p-4 border rounded-xl text-left transition-all flex flex-col ${
                        answers.watering === item.val
                          ? 'border-[#2D6A4F] bg-emerald-50/20 text-[#2D6A4F] ring-1 ring-[#2D6A4F]'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <span className="font-bold text-sm">{item.val}</span>
                      <span className="text-xs text-slate-450 mt-1">{item.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)} 
                className="w-1/3 py-6 rounded-xl border-slate-200 font-bold hover:bg-slate-50 text-slate-600"
              >
                Back
              </Button>
              <Button 
                onClick={handleGenerate}
                className="w-2/3 py-6 rounded-xl bg-primary hover:bg-[#1B4332] text-white font-bold shadow-md flex items-center justify-center gap-2 text-sm"
              >
                <Sparkles className="w-4 h-4" /> Generate Care Guide
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: ASSISTANT CARE DASHBOARD */}
        {step === 3 && selectedPlant && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start"
          >
            {/* Left side: Sticky Reference Card */}
            <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-150/60 p-5 shadow-sm">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 border border-slate-100">
                  <img src={selectedPlant.imageUrl} alt={selectedPlant.name} className="w-full h-full object-cover" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 leading-tight mb-2">
                  {selectedPlant.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                  {selectedPlant.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs font-bold text-slate-700">
                  <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-400">Care Level</span>
                    <span className="text-[#2D6A4F]">{selectedPlant.careLevel}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-400">Ideal Light</span>
                    <span className="text-slate-800">{selectedPlant.lightReq}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-400">Watering</span>
                    <span className="text-slate-800 line-clamp-1 max-w-[120px] text-right">{selectedPlant.waterReq || 'When dry'}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                    <span className="text-slate-400">Pet Safe</span>
                    <span>
                      {selectedPlant.petFriendly ? (
                        <span className="text-emerald-700">Yes (Friendly)</span>
                      ) : (
                        <span className="text-rose-600">No (Toxic)</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <Link 
                    href={`/product/${selectedPlant.slug}`}
                    className="w-full inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2.5 rounded-xl text-xs transition-colors"
                  >
                    View Product Page
                  </Link>
                  <button
                    onClick={resetAll}
                    className="w-full inline-flex items-center justify-center gap-1.5 text-slate-450 hover:text-slate-600 py-2.5 text-xs font-bold transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Start Over
                  </button>
                </div>
              </div>
            </div>

            {/* Right side: AI Guide Stream & Chat Dialog */}
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-slate-150/60 overflow-hidden flex flex-col min-h-[600px] max-h-[800px]">
              
              {/* Header */}
              <div className="bg-[#FAF9F6] border-b border-slate-150/60 p-5 shrink-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight">AI Horticulturist</h4>
                    <p className="text-[10px] font-bold text-[#2D6A4F] tracking-wide uppercase">Caring Guide Assistant</p>
                  </div>
                </div>
                <button 
                  onClick={resetAll}
                  className="p-2 text-slate-400 hover:text-[#2D6A4F] hover:bg-slate-100 rounded-lg transition-all"
                  title="Reset Guide"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Thread Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0 bg-[#FCFCFA]">
                {messages.map((m, index) => {
                  const isAssistant = m.role === 'assistant';
                  
                  // Extract suggested follow-up questions for assistant bubbles
                  const parsed = parseMessageContent(getMessageText(m));
                  const isLastMessage = index === messages.length - 1;

                  return (
                    <motion.div 
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-4 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                    >
                      {isAssistant && (
                        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      )}

                      <div className="flex flex-col gap-3 max-w-[85%]">
                        <div className={`p-4 md:p-5 rounded-2xl shadow-sm leading-relaxed text-sm ${
                          isAssistant 
                            ? 'bg-white border border-slate-150/70 text-slate-800 rounded-tl-sm' 
                            : 'bg-primary text-white rounded-tr-sm'
                        }`}>
                          <div className={`prose prose-sm max-w-none ${isAssistant ? 'text-slate-700' : 'text-white'}`}>
                            <span className="whitespace-pre-wrap">{parsed.mainContent}</span>
                          </div>
                        </div>

                        {/* Suggested Questions Rendered Below the Latest Assistant Response */}
                        {isAssistant && isLastMessage && parsed.questions.length > 0 && (
                          <div className="mt-2 space-y-2">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                              Suggested Follow-up Questions:
                            </span>
                            <div className="flex flex-col gap-1.5 align-start">
                              {parsed.questions.map((q, i) => (
                                <button
                                  key={i}
                                  onClick={() => sendMessage({
                                    role: 'user',
                                    parts: [{ type: 'text', text: q }]
                                  }, {
                                    body: {
                                      plantId: selectedPlant?.id,
                                      location: answers.location,
                                      lightLevel: answers.light,
                                      wateringHabit: answers.watering
                                    }
                                  })}
                                  disabled={isLoading}
                                  className="text-left py-2 px-3 bg-emerald-50/30 hover:bg-emerald-50/70 border border-emerald-100/50 rounded-xl text-xs font-semibold text-[#2D6A4F] hover:text-[#1B4332] transition-colors disabled:opacity-50"
                                >
                                  {q}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {!isAssistant && (
                        <div className="w-9 h-9 rounded-xl bg-[#2D6A4F]/10 border border-[#2D6A4F]/20 flex items-center justify-center shrink-0">
                          <User className="w-5 h-5 text-[#2D6A4F]" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {/* Shimmer loading when waiting for LLM stream */}
                {isLoading && messages[messages.length - 1]?.role === 'user' && (
                  <div className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-white border border-slate-150/70 p-5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 h-14">
                      <div className="w-2 h-2 rounded-full bg-[#2D6A4F]/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-[#2D6A4F]/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-[#2D6A4F]/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-start gap-2.5 border border-red-200 text-xs">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Error generating care instructions</p>
                      <p className="opacity-90 mt-1">{error.message || "Failed to reach AI greenhouse advisor."}</p>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} className="h-2" />
              </div>

              {/* Chat Input form */}
              <div className="p-4 border-t border-slate-150/60 bg-white shrink-0">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!input.trim() || isLoading) return;
                    sendMessage({
                      role: 'user',
                      parts: [{ type: 'text', text: input.trim() }]
                    }, {
                      body: {
                        plantId: selectedPlant?.id,
                        location: answers.location,
                        lightLevel: answers.light,
                        wateringHabit: answers.watering
                      }
                    });
                    setInput('');
                  }} 
                  className="flex gap-2"
                >
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask another question about this plant's care..."
                    disabled={isLoading}
                    className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#2D6A4F] focus:bg-white transition-all text-slate-800 disabled:opacity-50"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="bg-primary hover:bg-[#1B4332] text-white p-3 rounded-xl shadow-sm hover:shadow shrink-0 transition-all flex items-center justify-center w-11 h-11"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
