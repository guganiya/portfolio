"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef, useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "MAVA Logistics",
    src: "/project/mava/global-logistics-transportation-network.jpg",
    logo: "/project/mava/logo.png",
    link: "https://ma-va.net",
    color: "#1a1a1a",
  },
  {
    title: "Owaz",
    src: "/project/owaz/acoustic-guitar-musical-keys-white-background-flat-lay (1).jpg",
    logo: "/project/owaz/logo.png",
    link: "http://owaz.com.tm",
    color: "#262626",
  },
  {
    title: "Alyx",
    src: "/project/alyx/world-theatre-day-celebration.jpg",
    logo: "/project/alyx/LOGO-ALYX-WIHT.png",
    link: "https://alyxlighting.com",
    color: "#333333",
  },
];

// Extracted Memoized Child Component to eliminate parent context re-renders
const StickyCard = memo(
  ({
    i,
    title,
    description,
    src,
    logo,
    link,
    progress,
    range,
    targetScale,
    isDesktop,
  }) => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ["start end", "end start"],
    });

    // Calculate high-performance layout bindings mapping smoothly on desktop hardware
    const scale = useTransform(progress, range, [1, targetScale]);
    const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

    return (
      <div
        ref={container}
        className="sticky top-12 sm:top-24 md:top-32 flex items-center justify-center px-4 h-[75vh] md:h-[85vh] lg:h-screen will-change-transform"
      >
        <motion.div
          style={
            isDesktop
              ? { scale, backgroundColor: projects[i].color }
              : { backgroundColor: projects[i].color }
          }
          className="relative flex flex-col overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/10 h-[440px] w-full max-w-[1200px] md:h-[500px] lg:h-[600px] group shadow-[0_-20px_50px_rgba(0,0,0,0.6)] will-change-transform transform-gpu touch-manipulation"
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-20 cursor-pointer"
            aria-label={title}
          />

          <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <motion.img
              style={isDesktop ? { y: imageY } : {}}
              src={src}
              alt={title}
              loading="lazy"
              className="h-[115%] w-full object-cover opacity-40 grayscale-[0.4] md:group-hover:grayscale-0 transition-all duration-700 scale-105 md:group-hover:scale-100 will-change-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-black/30" />
          </div>

          <div className="relative h-full w-full flex flex-col md:flex-row items-stretch md:items-center justify-between p-6 sm:p-10 md:p-16 z-10 pointer-events-none">
            <div className="flex-1 flex flex-col justify-end md:justify-center text-left">
              <div className="w-14 h-14 md:w-24 md:h-24 mb-4 md:mb-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 p-3 flex items-center justify-center">
                <img
                  src={logo}
                  alt={`${title} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-none mb-3 md:mb-4 uppercase italic">
                {title}
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base md:text-lg max-w-md font-light opacity-90 line-clamp-4 md:line-clamp-none">
                {description}
              </p>
            </div>

            <div className="flex items-end justify-end mt-4 md:mt-0">
              <div
                className="
                w-11 h-11 md:w-16 md:h-16 
                rounded-full border border-white/30 
                flex items-center justify-center 
                text-white
                md:group-hover:bg-white md:group-hover:text-black 
                transition-all duration-500 transform 
                md:group-hover:rotate-45 will-change-transform
              "
              >
                {/* Replaced with Lucide Icon component */}
                <ArrowUpRight className="w-5 h-5 md:w-7 md:h-7 stroke-[2.5]" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  },
);

StickyCard.displayName = "StickyCard";

export const Projects = () => {
  const { t } = useTranslation();
  const container = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Background marquee text movement calculation logic
  const worksX = useTransform(scrollYProgress, [0, 1], [0, -250]);

  useEffect(() => {
    const handleDeviceCheck = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };
    handleDeviceCheck();
    window.addEventListener("resize", handleDeviceCheck, { passive: true });
    return () => window.removeEventListener("resize", handleDeviceCheck);
  }, []);

  return (
    <ReactLenis
      root
      options={{ lerp: 0.12, duration: 1.2, smoothTouch: false }}
    >
      <section
        ref={container}
        className="relative text-white pb-12 content-visibility-auto"
      >
        {/* TITLE MARQUEE SECTION */}
        <div className="relative h-[25vh] md:h-[45vh] lg:h-[55vh] flex flex-col justify-center overflow-hidden px-4 max-w-[1400px] mx-auto select-none pointer-events-none">
          <motion.div
            style={isDesktop ? { x: worksX } : {}}
            className="absolute top-1/2 left-0 -translate-y-1/2 text-[22vw] lg:text-[14rem] font-black text-white/[0.02] whitespace-nowrap will-change-transform uppercase italic"
          >
            {t("projects.bg_text")}
          </motion.div>

          <div className="relative z-10 border-l-4 border-[#d4af37] pl-4 sm:pl-6 md:pl-8">
            <motion.h1
              initial={isDesktop ? { x: -60, opacity: 0 } : { opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-none tracking-tighter"
            >
              {t("projects.title_main")} <br />{" "}
              <span className="text-zinc-800">
                {t("projects.title_accent")}
              </span>
            </motion.h1>
          </div>
        </div>

        {/* STICKY STACK CONTAINER LAYER */}
        <div className="relative flex flex-col gap-12 sm:gap-16 md:gap-0">
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.04;
            const projectKey = project.title.toLowerCase().split(" ")[0];

            return (
              <StickyCard
                key={`project_card_${i}`}
                i={i}
                title={t(`projects.${projectKey}.title`)}
                description={t(`projects.${projectKey}.description`)}
                src={project.src}
                logo={project.logo}
                link={project.link}
                progress={scrollYProgress}
                range={[i * 0.28, 1]}
                targetScale={targetScale}
                isDesktop={isDesktop}
              />
            );
          })}
        </div>

        {/* CALL TO ACTION BUTTON BAR */}
        <div className="h-[40vh] md:h-[50vh] lg:h-[60vh] flex items-center justify-center relative overflow-hidden">
          {/* Static Ambient glow layer restricted exclusively to desktop layouts */}
          {isDesktop && (
            <div className="absolute w-[500px] h-[500px] bg-[#d4af37]/5 rounded-full blur-[130px] pointer-events-none select-none" />
          )}

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="text-center z-10 px-4 w-full max-w-2xl"
          >
            <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-6 md:mb-10 tracking-tighter text-white uppercase italic leading-tight">
              {t("projects.cta_title")}
            </h2>

            <Link
              to="/contact"
              className="relative inline-flex items-center gap-3 md:gap-4 px-7 py-3.5 md:px-11 md:py-5 border-2 border-[#d4af37] text-[#d4af37] rounded-full text-base md:text-xl font-bold md:hover:bg-[#d4af37] md:hover:text-black active:bg-[#d4af37] active:text-black transition-all duration-400 group overflow-hidden touch-manipulation"
            >
              <span className="relative z-10 uppercase tracking-wider">
                {t("projects.cta_button")}
              </span>
              <span className="relative z-10 md:group-hover:translate-x-1.5 transition-transform duration-300">
                {/* Replaced with Lucide Icon component */}
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 stroke-[3]" />
              </span>
              <div className="absolute inset-0 bg-[#d4af37] opacity-0 md:group-hover:opacity-100 transition-all duration-400 -z-10" />
            </Link>
          </motion.div>
        </div>
      </section>
    </ReactLenis>
  );
};
