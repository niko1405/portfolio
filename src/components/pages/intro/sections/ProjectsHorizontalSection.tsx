import { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { buildArchiveProjects } from '../../../../data/projects';
import { useInView } from '../../../../hooks';

type ProjectsHorizontalSectionProps = {
  scrollY: number;
  vh: number;
};

const PosterProjectCard = ({ project, index, isVisible, shouldAnimate }) => {
  const Icon = project.icon;

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
      style={{ transitionDelay: isVisible && shouldAnimate ? `${index * 150}ms` : '0ms' }}
    >
      <div className="w-full h-full bg-(--bg-panel) border border-(--text-primary) relative overflow-hidden flex flex-col transition-all duration-500 group-hover:bg-(--text-primary) group-hover:text-(--bg-main)">
        <div className="absolute -right-8 -bottom-16 text-[15rem] md:text-[22rem] font-poster leading-none text-(--text-primary) opacity-5 group-hover:opacity-10 pointer-events-none select-none z-0 group-hover:text-(--bg-main) transition-colors">
          0{index + 1}
        </div>

        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-[20%] left-0 w-full h-px bg-current"></div>
          <div className="absolute top-0 left-[30%] w-px h-full bg-current"></div>
          <div className="absolute top-[20%] left-[70%] w-px h-[80%] bg-current"></div>
        </div>

        <div className="h-[20%] flex-none flex relative z-10 font-mono text-xs uppercase tracking-widest border-b border-(--text-primary) group-hover:border-(--bg-main)">
          <div className="w-[30%] border-r border-(--text-primary) group-hover:border-(--bg-main) p-4 md:p-6 flex flex-col justify-between">
            <span className="opacity-70">CASE 0{index + 1}</span>
            <span className="text-xl font-bold">{project.year}</span>
          </div>
          <div className="grow p-4 md:p-6 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="opacity-70">Role & Context</span>
              <div className="w-2 h-2 rounded-full bg-current"></div>
            </div>
            <span className="font-bold text-lg leading-tight">{project.role} // {project.context}</span>
          </div>
        </div>

        <div className="grow flex relative z-10 overflow-hidden">
          <div className="w-[30%] border-r border-(--text-primary) group-hover:border-(--bg-main) p-4 md:p-6 flex flex-col justify-between py-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase opacity-60">Focus</span>
              <span className="font-serif italic text-base md:text-lg leading-tight">{project.focus}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] uppercase opacity-60">Stack</span>
              <div className="flex flex-col gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] md:text-xs font-bold border border-current px-2 py-1 w-max">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="w-[70%] p-6 md:p-10 flex flex-col justify-between h-full">
            <div className="flex justify-end mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-current rounded-full flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <Icon strokeWidth={1.5} size={28} />
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-poster uppercase leading-[0.9] tracking-tight wrap-break-word mb-4 md:mb-6">
                {project.title.split(' ').map((word, i) => (
                  <div key={i}>{word}</div>
                ))}
              </h3>
              <p className="font-serif text-sm md:text-base leading-relaxed opacity-90 border-l-2 border-current pl-4 line-clamp-3 md:line-clamp-none">{project.desc}</p>
            </div>
          </div>
        </div>

        <div className="h-10 flex-none border-t border-(--text-primary) group-hover:border-(--bg-main) flex items-center px-6 font-mono text-[10px] uppercase justify-between relative z-10 bg-(--bg-panel) group-hover:bg-(--text-primary) transition-colors">
          <div className="flex gap-4 overflow-hidden whitespace-nowrap">
            <span className="opacity-70">Deliverables:</span>
            <span className="font-bold truncate max-w-37.5 md:max-w-none">{project.deliverables}</span>
          </div>
          <div className="flex gap-2 items-center group-hover:underline shrink-0 pl-4">
            <span>See More</span>
            <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DynamicProjectTitle = ({ text, active, progress }) => {
  const [visibleChars, setVisibleChars] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timeout = setTimeout(() => {
      setVisibleChars(0);
      const interval = setInterval(() => {
        setVisibleChars((prev) => {
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

  const words = text.split(' ');

  return (
    <div className="relative z-10 flex flex-col md:block">
      {words.map((word, wIndex) => {
        const xOffset = wIndex === 0 ? progress * -40 : progress * 40;
        const yOffset = wIndex === 0 ? progress * -20 : progress * 20;

        return (
          <span key={wIndex} className={`inline-block mr-4 md:mr-8 will-change-transform ${wIndex === 1 ? 'mt-[-0.2em] md:mt-0' : ''}`} style={{ transform: `translate(${xOffset}px, ${yOffset}px)`, transition: 'transform 0.1s linear' }}>
            {word.split('').map((char, cIndex) => {
              const previousChars = words.slice(0, wIndex).join('').length + wIndex;
              const globalIndex = previousChars + cIndex;
              const isVisible = globalIndex < visibleChars;
              const isFirstWord = wIndex === 0;

              return (
                <span
                  key={cIndex}
                  className={`inline-block transition-opacity duration-100 ${isVisible ? 'opacity-100' : 'opacity-0'} ${isFirstWord ? 'font-poster' : 'font-serif italic'}`}
                  style={{ color: isFirstWord ? '#ffffff' : 'transparent', WebkitTextStroke: !isFirstWord ? '1px #ffffff' : undefined }}
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

/**
 * Scroll-driven project archive section with desktop rail and mobile stack modes.
 */
export const ProjectsHorizontalSection = ({ scrollY, vh }: ProjectsHorizontalSectionProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inViewRef, active] = useInView(0.1);
  const [shouldAnimateEntrance, setShouldAnimateEntrance] = useState(true);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);
  const [sectionStart, setSectionStart] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const updateSectionStart = () => {
      setSectionStart(containerRef.current?.offsetTop ?? 0);
    };

    updateSectionStart();
    window.addEventListener('resize', updateSectionStart);
    return () => window.removeEventListener('resize', updateSectionStart);
  }, [vh, isMobile]);

  const setRefs = (node: HTMLDivElement | null) => {
    containerRef.current = node;
    inViewRef.current = node;
    setSectionStart(node?.offsetTop ?? 0);
  };

  const sectionHeight = vh * 4;
  const dist = Math.max(1, sectionHeight - vh);
  const progress = Math.max(0, Math.min(1, (scrollY - sectionStart) / dist));

  useEffect(() => {
    if (active) {
      const timeout = window.setTimeout(() => {
        if (progress > 0.5) {
          setShouldAnimateEntrance(false);
        } else {
          setShouldAnimateEntrance(true);
        }
      }, 0);

      return () => window.clearTimeout(timeout);
    }
  }, [active, progress]);

  const projects = buildArchiveProjects();

  const parsedYears = projects.flatMap((project) => {
    const matches = project.year.match(/\d{4}/g);
    return matches ? matches.map(Number) : [];
  });

  const yearLabel = parsedYears.length > 0 ? `${Math.min(...parsedYears)} — ${Math.max(...parsedYears)}` : 'SELECTED WORKS';

  const totalWidthVw = projects.length * 60 + (projects.length - 1) * 6;
  const xMove = progress * (totalWidthVw - 80);

  return (
    <section ref={setRefs} style={isMobile ? { minHeight: '100vh' } : { height: `${sectionHeight}px` }} className="relative z-10 bg-(--bg-main)">
      {isMobile ? (
        <div className="relative w-full bg-(--bg-main)">
          <div className="relative z-20 px-6 md:px-10 pt-8 pb-5 border-b border-(--border) bg-(--bg-main)/95 backdrop-blur-sm shrink-0">
            <div style={{ mixBlendMode: 'difference' }}>
              <div className="text-4xl md:text-6xl uppercase tracking-tight leading-none text-(--bg-main) dark:text-(--bg-main)">
                <span className="block font-poster text-(--text-primary)">PROJECT</span>
                <span className="block font-poster text-(--text-primary)">ARCHIVES</span>
              </div>
              <div className="mt-2 font-mono text-xs text-(--text-dim) tracking-[0.3em]">SELECTED WORKS {yearLabel}</div>
            </div>
          </div>

          <div className="px-4 md:px-6 py-4 space-y-4 md:space-y-5">
            {projects.map((p, i) => (
              <div key={i} className="project-card-mobile w-full h-auto bg-(--bg-panel) border border-(--text-primary) p-4 md:p-6 rounded-sm" style={{ transitionDelay: `${i * 50}ms` }}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase opacity-70">CASE 0{i + 1}</span>
                    <div className="text-2xl md:text-3xl font-bold font-poster mt-2">{p.title}</div>
                    {p.isSandbox && <span className="mt-2 inline-flex w-max border border-current px-2 py-1 text-[9px] md:text-[10px] font-mono uppercase tracking-[0.18em] opacity-80">Sandbox</span>}
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
                <p className="font-serif text-sm leading-relaxed opacity-90 border-l-2 border-(--text-primary) pl-3 mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-[9px] md:text-xs font-bold border border-current px-2 py-1">{tag}</span>
                  ))}
                </div>
                <div className="pt-3 border-t border-(--text-primary) font-mono text-[10px] uppercase flex items-center justify-between">
                  <span className="opacity-70">
                    Deliverables: <span className="font-bold">{p.deliverables}</span>
                  </span>
                  <span className="flex items-center gap-1 hover:underline cursor-pointer">
                    View <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col bg-(--bg-main) isolate">
          <div className="absolute top-8 md:top-12 left-8 md:left-12 z-50 pointer-events-none" style={{ mixBlendMode: 'difference' }}>
            <div className="text-5xl md:text-8xl uppercase tracking-tight leading-none text-(--bg-main) dark:text-(--bg-main)">
              <DynamicProjectTitle text="PROJECT ARCHIVES" active={active} progress={progress} />
            </div>
            <div className={`mt-2 font-mono text-xs text-(--bg-main) dark:text-(--bg-main) tracking-[0.3em] transition-opacity duration-700 delay-700 ${active ? 'opacity-100' : 'opacity-0'}`}>
              SELECTED WORKS {yearLabel}
            </div>
          </div>

          <div className="flex items-end pb-0 h-full grow pt-0">
            <div className={`flex pl-8 md:pl-24 will-change-transform project-rail ${active ? 'project-rail--active' : ''}`} style={{ transform: `translate3d(-${xMove}vw, 0, 0)` }}>
              {projects.map((p, i) => (
                <PosterProjectCard key={i} project={p} index={i} isVisible={active} shouldAnimate={shouldAnimateEntrance} />
              ))}
              <div className="w-[20vw] shrink-0" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
