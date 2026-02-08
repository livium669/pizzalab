import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import GlitchTitle from "./GlitchTitle";

export default function Location() {
  return (
    <section id="Location" className="relative w-full py-24 bg-zinc-950 overflow-hidden border-t border-zinc-900">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          
          {/* Info Side */}
          <div className="lg:w-1/3 flex flex-col justify-center space-y-12">
            <div>
              <GlitchTitle 
                text="BASE" 
                className="text-5xl font-marker text-white mb-2"
              />
              <p className="text-neon-pink font-mono tracking-widest text-lg">
                // COORDINATES
              </p>
            </div>

            <div className="space-y-8">
              {/* Address */}
              <div className="group">
                <div className="flex items-start gap-4 mb-2">
                  <div className="p-3 bg-zinc-900 border border-zinc-800 group-hover:border-neon-green transition-colors">
                    <MapPin className="text-neon-green w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-oswald text-white mb-1">LOCATION</h3>
                    <p className="text-gray-400 font-sans">
                      123 Neon Street<br />
                      Cyber City, CC 2077
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="group">
                <div className="flex items-start gap-4 mb-2">
                  <div className="p-3 bg-zinc-900 border border-zinc-800 group-hover:border-neon-pink transition-colors">
                    <Clock className="text-neon-pink w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-oswald text-white mb-1">OPERATIONS</h3>
                    <ul className="text-gray-400 font-mono text-sm space-y-1">
                      <li className="flex justify-between w-48">
                        <span>MON - THU</span>
                        <span className="text-white">18:00 - 23:00</span>
                      </li>
                      <li className="flex justify-between w-48">
                        <span>FRI - SAT</span>
                        <span className="text-white">18:00 - 02:00</span>
                      </li>
                      <li className="flex justify-between w-48">
                        <span>SUN</span>
                        <span className="text-white">18:00 - 00:00</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-zinc-900 border border-zinc-800 group-hover:border-cyan-400 transition-colors">
                    <Phone className="text-cyan-400 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-oswald text-white mb-1">CONTACT</h3>
                    <p className="text-gray-400 font-sans">
                      +1 (555) 019-2077<br />
                      base@pizzalab.dev
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="lg:w-2/3 min-h-[400px] relative group">
            <div className="absolute inset-0 bg-zinc-900 border-2 border-zinc-800 group-hover:border-neon-green/50 transition-all duration-500 overflow-hidden clip-card">
              {/* Map Iframe with Filters for Dark Mode Look */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1841261555023!2d-73.9877312845941!3d40.74844097932847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1623166666666!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }} 
                allowFullScreen={true} 
                loading="lazy"
                className="opacity-70 group-hover:opacity-100 transition-opacity duration-500"
              ></iframe>
              
              {/* Custom Pin Overlay */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="relative">
                  <div className="w-4 h-4 bg-neon-green rounded-full animate-ping absolute inset-0"></div>
                  <div className="w-4 h-4 bg-neon-green rounded-full relative z-10 shadow-[0_0_20px_#ccff00]"></div>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 bg-black/90 text-neon-green px-3 py-1 text-xs font-mono border border-neon-green whitespace-nowrap">
                    BASE_HQ
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-b from-neon-green to-transparent"></div>
                </div>
              </div>

              {/* Overlay Decor */}
              <div className="absolute top-4 right-4 bg-black/80 backdrop-blur border border-neon-green px-4 py-2 flex items-center gap-2 pointer-events-none">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-xs font-mono text-neon-green">LIVE_FEED</span>
              </div>
              
              <div className="absolute bottom-4 left-4 font-mono text-xs text-gray-500">
                LAT: 40.7484° N | LNG: 73.9857° W
              </div>
            </div>
            
            {/* Get Directions Button Overlay */}
            <div className="absolute bottom-8 right-8">
              <button className="bg-neon-pink text-black font-oswald font-bold py-3 px-6 hover:bg-white hover:scale-105 transition-all flex items-center gap-2 clip-button shadow-[0_0_20px_rgba(255,0,255,0.3)]">
                <Navigation className="w-4 h-4" />
                GET DIRECTIONS
              </button>
            </div>
            
            {/* Corner Accents */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-neon-pink pointer-events-none"></div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-neon-green pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
}