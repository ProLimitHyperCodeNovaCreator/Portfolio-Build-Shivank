"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    name: "TECHEAGLE",
    href: "/projects/project-three",
    image: "/Exp3.jpeg",
    description: "Developed GPS free drone navigation using visual SLAM, OpenVINS, and real hardware integration. Covered simulation to deployment, focusing on sensor fusion and autonomous flight systems.",
  },
  {
    name: "Indian Robotics Solution",
    href: "/projects/project-two",
    image: "/Exp2.jpeg",
    description: "Secured drone GPS via UART/CAN protocol work and firmware tweaks. Customized QGroundControl, enhancing drone communication and embedded security.",
  },
  {
    name: "Cloudologix",
    href: "/projects/project-one",
    image: "/Exp1.png",
    description: "Built Cloudoberry to unify Azure services like VMs, Kubernetes, SQL, App Services into one dashboard. Enabled cost analysis, idle shutdown, and efficient cloud monitoring with automation focus.",
  },
];

function Page() {
  const projectHeadingRef = useRef(null);
  const lineRef = useRef(null);
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const [imageHover, setImageHover] = React.useState("");
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

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
    <div className="min-h-screen flex flex-col items-center justify-between py-10 bg-black gap-10">
      <div className="flex flex-col justify-center items-center z-10">
        <div className="h-auto w-auto relative flex flex-col justify-center items-center overflow-hidden">
          <h1 className="text-[#FFFFFF] text-[5rem] tracking-wide font-light">
            EXPERIENCES
          </h1>
          <div
            ref={projectHeadingRef}
            className="w-full h-full bg-[#ff0000] absolute top-0 z-[20]"
          ></div>
        </div>
        <div
          ref={lineRef}
          className="w-[40vw] h-[0.2rem] bg-red-500 my-6"
        ></div>
      </div>
      <div
        ref={containerRef}
        className="flex flex-col lg:flex-row min-h-screen justify-between items-center gap-4 z-10"
      >
        <div className="overflow-hidden relative">
          <div className="inline-block">
            <div className="relative w-[45vw] h-[110vh] overflow-hidden rounded-lg">
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
            </div>
          </div>
          <div
            ref={overlayRef}
            className="absolute h-full inset-0 bg-black z-10"
          ></div>
        </div>
        <div className="h-screen min-w-[40vw] bg-black px-6 py-12 flex flex-col justify-center z-10">
          {projects.map((project, idx) => (
            <Link key={idx} href={project.href}>
              <div
                className="group w-full text-right px-6 py-5 cursor-pointer transition-all duration-300 hover:bg-red-500 border border-b border-white border-[1px] last:border-none"
                onMouseEnter={() => {
                  setImageHover(project.image);
                  setHoveredIndex(idx);
                }}
                onMouseLeave={() => {
                  setImageHover("");
                  setHoveredIndex(null);
                }}
              >
                <div className="text-right text-white font-light tracking-wide">
                  <div className="text-right text-white text-[4rem] font-light tracking-wide relative min-h-[7rem] overflow-hidden">

                    <span
                      className={`block transition-all duration-300 ${
                        hoveredIndex === idx
                          ? "opacity-0 translate-y-[-100%]"
                          : "opacity-100 translate-y-0"
                      }`}
                    >
                      {project.name}
                    </span>
                    <span
                      className={`absolute top-0 right-0 w-full text-white text-[1.4rem] font-light tracking-wide transition-all duration-300 ${
                        hoveredIndex === idx
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-[100%]"
                      }`}
                    >
                      {project.description}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
