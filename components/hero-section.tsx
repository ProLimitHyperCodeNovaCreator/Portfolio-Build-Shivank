"use client"

import { useEffect, useState } from "react"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="container mx-auto px-6 py-12 h-screen flex flex-col justify-between">
        {/* Top Section */}
        <div className="flex justify-center pt-8">
          <div
            className={`transform transition-all duration-1000 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h2 className="text-xl font-light tracking-[0.3em] text-white/90">HELLO, I&apos;M</h2>
          </div>
        </div>

        {/* Main Title */}
        <div className="flex-1 flex items-center justify-center min-h-0">
          <div className="text-center w-full flex justify-center">
            <h1
              className={`font-black leading-none text-red-500 transform transition-all duration-1200 ease-out whitespace-nowrap ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-16 opacity-0"
              }`}
              style={{
                transitionDelay: "400ms",
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: "-0.08em",
                height: "40vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(10rem, 22vw, 28rem)",
                width: "100%",
              }}
            >
              SHIVANK
            </h1>

          </div>
        </div>

        {/* Text Labels */}
        <div className="flex justify-center items-center mb-8">
          <div
            className={`transform transition-all duration-1000 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "1000ms" }}
          >
            <span className="text-xl font-light tracking-[0.2em] text-white/90">ROBOTICS & SIMULATION ENGINEER</span>
          </div>
        </div>

      </div>
      {/* Bottom Section */}
        <div className="my-15 flex justify-center">
            <div className="w-[90vw] h-[0.1rem] bg-[#fff]"></div>
        </div>
    </div>
  )
}
