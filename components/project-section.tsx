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
  { name: "PROJECT ONE", href: "/projects/project-one", image: "/Pimg1.jpg" },
  { name: "PROJECT TWO", href: "/projects/project-two", image: "/Pimg2.jpg" },
  {
    name: "PROJECT THREE",
    href: "/projects/project-three",
    image: "/Pimg3.jpg",
  },
];

function Page() {
  const projectHeadingRef = useRef(null);
  const lineRef = useRef(null);
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const [imageHover, setImageHover] = React.useState("");

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
            SHOWCASE
          </h1>
          <div
            ref={projectHeadingRef}
            className="w-full h-full bg-[#ff0000] absolute top-0 z-[20]"
          ></div>
        </div>
        <div
          ref={lineRef}
          className="w-[40vw] h-[0.2rem] bg-[#ff0000] my-6"
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
                  src={imageHover || "/img2.png"}
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
                className="group w-full text-right px-6 py-5 cursor-pointer transition-all duration-300 hover:bg-red-600 border border-b border-white border-[1px] last:border-none"
                onMouseEnter={() => {
                  setImageHover(project.image);
                }}
                onMouseLeave={() => {
                  setImageHover("");
                }}
              >
                <div className="inline-flex items-center justify-end gap-4 text-white text-[5rem] font-light tracking-wide">
                  <span className="transition-all duration-300 group-hover:translate-x-[-0.5rem]">
                    {project.name}
                  </span>
                  <span className="text-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ←
                  </span>
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
