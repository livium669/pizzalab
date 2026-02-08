import type { Metadata } from "next";
import { Oswald, Inter, Permanent_Marker } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const marker = Permanent_Marker({
  weight: "400",
  variable: "--font-marker",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PIZZA LAB | Fuel Your Chaos",
  description: "Order the best chaotic pizza in town.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${inter.variable} ${marker.variable} antialiased bg-zinc-950 text-white overflow-x-hidden`}
      >
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
