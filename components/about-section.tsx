"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LazyBlurImageProps {
  src: string;
  alt: string;
  className?: string;
  rounded?: boolean;
}

const LazyBlurImage = ({
  src,
  alt,
  className,
  rounded = true,
}: LazyBlurImageProps) => {
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={800}
      height={600}
      className={`${className} ${rounded ? "rounded-lg" : ""}`}
      style={{ objectFit: "cover" }}
    />
  );
};

const sectionData = {
  id: "about",
  layout: "default",
  title: "About me",
  content:
    "I'm an Robotics & Simulations Engineer with a passion for crafting smart robotic systems. My expertise includes PX4 firmware, ROS based navigation, and control logic for simulated and real world environments. From simulating motor faults to supporting GNSS denied applications and multi robot coordination, I tackle tough robotics problems with clean code and system level design. I excel where autonomy meets reliability and innovation engineering solutions that render robots intelligent, safe, and deployable in the real world.",
  image: "/myImg.jpeg",
};

function About() {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const aboutHeadingRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const cleanup = () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };

    // Wait longer for Locomotive Scroll to be fully initialized
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      try {
        // Split text for animation
        if (headingRef.current) {
          new SplitType(headingRef.current, {
            types: "lines",
            lineClass: "line-heading",
          });
        }

        if (paragraphRef.current) {
          new SplitType(paragraphRef.current, {
            types: "lines",
            lineClass: "line-paragraph",
          });
        }

        // Set initial states
        gsap.set([".line-heading", ".line-paragraph"], {
          y: 50,
          opacity: 0,
        });

        gsap.set(lineRef.current, {
          width: 0,
        });

        // Animate heading
        gsap.to(".line-heading", {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
          duration: 0.6,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Animate paragraph
        gsap.to(".line-paragraph", {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power3.out",
          duration: 0.6,
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Animate overlay reveal
        gsap.to(overlayRef.current, {
          x: "100%",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
          },
        });

        // Parallax effect on image
        gsap.to(imageRef.current, {
          y: -400,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 100%",
            end: "bottom 0%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        gsap.to(aboutHeadingRef.current, {
          x: "110%",
          ease: "power3.inOut",
          duration: 0.6,
          scrollTrigger: {
            trigger: aboutHeadingRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        gsap.to(lineRef.current, {
          width: "60vw",
          ease: "power3.inOut",
          duration: 0.6,
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          delay: 0.2,
        });

        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
      } catch (error) {
        console.error("Error setting up animations:", error);
      }
    }, 1000); // Increased delay to 1 second

    return () => {
      clearTimeout(timer);
      cleanup();
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen justify-around items-center py-10">
      <div className="flex flex-col justify-center items-center text-center px-4 sm:px-6">
        <div className="relative flex flex-col justify-center items-center overflow-hidden">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wide font-light leading-tight">
            FROM MECHANISMS TO MACHINERY
          </h1>
          <div
            ref={aboutHeadingRef}
            className="absolute top-0 left-0 w-full h-full bg-red-500 z-[-1]"
          ></div>
        </div>
        <div
          ref={lineRef}
          className="w-[80vw] sm:w-[70vw] md:w-[60vw] h-1 bg-red-500 my-6"
        ></div>
      </div>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
        <div
          ref={containerRef}
          className="min-h-screen w-screen flex flex-col lg:flex-row justify-around items-center px-8 py-10"
        >
          {/* Image Section */}
          <div
            ref={imageWrapperRef}
            className="relative h-[70vh] md:h-[80vh] w-[80vw] md:w-[80vw] lg:w-[40vw] lg:h-[120vh] shadow-lg overflow-hidden"
          >
            <div className="absolute inset-0 h-[120%] w-full">
              <div ref={imageRef} className="absolute inset-0 h-[120%] w-full">
                <LazyBlurImage
                  className="h-full w-full object-cover"
                  rounded={false}
                  src={sectionData.image}
                  alt={sectionData.title}
                />
              </div>
              <div
                ref={overlayRef}
                className="absolute h-full inset-0 bg-black z-10"
              ></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-[#FFFFFF] flex flex-col justify-center items-center lg:items-start w-[80vw] md:max-w-[60vw] lg:max-w-[45vw] gap-8 py-10 lg:py-0 lg:px-10">
            <div className="rounded-full bg-red-500 w-[250px] h-[250px] flex items-center justify-center text-center">
              <h1
                ref={headingRef}
                className="text-white text-2xl sm:text-3xl md:text-5xl font-light leading-tight tracking-wide px-4"
              >
                {sectionData.title}
              </h1>
            </div>
            <p
              ref={paragraphRef}
              className="text-base text-[#FFFFFF] sm:text-[1.1rem] md:text-[1.2rem] lg:text-[1.5rem] text-center lg:text-left tracking-wide leading-relaxed sm:leading-[1.5rem] md:leading-[2rem] lg:leading-[1.7rem] font-light"
            >
              {sectionData.content}
            </p>
          </div>
        </div>
      </div>
      <div className="my-15 flex justify-center">
        <div className="w-[90vw] h-[0.1rem] bg-[#fff]"></div>
      </div>
    </div>
  );
}

export default About;
