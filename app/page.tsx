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
        <div className="selection:bg-[#ff0000] selection:text-white">
          <a href="/pdfs/resume_aditya.pdf" target="_blank">
            <button className="fixed top-6 right-6 z-50 group flex items-center overflow-hidden rounded-full border-2 border-red-600 px-6 py-3 text-sm font-semibold text-red-600 hover:text-white transition-colors duration-300 cursor-pointer">
              {/* Background fill on hover */}
              <span className="absolute inset-0 z-0 bg-red-600 transition-all duration-500 transform scale-x-0 origin-left group-hover:scale-x-100"></span>

              {/* Launch Text */}
              <span className="relative z-10 transition-all duration-500">
                Resumé
              </span>

              {/* Arrow wrapper that slides in */}
              <span className="relative z-10 ml-0 w-0 overflow-hidden group-hover:ml-2 group-hover:w-5 transition-all duration-500 ease-in-out">
                <svg
                  className="h-5 w-5 text-red-600 group-hover:text-white transition-colors duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </span>
            </button>
          </a>

          {/* Content section */}
          <section className="relative min-h-screen w-screen bg-black flex flex-col items-center justify-center">
            <HeroSection />
            <About />
            <Projects />
            <div
              style={{ height: `${scrollSectionBelowHeight}px` }}
              className="bg-gray-900 flex items-center justify-center text-white text-4xl w-full"
            >
              <h2>Scroll down to see the footer!</h2>
            </div>
            <Experience />
            <Skills />
            <Footer />
          </section>
        </div>
      )}
    </div>
  );
}
