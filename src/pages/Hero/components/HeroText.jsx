import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const icons = {
  github: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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
      width="24"
      height="24"
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
      width="24"
      height="24"
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

const HeroText = () => {
  const { t } = useTranslation();
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Safely grab translations array mapping
  const titlesTranslation = t("hero.titles", { returnObjects: true });
  const titles = Array.isArray(titlesTranslation)
    ? titlesTranslation
    : ["Developer"];

  // Optimized typing effect loop for low-end mobile CPUs
  useEffect(() => {
    let isMounted = true;

    const handleTyping = () => {
      if (!isMounted) return;

      const currentIdx = loopNum % titles.length;
      const fullText = titles[currentIdx];

      if (isDeleting) {
        setDisplayText((prev) => fullText.substring(0, prev.length - 1));
        setTypingSpeed(40); // Slightly accelerated delete pace for faster UX loops
      } else {
        setDisplayText((prev) => fullText.substring(0, prev.length + 1));
        setTypingSpeed(120); // Smooth reading speed footprint
      }

      if (!isDeleting && displayText === fullText) {
        setTypingSpeed(2000); // Wait threshold on full layout string
        setIsDeleting(true);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        setTypingSpeed(400); // Delay before parsing next sentence cycle
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [displayText, isDeleting, loopNum, typingSpeed, titles]);

  const socialLinks = [
    {
      name: "github",
      icon: icons.github,
      href: "https://github.com/CodeAssasinKing",
      color: "#ffffff",
    },
    {
      name: "Instagram",
      icon: icons.instagram,
      href: "https://www.instagram.com/codeassasinking/",
      color: "#E1306C",
    },
    {
      name: "telegram",
      icon: icons.telegram,
      href: "https://t.me/Worker_000000",
      color: "#0088cc",
    },
  ];

  const isDesktop =
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 768px)").matches
      : true;

  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left z-10 w-full max-w-4xl px-1">
      {/* 1. GREETING CHIP */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-5 select-none"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#d4af37]"></span>
        </span>
        <p className="text-zinc-200 text-xs sm:text-sm font-semibold tracking-wide uppercase">
          {t("hero.greeting")}{" "}
          <span className="text-[#d4af37]">{t("hero.team")}</span>
        </p>
        <motion.span
          animate={{ rotate: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="text-lg will-change-transform inline-block"
        >
          👋
        </motion.span>
      </motion.div>

      {/* 2. TYPING TYPOGRAPHY BLOCK */}
      {/* Set explicit h-[90px] scaling into md:h-[130px] to strictly prevent layout shifts */}
      <div className="h-[90px] sm:h-[110px] md:h-[130px] flex items-center justify-center md:justify-start w-full overflow-hidden select-none">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase italic leading-none">
          {displayText}
          <span className="text-[#d4af37] animate-[pulse_1s_infinite] ml-0.5 font-normal">
            _
          </span>
        </h1>
      </div>

      {/* 3. CORE DESCRIPTIONS */}
      <div className="space-y-4 md:space-y-6 max-w-2xl mt-4 mb-8 sm:mb-10 text-zinc-400 text-sm sm:text-base md:text-xl font-light leading-relaxed">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {t("hero.description.part8")}{" "}
          <span className="text-white font-medium italic">
            {t("hero.description.part9")}
          </span>
          : {t("hero.description.part10")}{" "}
          <span className="text-[#d4af37] font-semibold tracking-wide">
            {t("hero.description.part11")}
          </span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {t("hero.description.part1")}{" "}
          <span className="text-white font-medium italic">
            {t("hero.description.part2")}
          </span>
          : {t("hero.description.part3")}{" "}
          <span className="text-white font-medium italic">
            {t("hero.description.part4")}
          </span>
          . {t("hero.description.part5")}{" "}
          <span className="text-[#d4af37] font-semibold tracking-wide">
            {t("hero.description.part6")}
          </span>{" "}
          — {t("hero.description.part7")}.
        </motion.p>
      </div>

      {/* 4. SOCIAL TOUCHNODES */}
      <div className="flex items-center gap-4 sm:gap-5">
        {socialLinks.map((social, idx) => (
          <motion.a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + idx * 0.05, duration: 0.4 }}
            whileHover={isDesktop ? { scale: 1.05, y: -4 } : {}}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 touch-manipulation"
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 group-active:opacity-10 transition-opacity duration-300 rounded-xl sm:rounded-2xl"
              style={{ backgroundColor: social.color }}
            />
            <div className="relative z-10 text-zinc-500 group-hover:text-white group-active:text-white transition-all duration-300 scale-90 sm:scale-100">
              {social.icon}
            </div>
            <div
              className="absolute bottom-1.5 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-all duration-300"
              style={{
                backgroundColor: social.color,
                boxShadow: `0 0 10px ${social.color}`,
              }}
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default HeroText;
