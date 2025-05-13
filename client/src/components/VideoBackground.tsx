import { useEffect, useRef, useState } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Video source URLs - using stock footage
    const videoSources = [
      "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-at-night-11748-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-network-of-digital-lilac-moving-lines-3310-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-blue-and-red-abstract-forms-floating-in-water-5266-large.mp4"
    ];
    
    // Randomly select a video
    const randomVideo = videoSources[Math.floor(Math.random() * videoSources.length)];
    
    if (videoRef.current) {
      videoRef.current.src = randomVideo;
      
      // Load and play the video
      videoRef.current.load();
      
      videoRef.current.addEventListener('loadeddata', () => {
        setIsReady(true);
        videoRef.current?.play().catch(error => {
          console.error("Video autoplay failed:", error);
          // Add a fallback background in CSS in case video fails to play
          if (videoRef.current) {
            videoRef.current.style.display = 'none';
            const parent = videoRef.current.parentElement;
            if (parent) {
              parent.style.backgroundImage = 'linear-gradient(to right, #4a00e0, #8e2de2)';
            }
          }
        });
      });
    }
    
    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.removeEventListener('loadeddata', () => {});
      }
    };
  }, []);

  return (
    <video 
      ref={videoRef}
      muted 
      loop 
      playsInline
      className={`transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden="true"
    >
      {/* Video source is set programmatically */}
    </video>
  );
}
