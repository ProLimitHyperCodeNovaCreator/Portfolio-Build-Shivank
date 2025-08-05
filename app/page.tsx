"use client"
import { useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import Preloader from "@/components/preloader"
import "locomotive-scroll/dist/locomotive-scroll.css"
import About from "@/components/about-section"
import Footer from "@/components/footer"
import Projects from "@/components/project-section"
import HeroSection from "@/components/hero-section"
import Highlights from "@/components/highlights"
import Skills from "@/components/Skills"

export default function Page() {
  const [isLoading, setIsLoading] = useState(true)
  const [windowWidth, setWindowWidth] = useState(0)
  const scrollSectionBelowHeight = 4 * windowWidth;

  useEffect(() => {
    if (typeof window === "undefined") return
    setWindowWidth(window.innerWidth)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000);

    return () => clearTimeout(timer)
  }, [isLoading])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait">{isLoading && <Preloader key="preloader" />}</AnimatePresence>
      {!isLoading && (
        <div className="selection:bg-[#ff0000] selection:text-white">
          <section
            className="relative min-h-screen w-screen bg-black flex flex-col items-center justify-center"
          >
            <HeroSection />
            <About />
            <Projects />
            <Highlights />
            <div
                style={{ height: `${scrollSectionBelowHeight}px` }}
                className="bg-gray-900 flex items-center justify-center text-white text-4xl w-full"
              >
                <h2>Scroll down to see the footer!</h2>
              </div>
              <Skills/>
            <Footer /> 
          </section>
        </div>
      )}
    </div>
  )
}
