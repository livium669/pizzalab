"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import GlitchTitle from "./GlitchTitle";
import { Check, Plus, RefreshCw, ShoppingCart } from "lucide-react";
import { Pizza } from "@/types/pizza";

interface Ingredient {
  id: string;
  name: string;
  price: number;
  image: string;
  type: "base" | "cheese" | "meat" | "veggie" | "sauce";
  zIndex: number;
}

const INGREDIENTS: Ingredient[] = [
  // Base
  { id: "base", name: "Sourdough Base", price: 10, image: "/assets/ingredients/base.png", type: "base", zIndex: 1 },
  // Sauce
  { id: "sauce-tomato", name: "San Marzano", price: 0, image: "/assets/ingredients/sauce-red.png", type: "sauce", zIndex: 2 },
  { id: "sauce-white", name: "Bianca Base", price: 1, image: "/assets/ingredients/sauce-white.png", type: "sauce", zIndex: 2 },
  // Cheese
  { id: "cheese-moz", name: "Mozzarella", price: 2, image: "/assets/ingredients/cheese.png", type: "cheese", zIndex: 3 },
  // Meat
  { id: "meat-pep", name: "Pepperoni", price: 3, image: "/assets/ingredients/pepperoni.png", type: "meat", zIndex: 4 },
  { id: "meat-saus", name: "Sausage", price: 3, image: "/assets/ingredients/sausage.png", type: "meat", zIndex: 4 },
  // Veggie
  { id: "veg-mush", name: "Mushrooms", price: 2, image: "/assets/ingredients/mushrooms.png", type: "veggie", zIndex: 5 },
  { id: "veg-basil", name: "Fresh Basil", price: 1, image: "/assets/ingredients/basil.png", type: "veggie", zIndex: 6 },
];

export default function PizzaBuilder() {
  const { addToCart } = useCart();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(["base", "sauce-tomato", "cheese-moz"]);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleIngredient = (id: string) => {
    if (id === "base") return; // Cannot remove base
    
    // Logic for mutually exclusive types (like sauces)
    const ingredient = INGREDIENTS.find(i => i.id === id);
    if (ingredient?.type === "sauce") {
      const currentSauce = selectedIngredients.find(i => INGREDIENTS.find(ing => ing.id === i)?.type === "sauce");
      if (currentSauce && currentSauce !== id) {
        setSelectedIngredients(prev => [...prev.filter(i => i !== currentSauce), id]);
        return;
      }
    }

    if (selectedIngredients.includes(id)) {
      setSelectedIngredients(prev => prev.filter(i => i !== id));
    } else {
      setSelectedIngredients(prev => [...prev, id]);
    }
  };

  const calculateTotal = () => {
    return selectedIngredients.reduce((total, id) => {
      const ingredient = INGREDIENTS.find(i => i.id === id);
      return total + (ingredient?.price || 0);
    }, 0);
  };

  const handleAddToCart = () => {
    setIsAnimating(true);
    
    const customPizza: Pizza = {
      id: `custom-${Date.now()}`,
      name: "CHAOS CREATION",
      price: calculateTotal(),
      displayPrice: `$${calculateTotal().toFixed(2)}`,
      ingredients: selectedIngredients.map(id => INGREDIENTS.find(i => i.id === id)?.name || ""),
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80", // Placeholder for custom pizza
      accentColor: "text-neon-pink border-neon-pink shadow-neon-pink",
      category: "VEGGIE" // Default fallback
    };

    addToCart(customPizza);

    setTimeout(() => {
      setIsAnimating(false);
      setSelectedIngredients(["base", "sauce-tomato", "cheese-moz"]); // Reset
    }, 1000);
  };

  return (
    <section id="Builder" className="w-full py-20 bg-zinc-950 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,255,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(20,255,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <GlitchTitle 
            text="CREATE YOUR CHAOS" 
            className="text-5xl md:text-7xl font-marker text-white mb-4"
          />
          <p className="font-mono text-gray-400">ASSEMBLE YOUR ULTIMATE SLICE</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Pizza Preview Area */}
          <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center bg-zinc-900/30 rounded-full border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
               {/* Base Layer - Always visible */}
               <div className="absolute inset-0 transition-all duration-500">
                  <div className="w-full h-full rounded-full bg-[#e6c288] border-8 border-[#d4a764] shadow-xl relative overflow-hidden">
                     {/* Placeholder for ingredients visual representation */}
                     {/* In a real app, these would be stacked transparent PNGs */}
                     
                     {/* Sauce */}
                     {selectedIngredients.includes("sauce-tomato") && (
                        <div className="absolute inset-4 rounded-full bg-red-600 opacity-90 animate-in fade-in zoom-in duration-500"></div>
                     )}
                     {selectedIngredients.includes("sauce-white") && (
                        <div className="absolute inset-4 rounded-full bg-yellow-100 opacity-90 animate-in fade-in zoom-in duration-500"></div>
                     )}

                     {/* Cheese */}
                     {selectedIngredients.includes("cheese-moz") && (
                        <div className="absolute inset-6 rounded-full bg-yellow-50 opacity-80 animate-in fade-in zoom-in duration-500 bg-[url('https://www.transparenttextures.com/patterns/cream-pixels.png')]"></div>
                     )}

                     {/* Toppings Container - Scattered randomly for effect */}
                     {selectedIngredients.map(id => {
                        const ing = INGREDIENTS.find(i => i.id === id);
                        if (!ing || ing.type === "base" || ing.type === "sauce" || ing.type === "cheese") return null;
                        
                        return (
                          <div key={id} className="absolute inset-0 animate-in zoom-in-50 duration-300">
                             {/* Simulating scattered toppings with CSS dots/shapes */}
                             {ing.type === "meat" && (
                                <>
                                  <div className="absolute top-[30%] left-[40%] w-8 h-8 rounded-full bg-red-800 shadow-md"></div>
                                  <div className="absolute top-[60%] left-[20%] w-8 h-8 rounded-full bg-red-800 shadow-md"></div>
                                  <div className="absolute top-[50%] left-[70%] w-8 h-8 rounded-full bg-red-800 shadow-md"></div>
                                  <div className="absolute top-[20%] left-[50%] w-8 h-8 rounded-full bg-red-800 shadow-md"></div>
                                </>
                             )}
                             {ing.type === "veggie" && (
                                <>
                                  <div className="absolute top-[40%] left-[30%] w-6 h-6 bg-green-700 opacity-80 rotate-45"></div>
                                  <div className="absolute top-[70%] left-[60%] w-6 h-6 bg-green-700 opacity-80 rotate-12"></div>
                                  <div className="absolute top-[25%] left-[65%] w-6 h-6 bg-green-700 opacity-80 -rotate-12"></div>
                                </>
                             )}
                          </div>
                        );
                     })}
                  </div>
               </div>
            </div>
          </div>

          {/* Controls Area */}
          <div className="space-y-8">
            <div className="bg-zinc-900 border border-white/10 p-6 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4">
                  <span className="font-mono text-3xl text-neon-green">
                    ${calculateTotal().toFixed(2)}
                  </span>
               </div>
               
               <h3 className="font-oswald text-2xl text-white mb-6">SELECT MODULES</h3>
               
               <div className="space-y-6">
                  {/* Ingredient Categories */}
                  {["sauce", "cheese", "meat", "veggie"].map((type) => (
                    <div key={type} className="space-y-2">
                       <h4 className="font-mono text-xs text-gray-500 uppercase tracking-widest border-b border-white/5 pb-1 mb-2">
                         {type}
                       </h4>
                       <div className="flex flex-wrap gap-3">
                          {INGREDIENTS.filter(i => i.type === type).map(ing => (
                            <button
                              key={ing.id}
                              onClick={() => toggleIngredient(ing.id)}
                              className={`relative px-4 py-2 border font-oswald text-sm tracking-wider transition-all duration-200 flex items-center gap-2 group/btn ${
                                selectedIngredients.includes(ing.id)
                                  ? "bg-neon-green/10 border-neon-green text-neon-green"
                                  : "bg-black/40 border-white/10 text-gray-400 hover:border-white/40 hover:text-white"
                              }`}
                            >
                               {selectedIngredients.includes(ing.id) && <Check size={14} />}
                               {ing.name}
                               <span className="text-[10px] opacity-60 ml-1">+${ing.price}</span>
                            </button>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>

               {/* Action Buttons */}
               <div className="mt-8 pt-6 border-t border-white/10 flex gap-4">
                  <button 
                    onClick={() => setSelectedIngredients(["base", "sauce-tomato", "cheese-moz"])}
                    className="p-3 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                    aria-label="Reset"
                  >
                    <RefreshCw size={20} />
                  </button>
                  <button 
                    onClick={handleAddToCart}
                    disabled={isAnimating}
                    className="flex-1 bg-neon-pink text-white font-oswald text-xl tracking-widest hover:bg-white hover:text-neon-pink transition-all flex items-center justify-center gap-2 group/add relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                       {isAnimating ? "ASSEMBLING..." : "ADD TO STASH"}
                       {!isAnimating && <ShoppingCart size={20} />}
                    </span>
                    {/* Fill animation */}
                    <div className={`absolute inset-0 bg-white transition-transform duration-300 origin-left ${isAnimating ? 'scale-x-100' : 'scale-x-0'}`}></div>
                  </button>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
