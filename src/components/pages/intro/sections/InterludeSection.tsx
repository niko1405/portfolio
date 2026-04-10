import { useEffect, useRef, useState } from 'react';

type InterludeSectionProps = {
  scrollY: number;
  vh: number;
};

/**
 * Philosophy interlude with scroll-synced geometric and text transitions.
 */
export const InterludeSection = ({ scrollY, vh }: InterludeSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
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
        const p = (currentScroll - start) / safeDist;
        setProgress(Math.max(0, Math.min(1, p)));
      } else if (currentScroll < start) {
        setProgress(0);
      } else {
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
  const op2 = visualProgress < 0.15 ? 0 : Math.max(0, 1 - t2 * 1.5);

  const t3 = Math.max(0, visualProgress - 0.3);
  const scale3 = 0.2 + t3 * 4;
  const rot3 = t3 * 135;
  const op3 = visualProgress < 0.3 ? 0 : Math.max(0, 1 - t3 * 1.5);

  const contentScale = isMobile ? Math.min(1, 0.9 + visualProgress * 0.12) : Math.min(1, 0.5 + Math.max(0, visualProgress - 0.5) * 2);
  const contentOpacity = isMobile ? Math.min(1, Math.max(0, (visualProgress - 0.08) * 2.2)) : Math.max(0, (visualProgress - 0.6) * 2.5);
  const contentBlur = isMobile ? Math.max(0, 6 - visualProgress * 10) : Math.max(0, 10 - (visualProgress - 0.6) * 50);

  const headingLift = isMobile ? Math.max(0, 26 - visualProgress * 34) : 0;
  const quoteLift = isMobile ? Math.max(0, 18 - visualProgress * 26) : 0;
  const chipsLift = isMobile ? Math.max(0, 14 - visualProgress * 20) : 0;
  const poetryWord = 'BUSINESS';
  const poetryRevealProgress = isMobile ? Math.min(1, Math.max(0, (visualProgress - 0.22) * 3.2)) : 1;
  const poetryVisibleChars = Math.round(poetryWord.length * poetryRevealProgress);

  return (
    <section ref={containerRef} style={{ height: `${sectionHeight}px` }} className="relative z-10 bg-(--bg-main)">
      <div className={`${isMobile ? 'h-full min-h-[75vh]' : 'sticky top-0 h-screen'} w-full overflow-hidden flex flex-col items-center justify-center`}>
        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute border border-dashed border-(--text-dim) transition-transform duration-75 ease-linear will-change-transform" style={{ width: '50vw', height: '50vw', transform: `scale(${scale1}) rotate(${rot1}deg)`, opacity: op1 }}></div>
            <div className="absolute border-2 border-(--text-primary) flex items-center justify-center transition-transform duration-75 ease-linear will-change-transform" style={{ width: '35vw', height: '35vw', transform: `scale(${scale2}) rotate(${rot2}deg)`, opacity: op2 }}>
              <div className="absolute -inset-1 border border-(--bg-main)"></div>
            </div>
            <div className="absolute border-2 border-dotted border-(--text-secondary) transition-transform duration-75 ease-linear will-change-transform" style={{ width: '20vw', height: '20vw', transform: `scale(${scale3}) rotate(${rot3}deg)`, opacity: op3 }}></div>
          </div>
        )}

        {isMobile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-px h-48 bg-linear-to-b from-transparent to-(--text-primary) opacity-20 absolute left-1/4 -translate-x-1/2" style={{ transform: `scaleY(${contentOpacity}) translateY(-${contentOpacity * 40}px)`, transformOrigin: 'center' }}></div>
            <div className="w-px h-48 bg-linear-to-b from-(--text-dim) to-transparent opacity-20 absolute right-1/4 translate-x-1/2" style={{ transform: `scaleY(${contentOpacity}) translateY(${contentOpacity * 40}px)`, transformOrigin: 'center' }}></div>
          </div>
        )}

        {!isMobile && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: `scale(${contentScale})`, opacity: contentOpacity }}>
            <div className="absolute w-[60vw] h-[60vw] md:w-150 md:h-150 border border-(--text-dim) rounded-full opacity-10 animate-[spin_30s_linear_infinite]"></div>
            <div className="absolute w-[60vw] h-[60vw] md:w-150 md:h-150 animate-[spin_30s_linear_infinite]">
              <div className="absolute top-0 left-1/2 w-3 h-3 bg-(--text-primary) rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <div className="absolute w-[40vw] h-[40vw] md:w-100 md:h-100 border border-(--text-dim) rounded-full opacity-10 animate-[spin_20s_linear_infinite_reverse]"></div>
            <div className="absolute w-[40vw] h-[40vw] md:w-100 md:h-100 animate-[spin_20s_linear_infinite_reverse]">
              <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-(--text-secondary) rounded-full -translate-x-1/2 translate-y-1/2"></div>
            </div>
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center text-center px-6" style={{ transform: `scale(${contentScale})`, opacity: contentOpacity, filter: `blur(${contentBlur}px)` }}>
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-(--accent) opacity-20 blur-xl rounded-full scale-150 animate-pulse"></div>
            <span className="relative font-mono text-xs text-(--text-primary) tracking-[0.5em] uppercase z-10">Philosophy</span>
          </div>

          <div className="relative mb-6 md:mb-8">
            <h2
              className="text-5xl md:text-8xl font-poster text-(--text-primary) leading-none"
              style={{
                mixBlendMode: 'difference',
                transform: `translateY(${headingLift}px)`,
                letterSpacing: isMobile ? `${Math.max(0, 0.12 - visualProgress * 0.12)}em` : undefined,
                transition: 'transform 140ms linear, letter-spacing 140ms linear',
              }}
            >
              LOGIC MEETS <br />
              <span
                className="inline-block font-serif italic font-light opacity-80"
                style={{
                  transform: isMobile ? `translateY(${Math.max(0, 34 - visualProgress * 42)}px)` : undefined,
                  opacity: isMobile ? Math.min(1, Math.max(0, (visualProgress - 0.2) * 2.3)) : undefined,
                  transition: 'transform 160ms linear, opacity 160ms linear',
                }}
              >
                <span className="inline-block min-w-[6.5ch] text-left">{isMobile ? poetryWord.slice(0, poetryVisibleChars) : poetryWord}</span>
                {isMobile && poetryRevealProgress < 1 && <span className="inline-block ml-1 align-middle w-px h-[0.9em] bg-current opacity-70 animate-pulse" />}
              </span>
            </h2>
          </div>

          <p className="font-serif italic text-lg md:text-2xl text-(--text-secondary) max-w-xl mx-auto leading-relaxed mb-8" style={{ transform: `translateY(${quoteLift}px)`, opacity: isMobile ? Math.min(1, Math.max(0, (visualProgress - 0.28) * 1.9)) : undefined, transition: 'transform 160ms linear, opacity 160ms linear' }}>
            "Creating digital solutions that seamlessly connect business needs with functional code."
          </p>

          <div className="mt-8 flex justify-center gap-8 md:gap-24 opacity-50" style={{ transform: `translateY(${chipsLift}px)`, opacity: isMobile ? Math.min(0.5, Math.max(0, (visualProgress - 0.38) * 1.4)) : undefined, transition: 'transform 180ms linear, opacity 180ms linear' }}>
            {['Curiosity', 'Precision', 'Impact'].map((item) => (
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
