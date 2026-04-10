import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useAppContext } from '../../../../context';
import { getCubicBezierPoint, type Point } from '../../../../utils/introHelpers';

type FinalCircuitSequenceProps = {
  scrollY: number;
  vh: number;
  onEnter: () => void;
};

/**
 * Final intro sequence with animated connectors and call-to-action transition.
 */
export const FinalCircuitSequence = ({ scrollY, vh, onEnter }: FinalCircuitSequenceProps) => {
  const { isDarkMode } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  const [isCompactViewport, setIsCompactViewport] = useState(typeof window !== 'undefined' ? window.innerWidth < 1280 : false);
  const sectionHeight = isMobile ? vh : vh * 5.5;
  const [sectionStart, setSectionStart] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsCompactViewport(window.innerWidth < 1280);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const dist = sectionHeight - vh;
  const desktopProgress = dist > 0 ? Math.max(0, Math.min(1, (scrollY - sectionStart) / dist)) : 0;
  const mobileScrollRange = Math.max(1, vh * 0.55);
  const mobileProgress = Math.max(0, Math.min(1, (scrollY - (sectionStart - mobileScrollRange)) / mobileScrollRange));
  const progress = isMobile ? mobileProgress : desktopProgress;
  const mobileReveal = Math.min(1, Math.max(0, (progress - 0.08) * 2.3));
  const mobileHeadingLift = Math.max(0, 24 - mobileReveal * 36);
  const mobileButtonLift = Math.max(0, 14 - mobileReveal * 24);
  const deepDiveWord = 'DEEP DIVE?';
  const deepDiveChars = Math.round(deepDiveWord.length * Math.min(1, Math.max(0, (progress - 0.22) * 2.9)));
  const compactArrowProgress = Math.min(1, Math.max(0, (progress - 0.12) * 2.2));
  const compactArrowOpacity = 0.16 + compactArrowProgress * 0.5;
  const compactArrowDashOffset = 140 - compactArrowProgress * 140;

  useEffect(() => {
    const updateSectionStart = () => {
      const node = containerRef.current;
      if (!node) return;
      const absoluteTop = node.getBoundingClientRect().top + window.scrollY;
      setSectionStart((prev) => (Math.abs(prev - absoluteTop) > 1 ? absoluteTop : prev));
    };

    updateSectionStart();
    window.addEventListener('resize', updateSectionStart);
    window.addEventListener('scroll', updateSectionStart, { passive: true });
    return () => {
      window.removeEventListener('resize', updateSectionStart);
      window.removeEventListener('scroll', updateSectionStart);
    };
  }, [sectionHeight]);

  useEffect(() => {
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
    const noiseMap: Point[] = [];
    for (let i = 0; i <= noiseSteps; i++) {
      noiseMap.push({ x: (Math.random() - 0.5) * 1.5, y: (Math.random() - 0.5) * 1.5 });
    }

    let animationFrameId = 0;

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

      const btnYRelative = btnRect.top + window.scrollY - sectionTop + btnRect.height / 2;
      const hlYRelative = headlineRect.top + window.scrollY - sectionTop;

      const btnLeftX = btnRect.left;
      const btnRightX = btnRect.right;
      const hlLeftX = headlineRect.left;
      const hlRightX = headlineRect.right;

      const startY = 0;
      const isMobileDevice = width < 768;

      const lines = [
        {
          start: { x: width * (isMobileDevice ? 0.05 : -0.25), y: startY },
          end: { x: btnLeftX - (isMobileDevice ? 20 : 80), y: btnYRelative },
          cp1: { x: width * (isMobileDevice ? 0.25 : 0.1), y: height * 0.15 },
          cp2: { x: btnLeftX - (isMobileDevice ? 120 : 400), y: btnYRelative - (isMobileDevice ? 100 : 180) },
          color: isDarkMode ? '#ffffff' : '#000000',
          width: isMobileDevice ? 1.5 : 2.5,
          target: 'button',
          speed: 1.05,
        },
        {
          start: { x: width * (isMobileDevice ? 0.48 : 0.45), y: startY },
          end: { x: (hlLeftX + hlRightX) / 2 - (isMobileDevice ? 10 : 20), y: hlYRelative - 20 },
          cp1: { x: width * (isMobileDevice ? 0.46 : 0.42), y: height * 0.35 },
          cp2: { x: (hlLeftX + hlRightX) / 2 - (isMobileDevice ? 80 : 150), y: hlYRelative - (isMobileDevice ? 100 : 150) },
          color: isDarkMode ? '#666666' : '#999999',
          width: isMobileDevice ? 0.8 : 1,
          target: 'headline',
          speed: 1.2,
        },
        {
          start: { x: width * (isMobileDevice ? 0.52 : 0.55), y: startY },
          end: { x: (hlLeftX + hlRightX) / 2 + (isMobileDevice ? 10 : 20), y: hlYRelative - 20 },
          cp1: { x: width * (isMobileDevice ? 0.54 : 0.58), y: height * 0.5 },
          cp2: { x: (hlLeftX + hlRightX) / 2 + (isMobileDevice ? 80 : 150), y: hlYRelative - (isMobileDevice ? 120 : 200) },
          color: isDarkMode ? '#666666' : '#999999',
          width: isMobileDevice ? 1 : 1.5,
          target: 'headline',
          speed: 0.95,
        },
        {
          start: { x: width * (isMobileDevice ? 0.95 : 1.25), y: startY },
          end: { x: btnRightX + (isMobileDevice ? 20 : 80), y: btnYRelative },
          cp1: { x: width * (isMobileDevice ? 0.75 : 0.9), y: height * 0.15 },
          cp2: { x: btnRightX + (isMobileDevice ? 120 : 400), y: btnYRelative - (isMobileDevice ? 100 : 180) },
          color: isDarkMode ? '#ffffff' : '#000000',
          width: isMobileDevice ? 2 : 3,
          target: 'button',
          speed: 1.15,
        },
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
          const tTip = drawFactor;
          const tPrev = tTip - 0.01;

          const tipPos = getCubicBezierPoint(tTip, line.start, line.cp1, line.cp2, line.end);
          const prevPos = getCubicBezierPoint(tPrev, line.start, line.cp1, line.cp2, line.end);

          const angle = Math.atan2(tipPos.y - prevPos.y, tipPos.x - prevPos.x);

          ctx.save();
          ctx.translate(tipPos.x, tipPos.y);
          ctx.rotate(angle);

          ctx.beginPath();
          ctx.strokeStyle = line.target === 'button' ? 'var(--accent)' : isDarkMode ? '#999' : '#666';
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
      {!isCompactViewport && <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" />}

      {isCompactViewport && (
        <div className="absolute inset-0 pointer-events-none z-1" aria-hidden>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <marker id="deep-dive-arrowhead" markerWidth="4.5" markerHeight="4.5" refX="4" refY="2.25" orient="auto" markerUnits="strokeWidth">
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
            <div className="absolute left-1/2 top-[34%] w-[72vw] h-[72vw] max-w-90 max-h-90 border border-(--text-dim) rounded-full opacity-20 animate-[spin_24s_linear_infinite]" style={{ transform: `translate(-50%, -50%) scale(${0.82 + mobileReveal * 0.22})`, opacity: 0.08 + mobileReveal * 0.18 }} />
            <div className="absolute left-1/2 top-[34%] w-[52vw] h-[52vw] max-w-62.5 max-h-62.5 border border-(--text-dim) rounded-full opacity-20 animate-[spin_16s_linear_infinite_reverse]" style={{ transform: `translate(-50%, -50%) scale(${0.88 + mobileReveal * 0.18})`, opacity: 0.06 + mobileReveal * 0.16 }} />
            <div className="absolute left-1/2 top-[34%] w-2 h-2 rounded-full bg-(--text-primary)" style={{ transform: `translate(${Math.sin(progress * 6) * 54}px, ${Math.cos(progress * 6) * 22}px)`, opacity: 0.2 + mobileReveal * 0.6 }} />
          </div>

          <div className="relative z-10 text-center w-full max-w-2xl">
            <div ref={headlineRef} className="mb-8" style={{ transform: `translateY(${mobileHeadingLift}px)`, opacity: mobileReveal }}>
              <div className="font-mono text-[10px] text-(--accent) mb-3 tracking-[0.3em] uppercase">THE END</div>
              <div className="mb-4 flex items-center justify-center gap-3 opacity-70" style={{ opacity: Math.max(0.3, mobileReveal) }}>
                <span className="h-px w-8 bg-(--text-dim)" />
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-(--text-dim)">Check it out!</span>
                <span className="h-px w-8 bg-(--text-dim)" />
              </div>
              <h2 className="text-4xl font-poster text-(--text-primary) leading-tight px-2">
                READY FOR THE <br />
                <span className="font-serif italic text-(--text-dim) inline-block min-w-[10ch] text-left">{deepDiveWord.slice(0, deepDiveChars)}</span>
                {deepDiveChars < deepDiveWord.length && <span className="inline-block ml-1 w-px h-[0.9em] bg-(--text-dim) animate-pulse align-middle" />}
              </h2>
            </div>

            <button
              ref={buttonRef}
              onClick={onEnter}
              className="btn-wavy group relative inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-(--text-primary) text-(--text-primary) overflow-hidden transition-all hover:border-(--accent)"
              style={{
                borderRadius: '4px 16px 4px 16px',
                transform: `translateY(${mobileButtonLift}px)`,
                opacity: Math.min(1, Math.max(0, (progress - 0.28) * 2.2)),
                pointerEvents: progress > 0.28 ? 'auto' : 'none',
              }}
            >
              <div className="wave-fill"></div>
              <span className="relative z-10 font-mono text-xs font-bold uppercase tracking-[0.14em] flex items-center gap-3 transition-all">
                Explore <ArrowRight size={16} />
              </span>
            </button>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-[9px] font-mono text-(--text-primary) uppercase tracking-widest gap-2" style={{ opacity: Math.min(1, Math.max(0, (progress - 0.36) * 2)) }}>
            <span>Portfolio 2026</span>
            <span>Karlsruhe, DE</span>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 w-full h-screen flex flex-col items-center justify-center pb-16 md:pb-32 px-4">
          <div className="relative z-10 text-center w-full max-w-4xl">
            <div ref={headlineRef} className="mb-8 md:mb-12">
              <div className="font-mono text-[8px] md:text-xs text-(--accent) mb-3 md:mb-4 tracking-[0.3em] md:tracking-[0.5em] uppercase">To be Continued</div>

              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-poster text-(--text-primary) leading-tight px-4">
                READY FOR THE <br />
                <span className="font-serif italic text-(--text-dim)">DEEP DIVE?</span>
              </h2>
            </div>

            <button
              ref={buttonRef}
              onClick={onEnter}
              className="btn-wavy group relative inline-flex items-center justify-center px-8 py-4 md:px-16 md:py-8 bg-transparent border-2 border-(--text-primary) text-(--text-primary) overflow-hidden transition-all hover:border-(--accent)"
              style={{ borderRadius: '4px 16px 4px 16px' }}
            >
              <div className="wave-fill"></div>

              <span className="relative z-10 font-mono text-xs md:text-lg font-bold uppercase tracking-widest md:tracking-[0.2em] flex items-center gap-3 md:gap-6 group-hover:gap-4 md:group-hover:gap-8 transition-all">
                View Projects <ArrowRight size={16} className="md:hidden" />
                <ArrowRight size={24} className="hidden md:block" />
              </span>
            </button>
          </div>

          <div className="absolute bottom-6 md:bottom-12 flex flex-col md:flex-row justify-between md:justify-between w-full px-4 md:px-12 text-[8px] md:text-[10px] font-mono text-(--text-primary) uppercase tracking-widest gap-2 md:gap-0 items-center">
            <span>Portfolio 2026</span>
            <span>Karlsruhe, DE</span>
            <span className="hidden md:inline">v1.0.0</span>
          </div>
        </div>
      )}
    </div>
  );
};
