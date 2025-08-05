"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Component() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bigHeadingRef = useRef<HTMLDivElement>(null);
  const dot1Ref = useRef<HTMLDivElement>(null);
  const dot2Ref = useRef<HTMLDivElement>(null);
  const dot3Ref = useRef<HTMLDivElement>(null);
  const dot5Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const triggers: ScrollTrigger[] = [];

    const setupAnimations = () => {
      if (!containerRef.current) return;

      // Kill existing ScrollTriggers to prevent duplicates on re-renders
      triggers.length = 0; // Clear the array

      try {
        // Animation for the "CRAFTED" text (existing)
        gsap.set(bigHeadingRef.current, {
          x: "-10%",
        });
        triggers.push(
          gsap.to(bigHeadingRef.current, {
            scrollTrigger: {
              trigger: containerRef.current,
              scrub: 2,
              start: "top 90%",
              end: "bottom 10%",
            },
            x: "+20%",
            ease: "none",
            duration: 3,
          })
        );

        // Animation for Dot 1 (bottom-left)
        if (dot1Ref.current) {
          triggers.push(
            gsap.to(dot1Ref.current, {
              scrollTrigger: {
                trigger: containerRef.current,
                scrub: 1,
                start: "top bottom", // Start when footer enters viewport from bottom
                end: "bottom top", // End when footer leaves viewport at top
              },
              y: "-80vh", // Move up
              x: "20vw", // Move right
              scale: 1.5, // Scale up
              opacity: 0.5, // Fade slightly
              ease: "power1.out",
            })
          );
        }

        // Animation for Dot 2 (top-right)
        if (dot2Ref.current) {
          triggers.push(
            gsap.to(dot2Ref.current, {
              scrollTrigger: {
                trigger: containerRef.current,
                scrub: 1,
                start: "top bottom",
                end: "bottom top",
              },
              y: "40vh", // Move down
              x: "-80vw", // Move left
              scale: 0.8, // Scale down
              opacity: 0.6, // Fade slightly
              ease: "power1.out",
            })
          );
        }

        // Animation for Dot 3 (top-left-ish)
        if (dot3Ref.current) {
          triggers.push(
            gsap.to(dot3Ref.current, {
              scrollTrigger: {
                trigger: containerRef.current,
                scrub: 1,
                start: "top bottom",
                end: "bottom top",
              },
              y: "50vh", // Move down
              x: "20vw", // Move right
              rotation: 360, // Rotate
              ease: "power1.out",
            })
          );
        }

        if (dot5Ref.current) {
          triggers.push(
            gsap.to(dot5Ref.current, {
              scrollTrigger: {
                trigger: containerRef.current,
                scrub: 1,
                start: "top bottom",
                end: "bottom top",
              },
              x: "-30vw",
              y: "-150vh",
              scale: 1.2,
              rotation: 180,
              opacity: 0.3,
              ease: "circ.inOut",
            })
          );
        }

      } catch (error) {
        console.error("Error setting up footer animations:", error);
      }
    };

    // Use a timeout to ensure DOM is ready and refs are populated
    const timer = setTimeout(setupAnimations, 100); // Reduced timeout for faster setup

    return () => {
      clearTimeout(timer);
      triggers.forEach((st) => st.kill()); // Kill all created ScrollTriggers
    };
  }, []);

  return (
    <footer className="bg-black text-white py-8 sm:py-12 md:py-16 sm:px-6 md:px-8 relative">
      <div
  ref={dot1Ref}
  className="w-[20vh] h-[20vh] bg-[#d9022c] absolute bottom-10 left-0 rounded-full z-[0] shadow-[0_0_60px_#ff174460]"
></div>
<div
  ref={dot2Ref}
  className="w-[20vh] h-[20vh] bg-[#c70e0e] absolute top-1/2 right-0 transform -translate-y-1/2 rounded-full z-[0] shadow-[0_0_60px_#b71c1c60]"
></div>
<div
  ref={dot3Ref}
  className="w-[20vh] h-[20vh] bg-[#f72314] absolute top-20 left-[30%] rounded-full z-[0] shadow-[0_0_60px_#f4433660]"
></div>
<div
  ref={dot5Ref}
  className="w-[18vh] h-[18vh] bg-[#ff0000] absolute bottom-[5%] right-[10%] rounded-full z-[0] shadow-[0_0_60px_#880e4f60]"
></div>



      <div className="max-w-7xl mx-auto">
        {/* Top navigation links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16 text-sm sm:text-base font-medium">
          <div>
            <Link
              href="#"
              className="hover:text-gray-300 transition-colors z-10"
            >
              <FontAwesomeIcon icon={faGithub} /> GITHUB
            </Link>
          </div>
          <div>
            <Link
              href="#"
              className="hover:text-gray-300 transition-colors z-10"
            >
              <FontAwesomeIcon icon={faInstagram} /> INSTAGRAM
            </Link>
          </div>
          <div>
            <Link
              href="#"
              className="hover:text-gray-300 transition-colors z-10"
            >
              <FontAwesomeIcon icon={faLinkedin} /> LINKEDIN
            </Link>
          </div>
          <div>
            <Link
              href="#"
              className="hover:text-gray-300 transition-colors z-10"
            >
              <FontAwesomeIcon icon={faEnvelope} /> EMAIL
            </Link>
          </div>
        </div>

        {/* Large BIGFACE text */}
        <div ref={containerRef} className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1
            ref={bigHeadingRef}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] xl:text-[14rem] 2xl:text-[18rem] z-10 font-black tracking-tighter leading-none"
          >
            THE END.
          </h1>
        </div>

        {/* Bottom navigation links */}
        <div className="flex flex-col md:flex-row justify-between text-sm sm:text-base font-medium">
          <div className="hover:text-gray-300 transition-colors z-10">
            BASED IN AGRA, UTTAR PRADESH
          </div>
          <div className="hover:text-gray-300 transition-colors z-10">
            © All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
