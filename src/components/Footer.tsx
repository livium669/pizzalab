import Link from "next/link";
import { Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-white/10 py-6 relative z-10">
      
      {/* Action Buttons */}
    
       

      {/* Bottom Bar Info */}
      <div className="w-full flex items-center justify-center gap-4 text-xs font-mono text-gray-400">
         <Twitter size={14} className="text-white" />
         <span>PIZZA LAB // &copy; {currentYear}</span>
         
         {/* Decorative elements */}
         <div className="absolute left-0 bottom-0 w-32 h-2 bg-neon-green"></div>
         <div className="absolute right-0 bottom-0 w-32 h-2 bg-neon-green"></div>
      </div>
    </footer>
  );
}
