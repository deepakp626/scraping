"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Unlock, FileText, Lock, CheckCircle2, ShieldAlert, AlertCircle } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function PdfUnlock() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "unlocking" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === "application/pdf") {
        setFile(droppedFile);
        setStatus("idle");
        setErrorMessage("");
      } else {
        setStatus("error");
        setErrorMessage("Please upload a valid PDF file.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const unlockPdf = async () => {
    if (!file) return;

    setStatus("unlocking");
    setErrorMessage("");

    try {
      const arrayBuffer = await file.arrayBuffer();

      let pdfDoc;
      try {
        pdfDoc = await PDFDocument.load(arrayBuffer, {
          password: password || undefined,
          ignoreEncryption: false, 
        });
      } catch (err: any) {
        if (err.message && err.message.toLowerCase().includes("password")) {
          throw new Error("This PDF is encrypted with a strong password. Please provide the correct password below to unlock it.");
        }
        throw new Error("Failed to read the PDF. It might be corrupted or heavily encrypted (AES-256 is not supported client-side).");
      }

      // Save the PDF. This strips standard restrictions if the document was loaded successfully.
      const pdfBytes = await pdfDoc.save();

      // Create Blob and download
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Unlocked_${file.name}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatus("success");
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message || "An unexpected error occurred while unlocking the PDF.");
    }
  };

  const resetTool = () => {
    setFile(null);
    setPassword("");
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <section className="py-24 bg-slate-50 relative border-t border-slate-200" id="pdf-unlock">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-primary-theme uppercase bg-primary-theme/10 border border-primary-theme/20 rounded-full"
          >
            <Unlock size={14} /> PDF Utilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Instantly <span className="text-primary-theme">Unlock</span> PDFs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto"
          >
            Remove passwords and restrictive permissions from your PDF documents securely in your browser. No files are uploaded to our servers.
          </motion.p>
        </div>

        {/* Tool Container */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden"
        >
          <div className="p-8 md:p-12">
            
            <AnimatePresence mode="wait">
              {!file ? (
                /* Upload Zone */
                <motion.div 
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:border-primary-theme hover:bg-primary-theme/5 transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center min-h-[300px]"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    accept=".pdf" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                  />
                  <div className="w-20 h-20 bg-slate-50 text-slate-400 group-hover:bg-white group-hover:text-primary-theme rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-all duration-300 group-hover:scale-110">
                    <UploadCloud size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-primary-theme transition-colors">
                    Upload your PDF
                  </h3>
                  <p className="text-slate-500 mb-6">
                    Drag and drop or click to browse files
                  </p>
                  <div className="flex gap-2 text-xs text-slate-400 font-medium">
                    <ShieldAlert size={14} className="text-green-500" />
                    100% Secure & Private - Processed locally
                  </div>
                </motion.div>
              ) : (
                /* Unlock Configuration & Status */
                <motion.div 
                  key="action"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-8 min-h-[300px]"
                >
                  <div className="w-24 h-32 bg-slate-50 border-2 border-slate-200 rounded-lg flex flex-col items-center justify-center shadow-lg relative mb-8">
                    <FileText size={40} className="text-primary-theme mb-2" />
                    <span className="text-[10px] font-bold text-slate-400 max-w-[80%] truncate uppercase">
                      PDF
                    </span>
                    {status === "success" ? (
                      <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-md">
                        <CheckCircle2 size={16} className="text-white" />
                      </div>
                    ) : (
                      <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-orange-500 rounded-full border-4 border-white flex items-center justify-center shadow-md">
                        <Lock size={14} className="text-white" />
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2 truncate max-w-[80%]">
                    {file.name}
                  </h3>
                  <p className="text-slate-500 text-sm mb-8">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>

                  {status === "error" && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 flex items-start gap-3 w-full max-w-md border border-red-100"
                    >
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{errorMessage}</p>
                    </motion.div>
                  )}

                  {status === "success" ? (
                    <div className="flex flex-col gap-4 w-full max-w-md">
                      <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm mb-2 text-center border border-green-100 font-medium">
                        Success! Your unlocked PDF has been downloaded automatically.
                      </div>
                      <button 
                        onClick={resetTool}
                        className="w-full px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors"
                      >
                        Unlock Another PDF
                      </button>
                    </div>
                  ) : (
                    <div className="w-full max-w-md flex flex-col gap-4">
                      {/* Password Input (Optional) */}
                      <div className="w-full">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Is it password protected? (Optional)
                        </label>
                        <div className="relative">
                          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            type="password" 
                            placeholder="Enter password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-theme focus:border-primary-theme outline-none transition-all placeholder:text-slate-400 text-slate-800"
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 mt-2">
                        <button 
                          onClick={resetTool}
                          className="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors min-w-[120px]"
                          disabled={status === "unlocking"}
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={unlockPdf}
                          disabled={status === "unlocking"}
                          className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary-theme hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-primary-theme/30 transition-all ${
                            status === "unlocking" ? "opacity-75 cursor-not-allowed" : "hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-theme/40"
                          }`}
                        >
                          {status === "unlocking" ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Unlocking...
                            </>
                          ) : (
                            <>
                              <Unlock size={18} />
                              Unlock PDF
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
            
          </div>

          {/* Additional PDF Tools Banner */}
          <div className="bg-slate-900 px-8 py-6 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <FileText size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Explore More PDF Tools</h4>
                <p className="text-slate-400 text-xs mt-0.5">Merge, Split, Compress, and Convert PDFs easily.</p>
              </div>
            </div>
            <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-lg transition-colors border border-white/5">
              View All Tools
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
