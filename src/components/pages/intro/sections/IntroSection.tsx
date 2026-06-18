import { useEffect, useRef, useState } from 'react';
import { ChevronRight, GraduationCap, Layers, Users } from 'lucide-react';
import profileImage from '../../../../assets/profile.jpg';
import { useInView, useTilt } from '../../../../hooks';
import { DesktopIdentityCard, DetailHighlightChip, ProfileCircle, type DetailHighlight } from '../../../../components/shared';

/**
 * Personal intro section combining identity card, bio, and highlight tooltips.
 */
export const IntroSection = () => {
  const [ref, active] = useInView(0.2);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageTilt = useTilt(cardRef);
  const [isMobileTooltipMode, setIsMobileTooltipMode] = useState(typeof window !== 'undefined' ? window.innerWidth < 640 : false);
  const [openTooltip, setOpenTooltip] = useState<string | null>(null);
  const PROFILE_IMG = profileImage;
  const PROFILE_IMAGE_POSITION = '45% 26%';
  const PROFILE_IMAGE_SCALE = 2.3;
  const PROFILE_IMAGE_FILTER = 'brightness(0.92) contrast(1.1) saturate(0.95)';

  const detailHighlights: DetailHighlight[] = [
    {
      label: '4. Semester @HKA',
      icon: GraduationCap,
      tooltipTitle: 'Student an der Hochschule Karlsruhe',
      tooltipText: 'Fokus auf Software Engineering und digitale Geschäftsprozesse mit praxisnahen Projektarbeiten.',
    },
    {
      label: 'Technologie Enthusiast',
      icon: Layers,
      tooltipTitle: 'Full-Stack Softwareentwicklung & Prozessautomatisierung',
      tooltipText: 'Ich kombiniere private Side-Projects mit Uniprojekten - vom Frontend über APIs bis zur Datenbank - und entwickle daraus nutzbare Lösungen.',
    },
    {
      label: 'Teamplayer',
      icon: Users,
      tooltipTitle: 'Agile Zusammenarbeit mit Verantwortung',
      tooltipText: 'Kommunikativ, lösungsorientiert und erfahren in der agilen Zusammenarbeit.',
    },
  ];

  const handleExploreClick = () => {
    const bridgeSection = document.getElementById('bridge-section');
    if (bridgeSection) {
      bridgeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const media = window.matchMedia('(max-width: 639px)');
    const updateMode = () => {
      setIsMobileTooltipMode(media.matches);
      if (!media.matches) {
        setOpenTooltip(null);
      }
    };

    updateMode();
    media.addEventListener('change', updateMode);
    return () => media.removeEventListener('change', updateMode);
  }, []);

  return (
    <section ref={ref} className="sticky top-0 h-screen z-0 flex items-center justify-center overflow-hidden bg-(--bg-main) transition-colors duration-700">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] aspect-square bg-(--text-primary) opacity-[0.03] dark:opacity-[0.05] blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] aspect-square bg-(--text-primary) opacity-[0.03] dark:opacity-[0.05] blur-[100px] rounded-full" />
      </div>

      <div className="container max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 relative z-10 h-full">
        <div className={`w-full md:w-1/3 flex justify-center transition-all duration-1000 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="md:hidden">
            <ProfileCircle
              src={PROFILE_IMG}
              imagePosition={PROFILE_IMAGE_POSITION}
              imageScale={PROFILE_IMAGE_SCALE}
              imageFilter={PROFILE_IMAGE_FILTER}
            />
          </div>

          <DesktopIdentityCard
            containerRef={cardRef}
            tiltTransform={imageTilt}
            imageSrc={PROFILE_IMG}
            imagePosition={PROFILE_IMAGE_POSITION}
            imageScale={PROFILE_IMAGE_SCALE}
            imageFilter={PROFILE_IMAGE_FILTER}
          />
        </div>

        <div className={`w-full md:w-2/3 flex flex-col transition-all duration-1000 delay-300 ${active ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="mb-6 hidden md:flex items-center gap-2">
            <div className="h-px w-8 bg-(--text-dim) opacity-40 dark:opacity-50" />
            <span className="font-mono text-[10px] tracking-widest text-(--text-dim) dark:text-gray-400 uppercase">Introduction</span>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-start gap-4 sm:gap-6 md:gap-8 mb-10 md:mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold text-(--text-primary) leading-[0.85] tracking-tighter shrink-0">
              WHO <br />
              <span className="text-(--text-dim) dark:text-gray-500 opacity-20 dark:opacity-60 italic font-serif">AM I?</span>
            </h2>

            <p className="font-serif italic text-xs sm:text-lg md:text-2xl text-(--text-tertiary) leading-tight md:leading-relaxed border-l-2 border-(--border) dark:border-gray-600 pl-4 md:pl-8 md:max-w-xl">
              "Angehender Wirtschaftsinformatiker mit einer Leidenschaft für effiziente Softwarelösungen und durchdachte Geschäftsprozesse."
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10">
            <div className="font-mono text-xs md:text-sm text-(--text-dim) dark:text-gray-400 leading-relaxed space-y-6 max-w-xl text-center md:text-left">
              <p>
                Als Student an der <span className="text-(--text-primary) font-bold">HKA</span> verbinde ich die <span className="text-(--text-primary) font-bold">Architektur moderner Software</span> mit einem tiefen Verständnis für die <span className="text-(--text-primary) font-bold">betrieblichen Prozesse</span> dahinter. Dieses Wissen setze ich konsequent in Uni-Projekten und privaten Anwendungen um – immer mit dem Ziel, an realen Herausforderungen zu wachsen.
              </p>
              <div role="list" className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
                {detailHighlights.map((item) => (
                  <DetailHighlightChip
                    key={item.label}
                    item={item}
                    isMobileTooltipMode={isMobileTooltipMode}
                    isTooltipOpen={isMobileTooltipMode && openTooltip === item.label}
                    onToggle={(label) => setOpenTooltip((prev) => (prev === label ? null : label))}
                  />
                ))}
              </div>
              <p className="sm:hidden text-[10px] tracking-[0.16em] uppercase text-(--text-tertiary)">Tippe auf einen Punkt fuer mehr Details</p>
            </div>

            <div className="flex justify-center md:justify-start">
              <button onClick={handleExploreClick} className="group flex items-center justify-center gap-4 bg-(--accent) dark:bg-white text-(--bg-main) dark:text-black px-8 py-4 md:px-10 md:py-5 font-mono text-[10px] md:text-xs tracking-[0.2em] hover:opacity-90 dark:hover:opacity-80 transition-all shadow-xl dark:shadow-2xl w-full sm:w-max">
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
