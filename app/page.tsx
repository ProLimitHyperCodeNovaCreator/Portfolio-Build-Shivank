"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/preloader";
import "locomotive-scroll/dist/locomotive-scroll.css";
import About from "@/components/about-section";
import Footer from "@/components/footer";
import Experience from "@/components/experiences";
import HeroSection from "@/components/hero-section";
import Projects from "@/components/projects";
import Skills from "@/components/Skills";
import FAB from "@/components/FAB";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(0);
  const scrollSectionBelowHeight = 3 * windowWidth;

  useEffect(() => {
    if (typeof window === "undefined") return;
    setWindowWidth(window.innerWidth);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-black text-white">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!isLoading && (
        <div className="scroll-smooth">
          <FAB />
          <section className="relative min-h-screen w-screen bg-black flex flex-col items-center justify-center selection:bg-red-400 selection:text-gray-700">
            <HeroSection />
          </section>
          <section id="about" className="relative min-h-screen w-screen bg-black flex flex-col items-center justify-center select-none">
            <About/>
          </section>
          <section id="projects" className="relative min-h-screen w-screen bg-black flex flex-col items-center justify-center">
            <Projects />
            <div
              style={{ height: `${scrollSectionBelowHeight}px` }}
              className="bg-gray-900 flex items-center justify-center text-white text-4xl w-full"
            >
              <h2>Scroll down to see the footer!</h2>
            </div>
          </section>
          <section id="experience" className="relative min-h-screen w-screen bg-black flex flex-col items-center justify-center selection:bg-red-400 selection:text-gray-700">
            <Experience />
          </section>
          <section id="skills" className="relative min-h-screen w-screen bg-black flex flex-col items-center justify-center selection:bg-red-400 selection:text-gray-700">
            <Skills />
          </section>
          <section id="footer" className="relative lg:max-h-[60vh] w-screen bg-black flex flex-col items-center justify-center selection:bg-red-400 selection:text-gray-700">
            <Footer/>
          </section>
        </div>
      )}
    </div>
  );
}
