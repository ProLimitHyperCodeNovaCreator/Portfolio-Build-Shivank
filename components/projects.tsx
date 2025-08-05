"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function SwipeSection() {
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the swipe-section container

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const panelsContainer = container.querySelector(".panels-container");
    if (!panelsContainer) return;

    const panels = gsap.utils.toArray<HTMLElement>(".panel", panelsContainer);
    const numPanels = panels.length;

    // Calculate the total width of all panels combined.
    // Each panel is designed to be viewport width (w-screen).
    // The animation needs to move the container by (totalPanelsWidth - one viewport width)
    // to reveal all panels.
    const totalPanelsWidth = numPanels * window.innerWidth;
    const scrollDistance = totalPanelsWidth - window.innerWidth;

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
    });

    // Cleanup function to kill ScrollTrigger instances on component unmount
    return () => {
      mainScrollTrigger.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="swipe-section relative h-screen w-full overflow-hidden"
      >
        <div className="panels-container flex h-full">
          {/* Panel 1: Description */}
          <div className="description panel flex-shrink-0 flex flex-col items-center justify-center w-screen h-screen bg-black text-white p-8 text-center">
            <div>
              <h1 className="text-[5rem] font-light tracking-wide">PROJECTS</h1>
              <div
          className="w-[40vw] h-[0.2rem] bg-[#ff0000] my-6"
        ></div>
            </div>
          </div>

          {/* Panel 2 */}
          <section className="panel light flex-shrink-0 flex items-center justify-center w-screen h-screen bg-[#ff0000] text-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1200px] gap-12 px-8">
              {/* Image */}
              <div className="w-full md:w-1/2 flex justify-center">
                <Image
                  src="/Pimg2.jpeg"
                  alt="Project 2"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-xl w-[500px] md:w-[600px] object-cover"
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-1/2 space-y-6 text-white">
                <h2 className="text-5xl font-bold tracking-wide">
                  GNSS Denied Navigation
                </h2>
                <p className="text-base md:text-xl leading-relaxed tracking-wide mt-4">
                  This experience involved working on high-impact projects using
                  modern technologies. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Voluptates voluptatum nostrum, eveniet quas
                  perspiciatis repellendus. Et fugit dignissimos quisquam natus
                  corrupti, esse ut perferendis incidunt porro nostrum
                  reprehenderit ratione necessitatibus.
                </p>
                <a
                  href="https://github.com/avianbob/PX4-GPS-Denied-Navigation-RTAB-Mapping.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="mt-4 px-6 py-2 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition duration-300">
                    View on GitHub
                  </button>
                </a>
              </div>
            </div>
          </section>

          {/* Panel 3 */}
          <section className="panel flex-shrink-0 flex items-center justify-center w-screen h-screen bg-black text-white">
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1200px] gap-12 px-8">
              <div className="w-full md:w-1/2 flex justify-center">
                <Image
                  src="/Pimg1.jpeg"
                  alt="Project 1"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-xl w-[500px] md:w-[600px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6 text-white">
                <h2 className="text-5xl font-bold tracking-wide">
                  Autonomous Mapping and Navigation
                </h2>
                <p className="text-base md:text-xl leading-relaxed tracking-wide mt-4">
                  This experience involved working on high-impact projects using
                  modern technologies. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Voluptates voluptatum nostrum, eveniet quas
                  perspiciatis repellendus. Et fugit dignissimos quisquam natus
                  corrupti, esse ut perferendis incidunt porro nostrum
                  reprehenderit ratione necessitatibus.
                </p>
                <a
                  href="https://github.com/avianbob/PX4-Autonomous-Mission.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block "
                >
                  <button className="mt-4 px-6 py-2 bg-black text-red-600 font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300 border border-red-600 hover:text-white cursor-pointer">
                    View on GitHub
                  </button>
                </a>
              </div>
            </div>
          </section>

          {/* Panel 4 */}
          <section className="panel light flex-shrink-0 flex items-center justify-center w-screen h-screen bg-[#ff0000] text-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1200px] gap-12 px-8">
              <div className="w-full md:w-1/2 flex justify-center">
                <Image
                  src="/Pimg3.jpeg"
                  alt="Project 3"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-xl w-[500px] md:w-[600px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6 text-white">
                <h2 className="text-5xl font-bold tracking-wide">
                  Fault Tolerant Control Systems
                </h2>
                <p className="text-base md:text-xl leading-relaxed tracking-wide mt-4">
                  This experience involved working on high-impact projects using
                  modern technologies. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Voluptates voluptatum nostrum, eveniet quas
                  perspiciatis repellendus. Et fugit dignissimos quisquam natus
                  corrupti, esse ut perferendis incidunt porro nostrum
                  reprehenderit ratione necessitatibus.
                </p>
                <a
                  href="https://github.com/avianbob/PX4-Fault-Tolerent-Control.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="mt-4 px-6 py-2 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition duration-300">
                    View on GitHub
                  </button>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
