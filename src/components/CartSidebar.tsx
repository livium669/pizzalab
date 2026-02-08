"use client";

import { useCart } from "@/context/CartContext";
import { X, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function CartSidebar() {
  const { isOpen, closeCart, items, removeFromCart, cartTotal } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

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

  return createPortal(
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 z-[9999] h-full w-full sm:w-[400px] bg-zinc-950 border-l border-neon-green/30 shadow-[-10px_0_30px_rgba(0,255,0,0.1)] transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-zinc-900/50">
          <h2 className="text-2xl font-oswald text-white flex items-center gap-2">
            THE STASH <span className="text-neon-green text-sm align-top">V.1.0</span>
          </h2>
          <button 
            onClick={closeCart}
            className="text-gray-400 hover:text-white hover:rotate-90 transition-all duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar min-h-0">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p className="font-mono text-sm">YOUR STASH IS EMPTY</p>
              <button 
                onClick={closeCart}
                className="mt-4 px-6 py-2 border border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all font-oswald tracking-wider"
              >
                BROWSE MENU
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="group relative flex gap-4 bg-zinc-900/50 p-3 rounded-lg border border-white/5 hover:border-neon-green/30 transition-all">
                {/* Image */}
                <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded bg-black">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-oswald text-lg text-white leading-tight">{item.name}</h3>
                    <p className="font-mono text-xs text-gray-400 mt-1">{item.displayPrice}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-mono text-xs text-neon-green bg-neon-green/10 px-2 py-0.5 rounded">
                      QTY: {item.quantity}
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-zinc-900/50 flex-shrink-0">
            <div className="flex justify-between items-center mb-6">
              <span className="font-oswald text-gray-400">TOTAL</span>
              <span className="font-mono text-2xl text-neon-green">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full py-4 bg-neon-green text-black font-oswald text-xl tracking-widest hover:bg-white transition-colors relative overflow-hidden group">
              <span className="relative z-10">CHECKOUT_</span>
              <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0"></div>
            </button>
          </div>
        )}
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-neon-green via-neon-pink to-cyan-400 opacity-50"></div>
      </div>
    </>,
    document.body
  );
}
