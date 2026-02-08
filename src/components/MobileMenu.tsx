"use client";

import Link from "next/link";
import { X, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import GlitchTitle from "./GlitchTitle";
import { useCart } from "@/context/CartContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsRendered(false), 300); // Match transition duration
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted || !isRendered) return null;

  return createPortal(
    <div 
      className={`fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(20,255,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-8 text-white hover:text-neon-pink transition-colors p-2"
        aria-label="Close Menu"
      >
        <X size={40} />
      </button>

      {/* Navigation Links */}
      <nav className="flex flex-col items-center gap-12 relative z-10">
        {[
          { href: "#VisualMenu", label: "MENU" },
          { href: "#Location", label: "LOCATION" },
          { href: "#About", label: "ABOUT" },
          { href: "#VisualMenu", label: "ORDER" },
        ].map((link, index) => (
          <Link 
            key={index}
            href={link.href}
            onClick={onClose}
            className="group relative"
          >
            <span className="text-4xl md:text-6xl font-oswald text-transparent bg-clip-text bg-white group-hover:text-neon-green transition-all duration-300 uppercase tracking-widest">
              {link.label}
            </span>
            {/* Glitch Overlay on Hover */}
            <span className="absolute inset-0 text-4xl md:text-6xl font-oswald text-neon-pink opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-100 uppercase tracking-widest pointer-events-none" aria-hidden="true">
              {link.label}
            </span>
            <span className="absolute inset-0 text-4xl md:text-6xl font-oswald text-neon-green opacity-0 group-hover:opacity-100 group-hover:-translate-x-1 group-hover:translate-y-1 transition-all duration-100 uppercase tracking-widest pointer-events-none" aria-hidden="true">
              {link.label}
            </span>
          </Link>
        ))}

        {/* Mobile Cart & Login */}
        <div className="flex items-center gap-8 mt-8">
           <Link 
            href="#" 
            onClick={onClose}
            className="text-2xl font-oswald border border-white px-8 py-2 hover:bg-white hover:text-black transition-all"
           >
             LOGIN
           </Link>

           <div 
            className="relative group cursor-pointer" 
            onClick={() => {
              onClose();
              toggleCart();
            }}
           >
              <ShoppingCart className="text-white group-hover:text-neon-green transition-colors w-8 h-8" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-neon-pink text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full animate-bounce">
                  {cartCount}
                </span>
              )}
           </div>
        </div>
      </nav>

      {/* Footer Decor */}
      <div className="absolute bottom-10 text-gray-500 font-mono text-xs">
        SYSTEM_READY // V.2.0.24
      </div>
    </div>,
    document.body
  );
}
