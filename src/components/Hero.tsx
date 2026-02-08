"use client";

import Image from "next/image";
import { Zap, Skull } from "lucide-react";
import { useState, useEffect } from "react";
import pizzaHeroT from "@/assets/pizzaherot.png";
import pizzaComplete from "@/assets/pizza-complete.png";

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Transition completes in the first 500px (approx half screen height)
      // This allows the user to see the animation fully while the section is "stuck"
      const scrollY = window.scrollY;
      const transitionDistance = 500; 
      
      const progress = Math.min(Math.max(scrollY / transitionDistance, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[200vh] bg-[#1a1a1a]">
      <section className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
        {/* Background Noise/Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      
      {/* Radial Gradient Spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-900 rounded-full blur-3xl opacity-50"></div>

      {/* Main Text - Left */}
      <div className="absolute left-[5%] top-[25%] z-10 max-w-[400px]">
        <h2 
          className="text-8xl font-marker text-white leading-[0.85] glitch-text drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" 
          data-text="FUEL YOUR CHAOS"
        >
          FUEL <br/>
          YOUR <br/>
          CHAOS
        </h2>
        
        {/* Decorative grunge box behind text */}
        <div className="absolute -z-10 top-10 -left-10 w-[120%] h-[120%] border border-white/10 opacity-30 rotate-[-2deg]"></div>
      </div>

      {/* Floating Pizza - Center */}
      <div className="relative z-20 animate-float w-[600px] h-[600px] md:w-[750px] md:h-[750px]">
         {/* Pizza Base Image */}
         <div className="relative w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
             {/* Levitating Ingredients Pizza (Initial) */}
             <div 
               className="absolute inset-0 transition-all duration-100 ease-out"
               style={{ 
                 opacity: 1 - scrollProgress,
                 transform: `rotate(${scrollProgress * 180}deg) scale(${1 - scrollProgress * 0.5})`
               }}
             >
               <Image 
                 src={pizzaHeroT} 
                 alt="Chaotic Pizza" 
                 fill
                 className="object-contain"
                 priority
                 placeholder="blur"
               />
             </div>
             
             {/* Complete Pizza (On Scroll) */}
             <div 
               className="absolute inset-0 transition-all duration-100 ease-out"
               style={{ 
                 opacity: scrollProgress,
                 transform: `rotate(${scrollProgress * 180 - 180}deg) scale(${0.5 + scrollProgress * 0.5})`
               }}
             >
               <Image 
                 src={pizzaComplete} 
                 alt="Complete Pizza" 
                 fill
                 className="object-contain"
                 priority
                 placeholder="blur"
               />
             </div>
         </div>
         
         {/* Floating Toppings (Simulated with small colored elements or shapes if no images) */}
         <div>
           <div className="absolute top-0 right-10 w-16 h-16 bg-red-600 rounded-full blur-[1px] opacity-80 animate-bounce delay-100"></div>
           <div className="absolute bottom-20 left-10 w-12 h-12 bg-green-700 rounded-full blur-[1px] opacity-80 animate-pulse"></div>
           <div className="absolute top-10 left-20 w-8 h-8 bg-black rounded-full blur-[0.5px] opacity-90"></div>
         </div>
      </div>

      {/* Neon Sign - Right */}
      <div className="absolute right-[10%] top-[40%] z-10 transform rotate-[-5deg]">
        <button className="relative border-4 border-neon-pink p-4 rounded-lg shadow-[0_0_20px_#ff00ff,inset_0_0_10px_#ff00ff] hover:scale-110 hover:shadow-[0_0_40px_#ff00ff,inset_0_0_20px_#ff00ff] transition-all duration-300 cursor-pointer group">
          <h3 className="text-4xl font-oswald italic text-white drop-shadow-[0_0_5px_#ff00ff] group-hover:text-white transition-colors">
            ORDER NOW!
          </h3>
          <Zap className="absolute -top-6 -right-6 text-neon-green w-10 h-10 drop-shadow-[0_0_10px_#ccff00] group-hover:rotate-12 transition-transform" />
          <Skull className="absolute -bottom-6 -left-6 text-white w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity" />
        </button>
        <Zap className="absolute top-10 right-[-40px] text-neon-green w-6 h-6 animate-pulse" />
      </div>

      {/* Glitch Decorations */}
      <div className="absolute top-[20%] left-0 w-20 h-2 bg-neon-green"></div>
      <div className="absolute bottom-[20%] right-0 w-20 h-2 bg-neon-pink"></div>
      
      <div className="absolute top-[15%] right-[20%] w-2 h-2 bg-white rounded-full"></div>
      <div className="absolute bottom-[30%] left-[20%] w-2 h-2 bg-white rounded-full"></div>

      </section>
    </div>
  );
}
