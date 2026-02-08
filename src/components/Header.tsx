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
  const [activeSection, setActiveSection] = useState("menu");
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Active section detection
      const sections = ["VisualMenu", "Location", "About"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is roughly in the top third of viewport or fully visible
          return rect.top >= 0 && rect.top <= 300 || (rect.top < 0 && rect.bottom > 100);
        }
        return false;
      });

      if (current) {
        // Map section IDs to state keys
        if (current === "VisualMenu") setActiveSection("menu");
        if (current === "Location") setActiveSection("location");
        if (current === "About") setActiveSection("about");
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
  };

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
        <Link 
          href="/" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-3xl font-oswald tracking-tighter uppercase text-white group cursor-pointer"
        >
          PIZZA <span className="text-neon-green group-hover:text-neon-pink transition-colors duration-300">LAB</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="hidden md:flex items-center space-x-8 font-oswald text-sm tracking-wider">
        <Link 
          href="#VisualMenu" 
          onClick={() => handleNavClick("menu")}
          className={`transition-colors duration-300 ${activeSection === "menu" ? "text-neon-green" : "text-white hover:text-neon-green"}`}
        >
          MENU 
        </Link>
        <Link 
          href="#Location" 
          onClick={() => handleNavClick("location")}
          className={`transition-colors duration-300 ${activeSection === "location" ? "text-neon-green" : "text-white hover:text-neon-green"}`}
        >
          LOCATION 
        </Link>
        <Link 
          href="#About" 
          onClick={() => handleNavClick("about")}
          className={`transition-colors duration-300 ${activeSection === "about" ? "text-neon-green" : "text-white hover:text-neon-green"}`}
        >
          ABOUT 
        </Link>
        <Link 
          href="#VisualMenu" 
          onClick={() => handleNavClick("menu")}
          className="text-white hover:text-neon-green transition-colors"
        >
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
