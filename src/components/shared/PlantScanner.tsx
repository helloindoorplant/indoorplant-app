"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, ScanLine, Loader2, AlertTriangle, CheckCircle, X, Info } from "lucide-react";

export function PlantScanner() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "success" | "error">("idle");
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setStatus("scanning");
    setDiagnosis(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/care/scan", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
        setDiagnosis(data.diagnosis);
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
              className="hidden" 
            />
            
            {status === "idle" && (
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#2D6A4F] hover:bg-[#1B4332] text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <Camera className="w-4 h-4" /> Scan Plant
              </button>
            )}

            {(status === "scanning" || status === "success" || status === "error") && (
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
                  <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden relative shrink-0 border border-slate-200 shadow-sm bg-white">
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
                <div className="flex-1">
                  {status === "scanning" && (
                    <div className="h-full flex flex-col justify-center">
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Analyzing Leaves...</h4>
                      <p className="text-xs text-slate-500">Our AI Botanist is checking for pests, diseases, and nutrient deficiencies.</p>
                      
                      {/* Fake Progress Bar */}
                      <div className="h-1.5 w-full bg-slate-200 rounded-full mt-3 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-1/2 animate-[pulse_1s_infinite]" />
                      </div>
                    </div>
                  )}

                  {status === "success" && diagnosis && (
                    <div>
                      <div className="flex items-center gap-2 text-emerald-600 mb-2">
                        <CheckCircle className="w-4 h-4" />
                        <h4 className="font-bold text-sm">Diagnosis Complete</h4>
                      </div>
                      <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed text-xs">
                        <span className="whitespace-pre-wrap">{diagnosis}</span>
                      </div>
                    </div>
                  )}

                  {status === "error" && diagnosis && (
                    <div>
                      <div className="flex items-center gap-2 text-rose-600 mb-2">
                        <AlertTriangle className="w-4 h-4" />
                        <h4 className="font-bold text-sm">Analysis Failed</h4>
                      </div>
                      <p className="text-xs text-rose-600/80 font-medium">{diagnosis}</p>
                    </div>
                  )}
                </div>

              </div>

              {/* Privacy Footer */}
              <div className="px-5 py-2.5 bg-slate-100/50 border-t border-slate-100 flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                <Info className="w-3 h-3 text-slate-400" />
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
