import React from 'react';

type ProfileCircleProps = {
  transform?: string;
  src: string;
  imagePosition?: string;
  imageScale?: number;
  imageFilter?: string;
};

/**
 * Circular profile image component with optional tilt transform and image tuning.
 */
export const ProfileCircle = ({
  transform,
  src,
  imagePosition = '50% 50%',
  imageScale = 1,
  imageFilter = 'none',
}: ProfileCircleProps) => {
  const [xPos = '50%', yPos = '50%'] = imagePosition.trim().split(/\s+/);
  const yNumber = Number.parseFloat(yPos);
  const yPan = Number.isFinite(yNumber) ? (50 - yNumber) * 0.8 : 0;

  return (
    <div
      className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 transition-transform duration-200 ease-out"
      style={{ transform: transform || 'perspective(1000px) rotateX(0deg) rotateY(0deg)' }}
    >
      <div className="absolute inset-0 rounded-full border border-(--text-primary) opacity-10 scale-110 animate-pulse pointer-events-none" />

      <div className="w-full h-full rounded-full overflow-hidden border-2 border-(--border) shadow-2xl relative bg-(--bg-panel)">
        <img
          src={src}
          alt="Nikolas Portfolio"
          className="w-full h-full object-cover"
          style={{
            objectPosition: `${xPos} 50%`,
            transform: `translateY(${yPan}%) scale(${imageScale})`,
            transformOrigin: 'center',
            filter: imageFilter,
          }}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop';
          }}
        />
      </div>
    </div>
  );
};
