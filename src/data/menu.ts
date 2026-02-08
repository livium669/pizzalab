import { Pizza } from "@/types/pizza";

export const pizzas: Pizza[] = [
  {
    id: "01",
    name: "CYBER CHEESE",
    price: 14.00,
    displayPrice: "$14.00",
    ingredients: ["San Marzano Tomato", "Fior di Latte", "Basil", "EVOO", "Parmigiano"],
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    accentColor: "text-neon-green border-neon-green shadow-neon-green",
    category: "VEGGIE",
    story: "Born from the data streams of Sector 7, where dairy synthesis algorithms achieved consciousness. This isn't just cheese; it's a sentient layer of flavor that hacks your taste buds with pure savory data.",
    pairings: ["Neon Soda", "Digital Lager"]
  },
  {
    id: "02",
    name: "PEPPERONI GLITCH",
    price: 16.00,
    displayPrice: "$16.00",
    ingredients: ["Spicy Salami", "Hot Honey", "Mozzarella", "Chili Flakes"],
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80",
    accentColor: "text-neon-pink border-neon-pink shadow-neon-pink",
    category: "SPICY",
    story: "A coding error in the meat synthesizer resulted in these spicy discs of chaos. The 'glitch' refers to the unpredictable heat spikes caused by the Hot Honey algorithm overflow.",
    pairings: ["Liquid Nitrogen Stout", "Spicy Firewall Shot"]
  },
  {
    id: "03",
    name: "VOID VEGGIE",
    price: 15.50,
    displayPrice: "$15.50",
    ingredients: ["Roasted Peppers", "Mushrooms", "Onions", "Black Olives", "Vegan Cheese"],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    accentColor: "text-cyan-400 border-cyan-400 shadow-cyan-400",
    category: "VEGGIE",
    story: "Harvested from the hydroponic gardens of the Deep Web, untouched by sunlight. These vegetables grew in the absolute darkness of the Void, developing a bioluminescent flavor profile.",
    pairings: ["Green Data Smoothie", "Null Water"]
  },
  {
    id: "04",
    name: "MEAT MATRIX",
    price: 18.00,
    displayPrice: "$18.00",
    ingredients: ["Prosciutto", "Sausage", "Bacon", "BBQ Glaze", "Smoked Gouda"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    accentColor: "text-yellow-400 border-yellow-400 shadow-yellow-400",
    category: "MEAT",
    story: "A dense compilation of protein protocols designed for maximum caloric efficiency. Uploaded directly to your stomach, this pizza is the ultimate patch for hunger.",
    pairings: ["Heavy Metal Red Wine", "Industrial Porter"]
  },
];
