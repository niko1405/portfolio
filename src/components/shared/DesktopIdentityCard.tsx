import React from 'react';
import { BIRTH_DATE, calculateAge } from '../../utils/introHelpers';
import { ProfileCircle } from './ProfileCircle';

type DesktopIdentityCardProps = {
  tiltTransform: string;
  imageSrc: string;
  imagePosition: string;
  imageScale: number;
  imageFilter: string;
  containerRef: React.Ref<HTMLDivElement>;
};

/**
 * Desktop-only identity card framing profile image and age metadata.
 */
export const DesktopIdentityCard = ({
  tiltTransform,
  imageSrc,
  imagePosition,
  imageScale,
  imageFilter,
  containerRef,
}: DesktopIdentityCardProps) => (
  <div
    ref={containerRef}
    className="hidden md:flex w-full aspect-3/4 max-w-85 bg-(--bg-panel) border border-(--border) relative group overflow-hidden transition-all duration-700 ease-out items-center justify-center hover:scale-[1.03] hover:border-(--text-dim) shadow-2xl"
    style={{ boxShadow: '0 30px 60px var(--shadow-color)' }}
  >
    <div className="absolute inset-0 opacity-30 pointer-events-none bg-grid-pattern" />

    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8">
      <ProfileCircle
        transform={tiltTransform}
        src={imageSrc}
        imagePosition={imagePosition}
        imageScale={imageScale}
        imageFilter={imageFilter}
      />
      <div className="w-1/2 h-px bg-linear-to-r from-transparent via-(--text-dim) dark:via-gray-500 to-transparent opacity-30 dark:opacity-50 mb-4 mt-10" />
      <p className="font-mono text-[10px] tracking-[0.3em] text-(--text-tertiary) uppercase">Nikolas Vix // {calculateAge(BIRTH_DATE)}Y</p>
    </div>

    <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-(--border) group-hover:border-(--text-primary) transition-colors" />
    <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-(--border) group-hover:border-(--text-primary) transition-colors" />
    <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-(--border) group-hover:border-(--text-primary) transition-colors" />
    <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-(--border) group-hover:border-(--text-primary) transition-colors" />
  </div>
);
