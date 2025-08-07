"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
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
        const craftedTween = gsap.to(bigHeadingRef.current, {
          scrollTrigger: {
            trigger: containerRef.current,
            scrub: 2,
            start: "top 90%",
            end: "bottom 10%",
          },
          x: "+20%",
          ease: "none",
          duration: 3,
        });

        triggers.push(craftedTween.scrollTrigger!); // ✅ push ScrollTrigger

        // Animation for Dot 1 (bottom-left)
        if (dot1Ref.current) {
          const dot1Tween = gsap.to(dot1Ref.current, {
            scrollTrigger: {
              trigger: containerRef.current,
              scrub: 1,
              start: "top bottom",
              end: "bottom top",
            },
            y: "-80vh",
            x: "40vw",
            scale: 1.5,
            opacity: 0.5,
            ease: "power1.out",
          });

          triggers.push(dot1Tween.scrollTrigger!); // ✅ Correct: this is a ScrollTrigger
        }

        // Animation for Dot 2 (top-right)
        // Dot 2 (top-right)
        if (dot2Ref.current) {
          const dot2Tween = gsap.to(dot2Ref.current, {
            scrollTrigger: {
              trigger: containerRef.current,
              scrub: 1,
              start: "top bottom",
              end: "bottom top",
            },
            y: "40vh",
            x: "-80vw",
            scale: 0.8,
            opacity: 0.6,
            ease: "power1.out",
          });

          if (dot2Tween.scrollTrigger) {
            triggers.push(dot2Tween.scrollTrigger);
          }
        }

        // Dot 3 (top-left-ish)
        if (dot3Ref.current) {
          const dot3Tween = gsap.to(dot3Ref.current, {
            scrollTrigger: {
              trigger: containerRef.current,
              scrub: 1,
              start: "top bottom",
              end: "bottom top",
            },
            y: "50vh",
            x: "20vw",
            rotation: 360,
            ease: "power1.out",
          });

          if (dot3Tween.scrollTrigger) {
            triggers.push(dot3Tween.scrollTrigger);
          }
        }

        // Dot 5 (bottom-right-ish)
        if (dot5Ref.current) {
          const dot5Tween = gsap.to(dot5Ref.current, {
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
          });

          if (dot5Tween.scrollTrigger) {
            triggers.push(dot5Tween.scrollTrigger);
          }
        }
      } catch (error) {
        console.error("Error setting up footer animations:", error);
      }
    };

    // Use a timeout to ensure DOM is ready and refs are populated
    const timer = setTimeout(setupAnimations, 100); // Reduced timeout for faster setup

    return () => {
      clearTimeout(timer);
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return (
    <footer className="bg-black text-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 relative">
      {/* Responsive Dots */}
      {/* Dot 1 */}
      <div
        ref={dot1Ref}
        className="hidden sm:block w-[12vh] sm:w-[16vh] md:w-[20vh] h-[12vh] sm:h-[16vh] md:h-[20vh] bg-[#d9022c] absolute bottom-10 left-0 rounded-full z-[0] shadow-[0_0_60px_#ff174460]"
      ></div>

      {/* Dot 2 */}
      <div
        ref={dot2Ref}
        className="hidden sm:block w-[12vh] sm:w-[16vh] md:w-[20vh] h-[12vh] sm:h-[16vh] md:h-[20vh] bg-[#c70e0e] absolute top-1/2 right-0 transform -translate-y-1/2 rounded-full z-[0] shadow-[0_0_60px_#b71c1c60]"
      ></div>

      {/* Dot 3 */}
      <div
        ref={dot3Ref}
        className="hidden sm:block w-[12vh] sm:w-[16vh] md:w-[20vh] h-[12vh] sm:h-[16vh] md:h-[20vh] bg-[#f72314] absolute top-20 left-[30%] rounded-full z-[0] shadow-[0_0_60px_#f4433660]"
      ></div>

      {/* Dot 5 */}
      <div
        ref={dot5Ref}
        className="hidden sm:block w-[11vh] sm:w-[14vh] md:w-[18vh] h-[11vh] sm:h-[14vh] md:h-[18vh] bg-[#ff0000] absolute bottom-[5%] right-[10%] rounded-full z-[0] shadow-[0_0_60px_#880e4f60]"
      ></div>

      <div className="max-w-7xl mx-auto">
        {/* Top navigation links */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-around items-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16 text-sm sm:text-base font-medium text-center">
          <Link
            href="https://github.com/avianbob"
            className="hover:text-gray-300 transition-colors z-10"
          >
            <FontAwesomeIcon icon={faGithub} /> GITHUB
          </Link>
          <Link
            href="https://www.linkedin.com/in/shivankgoyal23"
            className="hover:text-gray-300 transition-colors z-10"
          >
            <FontAwesomeIcon icon={faLinkedin} /> LINKEDIN
          </Link>
          <Link
            href="mailto:shivank.imp@gmail.com"
            className="hover:text-gray-300 transition-colors z-10"
          >
            <FontAwesomeIcon icon={faEnvelope} /> EMAIL
          </Link>
        </div>

        {/* BIGFACE Heading */}
        <div
          ref={containerRef}
          className="text-center mb-8 sm:mb-12 md:mb-16 px-2"
        >
          <h1
            ref={bigHeadingRef}
            className="z-10 font-black tracking-tighter leading-none"
            style={{
              fontSize: "clamp(3.5rem, 18vw, 17.5rem)",
              lineHeight: "1",
              whiteSpace: "nowrap",
            }}
          >
            BUILD ON
          </h1>
        </div>

        {/* Bottom nav + copyright */}
        <div className="flex flex-col md:flex-row justify-between text-sm sm:text-base font-medium gap-4 text-center sm:text-left">
          <div className="hover:text-gray-300 transition-colors z-10">
            MADE WITH ❤ BY{" "}
            <Link
              href="https://www.linkedin.com/in/adityaag2005"
              target="_blank"
              className="underline cursor-pointer"
            >
              ADITYA AGARWAL
            </Link>
          </div>
          <div className="hover:text-gray-300 transition-colors z-10">
            © All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
