import React, { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Briefcase, Cpu, Lightbulb, TrendingUp } from 'lucide-react';
import { useAppContext } from '../../../../context';

type PosterCardProps = {
  title: string;
  icon: LucideIcon;
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
    <div
      className={`
      poster-card ${compact ? 'w-62.5 h-90 mx-3 p-6' : 'w-[320px] md:w-112.5 h-130 mx-6 p-10'}
      shrink-0 flex flex-col justify-between border
      ${bgClass} ${borderColor}
      relative overflow-hidden group
    `}
    >
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
        <span className={`font-mono text-xs tracking-widest uppercase border ${borderColor} px-2 py-1 rounded ${textColor}`}>
          0{(index % 4) + 1} // DRIVER
        </span>
      </div>
      <div className="relative z-10">
        <h3 className={`font-poster ${compact ? 'text-4xl' : 'text-6xl'} uppercase leading-[0.85] mb-6 tracking-tight ${textColor}`}>{title}</h3>
        <div className={`h-px w-12 ${borderColor} mb-6`}></div>
        <p className={`font-mono ${compact ? 'text-xs' : 'text-xs md:text-sm'} leading-relaxed ${isModeWhite ? 'opacity-70' : 'opacity-60'}`}>{desc}</p>
      </div>
    </div>
  );
});

/**
 * Animated marquee section showing core drivers and motivations.
 */
export const PassionsMarqueeSection = React.memo(() => {
  const { isDarkMode } = useAppContext();
  const [isCompactMarquee, setIsCompactMarquee] = useState(typeof window !== 'undefined' ? window.innerWidth < 1024 : false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsCompactMarquee(media.matches);
    update();

    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const drivers = [
    { title: 'Tech', icon: Cpu, desc: 'Technologie entwickelt sich weiter, meine Begeisterung dafür auch. Ich liebe es, neue Tools auszuprobieren und einzusetzen.' },
    { title: 'Solve', icon: Lightbulb, desc: 'Komplexe Herausforderungen verlangen nach eleganten Lösungen. Ich brenne darauf, diese im Team zu meistern.' },
    { title: 'Business', icon: Briefcase, desc: 'Schnittstelle zwischen Anforderung und Code. Ich gestalte Software, die echte betriebliche Abläufe verbessert.' },
    { title: 'Growth', icon: TrendingUp, desc: 'Fehler sind Learnings. Ich nutze jedes Projekt, um meine Skills auf das nächste Level zu heben.' },
  ];

  const firstRow = [...drivers, ...drivers];
  const secondRow = [...drivers, ...drivers].reverse();
  const rowPauseClass = isCompactMarquee ? '' : 'hover:[animation-play-state:paused]';

  return (
    <section className="py-32 bg-(--bg-main) overflow-hidden relative z-10" style={{ contentVisibility: 'auto', containIntrinsicSize: '1000px' }}>
      <div className="mb-20 px-8 flex flex-col items-center justify-center max-w-7xl mx-auto text-center">
        <h2 className="text-5xl md:text-8xl font-poster text-(--text-primary) mb-4 uppercase tracking-tight">My Passion</h2>
        <span className="font-mono text-xs text-(--text-dim) tracking-[0.5em] uppercase border border-(--text-dim) px-4 py-2 rounded-full">Core Drivers & Philosophy</span>
      </div>
      <div className={`flex flex-col ${isCompactMarquee ? 'gap-8' : 'gap-16'}`}>
        <div className={`marquee-track flex w-max animate-marquee ${rowPauseClass}`}>
          {firstRow.map((d, i) => (
            <PosterCard key={`r1-${i}`} {...d} index={i} isDarkMode={isDarkMode} compact={isCompactMarquee} />
          ))}
        </div>
        {!isCompactMarquee && (
          <div className={`marquee-track flex w-max animate-marquee-reverse ${rowPauseClass} -translate-x-25`}>
            {secondRow.map((d, i) => (
              <PosterCard key={`r2-${i}`} {...d} index={i + 4} isDarkMode={isDarkMode} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});
