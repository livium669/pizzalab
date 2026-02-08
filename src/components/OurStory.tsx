import Image from "next/image";
import { Users, Flame, BrainCircuit } from "lucide-react";
import GlitchTitle from "./GlitchTitle";

const BLUR_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

export default function OurStory() {
  const team = [
    {
      name: "ALEX 'GLITCH' ROMANO",
      role: "Head Chef / Mad Scientist",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80",
      desc: "Obsessed with hydration percentages and neon aesthetics. He doesn't cook; he compiles flavor.",
      borderColor: "border-neon-green"
    },
    {
      name: "SARAH 'VOID' JENKINS",
      role: "Dough Architect",
      image: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&w=600&q=80",
      desc: "Master of fermentation. She talks to the yeast, and the yeast talks back.",
      borderColor: "border-neon-pink"
    },
    {
      name: "MARCUS 'ZERO' CHEN",
      role: "Flavor Engineer",
      image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?auto=format&fit=crop&w=600&q=80",
      desc: "Sources ingredients from the edge of reality. If it's not atomic, he doesn't want it.",
      borderColor: "border-cyan-400"
    }
  ];

  return (
    <section id="About" className="relative w-full py-24 bg-zinc-950 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-pink opacity-5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-green opacity-5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
           <GlitchTitle 
             text="THE ORIGIN" 
             className="text-5xl md:text-7xl font-marker text-white mb-6"
           />
           <p className="max-w-2xl mx-auto text-xl font-oswald text-gray-400 tracking-wide leading-relaxed">
             We are not a pizzeria. We are a culinary experiment gone right. 
             Born in the static between tradition and futurism.
           </p>
        </div>

        {/* Philosophy & Technique Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
           {/* Philosophy */}
           <div className="relative p-8 border border-white/10 bg-black/50 backdrop-blur-sm group hover:border-neon-green transition-colors duration-300">
              <div className="absolute -top-6 left-8 bg-black px-4 py-2 border border-neon-green shadow-[0_0_10px_#ccff00]">
                 <BrainCircuit className="text-neon-green w-8 h-8" />
              </div>
              <h3 className="text-3xl font-oswald text-white mb-4 mt-4">PHILOSOPHY</h3>
              <p className="text-gray-300 font-sans leading-7">
                Order in Chaos. We believe that the perfect slice exists on the edge of instability. 
                We reject the standard. We embrace the glitch. Every pizza is a unique instance of 
                calculated randomness.
              </p>
           </div>

           {/* Technique */}
           <div className="relative p-8 border border-white/10 bg-black/50 backdrop-blur-sm group hover:border-neon-pink transition-colors duration-300">
              <div className="absolute -top-6 left-8 bg-black px-4 py-2 border border-neon-pink shadow-[0_0_10px_#ff00ff]">
                 <Flame className="text-neon-pink w-8 h-8" />
              </div>
              <h3 className="text-3xl font-oswald text-white mb-4 mt-4">TECHNIQUE</h3>
              <p className="text-gray-300 font-sans leading-7">
                Hand-tossed, Fire-baked, Digitally Enhanced. We use traditional wood-fired ovens 
                modified with thermal sensors to ensure molecular perfection. 48-hour cold fermentation 
                is our non-negotiable protocol.
              </p>
           </div>
        </div>

        {/* The Team */}
        <div className="relative">
           <div className="flex items-center gap-4 mb-12">
              <Users className="text-white w-6 h-6" />
              <h3 className="text-3xl font-oswald text-white uppercase tracking-widest">The Crew</h3>
              <div className="h-px bg-white/20 flex-grow"></div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="group relative">
                   {/* Image Container */}
                   <div className={`relative h-[400px] w-full mb-6 overflow-hidden border-2 ${member.borderColor} filter grayscale group-hover:grayscale-0 transition-all duration-500`}>
                      <Image 
                        src={member.image} 
                        alt={member.name}
                        fill
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL={BLUR_DATA_URL}
                      />
                      {/* Glitch Overlay */}
                      <div className={`absolute inset-0 bg-${member.borderColor.split('-')[1]}-500 mix-blend-overlay opacity-0 group-hover:opacity-40 transition-opacity`}></div>
                   </div>
                   
                   {/* Info */}
                   <h4 className="text-2xl font-oswald text-white mb-1 group-hover:text-neon-green transition-colors">
                     {member.name}
                   </h4>
                   <span className={`text-sm font-mono font-bold mb-3 block ${member.borderColor.replace('border', 'text')}`}>
                     // {member.role}
                   </span>
                   <p className="text-gray-400 text-sm font-sans leading-relaxed">
                     {member.desc}
                   </p>
                </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}
