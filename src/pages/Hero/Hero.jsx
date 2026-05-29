import Navbar from "../../components/Navbar";
import HeroText from "./components/HeroText";
import HeroVisual from "./components/HeroVisual";

const Hero = () => {
  return (
    // Changed bg layer wrapper to isolate rendering properties seamlessly
    <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0a] content-visibility-auto">
      <Navbar />

      {/* BACKGROUND GRADIENT AMBIENT LAYERS (Optimized to absolute positioning to prevent mobile scroll repaint lag) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Core Dark Matte Background Plate */}
        <div className="absolute inset-0 bg-[#0a0a0a]" />

        {/* Left Deep Charcoal Crimson Accent Blur Glow */}
        <div
          className="absolute -left-[30%] sm:-left-[20%] top-[15%] w-[70%] h-[60%] rounded-full blur-[120px] md:blur-[180px] opacity-70 sm:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(185,28,28,0.12) 0%, rgba(185,28,28,0) 70%)",
          }}
        />

        {/* Right Soft Amber Gold Glow */}
        <div
          className="absolute -right-[25%] sm:-right-[15%] top-[5%] w-[60%] h-[50%] rounded-full blur-[120px] md:blur-[180px] opacity-60 sm:opacity-100"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0) 70%)",
          }}
        />
      </div>

      {/* HERO CONTENT CONTAINER GRID */}
      <div
        id="hero"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col md:flex-row items-center justify-center md:justify-between pt-28 pb-12 sm:pt-32 md:pt-40 md:pb-24 min-h-screen gap-10 md:gap-4"
      >
        {/* TEXTUAL BLOCK LAYOUT */}
        <div className="w-full md:w-1/2 md:pr-6 lg:pr-10 flex items-center justify-center md:justify-start">
          <HeroText />
        </div>

        {/* VISUAL COMPONENTS BLOCK (Card flip structure container) */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center transition-transform duration-300">
          <HeroVisual />
        </div>
      </div>
    </main>
  );
};

export default Hero;
