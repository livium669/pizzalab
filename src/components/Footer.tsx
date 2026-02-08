"use client";

import Link from "next/link";
import { Twitter, Instagram, Facebook, Linkedin, Send, Check } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      // Reset after 3 seconds
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <footer className="w-full bg-black border-t border-white/10 pt-16 pb-6 relative z-10 overflow-hidden">
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="text-3xl font-oswald tracking-tighter uppercase text-white group inline-block">
              PIZZA <span className="text-neon-green group-hover:text-neon-pink transition-colors duration-300">LAB</span>
            </Link>
            <p className="text-gray-400 max-w-md font-mono text-sm">
              Experimental slices for the chaotic soul. Join the resistance against boring food.
            </p>

            {/* Newsletter Form */}
            <div className="max-w-md mt-6">
              <h4 className="text-white font-oswald uppercase tracking-wider mb-2 flex items-center gap-2">
                Join The Newsletter <span className="text-neon-pink text-xs animate-pulse">● LIVE</span>
              </h4>
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  placeholder="ENTER_YOUR_EMAIL"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status !== "idle"}
                  className="w-full bg-white/5 border border-white/20 px-4 py-3 text-white placeholder:text-gray-600 font-mono focus:outline-none focus:border-neon-green focus:bg-white/10 transition-all pr-12"
                />
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neon-green hover:text-white transition-colors disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : status === "success" ? (
                    <Check size={20} className="text-neon-pink" />
                  ) : (
                    <Send size={20} />
                  )}
                </button>
              </form>
              {status === "success" && (
                <p className="text-neon-pink text-xs font-mono mt-2 animate-pulse">
                  &gt; ACCESS GRANTED. WELCOME TO THE LAB.
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-oswald text-xl uppercase tracking-wider border-l-4 border-neon-pink pl-4">
              System Links
            </h4>
            <ul className="space-y-3 font-mono text-sm text-gray-400">
              <li>
                <Link href="#VisualMenu" className="hover:text-neon-green hover:pl-2 transition-all duration-300 block">
                  &gt; VISUAL_MENU
                </Link>
              </li>
              <li>
                <Link href="#Location" className="hover:text-neon-green hover:pl-2 transition-all duration-300 block">
                  &gt; LOCATION_DATA
                </Link>
              </li>
              <li>
                <Link href="#OurStory" className="hover:text-neon-green hover:pl-2 transition-all duration-300 block">
                  &gt; ORIGIN_STORY
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-neon-green hover:pl-2 transition-all duration-300 block">
                  &gt; CAREERS [HIRING]
                </Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="space-y-6">
            <h4 className="text-white font-oswald text-xl uppercase tracking-wider border-l-4 border-neon-green pl-4">
              Connect
            </h4>
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: "#", color: "hover:text-neon-pink hover:drop-shadow-[0_0_10px_#ff00ff]" },
                { icon: Twitter, href: "#", color: "hover:text-cyan-400 hover:drop-shadow-[0_0_10px_#00ffff]" },
                { icon: Facebook, href: "#", color: "hover:text-blue-500 hover:drop-shadow-[0_0_10px_#0088ff]" },
                { icon: Linkedin, href: "#", color: "hover:text-blue-400 hover:drop-shadow-[0_0_10px_#0088ff]" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className={`w-12 h-12 flex items-center justify-center border border-white/20 bg-white/5 text-white transition-all duration-300 group hover:-translate-y-1 hover:border-white ${social.color}`}
                >
                  <social.icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
            <p className="text-xs text-gray-500 font-mono mt-4">
              Follow the signal. Do not get lost in the noise.
            </p>
          </div>
        </div>

        {/* Bottom Bar Info */}
        <div className="w-full border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <div className="flex items-center gap-2">
            <span>PIZZA LAB // &copy; {currentYear}</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">ALL RIGHTS RESERVED</span>
          </div>
          
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">PRIVACY_PROTOCOL</Link>
            <Link href="#" className="hover:text-white transition-colors">TERMS_OF_SERVICE</Link>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-0 bottom-0 w-32 h-1 bg-gradient-to-r from-neon-green to-transparent"></div>
      <div className="absolute right-0 bottom-0 w-32 h-1 bg-gradient-to-l from-neon-pink to-transparent"></div>
    </footer>
  );
}
