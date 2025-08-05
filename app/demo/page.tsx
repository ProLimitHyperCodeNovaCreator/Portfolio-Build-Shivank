"use client"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { AnimatePresence } from "framer-motion"
import Preloader from "@/components/preloader"
import "locomotive-scroll/dist/locomotive-scroll.css"
import About from "@/components/about-section"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Footer from "@/components/footer"
import Projects from "@/components/project-section"
import HeroSection from "@/components/hero-section"
import Highlights from "@/components/highlights"

gsap.registerPlugin(ScrollTrigger)

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [locomotiveReady, setLocomotiveReady] = useState(false)
  const scrollRef = useRef(null)
  const locomotiveScrollRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    const initScroll = async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default

        locomotiveScrollRef.current = new LocomotiveScroll({
          el: scrollRef.current!,
          smooth: true,
          lerp: 0.1,
          smartphone: { smooth: true },
          tablet: { smooth: true },
          // Add some additional options for better performance
          class: 'is-revealed',
          scrollFromAnywhere: true,
        })

        // Register scroll with ScrollTrigger
        ScrollTrigger.scrollerProxy(scrollRef.current!, {
          scrollTop(value) {
            return arguments.length
              ? locomotiveScrollRef.current.scrollTo(value, { duration: 0, disableLerp: true })
              : locomotiveScrollRef.current.scroll.instance.scroll.y
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            }
          },
          pinType: scrollRef.current!.style.transform ? "transform" : "fixed",
        })

        // Keep ScrollTrigger in sync with Locomotive Scroll
        locomotiveScrollRef.current.on("scroll", ScrollTrigger.update)

        // Important: Refresh after locomotive scroll is fully initialized
        locomotiveScrollRef.current.on("call", () => {
          // This gets called when locomotive scroll is ready
          setLocomotiveReady(true)
        })

        // Force refresh after initialization
        setTimeout(() => {
          ScrollTrigger.refresh()
          setLocomotiveReady(true)
          console.log("Locomotive Scroll and ScrollTrigger initialized")
        }, 500)

        // Handle window resize
        const handleResize = () => {
          setTimeout(() => {
            if (locomotiveScrollRef.current) {
              locomotiveScrollRef.current.update()
            }
            ScrollTrigger.refresh()
          }, 150)
        }

        window.addEventListener('resize', handleResize)

        return () => {
          window.removeEventListener('resize', handleResize)
          if (locomotiveScrollRef.current) {
            locomotiveScrollRef.current.destroy()
            locomotiveScrollRef.current = null
          }
        }
      } catch (error) {
        console.error("Error initializing Locomotive Scroll:", error)
        setLocomotiveReady(true) // Set to true anyway to prevent infinite loading
      }
    }

    if (!isLoading) {
      initScroll()
    }

    return () => {
      clearTimeout(timer)
    }
  }, [isLoading])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy()
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>
      
      {!isLoading && (
        <div 
          data-scroll-container 
          ref={scrollRef} 
          className="selection:bg-red-500 selection:text-white"
          style={{ opacity: locomotiveReady ? 1 : 0, transition: 'opacity 0.3s ease' }}
        >
          <section
            data-scroll-section
            className="relative min-h-screen w-screen bg-black flex flex-col items-center justify-center"
          >
            <HeroSection />
          </section>

          <section
            data-scroll-section
            className="relative min-h-screen w-screen bg-black flex flex-col items-center justify-center"
          >
            <About />
          </section>

          <section
            data-scroll-section
            className="relative min-h-screen w-screen bg-black flex flex-col items-center justify-center"
          >
            <Projects />
          </section>

          {/* Highlights component with its own scroll section */}
          <Highlights />

          <section
            data-scroll-section
            className="relative min-h-screen w-screen bg-black flex flex-col items-center justify-center"
          >
            <Footer />
          </section>
        </div>
      )}
    </div>
  )
}