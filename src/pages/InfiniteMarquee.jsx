"use client";

import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";

const languages = [
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    url: "#",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    url: "#",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    url: "#",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    url: "#",
  },
  {
    name: "Go",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
    url: "#",
  },
  {
    name: "Tailwind",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-original.svg",
    url: "#",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    url: "#",
  },
  {
    name: "FastAPI",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
    url: "#",
  },
];

// Memoized TechCard to minimize DOM re-paint processing overhead
const TechCard = memo(({ tech, isDesktop }) => (
  <motion.a
    href={tech.url}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={
      isDesktop
        ? {
            scale: 1.08,
            borderColor: "rgba(212, 175, 55, 0.4)",
          }
        : {}
    }
    whileTap={{ scale: 0.95 }}
    className="flex-shrink-0 relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center p-3.5 sm:p-5 transition-all duration-300 group touch-manipulation"
  >
    {/* Ambient Hover glow - Rendered explicitly on Desktop */}
    {isDesktop && (
      <div className="absolute inset-0 rounded-full bg-[#d4af37] opacity-0 group-hover:opacity-10 blur-md transition-opacity duration-300 pointer-events-none" />
    )}

    {/* Tech Icon Matrix */}
    <img
      src={tech.icon}
      alt={tech.name}
      loading="lazy"
      className={`w-full h-full object-contain transition-all duration-300 z-10 ${
        isDesktop ? "filter grayscale group-hover:grayscale-0" : "filter-none"
      }`}
    />

    {/* Ambient Bottom Glowing Dot Indicator Node */}
    {isDesktop && (
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#d4af37] opacity-0 group-hover:opacity-100 shadow-[0_0_10px_#d4af37] transition-all duration-300 z-20" />
    )}
  </motion.a>
));

TechCard.displayName = "TechCard";

const TechMarquee = () => {
  const [isDesktop, setIsDesktop] = useState(true);

  // Doubling array elements provides flawless seamless mirroring calculations at lower DOM costs
  const doubledLanguages = [...languages, ...languages];

  useEffect(() => {
    const handleDeviceCheck = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };
    handleDeviceCheck();
    window.addEventListener("resize", handleDeviceCheck, { passive: true });
    return () => window.removeEventListener("resize", handleDeviceCheck);
  }, []);

  return (
    <section className="w-full py-6 md:py-10 overflow-hidden bg-transparent select-none -mt-6 sm:-mt-10 lg:-mt-15 content-visibility-auto">
      <div className="flex relative items-center w-full">
        {/* Edge Dissolve Linear Gradients Masks - Hidden on mobile screen viewports for performance optimization */}
        <div className="hidden sm:block absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none" />
        <div className="hidden sm:block absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none" />

        <motion.div
          className="flex gap-6 sm:gap-10 md:gap-12 min-w-max px-4 transform-gpu will-change-transform"
          initial={{ x: 0 }}
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: isDesktop ? 25 : 18, // Slightly faster pacing on mobile devices for visual balance
              ease: "linear",
            },
          }}
          style={{ display: "flex" }}
        >
          {doubledLanguages.map((tech, index) => (
            <TechCard
              key={`${tech.name}-${index}`}
              tech={tech}
              isDesktop={isDesktop}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechMarquee;
