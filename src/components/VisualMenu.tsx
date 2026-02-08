"use client";

import Image from "next/image";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import GlitchTitle from "./GlitchTitle";
import { pizzas } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { Pizza } from "@/types/pizza";
import PizzaDetailModal from "./PizzaDetailModal";

const BLUR_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

export default function VisualMenu() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "MEAT" | "VEGGIE" | "SPICY">("ALL");
  const [addedItems, setAddedItems] = useState<string[]>([]);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const { addToCart } = useCart();

  const filteredPizzas = activeCategory === "ALL" 
    ? pizzas 
    : pizzas.filter(pizza => pizza.category === activeCategory);

  const handleAddToCart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent card click
    
    const pizza = pizzas.find(p => p.id === id);
    if (pizza) {
      addToCart(pizza);
    }
    
    // Local animation state
    setAddedItems(prev => [...prev, id]);
    setTimeout(() => {
      setAddedItems(prev => prev.filter(item => item !== id));
    }, 1000);
  };

  return (
    <section id="VisualMenu" className="w-full py-20 bg-zinc-950 relative">
       {/* Section Title */}
       <div className="container mx-auto px-4 mb-12 text-center">
        <GlitchTitle 
          text="VISUAL FEED" 
          className="text-5xl md:text-7xl font-marker text-white mb-4"
        />
        <div className="w-24 h-1 bg-neon-pink mx-auto mb-12"></div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {["ALL", "MEAT", "VEGGIE", "SPICY"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-6 py-2 border font-oswald text-lg tracking-wider transition-all duration-300 ${
                activeCategory === cat 
                  ? "bg-white text-black border-white" 
                  : "bg-transparent text-gray-400 border-gray-700 hover:border-white hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredPizzas.map((pizza) => (
            <div 
              key={pizza.id} 
              role="button"
              tabIndex={0}
              onClick={() => setSelectedPizza(pizza)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPizza(pizza);
                }
              }}
              className="group relative h-[400px] w-full overflow-hidden clip-card cursor-pointer bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-neon-green focus:ring-offset-4 focus:ring-offset-black"
            >
              {/* Image */}
              <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110">
                <Image
                  src={pizza.image}
                  alt={pizza.name}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-40 transition-opacity duration-500"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>

              {/* ID Badge */}
              <div className={`absolute top-0 right-0 p-4 font-mono text-xl font-bold bg-black/50 backdrop-blur-md ${pizza.accentColor.split(' ')[0]}`}>
                #{pizza.id}
              </div>

              {/* Quick Add Button */}
              <button 
                onClick={(e) => handleAddToCart(e, pizza.id)}
                className={`absolute top-4 left-4 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm text-white hover:bg-white hover:text-black transition-all duration-300 z-20 ${addedItems.includes(pizza.id) ? 'bg-neon-green text-black border-neon-green' : ''}`}
              >
                {addedItems.includes(pizza.id) ? <Check size={20} /> : <Plus size={20} />}
              </button>

              {/* Content Container - Always visible name/price, ingredients show on hover */}
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                
                {/* Header Info */}
                <div className="flex justify-between items-end border-b border-white/20 pb-4 mb-4 group-hover:border-white/50 transition-colors">
                  <h3 className={`text-4xl font-oswald uppercase text-white drop-shadow-lg`}>
                    {pizza.name}
                  </h3>
                  <span className={`text-2xl font-mono ${pizza.accentColor.split(' ')[0]}`}>
                    {pizza.displayPrice}
                  </span>
                </div>

                {/* Hidden Ingredients List */}
                <div className="h-0 group-hover:h-auto group-focus:h-auto overflow-hidden transition-all duration-500 delay-100 opacity-0 group-hover:opacity-100 group-focus:opacity-100">
                  <ul className="flex flex-wrap gap-2 pb-2">
                    {pizza.ingredients.map((ing, i) => (
                      <li key={i} className="text-sm font-mono text-gray-200 bg-white/10 px-2 py-1 rounded">
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPizza && (
        <PizzaDetailModal 
          pizza={selectedPizza} 
          onClose={() => setSelectedPizza(null)} 
        />
      )}
    </section>
  );
}