"use client";

import { useEffect, useState, useRef } from "react";

interface GlitchTitleProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export default function GlitchTitle({ 
  text, 
  className = "", 
  as: Tag = "h2" 
}: GlitchTitleProps) {
  const [isGlitching, setIsGlitching] = useState(false);
  const elementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger glitch when element enters viewport
        if (entry.isIntersecting) {
          setIsGlitching(true);
          
          // Optional: Stop glitching after a duration to make it "settle"
          // Or keep it running while in view? 
          // The user said "when they enter... not just on load". 
          // Let's make it run for a bit then stop, or run intermittently?
          // "Glitch aleatorio" implies randomness.
          
          // Let's keep it simple: Active while in view allows for continuous effect, 
          // but let's make it intense on entry then calm down.
          // For now, let's just toggle the class based on visibility to restart animation.
        } else {
          setIsGlitching(false);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Tag 
      ref={elementRef}
      className={`glitch-text ${isGlitching ? "animate-glitch" : ""} ${className}`} 
      data-text={text}
    >
      {text}
    </Tag>
  );
}
