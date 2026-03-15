import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ArrowRight, Server, Cloud, TrendingUp, Cpu, Layers, Lightbulb, Briefcase, Smartphone,
  User, X, Code2, ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useNavigate, useLocation } from 'react-router-dom';

// --- HOOKS ---

const useScrollProgress = () => {
  const [scrollY, setScrollY] = useState(0);
  const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);

  useEffect(() => {
    let scrollRaf: number | null = null;
    let resizeRaf: number | null = null;

    const handleScroll = () => {
      if (scrollRaf !== null) return;
      scrollRaf = window.requestAnimationFrame(() => {
        scrollRaf = null;
        const nextScrollY = window.scrollY;
        setScrollY(prev => (prev === nextScrollY ? prev : nextScrollY));
      });
    };

    const handleResize = () => {
      if (resizeRaf !== null) return;
      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = null;
        const nextVh = window.innerHeight;
        setVh(prev => (Math.abs(prev - nextVh) >= 24 ? nextVh : prev));
      });
    };

    setVh(window.innerHeight);
    setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (scrollRaf !== null) window.cancelAnimationFrame(scrollRaf);
      if (resizeRaf !== null) window.cancelAnimationFrame(resizeRaf);
    };
  }, []);

  return { scrollY, vh };
};

// InView Hook
const useInView = (threshold = 0.2) => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  return [ref, active] as const;
};

// Mouse Tilt Hook
const useTilt = (activeRef: React.RefObject<HTMLDivElement>) => {
  const [transform, setTransform] = useState('');

  useEffect(() => {
    const el = activeRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -15; 
      const rotateY = ((x - centerX) / centerX) * 15;  

      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`);
    };

    const handleReset = () => setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleReset);
    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleReset);
    };
  }, [activeRef]);

  return transform;
};

// --- BEZIER HELPERS ---
function getCubicBezierPoint(t: any, p0: any, p1: any, p2: any, p3: any) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;
  let x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
  let y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;
  return { x, y };
}

// --- COMPONENTS ---

/**
 * Das kreisförmige Profilbild mit optionalem Tilt-Effekt.
 */
const ProfileCircle = ({ transform, src }: { transform?: string; src: string }) => (
  <div 
    className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 transition-transform duration-200 ease-out"
    style={{ transform: transform || 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }}
  >
    {/* Dekorativer Puls-Ring */}
    <div className="absolute inset-0 rounded-full border border-[var(--text-primary)] opacity-10 scale-110 animate-pulse pointer-events-none" />
    
    {/* Hauptbild-Container */}
    <div className="w-full h-full rounded-full overflow-hidden border-2 border-[var(--border)] shadow-2xl relative bg-[var(--bg-panel)]">
      <img
        src={src}
        alt="Nikolas Portfolio"
        className="w-full h-full object-cover"
        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop";
        }}
      />
    </div>
  </div>
);

/**
 * Der dekorative Card-Container für die Desktop-Ansicht.
 */
const DesktopIdentityCard = ({ tiltTransform, imageSrc, containerRef }: { tiltTransform: string; imageSrc: string; containerRef: React.Ref<HTMLDivElement> }) => (
  <div
    ref={containerRef}
    className="hidden md:flex w-full aspect-[3/4] max-w-[340px] bg-[var(--bg-panel)] border border-[var(--border)] relative group overflow-hidden transition-all duration-700 ease-out items-center justify-center hover:scale-[1.03] hover:border-[var(--text-dim)] shadow-2xl"
    style={{ boxShadow: '0 30px 60px var(--shadow-color)' }}
  >
    {/* Hintergrund-Gitter */}
    <div className="absolute inset-0 opacity-30 pointer-events-none bg-grid-pattern" />
    
    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
       <ProfileCircle transform={tiltTransform} src={imageSrc} />
       <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[var(--text-dim)] dark:via-gray-500 to-transparent opacity-30 dark:opacity-50 mb-4 mt-10" />
       <p className="font-mono text-[10px] tracking-[0.3em] text-[var(--text-dim)] dark:text-gray-400 uppercase">Digital Architect // 2026</p>
    </div>

    {/* Ecken-Akzente */}
    <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[var(--border)] group-hover:border-[var(--text-primary)] transition-colors" />
    <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[var(--border)] group-hover:border-[var(--text-primary)] transition-colors" />
    <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[var(--border)] group-hover:border-[var(--text-primary)] transition-colors" />
    <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[var(--border)] group-hover:border-[var(--text-primary)] transition-colors" />
  </div>
);

// 1. Sudden Lines Component
const SuddenLines = ({ scrollY, vh }) => {
  const { isDarkMode } = useApp();
  const lines = [
    { start: 1.2, end: 2.2, path: "M 0 30 L 100 30", color: isDarkMode ? "#222" : "#ddd" },
    { start: 2.8, end: 4.0, path: "M 50 0 L 50 100", color: isDarkMode ? "#222" : "#ddd" },
    { start: 4.5, end: 6.0, path: "M 0 80 Q 50 20 100 80", color: isDarkMode ? "#333" : "#ccc" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {lines.map((line, i) => {
          const startPx = line.start * vh;
          const endPx = line.end * vh;
          const progress = vh > 0 ? Math.max(0, Math.min(1, (scrollY - startPx) / (endPx - startPx))) : 0;
          const active = scrollY > startPx && scrollY < endPx;
          if (!active && progress === 0) return null;
          return (
            <path key={i} d={line.path} fill="none" stroke={line.color} strokeWidth="0.1" vectorEffect="non-scaling-stroke" strokeDasharray="100" strokeDashoffset={100 - (progress * 100)} style={{ opacity: active ? 1 : 0 }} />
          );
        })}
      </svg>
    </div>
  );
};

// 2. Hero Section
const HeroSection = ({ scrollY, vh }) => {
  const opacity = vh > 0 ? Math.max(0, 1 - scrollY / (vh * 0.9)) : 1;
  const scale = 1 + (scrollY * 0.0005);
  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative z-30 bg-[var(--bg-main)]">
      <div className="absolute inset-0 pointer-events-none">
        <span className="hero-corner hero-corner--tl" />
        <span className="hero-corner hero-corner--tr" />
        <span className="hero-corner hero-corner--bl" />
        <span className="hero-corner hero-corner--br" />
      </div>
      <div style={{ opacity, transform: `scale(${scale})` }} className="text-center px-6 relative z-10">
        <div className="font-mono text-xs md:text-sm text-[var(--text-dim)] mb-8 tracking-[0.5em] uppercase border-b border-[var(--text-dim)] pb-4 inline-block welcome-item welcome-delay-1">Portfolio 2026</div>
        <h1 className="text-[12vw] md:text-[15vw] font-poster font-bold tracking-tight leading-none text-[var(--text-primary)] mix-blend-difference select-none welcome-item welcome-delay-2">WELCOME</h1>
        <div className="flex justify-center items-center gap-4 mt-4 welcome-item welcome-delay-3">
          <span className="h-px w-12 bg-[#333]"></span>
          <h2 className="text-xl md:text-3xl font-serif italic font-light text-[var(--text-secondary)]">Nikolas • Student & Developer</h2>
          <span className="h-px w-12 bg-[#333]"></span>
        </div>
      </div>
      <div style={{ opacity }} className="absolute bottom-12 flex flex-col items-center gap-3 animate-bounce welcome-item welcome-delay-4">
        <div className="w-px h-8 bg-gradient-to-b from-[var(--text-dim)] to-transparent"></div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">Dive In</span>
      </div>
    </section>
  );
};

// 3. Intro Section (Who Am I)
const IntroSection = () => {
  const [ref, active] = useInView(0.2);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageTilt = useTilt(cardRef);
  const PROFILE_IMG = "Modern Elegant Lebenslauf Beige Weiß.jpg";

  const handleExploreClick = () => {
    const bridgeSection = document.getElementById('bridge-section');
    if (bridgeSection) {
      bridgeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      ref={ref} 
      className="sticky top-0 h-screen z-0 flex items-center justify-center overflow-hidden bg-[var(--bg-main)] transition-colors duration-700"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] aspect-square bg-[var(--text-primary)] opacity-[0.03] dark:opacity-[0.05] blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] aspect-square bg-[var(--text-primary)] opacity-[0.03] dark:opacity-[0.05] blur-[100px] rounded-full" />
      </div>

      <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 relative z-10 h-full">
        
        {/* VISUAL PART */}
        <div className={`w-full md:w-1/3 flex justify-center transition-all duration-1000 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Mobile View */}
          <div className="md:hidden">
            <ProfileCircle src={PROFILE_IMG} />
          </div>
          {/* Desktop View */}
          <DesktopIdentityCard 
            containerRef={cardRef} 
            tiltTransform={imageTilt} 
            imageSrc={PROFILE_IMG} 
          />
        </div>

        {/* CONTENT PART */}
        <div className={`w-full md:w-2/3 flex flex-col transition-all duration-1000 delay-300 ${active ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          <div className="mb-6 hidden md:flex items-center gap-2">
            <div className="h-[1px] w-8 bg-[var(--text-dim)] opacity-40 dark:opacity-50" />
            <span className="font-mono text-[10px] tracking-widest text-[var(--text-dim)] dark:text-gray-400 uppercase">Who am i</span>
          </div>
          
          {/* Mobile: Row (WHO AM I + Quote), Desktop: Column */}
          <div className="flex flex-row md:flex-col items-center md:items-start gap-4 sm:gap-6 md:gap-8 mb-10 md:mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold text-[var(--text-primary)] leading-[0.85] tracking-tighter shrink-0">
              WHO <br />
              <span className="text-[var(--text-dim)] dark:text-gray-500 opacity-20 dark:opacity-60 italic font-serif">AM I?</span>
            </h2>
            
            <p className="font-serif italic text-xs sm:text-lg md:text-2xl text-[var(--text-secondary)] dark:text-gray-300 leading-tight md:leading-relaxed border-l-2 border-[var(--border)] dark:border-gray-600 pl-4 md:pl-8 max-w-[160px] sm:max-w-xs md:max-w-xl">
              "A digital craftsman blending business logic with architectural precision."
            </p>
          </div>
          
          {/* Details & Action */}
          <div className="grid grid-cols-1 gap-10">
            <div className="font-mono text-xs md:text-sm text-[var(--text-dim)] dark:text-gray-400 leading-relaxed space-y-6 max-w-xl text-center md:text-left">
              <p>
                Als Student der <span className="text-[var(--text-primary)] dark:text-white font-bold">Wirtschaftsinformatik</span> verstehe ich beide Welten: 
                Die strategische Notwendigkeit und die technische Exzellenz.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center md:justify-start">
                <div className="flex items-center gap-3">
                  <Briefcase size={14} className="text-[var(--text-secondary)] shrink-0" />
                  <span className="text-[var(--text-secondary)]">Praxissemester 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <Code2 size={14} className="text-[var(--text-secondary)] shrink-0" />
                  <span className="text-[var(--text-secondary)]">React & Node Stack</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center md:justify-start">
              <button onClick={handleExploreClick} className="group flex items-center justify-center gap-4 bg-[var(--accent)] dark:bg-white text-[var(--bg-main)] dark:text-black px-8 py-4 md:px-10 md:py-5 font-mono text-[10px] md:text-xs tracking-[0.2em] hover:opacity-90 dark:hover:opacity-80 transition-all shadow-xl dark:shadow-2xl w-full sm:w-max">
                EXPLORE
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// 4. Reveal Text (Bridge) - ÜBERDECKT INTRO
const BridgeSection = ({ scrollY, vh }) => {
  const [ref, active] = useInView(0.4);

  const words = "I bridge the gap between abstract business requirements and concrete software architecture.".split(" ");

  return (
    // Z-10 um über der sticky IntroSection (z-0) zu liegen
    <section id="bridge-section" ref={ref} className="min-h-[60vh] flex items-center justify-center relative z-10 bg-[var(--bg-main)] py-24 border-t border-[var(--border)]">
      <div className={`max-w-5xl px-8 text-center ${active ? 'reveal-active' : ''} reveal-text`}>
        <h2 className="text-3xl md:text-6xl font-light leading-tight">
          {words.map((word, i) => (
            <span key={i} style={{ transitionDelay: `${i * 30}ms` }} className="mr-3 inline-block">
              {word === "business" || word === "software" ? <b className="font-serif italic text-[var(--text-primary)] border-b border-[var(--accent)]">{word}</b> : <span className="text-[var(--text-dim)]">{word}</span>}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};

// 5. Posters / Passions
type PosterCardProps = {
  title: string;
  icon: any;
  desc: string;
  index: number;
  isDarkMode: boolean;
  compact?: boolean;
};

const PosterCard = React.memo(({ title, icon: Icon, desc, index, isDarkMode, compact = false }: PosterCardProps) => {
  const isWhiteBackground = index % 2 === 0;
  const isModeWhite = isWhiteBackground ? !isDarkMode : isDarkMode;
  const bgClass = isModeWhite ? 'bg-white text-black' : 'bg-black text-white';
  const borderColor = isModeWhite ? 'border-black' : 'border-white';
  const textColor = isModeWhite ? 'text-black' : 'text-white';

  return (
    <div className={`
      poster-card ${compact ? 'w-[250px] h-[360px] mx-3 p-6' : 'w-[320px] md:w-[450px] h-[520px] mx-6 p-10'}
      shrink-0 flex flex-col justify-between border
      ${bgClass} ${borderColor}
      relative overflow-hidden group
    `}>
      {!compact && (
        <>
          <div className={`absolute inset-0 opacity-5 ${isModeWhite ? 'bg-grid-pattern-dark' : 'bg-grid-pattern'}`}></div>
          <div className={`absolute top-10 right-10 w-12 h-12 border-t border-r ${borderColor} opacity-50`}></div>
          <div className={`absolute bottom-10 left-10 w-12 h-12 border-b border-l ${borderColor} opacity-50`}></div>
        </>
      )}
      <div className="flex justify-between items-start relative z-10">
        <div className={`p-4 border ${borderColor} rounded-full ${textColor}`}>
          <Icon size={compact ? 24 : 32} strokeWidth={1} />
        </div>
        <span className={`font-mono text-xs tracking-widest uppercase border ${borderColor} px-2 py-1 rounded ${textColor}`}>0{index % 4 + 1} // DRIVER</span>
      </div>
      <div className="relative z-10">
        <h3 className={`font-poster ${compact ? 'text-4xl' : 'text-6xl'} uppercase leading-[0.85] mb-6 tracking-tight ${textColor}`}>{title}</h3>
        <div className={`h-px w-12 ${borderColor} mb-6`}></div>
        <p className={`font-mono ${compact ? 'text-xs' : 'text-xs md:text-sm'} leading-relaxed ${isModeWhite ? 'opacity-70' : 'opacity-60'}`}>{desc}</p>
      </div>
    </div>
  );
});

const PassionsMarqueeSection = React.memo(() => {
  const { isDarkMode } = useApp();
  const [isCompactMarquee, setIsCompactMarquee] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsCompactMarquee(media.matches);
    update();

    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const drivers = [
    { title: "Tech", icon: Cpu, desc: "Technologie als Werkzeug. Immer am Puls der Zeit, aber nie dem Hype verfallen." },
    { title: "Solve", icon: Lightbulb, desc: "Komplexe Herausforderungen verlangen nach eleganten Lösungen. Ich liefere sie." },
    { title: "Business", icon: Briefcase, desc: "Verständnis für Märkte und Prozesse. Code muss Wert schaffen." },
    { title: "Growth", icon: TrendingUp, desc: "Stillstand ist Rückschritt. Ich suche Herausforderungen." },
  ];

  const firstRow = [...drivers, ...drivers];
  const secondRow = [...drivers, ...drivers].reverse();

  const rowPauseClass = isCompactMarquee ? '' : 'hover:[animation-play-state:paused]';

  return (
    <section
      className="py-32 bg-[var(--bg-main)] overflow-hidden relative z-10"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}
    >
      <div className="mb-20 px-8 flex flex-col items-center justify-center max-w-7xl mx-auto text-center">
        <h2 className="text-5xl md:text-8xl font-poster text-[var(--text-primary)] mb-4 uppercase tracking-tight">My Passion</h2>
        <span className="font-mono text-xs text-[var(--text-dim)] tracking-[0.5em] uppercase border border-[var(--text-dim)] px-4 py-2 rounded-full">Core Drivers & Philosophy</span>
      </div>
      <div className={`flex flex-col ${isCompactMarquee ? 'gap-8' : 'gap-16'}`}>
        <div className={`marquee-track flex w-max animate-marquee ${rowPauseClass}`}>
          {firstRow.map((d, i) => <PosterCard key={`r1-${i}`} {...d} index={i} isDarkMode={isDarkMode} compact={isCompactMarquee} />)}
        </div>
        {!isCompactMarquee && (
          <div className={`marquee-track flex w-max animate-marquee-reverse ${rowPauseClass} translate-x-[-100px]`}>
            {secondRow.map((d, i) => <PosterCard key={`r2-${i}`} {...d} index={i + 4} isDarkMode={isDarkMode} />)}
          </div>
        )}
      </div>
    </section>
  );
});

// 6. Professional Poster Card Design
const PosterProjectCard = ({ project, index, isVisible, shouldAnimate }) => {
  let animationClass = '';
  if (!isVisible) {
    animationClass = '';
  } else if (shouldAnimate) {
    animationClass = 'project-card--visible';
  } else {
    animationClass = 'project-card--static';
  }

  return (
    <div
      className={`project-card w-[85vw] md:w-[60vw] h-[85vh] md:h-[90vh] shrink-0 relative group cursor-pointer mr-8 md:mr-24 last:mr-0 perspective-container ${animationClass}`}
      style={{ transitionDelay: (isVisible && shouldAnimate) ? `${index * 150}ms` : '0ms' }}
    >
      <div className="w-full h-full bg-[var(--bg-panel)] border border-[var(--text-primary)] relative overflow-hidden flex flex-col transition-all duration-500 group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-main)]">

        <div className="absolute -right-8 -bottom-16 text-[15rem] md:text-[22rem] font-poster leading-none text-[var(--text-primary)] opacity-5 group-hover:opacity-10 pointer-events-none select-none z-0 group-hover:text-[var(--bg-main)] transition-colors">
          0{index + 1}
        </div>

        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-[20%] left-0 w-full h-px bg-current"></div>
          <div className="absolute top-0 left-[30%] w-px h-full bg-current"></div>
          <div className="absolute top-[20%] left-[70%] w-px h-[80%] bg-current"></div>
        </div>

        <div className="h-[20%] flex-none flex relative z-10 font-mono text-xs uppercase tracking-widest border-b border-[var(--text-primary)] group-hover:border-[var(--bg-main)]">
          <div className="w-[30%] border-r border-[var(--text-primary)] group-hover:border-[var(--bg-main)] p-4 md:p-6 flex flex-col justify-between">
            <span className="opacity-70">CASE 0{index + 1}</span>
            <span className="text-xl font-bold">{project.year}</span>
          </div>
          <div className="flex-grow p-4 md:p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="opacity-70">Role & Context</span>
              <div className="w-2 h-2 rounded-full bg-current"></div>
            </div>
            <span className="font-bold text-lg leading-tight">{project.role} // {project.context}</span>
          </div>
        </div>

        <div className="flex-grow flex relative z-10 overflow-hidden">
          <div className="w-[30%] border-r border-[var(--text-primary)] group-hover:border-[var(--bg-main)] p-4 md:p-6 flex flex-col justify-between py-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase opacity-60">Focus</span>
              <span className="font-serif italic text-base md:text-lg leading-tight">{project.focus}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase opacity-60">Stack</span>
              <div className="flex flex-col gap-1.5">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] md:text-xs font-bold border border-current px-2 py-1 w-max">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="w-[70%] p-6 md:p-10 flex flex-col justify-between h-full">
            <div className="flex justify-end mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-current rounded-full flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
                {project.icon}
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-poster uppercase leading-[0.9] tracking-tight break-words mb-4 md:mb-6">
                {project.title.split(' ').map((word, i) => <div key={i}>{word}</div>)}
              </h3>
              <p className="font-serif text-sm md:text-base leading-relaxed opacity-90 border-l-2 border-current pl-4 line-clamp-3 md:line-clamp-none">
                {project.desc}
              </p>
            </div>
          </div>
        </div>

        <div className="h-10 flex-none border-t border-[var(--text-primary)] group-hover:border-[var(--bg-main)] flex items-center px-6 font-mono text-[10px] uppercase justify-between relative z-10 bg-[var(--bg-panel)] group-hover:bg-[var(--text-primary)] transition-colors">
          <div className="flex gap-4 overflow-hidden whitespace-nowrap">
            <span className="opacity-70">Deliverables:</span>
            <span className="font-bold truncate max-w-[150px] md:max-w-none">{project.deliverables}</span>
          </div>
          <div className="flex gap-2 items-center group-hover:underline shrink-0 pl-4">
            <span>View Details</span>
            <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- REST OF COMPONENTS ---

const DynamicProjectTitle = ({ text, active, progress }) => {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (!active) {
      setVisibleChars(0);
      return;
    }
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setVisibleChars(prev => {
          if (prev >= text.length) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 40);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timeout);
  }, [active, text]);

  const words = text.split(" ");

  return (
    <div className="relative z-10 flex flex-col md:block">
      {words.map((word, wIndex) => {
        const xOffset = wIndex === 0 ? progress * -40 : progress * 40;
        const yOffset = wIndex === 0 ? progress * -20 : progress * 20;

        return (
          <span
            key={wIndex}
            className={`inline-block mr-4 md:mr-8 will-change-transform ${wIndex === 1 ? 'mt-[-0.2em] md:mt-0' : ''}`}
            style={{
              transform: `translate(${xOffset}px, ${yOffset}px)`,
              transition: 'transform 0.1s linear'
            }}
          >
            {word.split("").map((char, cIndex) => {
              const previousChars = words.slice(0, wIndex).join("").length + wIndex;
              const globalIndex = previousChars + cIndex;
              const isVisible = globalIndex < visibleChars;
              const isFirstWord = wIndex === 0;

              return (
                <span
                  key={cIndex}
                  className={`inline-block transition-opacity duration-100 
                    ${isVisible ? 'opacity-100' : 'opacity-0'}
                    ${isFirstWord ? 'font-poster' : 'font-serif italic'}
                  `}
                  style={{
                    color: isFirstWord ? '#ffffff' : 'transparent',
                    WebkitTextStroke: !isFirstWord ? '1px #ffffff' : undefined,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
};

// 7. SCROLL-BASED INTERLUDE
const InterludeSection = ({ scrollY, vh }) => {
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sectionHeight = isMobile ? vh * 1.35 : vh * 3;

  useEffect(() => {
    if (!containerRef.current) return;
    const start = containerRef.current.offsetTop;
    const end = start + sectionHeight - vh;

    const dist = sectionHeight - vh;
    const safeDist = dist > 0 ? dist : 1;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll >= start && currentScroll <= end) {
        setActive(true);
        const p = (currentScroll - start) / safeDist;
        setProgress(Math.max(0, Math.min(1, p)));
      } else if (currentScroll < start) {
        setActive(false);
        setProgress(0);
      } else {
        setActive(true);
        setProgress(1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY, vh, sectionHeight]);

  const visualProgress = progress;

  const t1 = visualProgress;
  const scale1 = 1 + t1 * 4;
  const rot1 = t1 * 45;
  const op1 = Math.max(0, 1 - t1 * 1.5);

  const t2 = Math.max(0, visualProgress - 0.15);
  const scale2 = 0.5 + t2 * 4;
  const rot2 = -t2 * 90;
  const op2 = visualProgress < 0.15 ? 0 : Math.max(0, 1 - (t2 * 1.5));

  const t3 = Math.max(0, visualProgress - 0.3);
  const scale3 = 0.2 + t3 * 4;
  const rot3 = t3 * 135;
  const op3 = visualProgress < 0.3 ? 0 : Math.max(0, 1 - (t3 * 1.5));

  const contentScale = isMobile
    ? Math.min(1, 0.9 + visualProgress * 0.12)
    : Math.min(1, 0.5 + (Math.max(0, visualProgress - 0.5) * 2));

  const contentOpacity = isMobile
    ? Math.min(1, Math.max(0, (visualProgress - 0.08) * 2.2))
    : Math.max(0, (visualProgress - 0.6) * 2.5);

  const contentBlur = isMobile
    ? Math.max(0, 6 - visualProgress * 10)
    : Math.max(0, 10 - (visualProgress - 0.6) * 50);

  const headingLift = isMobile ? Math.max(0, 26 - visualProgress * 34) : 0;
  const quoteLift = isMobile ? Math.max(0, 18 - visualProgress * 26) : 0;
  const chipsLift = isMobile ? Math.max(0, 14 - visualProgress * 20) : 0;
  const poetryWord = 'POETRY';
  const poetryRevealProgress = isMobile ? Math.min(1, Math.max(0, (visualProgress - 0.22) * 3.2)) : 1;
  const poetryVisibleChars = Math.round(poetryWord.length * poetryRevealProgress);

  return (
    <section
      ref={containerRef}
      style={{ height: `${sectionHeight}px` }}
      className="relative z-10 bg-[var(--bg-main)]"
    >
      <div className={`${isMobile ? 'h-full min-h-[75vh]' : 'sticky top-0 h-screen'} w-full overflow-hidden flex flex-col items-center justify-center`}>

        {/* DESKTOP ONLY: Rotating Tunnel Effect Elements */}
        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute border border-dashed border-[var(--text-dim)] transition-transform duration-75 ease-linear will-change-transform"
              style={{
                width: '50vw', height: '50vw',
                transform: `scale(${scale1}) rotate(${rot1}deg)`,
                opacity: op1
              }}
            ></div>

            <div
              className="absolute border-[2px] border-[var(--text-primary)] flex items-center justify-center transition-transform duration-75 ease-linear will-change-transform"
              style={{
                width: '35vw', height: '35vw',
                transform: `scale(${scale2}) rotate(${rot2}deg)`,
                opacity: op2
              }}
            >
              <div className="absolute inset-[-4px] border border-[var(--bg-main)]"></div>
            </div>

            <div
              className="absolute border-2 border-dotted border-[var(--text-secondary)] transition-transform duration-75 ease-linear will-change-transform"
              style={{
                width: '20vw', height: '20vw',
                transform: `scale(${scale3}) rotate(${rot3}deg)`,
                opacity: op3
              }}
            ></div>
          </div>
        )}

        {/* MOBILE ONLY: Subtle Vertical Accent Lines */}
        {isMobile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-px h-48 bg-gradient-to-b from-transparent to-[var(--text-primary)] opacity-20 absolute left-1/4 -translate-x-1/2"
              style={{ transform: `scaleY(${contentOpacity}) translateY(-${contentOpacity * 40}px)`, transformOrigin: 'center' }}
            ></div>
            <div className="w-px h-48 bg-gradient-to-b from-[var(--text-dim)] to-transparent opacity-20 absolute right-1/4 translate-x-1/2"
              style={{ transform: `scaleY(${contentOpacity}) translateY(${contentOpacity * 40}px)`, transformOrigin: 'center' }}
            ></div>
          </div>
        )}

        {/* ORBITAL SYSTEM (nur Desktop) */}
        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: `scale(${contentScale})`, opacity: contentOpacity }}>
            <div className="absolute w-[60vw] h-[60vw] md:w-[600px] md:h-[600px] border border-[var(--text-dim)] rounded-full opacity-10 animate-[spin_30s_linear_infinite]"></div>

            <div className="absolute w-[60vw] h-[60vw] md:w-[600px] md:h-[600px] animate-[spin_30s_linear_infinite]">
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-[var(--text-primary)] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </div>

            <div className="absolute w-[40vw] h-[40vw] md:w-[400px] md:h-[400px] border border-[var(--text-dim)] rounded-full opacity-10 animate-[spin_20s_linear_infinite_reverse]"></div>

            <div className="absolute w-[40vw] h-[40vw] md:w-[400px] md:h-[400px] animate-[spin_20s_linear_infinite_reverse]">
              <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-[var(--text-secondary)] rounded-full -translate-x-1/2 translate-y-1/2"></div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div
          className="relative z-10 flex flex-col items-center text-center px-6"
          style={{
            transform: `scale(${contentScale})`,
            opacity: contentOpacity,
            filter: `blur(${contentBlur}px)`
          }}
        >
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-[var(--accent)] opacity-20 blur-xl rounded-full scale-150 animate-pulse"></div>
            <span className="relative font-mono text-xs text-[var(--text-primary)] tracking-[0.5em] uppercase z-10">
              Philosophy
            </span>
          </div>

          <div className="relative mb-6 md:mb-8">
            <h2
              className="text-5xl md:text-8xl font-poster text-[var(--text-primary)] leading-none"
              style={{
                mixBlendMode: 'difference',
                transform: `translateY(${headingLift}px)`,
                letterSpacing: isMobile ? `${Math.max(0, 0.12 - visualProgress * 0.12)}em` : undefined,
                transition: 'transform 140ms linear, letter-spacing 140ms linear'
              }}
            >
              CODE IS <br />
              <span
                className="inline-block font-serif italic font-light opacity-80"
                style={{
                  transform: isMobile ? `translateY(${Math.max(0, 34 - visualProgress * 42)}px)` : undefined,
                  opacity: isMobile ? Math.min(1, Math.max(0, (visualProgress - 0.2) * 2.3)) : undefined,
                  transition: 'transform 160ms linear, opacity 160ms linear'
                }}
              >
                <span className="inline-block min-w-[6.5ch] text-left">
                  {isMobile ? poetryWord.slice(0, poetryVisibleChars) : poetryWord}
                </span>
                {isMobile && poetryRevealProgress < 1 && (
                  <span className="inline-block ml-1 align-middle w-px h-[0.9em] bg-current opacity-70 animate-pulse" />
                )}
              </span>
            </h2>
          </div>

          <p
            className="font-serif italic text-lg md:text-2xl text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed mb-8"
            style={{
              transform: `translateY(${quoteLift}px)`,
              opacity: isMobile ? Math.min(1, Math.max(0, (visualProgress - 0.28) * 1.9)) : undefined,
              transition: 'transform 160ms linear, opacity 160ms linear'
            }}
          >
            "Building the future with precision, passion, and purpose."
          </p>

          <div
            className="mt-8 flex justify-center gap-8 md:gap-24 opacity-50"
            style={{
              transform: `translateY(${chipsLift}px)`,
              opacity: isMobile ? Math.min(0.5, Math.max(0, (visualProgress - 0.38) * 1.4)) : undefined,
              transition: 'transform 180ms linear, opacity 180ms linear'
            }}
          >
            {['Curiosity', 'Precision', 'Impact'].map((item, i) => (
              <div key={item} className="relative">
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest border-b border-transparent hover:border-current transition-colors cursor-default pb-1">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectsHorizontalSection = ({ scrollY, vh }) => {
  const containerRef = useRef(null);
  const [inViewRef, active] = useInView(0.1);
  const [shouldAnimateEntrance, setShouldAnimateEntrance] = useState(true);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const setRefs = (node) => {
    containerRef.current = node;
    inViewRef.current = node;
  };

  const sectionHeight = vh * 4;
  const start = containerRef.current ? containerRef.current.offsetTop : 0;
  const dist = Math.max(1, sectionHeight - vh);
  const progress = Math.max(0, Math.min(1, (scrollY - start) / dist));

  useEffect(() => {
    if (active) {
      if (progress > 0.5) {
        setShouldAnimateEntrance(false);
      } else {
        setShouldAnimateEntrance(true);
      }
    }
  }, [active]);

  const projects = [
    {
      title: "Azure VM",
      role: "Solo Dev",
      context: "Freelance",
      year: "2024",
      focus: "Cost Optimization",
      tags: ["Azure", "React", "Linux"],
      icon: <Cloud strokeWidth={1.5} size={28} />,
      desc: "Serverless dashboard reducing cloud costs by 60%. Automated scaling logic.",
      deliverables: "Web App, Docs"
    },
    {
      title: "K8s Cluster",
      role: "Backend Lead",
      context: "Academic",
      year: "2023",
      focus: "Scalability",
      tags: ["Java", "Docker", "K8s"],
      icon: <Server strokeWidth={1.5} size={28} />,
      desc: "Scalable microservices architecture with Spring Boot and resilient patterns.",
      deliverables: "CI/CD, API"
    },
    {
      title: "7 In The Wild",
      role: "Full Stack",
      context: "Personal",
      year: "2022",
      focus: "Geolocation",
      tags: ["Expo", "Maps", "Node"],
      icon: <Smartphone strokeWidth={1.5} size={28} />,
      desc: "Outdoor challenge platform for urban explorers connecting via GPS.",
      deliverables: "Mobile App"
    },
    {
      title: "Study Maxer",
      role: "UX Researcher",
      context: "Academic",
      year: "2023",
      focus: "Productivity",
      tags: ["Figma", "UX", "Data"],
      icon: <Layers strokeWidth={1.5} size={28} />,
      desc: "User-centered design focused on student workflow optimization.",
      deliverables: "Prototype"
    },
  ];

  // Desktop: horizontal scroll
  const totalWidthVw = (projects.length * 60) + ((projects.length - 1) * 6);
  const xMove = progress * (totalWidthVw - 80);

  return (
    <section
      ref={setRefs}
      style={isMobile ? { minHeight: '100vh' } : { height: `${sectionHeight}px` }}
      className="relative z-10 bg-[var(--bg-main)]"
    >
      {isMobile ? (
        // MOBILE: Header + Global Page Scroll
        <div className="relative w-full bg-[var(--bg-main)]">
          <div className="relative z-20 px-6 md:px-10 pt-8 pb-5 border-b border-[var(--border)] bg-[var(--bg-main)]/95 backdrop-blur-sm shrink-0">
            <div style={{ mixBlendMode: 'difference' }}>
              <div className="text-4xl md:text-6xl uppercase tracking-tight leading-none text-[var(--bg-main)] dark:text-[var(--bg-main)]">
                <span className="block font-poster text-[var(--text-primary)]">PROJECT</span>
                <span className="block font-poster text-[var(--text-primary)]">ARCHIVES</span>
              </div>
              <div className="mt-2 font-mono text-xs text-[var(--text-dim)] tracking-[0.3em]">
                SELECTED WORKS 2022 — 2026
              </div>
            </div>
          </div>

          <div className="px-4 md:px-6 py-4 space-y-4 md:space-y-5">
            {projects.map((p, i) => (
              <div
                key={i}
                className="project-card-mobile w-full h-auto bg-[var(--bg-panel)] border border-[var(--text-primary)] p-4 md:p-6 rounded-sm"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase opacity-70">CASE 0{i + 1}</span>
                    <div className="text-2xl md:text-3xl font-bold font-poster mt-2">{p.title}</div>
                  </div>
                  <span className="text-lg md:text-xl font-bold">{p.year}</span>
                </div>
                <div className="mb-3 md:mb-4">
                  <span className="font-mono text-[10px] uppercase opacity-60">Focus</span>
                  <p className="font-serif italic text-sm md:text-base mt-1">{p.focus}</p>
                </div>
                <div className="mb-4 md:mb-5">
                  <span className="font-mono text-[10px] uppercase opacity-60 block mb-2">Role & Context</span>
                  <span className="text-xs md:text-sm font-bold">{p.role} // {p.context}</span>
                </div>
                <p className="font-serif text-sm leading-relaxed opacity-90 border-l-2 border-[var(--text-primary)] pl-3 mb-4">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.map(tag => (
                    <span key={tag} className="text-[9px] md:text-xs font-bold border border-current px-2 py-1">{tag}</span>
                  ))}
                </div>
                <div className="pt-3 border-t border-[var(--text-primary)] font-mono text-[10px] uppercase flex items-center justify-between">
                  <span className="opacity-70">Deliverables: <span className="font-bold">{p.deliverables}</span></span>
                  <span className="flex items-center gap-1 hover:underline cursor-pointer">View <ArrowRight size={10} /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // DESKTOP: Horizontal Carousel (UNCHANGED)
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col bg-[var(--bg-main)] isolate">
          <div
            className="absolute top-8 md:top-12 left-8 md:left-12 z-50 pointer-events-none"
            style={{ mixBlendMode: 'difference' }}
          >
            <div className="text-5xl md:text-8xl uppercase tracking-tight leading-none text-[var(--bg-main)] dark:text-[var(--bg-main)]">
              <DynamicProjectTitle text="PROJECT ARCHIVES" active={active} progress={progress} />
            </div>
            <div className={`mt-2 font-mono text-xs text-[var(--bg-main)] dark:text-[var(--bg-main)] tracking-[0.3em] transition-opacity duration-700 delay-700 ${active ? 'opacity-100' : 'opacity-0'}`}>
              SELECTED WORKS 2022 — 2026
            </div>
          </div>

          <div className="flex items-end pb-0 h-full flex-grow pt-0">
            <div
              className={`flex pl-8 md:pl-24 will-change-transform project-rail ${active ? 'project-rail--active' : ''}`}
              style={{
                transform: `translate3d(-${xMove}vw, 0, 0)`
              }}
            >
              {projects.map((p, i) => (
                <PosterProjectCard
                  key={i}
                  project={p}
                  index={i}
                  isVisible={active}
                  shouldAnimate={shouldAnimateEntrance}
                />
              ))}
              <div className="w-[20vw] shrink-0" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Mobile Project Card Component

// 6. FINAL CIRCUIT SEQUENCE (ABSOLUTE SCROLLING)
const FinalCircuitSequence = ({ scrollY, vh, onEnter }: { scrollY: number; vh: number; onEnter: () => void }) => {
  const { isDarkMode } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  const [isCompactViewport, setIsCompactViewport] = useState(typeof window !== 'undefined' ? window.innerWidth < 1280 : false);
  const sectionHeight = isMobile ? vh : vh * 5.5;
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsCompactViewport(window.innerWidth < 1280);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const start = containerRef.current ? containerRef.current.offsetTop : 0;
  const dist = sectionHeight - vh;
  const desktopProgress = dist > 0 ? Math.max(0, Math.min(1, (scrollY - start) / dist)) : 0;
  const mobileProgress = Math.max(0, Math.min(1, (scrollY - (start - vh * 0.55)) / (vh * 0.55)));
  const progress = isMobile ? mobileProgress : desktopProgress;
  const leftShift = -mouseOffset.y;
  const rightShift = mouseOffset.y;
  const mobileReveal = Math.min(1, Math.max(0, (progress - 0.08) * 2.3));
  const mobileHeadingLift = Math.max(0, 24 - mobileReveal * 36);
  const mobileButtonLift = Math.max(0, 14 - mobileReveal * 24);
  const deepDiveWord = 'DEEP DIVE?';
  const deepDiveChars = Math.round(deepDiveWord.length * Math.min(1, Math.max(0, (progress - 0.22) * 2.9)));
  const compactArrowProgress = Math.min(1, Math.max(0, (progress - 0.12) * 2.2));
  const compactArrowOpacity = 0.16 + compactArrowProgress * 0.5;
  const compactArrowDashOffset = 140 - compactArrowProgress * 140;

  useEffect(() => {
    if (isCompactViewport) return;

    const handleMouseMove = (event: MouseEvent) => {
      const target = containerRef.current;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width;
      const relY = (event.clientY - rect.top) / rect.height;
      const offsetX = (relX - 0.5) * 80;
      const offsetY = (relY - 0.5) * 80;
      setMouseOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isCompactViewport]);

  useEffect(() => {
    // Only render complex canvas arrows on larger desktop screens.
    if (isCompactViewport) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = container.clientHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const noiseSteps = 500;
    const noiseMap: any[] = [];
    for (let i = 0; i <= noiseSteps; i++) {
      noiseMap.push({ x: (Math.random() - 0.5) * 1.5, y: (Math.random() - 0.5) * 1.5 });
    }

    let animationFrameId: any;

    const render = () => {
      if (!ctx) return;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const btn = buttonRef.current;
      const headline = headlineRef.current;

      if (!btn || !headline) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const sectionTop = container.offsetTop;

      const btnRect = btn.getBoundingClientRect();
      const headlineRect = headline.getBoundingClientRect();

      const btnY_Relative = (btnRect.top + window.scrollY) - sectionTop + (btnRect.height / 2);
      const hlY_Relative = (headlineRect.top + window.scrollY) - sectionTop;

      const btnLeftX = btnRect.left;
      const btnRightX = btnRect.right;
      const hlLeftX = headlineRect.left;
      const hlRightX = headlineRect.right;

      const startY = 0;

      // Responsive arrow positions
      const isMobileDevice = width < 768;

      const lines = [
        {
          // Left outer arrow - closer on mobile
          start: { x: width * (isMobileDevice ? 0.05 : -0.25), y: startY },
          end: { x: btnLeftX - (isMobileDevice ? 20 : 80), y: btnY_Relative },
          cp1: { x: width * (isMobileDevice ? 0.25 : 0.1), y: height * 0.15 },
          cp2: { x: btnLeftX - (isMobileDevice ? 120 : 400), y: btnY_Relative - (isMobileDevice ? 100 : 180) },
          color: isDarkMode ? '#ffffff' : '#000000',
          width: isMobileDevice ? 1.5 : 2.5,
          target: 'button',
          speed: 1.05
        },
        {
          // Left inner arrow - converging to center
          start: { x: width * (isMobileDevice ? 0.48 : 0.45), y: startY },
          end: { x: (hlLeftX + hlRightX) / 2 - (isMobileDevice ? 10 : 20), y: hlY_Relative - 20 },
          cp1: { x: width * (isMobileDevice ? 0.46 : 0.42), y: height * 0.35 },
          cp2: { x: (hlLeftX + hlRightX) / 2 - (isMobileDevice ? 80 : 150), y: hlY_Relative - (isMobileDevice ? 100 : 150) },
          color: isDarkMode ? '#666666' : '#999999',
          width: isMobileDevice ? 0.8 : 1,
          target: 'headline',
          speed: 1.2
        },
        {
          // Right inner arrow - converging to center
          start: { x: width * (isMobileDevice ? 0.52 : 0.55), y: startY },
          end: { x: (hlLeftX + hlRightX) / 2 + (isMobileDevice ? 10 : 20), y: hlY_Relative - 20 },
          cp1: { x: width * (isMobileDevice ? 0.54 : 0.58), y: height * 0.5 },
          cp2: { x: (hlLeftX + hlRightX) / 2 + (isMobileDevice ? 80 : 150), y: hlY_Relative - (isMobileDevice ? 120 : 200) },
          color: isDarkMode ? '#666666' : '#999999',
          width: isMobileDevice ? 1 : 1.5,
          target: 'headline',
          speed: 0.95
        },
        {
          // Right outer arrow - closer on mobile
          start: { x: width * (isMobileDevice ? 0.95 : 1.25), y: startY },
          end: { x: btnRightX + (isMobileDevice ? 20 : 80), y: btnY_Relative },
          cp1: { x: width * (isMobileDevice ? 0.75 : 0.9), y: height * 0.15 },
          cp2: { x: btnRightX + (isMobileDevice ? 120 : 400), y: btnY_Relative - (isMobileDevice ? 100 : 180) },
          color: isDarkMode ? '#ffffff' : '#000000',
          width: isMobileDevice ? 2 : 3,
          target: 'button',
          speed: 1.15
        }
      ];

      lines.forEach((line) => {
        let drawFactor = Math.pow(progress, line.speed);
        drawFactor = Math.max(0, Math.min(1, drawFactor));

        const segments = Math.floor(drawFactor * 150);
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = line.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        let prevPoint = getCubicBezierPoint(0, line.start, line.cp1, line.cp2, line.end);

        for (let i = 1; i <= segments; i++) {
          const t = i / 150;
          const pos = getCubicBezierPoint(t, line.start, line.cp1, line.cp2, line.end);

          const noise = noiseMap[i % noiseMap.length];
          const x = pos.x + noise.x;
          const y = pos.y + noise.y;

          if (i === 1) ctx.moveTo(prevPoint.x, prevPoint.y);
          ctx.lineTo(x, y);
          prevPoint = { x, y };
        }
        ctx.stroke();

        if (drawFactor > 0.98) {
          const t_tip = drawFactor;
          const t_prev = t_tip - 0.01;

          const tipPos = getCubicBezierPoint(t_tip, line.start, line.cp1, line.cp2, line.end);
          const prevPos = getCubicBezierPoint(t_prev, line.start, line.cp1, line.cp2, line.end);

          const angle = Math.atan2(tipPos.y - prevPos.y, tipPos.x - prevPos.x);

          ctx.save();
          ctx.translate(tipPos.x, tipPos.y);
          ctx.rotate(angle);

          ctx.beginPath();
          ctx.strokeStyle = line.target === 'button' ? "var(--accent)" : isDarkMode ? "#999" : "#666";
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.moveTo(-10, -5);
          ctx.lineTo(0, 0);
          ctx.lineTo(-10, 5);
          ctx.stroke();

          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [progress, vh, isDarkMode, isCompactViewport]);

  return (
    <div ref={containerRef} style={{ height: `${sectionHeight}px` }} className="relative z-50 bg-(--bg-main)">
      {/* Complex arrows only on large desktop. */}
      {!isCompactViewport && <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />}

      {/* Simpler animated arrows for mobile/tablet. */}
      {isCompactViewport && (
        <div className="absolute inset-0 pointer-events-none z-[1]" aria-hidden>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <marker
                id="deep-dive-arrowhead"
                markerWidth="4.5"
                markerHeight="4.5"
                refX="4"
                refY="2.25"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path d="M 0 0 L 4.5 2.25 L 0 4.5" fill="none" stroke="var(--text-dim)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
            </defs>
            <path
              d="M 14 0 C 6 10, 30 16, 15 26 C 4 36, 30 42, 16 52 C 8 60, 20 66, 31 69 C 39 71, 46 73, 50 74.5 C 54 76, 56 73, 54 68"
              fill="none"
              stroke="var(--text-dim)"
              strokeWidth="0.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              markerEnd="url(#deep-dive-arrowhead)"
              strokeDasharray="140"
              strokeDashoffset={compactArrowDashOffset}
              style={{ opacity: compactArrowOpacity, transition: 'stroke-dashoffset 180ms linear, opacity 180ms ease' }}
            />
          </svg>
        </div>
      )}

      {isMobile ? (
        <div className="relative h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute left-1/2 top-[34%] w-[72vw] h-[72vw] max-w-[360px] max-h-[360px] border border-(--text-dim) rounded-full opacity-20 animate-[spin_24s_linear_infinite]"
              style={{ transform: `translate(-50%, -50%) scale(${0.82 + mobileReveal * 0.22})`, opacity: 0.08 + mobileReveal * 0.18 }}
            />
            <div
              className="absolute left-1/2 top-[34%] w-[52vw] h-[52vw] max-w-[250px] max-h-[250px] border border-(--text-dim) rounded-full opacity-20 animate-[spin_16s_linear_infinite_reverse]"
              style={{ transform: `translate(-50%, -50%) scale(${0.88 + mobileReveal * 0.18})`, opacity: 0.06 + mobileReveal * 0.16 }}
            />
            <div
              className="absolute left-1/2 top-[34%] w-2 h-2 rounded-full bg-(--text-primary)"
              style={{ transform: `translate(${Math.sin(progress * 6) * 54}px, ${Math.cos(progress * 6) * 22}px)`, opacity: 0.2 + mobileReveal * 0.6 }}
            />
          </div>

          <div className="relative z-10 text-center w-full max-w-2xl">
            <div ref={headlineRef} className="mb-8" style={{ transform: `translateY(${mobileHeadingLift}px)`, opacity: mobileReveal }}>
              <div className="font-mono text-[10px] text-[var(--accent)] mb-3 tracking-[0.3em] uppercase">Chapter 02</div>
              <div className="mb-4 flex items-center justify-center gap-3 opacity-70" style={{ opacity: Math.max(0.3, mobileReveal) }}>
                <span className="h-px w-8 bg-(--text-dim)" />
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-(--text-dim)">From Overview To Detail</span>
                <span className="h-px w-8 bg-(--text-dim)" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-poster text-(--text-primary) leading-tight px-2">
                READY FOR THE <br />
                <span className="font-serif italic text-(--text-dim) inline-block min-w-[10ch] text-left">
                  {deepDiveWord.slice(0, deepDiveChars)}
                </span>
                {deepDiveChars < deepDiveWord.length && (
                  <span className="inline-block ml-1 w-px h-[0.9em] bg-(--text-dim) animate-pulse align-middle" />
                )}
              </h2>
            </div>

            <button
              ref={buttonRef}
              onClick={onEnter}
              className="btn-wavy group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-(--text-primary) text-(--text-primary) overflow-hidden transition-all hover:border-[var(--accent)]"
              style={{
                borderRadius: '4px 16px 4px 16px',
                transform: `translateY(${mobileButtonLift}px)`,
                opacity: Math.min(1, Math.max(0, (progress - 0.28) * 2.2))
              }}
            >
              <div className="wave-fill"></div>
              <span className="relative z-10 font-mono text-xs font-bold uppercase tracking-[0.14em] flex items-center gap-3 transition-all">
                Explore <ArrowRight size={16} />
              </span>
            </button>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-[9px] font-mono text-(--text-dim) uppercase tracking-widest gap-2" style={{ opacity: Math.min(1, Math.max(0, (progress - 0.36) * 2)) }}>
            <span>Praxissemester 2026</span>
            <span>Karlsruhe, DE</span>
          </div>
        </div>
      ) : (
      <div className="absolute bottom-0 left-0 w-full h-screen flex flex-col items-center justify-center pb-16 md:pb-32 px-4">

        <div className="relative z-10 text-center w-full max-w-4xl">

          <div ref={headlineRef} className="mb-8 md:mb-12">

            <div className="font-mono text-[8px] md:text-xs text-[var(--accent)] mb-3 md:mb-4 tracking-[0.3em] md:tracking-[0.5em] uppercase">Status: Connected</div>

            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-poster text-(--text-primary) leading-tight px-4">

              READY FOR THE <br />

              <span className="font-serif italic text-(--text-dim)">DEEP DIVE?</span>

            </h2>

          </div>


          <button

            ref={buttonRef}

            onClick={onEnter}

            className="btn-wavy group relative inline-flex items-center justify-center px-8 py-4 md:px-16 md:py-8 bg-transparent border-2 border-(--text-primary) text-(--text-primary) overflow-hidden transition-all hover:border-[var(--accent)]"

            style={{ borderRadius: '4px 16px 4px 16px' }}

          >

            <div className="wave-fill"></div>

            <span className="relative z-10 font-mono text-xs md:text-lg font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] flex items-center gap-3 md:gap-6 group-hover:gap-4 md:group-hover:gap-8 transition-all">

              Explore <ArrowRight size={16} className="md:hidden" /><ArrowRight size={24} className="hidden md:block" />

            </span>

          </button>

        </div>



        <div className="absolute bottom-6 md:bottom-12 flex flex-col md:flex-row justify-between md:justify-between w-full px-4 md:px-12 text-[8px] md:text-[10px] font-mono text-(--text-dim) uppercase tracking-widest gap-2 md:gap-0 items-center">

          <span>Praxissemester 2026</span>

          <span>Karlsruhe, DE</span>

          <span className="hidden md:inline">v2.5.0</span>

        </div>

      </div>
      )}
    </div>
  );
};

// --- INTRO PAGE COMPONENT ---

export const IntroPage = () => {
  const { scrollY, vh } = useScrollProgress();
  const { isReplayedIntro, setIsReplayedIntro } = useApp();
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if opened via replay button using location state
  const isReplayed = location.state?.isReplayed || isReplayedIntro;

  // Auto-scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Set context state if opened via replay
  useEffect(() => {
    if (location.state?.isReplayed) {
      setIsReplayedIntro(true);
    }

    return () => {
      setIsReplayedIntro(false);
    };
  }, [location.state, setIsReplayedIntro]);

  const handleClose = () => {
    setIsReplayedIntro(false);
    navigate('/home');
  };

  useEffect(() => {
    const root = containerRef.current as HTMLDivElement | null;
    if (!root) return;

    let node: HTMLElement | null = root.parentElement;
    let scrollParent: HTMLElement | null = null;

    while (node) {
      const style = window.getComputedStyle(node);
      if (style.overflowY === "auto" || style.overflowY === "scroll") {
        scrollParent = node;
        break;
      }
      node = node.parentElement;
    }

    if (!scrollParent) return;

    scrollParent.classList.add("intro-scrollbar-hidden");

    return () => {
      scrollParent?.classList.remove("intro-scrollbar-hidden");
    };
  }, []);

  return (
    <div ref={containerRef} className="mobile-overflow-clip relative bg-(--bg-main) text-(--text-primary)">
      {/* Close Button - nur bei Replay sichtbar */}
      {isReplayed && (
        <button
          onClick={handleClose}
          className="close-btn fixed top-6 right-6 z-[9999] w-12 h-12 flex items-center justify-center bg-(--bg-panel) border border-(--border) hover:border-(--text-primary) transition-all duration-300 group shadow-lg"
          title="Close Intro"
          style={{ borderRadius: '4px' }}
        >
          <X
            size={20}
            strokeWidth={1.5}
            className="text-(--text-secondary) group-hover:text-(--text-primary) transition-all duration-300 group-hover:rotate-90"
          />
        </button>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;600;800&family=JetBrains+Mono:ital,wght@0,400;0,700;1,400&family=Playfair+Display:ital,wght@1,400;1,700&family=Anton&display=swap');

        .font-poster { font-family: 'Anton', sans-serif; letter-spacing: 0.05em; }
        
        .close-btn {
          animation: fadeInScale 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.8) rotate(-90deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        .hero-corner { position: absolute; width: 22px; height: 22px; border-color: var(--text-dim); opacity: 0.5; }
        .hero-corner--tl { top: 24px; left: 24px; border-top: 2px solid var(--text-dim); border-left: 2px solid var(--text-dim); }
        .hero-corner--tr { top: 24px; right: 24px; border-top: 2px solid var(--text-dim); border-right: 2px solid var(--text-dim); }
        .hero-corner--bl { bottom: 24px; left: 24px; border-bottom: 2px solid var(--text-dim); border-left: 2px solid var(--text-dim); }
        .hero-corner--br { bottom: 24px; right: 24px; border-bottom: 2px solid var(--text-dim); border-right: 2px solid var(--text-dim); }

        /* Project Entrance Animation - Fan Deck Effect */
        .project-card {
          opacity: 0;
          transform-origin: bottom left;
          /* Default state for animation (before visibility) */
          transform: translateY(100px) rotate(-10deg) skewX(-5deg);
          filter: blur(10px);
          transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
          will-change: opacity, transform, filter;
        }
        
        .project-card--visible {
          opacity: 1;
          transform: translateY(0) rotate(0deg) skewX(0);
          filter: blur(0);
        }

        .project-card--static {
          opacity: 1;
          transform: none;
          filter: none;
          transition: opacity 0.5s ease;
        }

        .project-card-mobile {
          opacity: 0;
          transform: translateY(-46px) scale(0.96);
          transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
          animation: cardStackEnter 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards;
        }

        @keyframes cardStackEnter {
          from {
            opacity: 0;
            transform: translateY(-46px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .grain-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        .marquee-track {
          will-change: transform;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          contain: layout paint;
        }

        .poster-card {
          contain: layout paint;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .animate-marquee { animation: marquee 40s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 40s linear infinite; }

        @media (max-width: 1023px) {
          .animate-marquee,
          .animate-marquee-reverse {
            animation-duration: 54s;
          }

          .grain-overlay {
            display: none;
          }
        }

        @media (hover: none) {
          .animate-marquee,
          .animate-marquee-reverse {
            animation-play-state: running !important;
          }
        }

        .btn-wavy {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .wave-fill {
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--accent);
          transition: top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 0;
        }
        .wave-fill::before {
          content: "";
          position: absolute;
          top: -15px;
          left: 0;
          width: 200%;
          height: 30px;
          background: var(--accent);
          border-radius: 50%;
          animation: wave-motion 2s linear infinite;
        }
        @keyframes wave-motion {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .btn-wavy:hover .wave-fill { top: 0; }
        .btn-wavy:hover span { color: #000000; }
        .btn-wavy:hover svg { color: #000000; transform: translateX(5px); }

        [data-theme="light"] .btn-wavy:hover span,
        [data-theme="light"] .btn-wavy:hover svg {
          color: #ffffff;
        }

        .reveal-text span {
          display: inline-block;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          will-change: opacity, transform; 
        }
        .reveal-active span { opacity: 1; transform: translateY(0); }

        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .bg-grid-pattern-dark {
          background-image: linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .welcome-item {
          opacity: 0;
          transform: translateY(18px) scale(0.98);
          animation: welcome-in 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }

        .welcome-delay-1 { animation-delay: 0.08s; }
        .welcome-delay-2 { animation-delay: 0.18s; }
        .welcome-delay-3 { animation-delay: 0.28s; }
        .welcome-delay-4 { animation-delay: 0.4s; }

        @keyframes welcome-in {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .welcome-item {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }

        .mobile-overflow-clip {
          overflow-x: clip;
        }

        @media (min-width: 1024px) {
          .mobile-overflow-clip {
            overflow-x: visible;
          }
        }

        .intro-scrollbar-hidden {
          scrollbar-width: none;
        }

        .intro-scrollbar-hidden::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }
      `}</style>
      <div className="grain-overlay"></div>

      <SuddenLines scrollY={scrollY} vh={vh} />
      <HeroSection scrollY={scrollY} vh={vh} />
      <IntroSection />
      <BridgeSection scrollY={scrollY} vh={vh} />
      <PassionsMarqueeSection />
      <ProjectsHorizontalSection scrollY={scrollY} vh={vh} />
      <InterludeSection scrollY={scrollY} vh={vh} />
      <FinalCircuitSequence scrollY={scrollY} vh={vh} onEnter={() => navigate('/home')} />
    </div>
  );
};
