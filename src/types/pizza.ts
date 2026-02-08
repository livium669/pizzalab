export interface Pizza {
  id: string;
  name: string;
  price: number; // Changed to number for easier calculations
  displayPrice: string; // Formatted string like "$14.00"
  ingredients: string[];
  image: string;
  accentColor: string;
  category: "MEAT" | "VEGGIE" | "SPICY";
  story?: string;
  pairings?: string[];
}

export interface CartItem extends Pizza {
  quantity: number;
}
