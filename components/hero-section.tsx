"use client";

import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white ">
      <div className="container mx-auto px-4 py-12 h-screen flex flex-col justify-center">
        {/* Top Section */}
        <div className="flex justify-center pt-8">
          <div
            className={`transform transition-all duration-1000 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h2 className="text-base sm:text-lg md:text-2xl font-light tracking-[0.3em] text-white/90">
              HELLO, I&apos;M
            </h2>
          </div>
        </div>

        {/* Main Title */}
        <div className="flex-1 flex items-center justify-center min-h-0 max-h-fit ">
          <div className="text-center w-full flex justify-center items-center">
            <h1
              className={`font-black leading-relaxed text-red-500 transform transition-all duration-1200 ease-out whitespace-nowrap ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-16 opacity-0"
              }`}
              style={{
                transitionDelay: "400ms",
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: "-0.08em",
                fontSize: "clamp(5rem, 22vw, 28rem)", // Adjusted minimum for mobile
                lineHeight: "auto",
              }}
            >
              LENDI
            </h1>
          </div>
        </div>

        {/* Text Labels */}
        <div className="flex justify-center items-center mb-8 text-center px-2">
          <div
            className={`transform transition-all duration-1000 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "1000ms" }}
          >
            <span className="text-sm sm:text-base md:text-2xl font-light tracking-[0.2em] text-white/90">
              ROBOTICS & SIMULATION ENGINEER
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-center mb-10">
        <div className="w-[90vw] h-px bg-white"></div>
      </div>
    </div>
  );
}
