import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TheLab from "@/components/TheLab";
import VisualMenu from "@/components/VisualMenu";
import PizzaBuilder from "@/components/PizzaBuilder";
import OurStory from "@/components/OurStory";
import SocialProof from "@/components/SocialProof";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";
import Location from "@/components/Location";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-neon-pink selection:text-white">
      <Header />
      <Hero />
      <TheLab />
      <PizzaBuilder />
      <VisualMenu />
      <OurStory />
      <Location />
      <SocialProof />
      <FloatingCTA />
      <Footer />
    </main>
  );
}
