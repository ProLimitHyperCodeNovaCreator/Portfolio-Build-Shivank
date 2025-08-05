import React from "react";
import Image from "next/image";
import Link from "next/link";

const LazyBlurImage = ({ src, alt, className, rounded = true }) => {
  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      className={`${className} ${rounded ? "rounded-lg" : ""}`}
      style={{
        height: "110vh",
        width: "45vw", // 🔥 Zoom it horizontally
        objectFit: "cover", // 🔥 Crop top/bottom, fill horizontally
        objectPosition: "top", // Center the crop
      }}
    />
  );
};

const projects = [
  { name: "PROJECT ONE", href: "/projects/project-one" },
  { name: "PROJECT TWO", href: "/projects/project-two" },
  { name: "PROJECT THREE", href: "/projects/project-three" },
];

function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-10 bg-black gap-10">
      
      <div className="flex flex-col justify-center items-center z-10">
        <div className="h-auto w-auto relative flex flex-col justify-center items-center overflow-hidden">
          <h1 className="text-[#FFFFFF] text-[5rem] tracking-wide font-light">
            SHOWCASE
          </h1>
          {/* <div className="w-full h-full bg-[#fff0dc] absolute top-0"></div> */}
        </div>
        <div className="w-[40vw] h-[0.2rem] bg-[#ff0000] my-6"></div>
      </div>
      <div className="flex flex-col lg:flex-row min-h-screen justify-between items-center gap-4 z-10">
        <div className="overflow-hidden">
          <div className="inline-block">
            <LazyBlurImage
              src="/img2.png"
              alt="myImg"
              className=""
              rounded={false}
            />
          </div>
        </div>
        <div className="h-screen min-w-[40vw] bg-black px-6 py-12 flex flex-col justify-center z-10">
          {projects.map((project, idx) => (
            <Link key={idx} href={project.href}>
              <div className="group w-full text-right px-6 py-5 cursor-pointer transition-all duration-300 hover:bg-red-600 border border-b border-white border-[1px] last:border-none">
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
