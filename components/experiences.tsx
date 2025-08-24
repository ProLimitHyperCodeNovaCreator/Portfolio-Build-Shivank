"use client";
import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    name: "TECHEAGLE",
    image: "/Exp3.jpeg",
    description:
      "Developed GPS free drone navigation using visual SLAM, OpenVINS, and real hardware integration. Covered simulation to deployment, focusing on sensor fusion and autonomous flight systems.",
  },
  {
    name: "Indian Robotics Solution",
    image: "/Exp2.jpeg",
    description:
      "Secured drone GPS via UART/CAN protocol work and firmware tweaks. Customized QGroundControl, enhancing drone communication and embedded security.",
  },
  {
    name: "Cloudologix",
    image: "/Exp1.png",
    description:
      "Built Cloudoberry to unify Azure services like VMs, Kubernetes, SQL, App Services into one dashboard. Enabled cost analysis, idle shutdown, and efficient cloud monitoring with automation focus.",
  },
];

function Page() {
  const projectHeadingRef = useRef(null);
  const lineRef = useRef(null);
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const [imageHover, setImageHover] = React.useState("");
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  useEffect(() => {
    if (
      !containerRef.current ||
      !lineRef.current ||
      !projectHeadingRef.current ||
      !overlayRef.current
    )
      return;

    gsap.set(lineRef.current, { width: 0 });
    gsap.set(overlayRef.current, { x: 0 });

    const runAnimations = () => {
      gsap.to(overlayRef.current, {
        x: "100%",
        duration: 1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
        },
      });

      gsap.to(projectHeadingRef.current, {
        x: "110%",
        ease: "power3.inOut",
        duration: 0.6,
        scrollTrigger: {
          trigger: projectHeadingRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(lineRef.current, {
        width: "40vw",
        ease: "power3.inOut",
        duration: 0.6,
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
        delay: 0.2,
      });

      ScrollTrigger.refresh(); // after DOM paints
    };

    requestAnimationFrame(runAnimations);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-10 bg-black gap-10 w-full">
      {/* Header */}
      <div className="flex flex-col justify-center items-center z-10 px-4 text-center">
        <div className="relative flex flex-col justify-center items-center overflow-hidden">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[5rem] tracking-wide font-light">
            EXPERIENCES
          </h2>
          <div
            ref={projectHeadingRef}
            className="w-full h-full bg-[#ff0000] absolute top-0 z-[20]"
          ></div>
        </div>
        <div
          ref={lineRef}
          className="w-[80vw] sm:w-[60vw] h-[0.2rem] bg-red-500 my-6"
        ></div>
      </div>

      {/* Main section */}
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row justify-center items-center px-4 w-full"
      >
        {/* Image container */}
        <div className="relative w-full sm:w-[90vw] md:w-[80vw] lg:w-[60vw] xl:w-[65vw] 2xl:w-[70vw] h-[60vh] sm:h-[80vh] md:h-[90vh] lg:h-[110vh] overflow-hidden rounded-lg">
          <AnimatePresence mode="wait">
            <motion.img
              key={imageHover || "default"}
              src={imageHover || "/img2.jpeg"}
              alt="Project Preview"
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
              className="absolute top-0 left-0 w-full h-full object-cover object-top transition-transform duration-700"
            />
          </AnimatePresence>
          <div
            ref={overlayRef}
            className="absolute h-full inset-0 bg-black z-10"
          ></div>
        </div>

        {/* Text container */}
        <div className="w-full lg:max-w-[50vw] lg:min-w-[10vw] flex flex-col justify-center px-2 sm:px-6 py-8 lg:py-12 text-white">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group text-right py-5 cursor-pointer transition-all duration-300 hover:bg-red-500"
              onMouseEnter={() => {
                setImageHover(project.image);
                setHoveredIndex(idx);
              }}
              onMouseLeave={() => {
                setImageHover("");
                setHoveredIndex(null);
              }}
            >
              {/* Desktop Hover Animation */}
              <div className="hidden lg:block relative min-h-[7rem] overflow-hidden text-white font-light tracking-wide">
                <span
                  className={`block transition-all duration-300 text-[2rem] md:text-[3rem] lg:text-[4rem] ${
                    hoveredIndex === idx
                      ? "opacity-0 -translate-y-full"
                      : "opacity-100 translate-y-0"
                  }`}
                >
                  {project.name}
                </span>
                <span
                  className={`absolute top-0 right-0 w-full text-[1.2rem] transition-all duration-300 ${
                    hoveredIndex === idx
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-full"
                  }`}
                >
                  {project.description}
                </span>
              </div>

              {/* Mobile: Static Title + Description */}
              <div
                onClick={() => handleToggle(idx)}
                className={`w-full flex items-center justify-between px-2 text-white font-light text-2xl transition-all duration-300 lg:hidden ${openIndex === idx ? "bg-red-500 py-6" : "bg-transparent"}`}
              >
                <span className="tracking-wide">{project.name}</span>
                <span
                  className={`transition-transform duration-300 ease-in-out ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-5 h-5 text-white/80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>

              <div
                className={`overflow-hidden text-white text-sm leading-relaxed transition-all duration-500 px-2 ${
                  openIndex === idx
                    ? "max-h-60 py-4 opacity-100"
                    : "max-h-0 py-0 opacity-0"
                }`}
              >
                {project.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
