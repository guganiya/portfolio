"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

const icons = {
  email: (
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  location: (
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

const ContactSection = () => {
  const { t } = useTranslation();
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.target);
    formData.append("access_key", "68441ff7-e81b-4d27-b05b-0a5b3ee18415");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        e.target.reset();
      } else {
        console.error("Error", data);
        setStatus("idle");
        alert("Something went wrong!");
      }
    } catch (error) {
      console.error("Error", error);
      setStatus("idle");
    }
  };

  // Base font size set to text-base (16px) specifically to prevent iOS auto-zoom layout disruption
  const inputStyles = `
    w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3.5 md:px-6 md:py-4 
    text-base text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#d4af37]/50 
    transition-all duration-300 focus:bg-white/10 touch-manipulation
  `;

  // Detect desktop screen sizes dynamically for high-performance animation distribution
  const isDesktop =
    typeof window !== "undefined"
      ? window.matchMedia("(min-width: 1024px)").matches
      : true;

  return (
    <div className="bg-zinc-950 min-h-screen flex flex-col justify-between selection:bg-[#d4af37]/20">
      <Navbar />

      <section
        id="contact"
        className="relative flex-grow flex items-center justify-center px-4 py-16 pt-28 md:pt-36 lg:py-24 overflow-hidden content-visibility-auto"
      >
        {/* Soft Ambient Radial Blur Glow - Excluded on weak mobile devices */}
        <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
          {/* LEFT SIDE CONTENT CONTAINER */}
          <motion.div
            initial={isDesktop ? { opacity: 0, x: -40 } : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-[0.95] tracking-tight mb-6 md:mb-8">
              {t("contact.title_1")} <br />
              <span className="text-[#d4af37]">
                {t("contact.title_accent")}
              </span>{" "}
              <br />
              {t("contact.title_2")}
            </h2>

            <p className="text-zinc-400 text-base md:text-xl max-w-md mx-auto lg:mx-0 font-light leading-relaxed mb-8 md:mb-12">
              {t("contact.description")}
            </p>

            <div className="space-y-4 md:space-y-6 max-w-md mx-auto lg:mx-0 w-full">
              {/* Email Touch Item */}
              <a
                href="mailto:bayramowramazan85@gmail.com"
                className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-white/[0.02] active:bg-white/[0.05] group transition-all duration-300 w-full touch-manipulation"
              >
                <div className="relative flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 group-hover:border-[#d4af37]/50">
                  <div className="relative z-10 text-zinc-400 group-hover:text-[#d4af37] group-active:text-[#d4af37] transition-colors duration-500 scale-90 md:scale-100">
                    {icons.email}
                  </div>
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-[0.2em] mb-0.5 font-bold">
                    {t("contact.email_label")}
                  </span>
                  <span className="text-sm sm:text-base md:text-xl font-bold text-white group-hover:text-[#d4af37] group-active:text-[#d4af37] transition-colors duration-300 truncate break-all">
                    bayramowramazan85@gmail.com
                  </span>
                </div>
              </a>

              {/* Location Touch Item */}
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-white/[0.02] active:bg-white/[0.05] group transition-all duration-300 w-full touch-manipulation"
              >
                <div className="relative flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 group-hover:border-[#d4af37]/50">
                  <div className="relative z-10 text-zinc-400 group-hover:text-[#d4af37] group-active:text-[#d4af37] transition-colors duration-500 scale-90 md:scale-100">
                    {icons.location}
                  </div>
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-[0.2em] mb-0.5 font-bold">
                    {t("contact.location_label")}
                  </span>
                  <span className="text-sm sm:text-base md:text-xl font-bold text-white group-hover:text-[#d4af37] group-active:text-[#d4af37] transition-colors duration-300 truncate">
                    {t("contact.location_value")}
                  </span>
                </div>
              </a>
            </div>
          </motion.div>

          {/* RIGHT SIDE FORM CONTAINER */}
          <motion.div
            initial={isDesktop ? { opacity: 0, y: 40 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: isDesktop ? 0.2 : 0,
              ease: "easeOut",
            }}
            className="relative w-full"
          >
            <div className="relative z-10 p-5 sm:p-8 md:p-12 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-8 md:py-16"
                  >
                    <div className="text-5xl md:text-6xl mb-6 select-none">
                      ✅
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {t("contact.success_title")}
                    </h3>
                    <p className="text-zinc-400 text-sm md:text-base max-w-sm mx-auto">
                      {t("contact.success_msg")}
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-8 text-[#d4af37] text-sm font-bold uppercase tracking-wider underline underline-offset-4 hover:text-white active:text-white transition-colors"
                    >
                      {t("contact.send_again")}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4 md:space-y-5"
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                      {/* NAME INPUT */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] md:text-xs text-zinc-500 ml-1 uppercase tracking-widest font-black select-none">
                          {t("contact.form.name")}
                        </label>
                        <input
                          type="text"
                          name="name"
                          placeholder={t("contact.form.name_placeholder")}
                          required
                          autoComplete="name"
                          className={inputStyles}
                        />
                      </div>

                      {/* EMAIL INPUT */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] md:text-xs text-zinc-500 ml-1 uppercase tracking-widest font-black select-none">
                          {t("contact.form.email")}
                        </label>
                        <input
                          type="email"
                          name="email"
                          placeholder="mail@example.com"
                          required
                          autoComplete="email"
                          className={inputStyles}
                        />
                      </div>
                    </div>

                    {/* MESSAGE TEXTAREA */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] md:text-xs text-zinc-500 ml-1 uppercase tracking-widest font-black select-none">
                        {t("contact.form.message")}
                      </label>
                      <textarea
                        name="message"
                        rows="4"
                        placeholder={t("contact.form.message_placeholder")}
                        required
                        className={`${inputStyles} resize-none`}
                      />
                    </div>

                    {/* SUBMIT BUTTON */}
                    <motion.button
                      whileHover={isDesktop ? { scale: 1.01 } : {}}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={status === "loading"}
                      className={`w-full py-4 rounded-xl md:rounded-2xl font-black text-sm md:text-base uppercase tracking-[0.2em] transition-all duration-300 ${
                        status === "loading"
                          ? "bg-zinc-800 text-zinc-500 cursor-wait"
                          : "bg-[#d4af37] text-black active:bg-white md:hover:bg-white shadow-[0_8px_25px_rgba(212,175,55,0.15)]"
                      }`}
                    >
                      {status === "loading"
                        ? t("contact.form.sending")
                        : t("contact.form.submit")}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactSection;
