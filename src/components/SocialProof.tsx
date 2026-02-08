import Image from "next/image";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";

const BLUR_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

const socialPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?auto=format&fit=crop&w=600&q=80",
    likes: "2.4k",
    comments: "142",
    caption: "Gravity is optional when the flavor is this heavy. #PizzaLab",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
    likes: "1.8k",
    comments: "98",
    caption: "Neon lights and cheese bites. The perfect Friday night setup. 🍕⚡",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
    likes: "3.2k",
    comments: "256",
    caption: "Warning: May cause extreme addiction. Proceed with caution.",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
    likes: "4.1k",
    comments: "312",
    caption: "Pepperoni distribution algorithm: 100% chaos, 100% flavor.",
  },
];

export default function SocialProof() {
  return (
    <section className="w-full py-20 bg-black relative overflow-hidden">
      {/* Background Glitch Elements */}
      <div className="absolute top-10 left-0 w-full h-1 bg-neon-green opacity-20 transform -skew-x-12"></div>
      <div className="absolute bottom-10 right-0 w-full h-1 bg-neon-pink opacity-20 transform skew-x-12"></div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-marker text-white mb-2">
              <span className="text-neon-pink">#</span>PIZZALAB
            </h2>
            <p className="font-oswald text-gray-400 tracking-widest uppercase">
              Join the chaos on Instagram
            </p>
          </div>
          
          <a 
            href="#" 
            className="mt-6 md:mt-0 flex items-center gap-2 px-6 py-3 border border-white text-white font-oswald hover:bg-white hover:text-black transition-all group"
          >
            <Instagram size={20} />
            FOLLOW US
            <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Feed Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {socialPosts.map((post) => (
            <div 
              key={post.id} 
              className="relative group aspect-square overflow-hidden bg-zinc-900 cursor-pointer border border-transparent hover:border-neon-green transition-colors"
            >
              <Image
                src={post.image}
                alt={post.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                <div className="flex gap-6 mb-4 text-neon-green">
                  <div className="flex items-center gap-2">
                    <Heart size={20} className="fill-neon-green" />
                    <span className="font-mono font-bold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={20} />
                    <span className="font-mono font-bold">{post.comments}</span>
                  </div>
                </div>
                <p className="font-sans text-xs text-gray-300 line-clamp-3">
                  {post.caption}
                </p>
              </div>

              {/* Glitch Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
