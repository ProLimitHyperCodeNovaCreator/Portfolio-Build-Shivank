"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function SwipeSection() {
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the swipe-section container
  const projectHeadingRef = useRef(null);
  const lineRef = useRef(null);
  const mainPanelRef = useRef(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !lineRef.current ||
      !projectHeadingRef.current ||
      !mainPanelRef.current
    )
      return;

    gsap.set(lineRef.current, { width: 0 });
    gsap.set(mainPanelRef.current, { x: 0 });
    const container = containerRef.current;

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

    const runAnimations = () => {
      gsap.to(projectHeadingRef.current, {
        x: "110%",
        ease: "power3.inOut",
        duration: 0.6,
        scrollTrigger: {
          trigger: mainPanelRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(lineRef.current, {
        width: "40vw",
        ease: "power3.inOut",
        duration: 0.6,
        scrollTrigger: {
          trigger: mainPanelRef.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
        delay: 0.2,
      });

      ScrollTrigger.refresh();
    };

    // Cleanup function to kill ScrollTrigger instances on component unmount
    requestAnimationFrame(runAnimations);
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
          <div
            ref={mainPanelRef}
            className="description panel flex-shrink-0 flex flex-col items-center justify-center w-screen h-screen bg-black text-white p-8 text-center"
          >
            <div className="text-center px-4 selection:bg-red-400 selection:text-gray-700">
              <div className="relative flex flex-col justify-center items-center overflow-hidden">
                <h2 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4rem] lg:text-[5rem] font-light tracking-wide leading-tight">
                  PROJECTS
                </h2>
                <div
                  ref={projectHeadingRef}
                  className="w-full h-full bg-[#ff0000] absolute top-0 z-[20]"
                ></div>
              </div>
              <div
                ref={lineRef}
                className="w-[80vw] sm:w-[60vw] md:w-[50vw] lg:w-[40vw] h-[0.2rem] bg-red-500 my-6 mx-auto"
              ></div>
            </div>
          </div>

          {/* Panel 2 */}
          <section className="panel light flex-shrink-0 flex items-center justify-center w-screen h-screen bg-red-500 text-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 lg:gap-12 p-4 overflow-y-auto">
              {/* Image */}
              <div className="w-full md:w-[80%] flex justify-center">
                <Image
                  src="/Pimg2.jpeg"
                  alt="Project 2"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-xl w-full md:w-[90vw] h-auto md:h-[70vh] object-cover max-h-[50vh] md:max-h-[70vh]"
                />
              </div>

              {/* Text */}
              <div className="w-full md:w-[50%] space-y-6 text-white selection:bg-gray-800 selection:text-red-400">
                <h2 className="text-[1.5rem] sm:text-[2rem] md:text-[2.2rem] lg:text-[2.5rem] font-bold tracking-wide leading-tight">
                  GNSS Denied RTAB-Map Based Navigation
                </h2>
                <p className="text-base md:text-xl leading-normal tracking-normal mt-4 font-normal">
                  Performed real time mapping and autonomous navigation using
                  RTAB-Map in a GPS denied environment with a PX4 based drone in
                  Gazebo simulation. Integrated a depth camera with correct TF
                  tree generation, synchronized PX4 Gazebo topics via Micro XRCE
                  DDS, and bridged them to ROS. Successfully transitioned this
                  pipeline to hardware, achieving accurate SLAM and navigation
                  in indoor environments using only vision based inputs.
                </p>
                <a
                  href="https://github.com/avianbob/PX4-GPS-Denied-Navigation-RTAB-Mapping.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="group px-6 w-fit py-2 border border-white text-white font-semibold rounded-lg relative overflow-hidden flex items-center justify-center gap-4 transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:cursor-pointer">
                    <span className="transform transition-transform duration-300 ease-in-out group-hover:-translate-x-2">
                      View on GitHub
                    </span>
                    <span className="absolute right-4 opacity-0 group-hover:opacity-100 transform translate-x-6 group-hover:translate-x-1 transition-all duration-300 ease-in-out">
                      →
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </section>

          {/* Panel 3 */}
          <section className="panel flex-shrink-0 flex items-center justify-center w-screen h-screen bg-black text-white">
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 lg:gap-12 p-4 overflow-y-auto">
              <div className="w-full md:w-[80%] flex justify-center">
                <Image
                  src="/Pimg1.jpeg"
                  alt="Project 1"
                  width={1200}
                  height={800}
                  className="rounded-xl shadow-xl w-full md:w-[90vw] h-auto md:h-[70vh] object-cover max-h-[50vh] md:max-h-[70vh]"
                />
              </div>
              <div className="w-full md:w-[50%] space-y-6 text-white selection:bg-red-400 selection:text-gray-700">
                <h2 className="text-[1.5rem] sm:text-[2rem] md:text-[2.2rem] lg:text-[2.5rem] font-bold tracking-wide leading-tight">
                  Autonomous Drone Navigation (IRoC-U 2025)
                </h2>
                <p className="text-base md:text-xl leading-normal tracking-normal mt-4 font-normal">
                  Contributed to the ISRO Robotics Challenge 2025 by
                  implementing autonomous drone navigation and mapping in
                  simulation and hardware. Achieved vertical navigation without
                  GPS using onboard sensors, enabling stable altitude hold and
                  up down motion. Integrated mapping components and tested
                  vision based autonomy in structured environments, laying
                  groundwork for full 3D navigation and control in future
                  stages.
                </p>
                <a
                  href="https://github.com/avianbob/PX4-Autonomous-Mission.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block "
                >
                  <button className="group px-6 w-fit py-2 border border-red-500 text-red-500 font-semibold rounded-lg relative overflow-hidden flex items-center justify-center gap-4 transition-all duration-300 ease-in-out hover:bg-red-500 hover:text-white hover:cursor-pointer">
                    <span className="transform transition-transform duration-300 ease-in-out group-hover:-translate-x-2">
                      View on GitHub
                    </span>
                    <span className="absolute right-4 opacity-0 group-hover:opacity-100 transform translate-x-6 group-hover:translate-x-1 transition-all duration-300 ease-in-out">
                      →
                    </span>
                  </button>
                </a>
              </div>
            </div>
          </section>

          {/* Panel 4 */}
          <section className="panel light flex-shrink-0 flex items-center justify-center w-screen h-screen bg-red-500 text-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 lg:gap-12 p-4 overflow-y-auto">
              <div className="w-full md:w-[80%] flex justify-center ">
                <Image
                  src="/Pimg3.jpeg"
                  alt="Project 3"
                  width={1200}
                  height={800}
                  className="rounded-xl shadow-xl w-full md:w-[90vw] h-auto md:h-[70vh] object-cover max-h-[50vh] md:max-h-[70vh]"
                />
              </div>
              <div className="w-full md:w-[50%] space-y-6 text-white selection:bg-gray-800 selection:text-red-400">
                <h2 className="text-[1.5rem] sm:text-[2rem] md:text-[2.2rem] lg:text-[2.5rem] font-bold tracking-wide leading-tight">
                  Fault Tolerant Control for Motor Failure in Drones
                </h2>
                <p className="text-base md:text-xl leading-normal tracking-normal mt-4 font-normal">
                  Developed a robust fault tolerant control system for
                  quadcopters under single motor failure using PX4. Injected
                  motor failures in discrete, linear, and sinusoidal patterns
                  through deep firmware modifications. A novel angular rate
                  based detection mechanism achieved &lt;0.05s response time.
                  Explored control strategies like SMC, MPC, and Geometric+MARC;
                  implemented geometric control in simulation and partially on
                  hardware for brief durations under failure conditions.
                </p>
                <a
                  href="https://github.com/avianbob/PX4-Fault-Tolerent-Control.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <button className="group px-6 py-2 w-fit border border-white text-white font-semibold rounded-lg relative overflow-hidden flex items-center justify-center gap-3 transition-all duration-300 ease-in-out hover:bg-white hover:text-black hover:cursor-pointer">
                    <span className="transform transition-transform duration-300 ease-in-out group-hover:-translate-x-2">
                      View on GitHub
                    </span>
                    <span className="absolute right-4 opacity-0 group-hover:opacity-100 transform translate-x-6 group-hover:translate-x-1 transition-all duration-300 ease-in-out">
                      →
                    </span>
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
