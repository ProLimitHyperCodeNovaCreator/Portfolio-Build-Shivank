"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function SwipeSection() {
  const containerRef = useRef<HTMLDivElement>(null) // Ref for the swipe-section container

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const panelsContainer = container.querySelector(".panels-container")
    if (!panelsContainer) return

    const panels = gsap.utils.toArray<HTMLElement>(".panel", panelsContainer)
    const numPanels = panels.length

    // Calculate the total width of all panels combined.
    // Each panel is designed to be viewport width (w-screen).
    // The animation needs to move the container by (totalPanelsWidth - one viewport width)
    // to reveal all panels.
    const totalPanelsWidth = numPanels * window.innerWidth
    const scrollDistance = totalPanelsWidth - window.innerWidth

    // Create the ScrollTrigger instance
    const mainScrollTrigger = ScrollTrigger.create({
      trigger: container,
      pin: true, // Pin the .swipe-section when it hits the start point
      start: "top top", // Pin when the top of the section hits the top of the viewport
      end: () => `+=${scrollDistance}`, // End the pin after scrolling the equivalent distance needed for horizontal scroll
      scrub: 1, // Smoothly link scroll position to the animation progress
      animation: gsap.to(panelsContainer, {
        x: () => -scrollDistance, // Move the panels container left by the calculated distance
        ease: "none", // Linear animation for smooth scrubbing
      }),
      // Optional: Add callbacks for debugging or specific side effects
      // onUpdate: self => console.log("progress:", self.progress.toFixed(3), "direction:", self.direction)
    })

    // Cleanup function to kill ScrollTrigger instances on component unmount
    return () => {
      mainScrollTrigger.kill()
    }
  }, [])

  return (
    <>

      <div ref={containerRef} className="swipe-section relative h-screen w-full overflow-hidden">
        <div className="panels-container flex h-full">
          {/* Panel 1: Description */}
          <div className="description panel flex-shrink-0 flex flex-col items-center justify-center w-screen h-screen bg-gray-800 text-white p-8 text-center">
            <div>
              <h1 className="text-5xl font-bold">ScrollTrigger Horizontal Sections</h1>
              <p className="mt-4 text-xl">Scroll down to experience the horizontal scroll.</p>
              <div className="scroll-down flex flex-col items-center mt-8 text-base">
                Scroll down
                <div className="arrow w-0 h-0 border-l-8 border-r-8 border-t-16 border-solid border-l-transparent border-r-transparent border-t-white mt-2"></div>
              </div>
            </div>
          </div>

          {/* Panel 2 */}
          <section className="panel light flex-shrink-0 flex items-center justify-center w-screen h-screen bg-gray-200 text-gray-800 text-5xl font-bold">
            <h2 className="panel__number text-9xl">2</h2>
          </section>

          {/* Panel 3 */}
          <section className="panel flex-shrink-0 flex items-center justify-center w-screen h-screen bg-gray-700 text-white text-5xl font-bold">
            <h2 className="panel__number text-9xl">3</h2>
          </section>

          {/* Panel 4 */}
          <section className="panel light flex-shrink-0 flex items-center justify-center w-screen h-screen bg-gray-200 text-gray-800 text-5xl font-bold">
            <h2 className="panel__number text-9xl">4</h2>
          </section>

          {/* Panel 5: Last Panel with vertical scrollable content */}
          <section className="panel plain flex-shrink-0 flex flex-col items-start justify-start w-screen h-screen bg-gray-800 text-white p-8 text-left overflow-y-auto">
            <h2 className="text-5xl font-bold mb-4">This is the last panel.</h2>
            <p className="text-lg">You can scroll vertically within this panel if its content overflows.</p>
            <p className="text-lg mt-2">Scroll down further to unpin and continue normal vertical page scroll.</p>
            {/* Example of content that makes this panel vertically scrollable */}
            <div className="h-[150vh] w-full bg-red-500 mt-4 flex items-center justify-center text-white text-2xl">
              <p>More content here to enable vertical scroll within this panel.</p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
