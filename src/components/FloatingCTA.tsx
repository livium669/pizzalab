"use client";

import { CalendarDays } from "lucide-react";
import { useState } from "react";
import ReservationModal from "./ReservationModal";

export default function FloatingCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-8 md:bottom-24 right-6 z-50 animate-bounce-slow">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="relative group"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-neon-green rounded-full blur-md opacity-50 group-hover:opacity-100 group-hover:blur-lg transition-all duration-300 animate-pulse"></div>
          
          {/* Button Content */}
          <div className="relative flex items-center gap-3 bg-black border-2 border-neon-green text-neon-green px-6 py-4 rounded-full shadow-[0_0_15px_rgba(204,255,0,0.3)] hover:bg-neon-green hover:text-black transition-all duration-300 transform group-hover:scale-105">
            <CalendarDays size={24} />
            <span className="font-oswald text-xl tracking-wider uppercase">
              Book Table
            </span>
          </div>

          {/* Floating Particles/Decoration */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-pink rounded-full animate-ping"></div>
        </button>
      </div>

      <ReservationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
