"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, Menu, CalendarDays } from "lucide-react";
import MobileMenu from "./MobileMenu";
import CartSidebar from "./CartSidebar";
import ReservationModal from "./ReservationModal";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 transition-all duration-300 ${
        isScrolled 
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-4" 
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-3xl font-oswald tracking-tighter uppercase text-white group cursor-pointer">
          PIZZA <span className="text-neon-green group-hover:text-neon-pink transition-colors duration-300">LAB</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-8 font-oswald text-sm tracking-wider">
        <Link href="#VisualMenu" className="text-neon-green hover:text-white transition-colors">
          MENU 
        </Link>
        <Link href="#Location" className="text-white hover:text-neon-green transition-colors">
          LOCATION 
        </Link>
        <Link href="#About" className="text-white hover:text-neon-green transition-colors">
          ABOUT 
        </Link>
        <Link href="#VisualMenu" className="text-white hover:text-neon-green transition-colors">
          ORDER
        </Link>
        
        {/* Login Button */}
        <Link 
          href="#" 
          className="border border-white px-4 py-1 hover:bg-white hover:text-black transition-all"
        >
          LOGIN
        </Link>

        {/* Cart Icon */}
        <div 
          className="relative cursor-pointer group"
          onClick={toggleCart}
        >
          <ShoppingCart className="text-white group-hover:text-neon-green transition-colors" size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-neon-pink text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
              {cartCount}
            </span>
          )}
        </div>
      </nav>
      
      {/* Mobile Menu Icon */}
      <div className="flex items-center gap-4 md:hidden">
        <button 
          className="text-neon-green hover:text-white transition-colors animate-pulse"
          onClick={() => setIsReservationOpen(true)}
          aria-label="Book Table"
        >
          <CalendarDays size={28} />
        </button>
        <button 
          className="text-white hover:text-neon-green transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu size={32} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      {/* Reservation Modal (triggered from mobile icon) */}
      <ReservationModal 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
      />

      {/* Cart Sidebar */}
      <CartSidebar />
    </header>
  );
}
