"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Sparkles, Wine, Beer, Plus, Check } from "lucide-react";
import { Pizza } from "@/types/pizza";
import { useCart } from "@/context/CartContext";
import GlitchTitle from "./GlitchTitle";

interface PizzaDetailModalProps {
  pizza: Pizza;
  onClose: () => void;
}

const BLUR_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

export default function PizzaDetailModal({ pizza, onClose }: PizzaDetailModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Small delay to allow transition to start
    setTimeout(() => setIsVisible(true), 10);
    
    // Prevent background scrolling
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation
  };

  const handleAddToCart = () => {
    addToCart(pizza);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!mounted) return null;

  const modalContent = (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}>
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div 
        className={`relative w-full max-w-4xl h-[100dvh] md:h-auto bg-zinc-950 border border-white/20 shadow-2xl overflow-hidden flex flex-col md:flex-row transform transition-all duration-500 ${isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-8"}`}
        style={{
          boxShadow: `0 0 50px -12px ${pizza.accentColor.includes("neon-green") ? "#39ff14" : pizza.accentColor.includes("neon-pink") ? "#ff00ff" : pizza.accentColor.includes("cyan") ? "#00ffff" : "#facc15"}40`
        }}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white hover:text-black rounded-full text-white transition-all duration-300 border border-white/20"
        >
          <X size={24} />
        </button>

        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 h-[200px] md:h-[500px] shrink-0 relative group overflow-hidden">
          <Image
            src={pizza.image}
            alt={pizza.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-zinc-950 opacity-90"></div>
          
          {/* Mobile Title Overlay (Hidden on Desktop) */}
          <div className="absolute bottom-4 left-4 md:hidden">
             <h2 className="text-3xl font-oswald text-white drop-shadow-lg">{pizza.name}</h2>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-6 md:p-4 flex flex-col flex-1 md:flex-none md:h-auto overflow-y-auto custom-scrollbar min-h-0">
          
          {/* Header (Desktop) */}
          <div className="hidden md:block mb-6">
            <GlitchTitle 
              text={pizza.name} 
              className={`text-4xl font-marker ${pizza.accentColor.split(' ')[0]} mb-2`}
            />
            <div className="flex items-center gap-4">
              <span className="text-3xl font-mono text-white">{pizza.displayPrice}</span>
              <span className={`px-3 py-1 text-xs font-bold border rounded ${pizza.category === "VEGGIE" ? "border-green-500 text-green-500" : pizza.category === "SPICY" ? "border-red-500 text-red-500" : "border-yellow-500 text-yellow-500"}`}>
                {pizza.category}
              </span>
            </div>
          </div>

          {/* Mobile Price/Category */}
          <div className="flex items-center justify-between mb-6 md:hidden">
            <span className="text-2xl font-mono text-white">{pizza.displayPrice}</span>
             <span className={`px-3 py-1 text-xs font-bold border rounded ${pizza.category === "VEGGIE" ? "border-green-500 text-green-500" : pizza.category === "SPICY" ? "border-red-500 text-red-500" : "border-yellow-500 text-yellow-500"}`}>
                {pizza.category}
              </span>
          </div>

          {/* Ingredients */}
          <div className="mb-8">
            <h3 className="text-sm font-mono text-gray-400 mb-3 uppercase tracking-wider">Deconstructed Data</h3>
            <div className="flex flex-wrap gap-2">
              {pizza.ingredients.map((ing, i) => (
                <span key={i} className="text-sm text-gray-200 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Lore / Story */}
          {pizza.story && (
            <div className="mb-8 relative p-6 bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <div className="absolute top-0 right-0 p-2 opacity-20">
                <Sparkles size={48} className="text-white" />
              </div>
              <h3 className="text-sm font-mono text-neon-pink mb-3 uppercase tracking-wider flex items-center gap-2">
                <Sparkles size={14} /> Origin Story 
              </h3>
              <p className="text-gray-300 font-sans leading-relaxed italic">
                "{pizza.story}"
              </p>
            </div>
          )}

          {/* Pairings */}
          {pizza.pairings && (
            <div className="mb-8">
              <h3 className="text-sm font-mono text-gray-400 mb-3 uppercase tracking-wider">Compatible Modules (Pairings)</h3>
              <ul className="space-y-3">
                {pizza.pairings.map((pairing, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300 group">
                    <div className="p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                      {i % 2 === 0 ? <Beer size={16} className="text-yellow-400" /> : <Wine size={16} className="text-red-400" />}
                    </div>
                    <span className="font-mono text-sm">{pairing}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <button
              onClick={handleAddToCart}
              className={`w-full py-4 px-6 flex items-center justify-center gap-3 font-oswald text-xl tracking-wider uppercase transition-all duration-300 ${
                added 
                  ? "bg-neon-green text-black border-neon-green" 
                  : "bg-transparent text-white border-2 border-white hover:bg-white hover:text-black"
              }`}
            >
              {added ? (
                <>
                  <Check size={24} /> Added to Stash
                </>
              ) : (
                <>
                  <Plus size={24} /> Add to Stash
                </>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
