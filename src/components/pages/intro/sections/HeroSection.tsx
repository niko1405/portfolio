type HeroSectionProps = {
  scrollY: number;
  vh: number;
};

/**
 * Intro hero with scale/fade effect tied to initial viewport scroll.
 */
export const HeroSection = ({ scrollY, vh }: HeroSectionProps) => {
  const opacity = vh > 0 ? Math.max(0, 1 - scrollY / (vh * 0.9)) : 1;
  const scale = 1 + scrollY * 0.0005;

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative z-30 bg-(--bg-main)">
      <div className="absolute inset-0 pointer-events-none">
        <span className="hero-corner hero-corner--tl" />
        <span className="hero-corner hero-corner--tr" />
        <span className="hero-corner hero-corner--bl" />
        <span className="hero-corner hero-corner--br" />
      </div>
      <div style={{ opacity, transform: `scale(${scale})` }} className="text-center px-6 relative z-10">
        <div className="font-mono text-xs md:text-sm text-(--text-dim) mb-8 tracking-[0.5em] uppercase border-b border-(--text-dim) pb-4 inline-block welcome-item welcome-delay-1">Portfolio 2026</div>
        <h1 className="text-[12vw] md:text-[15vw] font-poster font-bold tracking-tight leading-none text-(--text-primary) mix-blend-difference select-none welcome-item welcome-delay-2">WELCOME</h1>
        <div className="flex justify-center items-center gap-4 mt-4 welcome-item welcome-delay-3">
          <span className="h-px w-12 bg-[#333]"></span>
          <h2 className="text-xl md:text-3xl font-serif italic font-light text-(--text-secondary)">Nikolas • Student & Developer</h2>
          <span className="h-px w-12 bg-[#333]"></span>
        </div>
      </div>
      <div style={{ opacity }} className="absolute bottom-12 flex flex-col items-center gap-3 animate-bounce welcome-item welcome-delay-4">
        <div className="w-px h-8 bg-linear-to-b from-(--text-dim) to-transparent"></div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-(--text-dim)">Dive In</span>
      </div>
    </section>
  );
};
