import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import VideoBackground from "./VideoBackground";

export default function HeroSection() {
  const scrollRef = useRef<HTMLAnchorElement>(null);
  
  // Subtle animation for scroll indicator
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.classList.add("animate-bounce-subtle");
        setTimeout(() => {
          if (scrollRef.current) {
            scrollRef.current.classList.remove("animate-bounce-subtle");
          }
        }, 2000);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section id="home" className="video-container">
      <div className="overlay"></div>
      <VideoBackground />
      
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 animate-fade-in">
          Creative <span className="text-primary">Digital</span> Solutions
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8 animate-slide-up opacity-90">
          Building innovative apps and digital experiences that bring your ideas to life
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-up delay-100">
          <a 
            href="#portfolio" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            View Portfolio
          </a>
          <a 
            href="#app-store" 
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            Explore App Store
          </a>
        </div>
        
        <div className="absolute bottom-10">
          <a 
            ref={scrollRef}
            href="#portfolio" 
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Scroll down to portfolio section"
          >
            <ChevronDown className="h-8 w-8" />
          </a>
        </div>
      </div>
    </section>
  );
}
