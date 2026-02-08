"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Calendar, Clock, Users, ChevronRight } from "lucide-react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: 2,
    name: "",
    email: ""
  });
  
  const [step, setStep] = useState(1); // 1: Details, 2: Contact, 3: Success

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsRendered(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted || !isRendered) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Simulate API call
      setTimeout(() => {
        setStep(3);
      }, 1000);
    }
  };

  const resetForm = () => {
    setFormData({ date: "", time: "", guests: 2, name: "", email: "" });
    setStep(1);
    onClose();
  };

  return createPortal(
    <div className={`fixed inset-0 z-[10000] flex items-center justify-center transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className={`relative w-full max-w-lg mx-4 bg-zinc-950 border border-neon-green/50 shadow-[0_0_50px_rgba(204,255,0,0.2)] transform transition-all duration-300 ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-10"}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-neon-green"></div>
          <div>
            <h2 className="font-oswald text-3xl text-white uppercase tracking-wider">
              RESERVE <span className="text-neon-green">THE VOID</span>
            </h2>
            <p className="font-mono text-xs text-gray-400 mt-1">SECURE YOUR SECTOR</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:rotate-90 transition-all duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {step === 3 ? (
            <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-neon-green/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-neon-green">
                <Calendar size={40} className="text-neon-green" />
              </div>
              <h3 className="font-oswald text-2xl text-white mb-2">RESERVATION CONFIRMED</h3>
              <p className="font-mono text-gray-400 text-sm mb-8">
                Your coordinates have been locked.<br/>
                Confirmation sent to {formData.email}
              </p>
              <button 
                onClick={resetForm}
                className="px-8 py-3 bg-white text-black font-oswald tracking-widest hover:bg-neon-green transition-colors"
              >
                CLOSE_TRANSMISSION
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                  {/* Date & Time Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="font-mono text-xs text-neon-green uppercase">Date</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          required
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          className="w-full bg-zinc-900/50 border border-white/20 p-3 text-white font-mono focus:border-neon-green focus:outline-none transition-colors appearance-none"
                        />
                        <Calendar className="absolute right-3 top-3 text-gray-500 pointer-events-none" size={16} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-xs text-neon-green uppercase">Time</label>
                      <div className="relative">
                        <input 
                          type="time" 
                          required
                          value={formData.time}
                          onChange={(e) => setFormData({...formData, time: e.target.value})}
                          className="w-full bg-zinc-900/50 border border-white/20 p-3 text-white font-mono focus:border-neon-green focus:outline-none transition-colors appearance-none"
                        />
                        <Clock className="absolute right-3 top-3 text-gray-500 pointer-events-none" size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-neon-green uppercase">Operatives (Guests)</label>
                    <div className="relative flex items-center bg-zinc-900/50 border border-white/20 p-1">
                      <button 
                        type="button"
                        onClick={() => setFormData(prev => ({...prev, guests: Math.max(1, prev.guests - 1)}))}
                        className="p-3 hover:bg-white/10 text-white transition-colors"
                      >
                        -
                      </button>
                      <div className="flex-1 text-center font-oswald text-xl text-white">
                        {formData.guests}
                      </div>
                      <button 
                        type="button"
                        onClick={() => setFormData(prev => ({...prev, guests: Math.min(10, prev.guests + 1)}))}
                        className="p-3 hover:bg-white/10 text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-300">
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-neon-green uppercase">Codename (Name)</label>
                    <input 
                      type="text" 
                      required
                      placeholder="ENTER_NAME"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-zinc-900/50 border border-white/20 p-3 text-white font-mono focus:border-neon-green focus:outline-none transition-colors placeholder:text-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-mono text-xs text-neon-green uppercase">Comms (Email)</label>
                    <input 
                      type="email" 
                      required
                      placeholder="ENTER_EMAIL"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-zinc-900/50 border border-white/20 p-3 text-white font-mono focus:border-neon-green focus:outline-none transition-colors placeholder:text-gray-700"
                    />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                {step === 2 && (
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-gray-400 hover:text-white font-mono text-xs uppercase tracking-wider"
                  >
                    ← Back
                  </button>
                )}
                <div className={`${step === 1 ? 'w-full' : 'ml-auto'}`}>
                  <button 
                    type="submit"
                    className="w-full group relative bg-neon-green text-black font-oswald text-xl py-3 px-6 tracking-widest overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 group-hover:gap-4 transition-all duration-300">
                      {step === 1 ? "NEXT_PHASE" : "INITIATE_BOOKING"} 
                      <ChevronRight size={18} />
                    </span>
                    <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-0"></div>
                  </button>
                </div>
              </div>

            </form>
          )}
        </div>

        {/* Footer Decor */}
        <div className="absolute bottom-0 right-0 p-2 opacity-50">
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-neon-green"></div>
            <div className="w-1 h-1 bg-neon-green"></div>
            <div className="w-1 h-1 bg-neon-green"></div>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
}
