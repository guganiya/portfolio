"use client";

import React, { useState, useEffect, useRef, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

// --- Иконки ---
const ICONS = {
  github: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  telegram: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  ),
  instagram: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
};

const getSocialLinks = () => [
  {
    icon: ICONS.github,
    url: "https://github.com/CodeAssasinKing",
    color: "#ffffff",
    label: "GitHub",
  },
  {
    icon: ICONS.instagram,
    url: "https://www.instagram.com/codeassasinking/",
    color: "#E1306C",
    label: "Instagram",
  },
  {
    icon: ICONS.telegram,
    url: "https://t.me/Worker_000000",
    color: "#0088cc",
    label: "Telegram",
  },
];

const ProfileCard = memo(({ title, photo, isBack = false, isDesktop }) => {
  const { t } = useTranslation();
  const links = getSocialLinks();

  return (
    <div
      className={`absolute inset-0 w-full h-full p-6 sm:p-8 flex flex-col items-center justify-between rounded-[2.5rem] sm:rounded-[3rem] border border-white/20 backdrop-blur-xl bg-gradient-to-b from-white/10 to-white/5 shadow-2xl ${
        isBack ? "[transform:rotateY(180deg)]" : ""
      }`}
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="absolute inset-px rounded-[2.5rem] sm:rounded-[3rem] border border-white/10 pointer-events-none" />

      <motion.div
        style={isDesktop ? { translateZ: 60 } : {}}
        className="text-center select-none"
      >
        <h3 className="text-[10px] sm:text-xs font-medium text-[#d4af37] uppercase tracking-[0.3em] mb-1">
          {t("cards.profile_label")}
        </h3>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight uppercase italic">
          {title}
        </h2>
      </motion.div>

      {/* Фото */}
      <motion.div
        style={isDesktop ? { translateZ: 100 } : {}}
        className="relative"
      >
        {/* Glow layer optimized out on mobile browsers */}
        <div className="hidden sm:block absolute -inset-4 bg-[#d4af37]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full border-4 sm:border-[6px] border-white/10 overflow-hidden shadow-2xl scale-105 select-none pointer-events-none">
          <img
            src={photo}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </motion.div>

      {/* Соцсети */}
      <motion.div
        style={isDesktop ? { translateZ: 80 } : {}}
        className="flex gap-3 sm:gap-4 items-center"
      >
        {links.map((link, idx) => (
          <motion.a
            key={idx}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            whileHover={isDesktop ? { y: -4, scale: 1.05 } : {}}
            whileTap={{ scale: 0.95 }}
            // Prevent click event bubbling up to the card container
            onClick={(e) => e.stopPropagation()}
            className="group relative w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 touch-manipulation"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 group-active:opacity-10 transition-opacity duration-300 rounded-2xl"
              style={{ backgroundColor: link.color }}
            />
            <div className="relative z-10 text-zinc-400 group-hover:text-white group-active:text-white transition-colors duration-300 scale-90 sm:scale-100">
              {link.icon}
            </div>
            <div
              className="absolute bottom-1.5 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300"
              style={{
                backgroundColor: link.color,
                boxShadow: `0 0 8px ${link.color}`,
              }}
            />
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
});

ProfileCard.displayName = "ProfileCard";

const InteractiveHeroCard = () => {
  const { t } = useTranslation();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 22, restDelta: 0.001 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);

  // Detect hardware viewport sizing safely
  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice, { passive: true });
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const handleMouseMove = (e) => {
    if (!isDesktop || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Auto-rotation timer loop
  useEffect(() => {
    const timer = setInterval(() => setIsFlipped((v) => !v), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-[550px] sm:min-h-[650px] lg:min-h-[700px] flex items-center justify-center [perspective:1200px] select-none px-4 py-6">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          isDesktop
            ? { rotateX, rotateY, transformStyle: "preserve-3d" }
            : { transformStyle: "preserve-3d" }
        }
        // Floating animation is limited to desktop to save mobile processor cycles
        animate={isDesktop ? { y: [0, -12, 0] } : {}}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-[330px] h-[480px] sm:max-w-[380px] sm:h-[540px] cursor-pointer will-change-transform touch-manipulation"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full relative"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        >
          <ProfileCard
            title={t("cards.frontend.name")}
            photo="/guga.jpg"
            isDesktop={isDesktop}
          />
          <ProfileCard
            title={t("cards.fullstack.name")}
            photo="/romik.jpg"
            isBack
            isDesktop={isDesktop}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InteractiveHeroCard;
