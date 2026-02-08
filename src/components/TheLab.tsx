import { Timer, Droplets, Atom } from "lucide-react";
import GlitchTitle from "./GlitchTitle";

export default function TheLab() {
  const steps = [
    {
      id: "001",
      title: "48H FERMENTATION",
      description: "Time is our catalyst. We let the dough evolve for 48 hours to unlock complex flavors and digestibility. Patience is the only shortcut we refuse to take.",
      icon: <Timer className="w-8 h-8 text-neon-green" />,
      color: "border-neon-green",
      shadow: "shadow-[0_0_20px_#ccff0030]",
    },
    {
      id: "002",
      title: "HYDRO-DYNAMICS",
      description: "80% Hydration. High water content creates the perfect void structure. Airy, light, yet crispy. It's not just dough; it's a cloud held together by gluten.",
      icon: <Droplets className="w-8 h-8 text-neon-pink" />,
      color: "border-neon-pink",
      shadow: "shadow-[0_0_20px_#ff00ff30]",
    },
    {
      id: "003",
      title: "ATOMIC INGREDIENTS",
      description: "Sourced from the best molecular structures. San Marzano tomatoes and DOP mozzarella. We break down the best elements to build the ultimate chaos.",
      icon: <Atom className="w-8 h-8 text-cyan-400" />,
      color: "border-cyan-400",
      shadow: "shadow-[0_0_20px_#22d3ee30]",
    },
  ];

  return (
    <section className="relative w-full py-20 bg-zinc-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center relative">
          <GlitchTitle 
            text="THE LAB" 
            className="text-6xl md:text-8xl font-marker text-white mb-4"
          />
          <p className="font-oswald text-xl text-gray-400 tracking-widest uppercase">
            // The Science Behind The Slice
          </p>
          
          {/* Decorative lines */}
          <div className="absolute top-1/2 left-0 w-[10%] h-px bg-white/20 hidden md:block"></div>
          <div className="absolute top-1/2 right-0 w-[10%] h-px bg-white/20 hidden md:block"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`relative group bg-zinc-900 p-1 ${step.color} clip-card transition-transform hover:-translate-y-2 duration-300`}
            >
              {/* Inner Card */}
              <div className={`h-full bg-zinc-950 p-8 clip-card flex flex-col items-start gap-4 border-l-4 ${step.color.replace('border', 'border-l')} ${step.shadow}`}>
                
                {/* Header */}
                <div className="w-full flex justify-between items-start border-b border-white/10 pb-4 mb-2">
                   <span className="font-mono text-xs text-gray-400">SUBJECT_{step.id}</span>
                   {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-oswald text-white italic">
                  {step.title}
                </h3>
                <p className="text-gray-300 font-sans text-sm leading-relaxed">
                  {step.description}
                </p>

                {/* Footer Decor */}
                <div className="mt-auto w-full flex justify-end">
                   <div className={`w-8 h-1 ${step.color.replace('border', 'bg')}`}></div>
                </div>
                
                {/* Hover Effect Glitch Overlay */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
