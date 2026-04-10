import { useAppContext } from '../../../../context';

type SuddenLinesProps = {
  scrollY: number;
  vh: number;
};

/**
 * Draws subtle SVG line accents that reveal based on intro scroll progress.
 */
export const SuddenLines = ({ scrollY, vh }: SuddenLinesProps) => {
  const { isDarkMode } = useAppContext();
  const lines = [
    { start: 1.2, end: 2.2, path: 'M 0 30 L 100 30', color: isDarkMode ? '#222' : '#ddd' },
    { start: 2.8, end: 4.0, path: 'M 50 0 L 50 100', color: isDarkMode ? '#222' : '#ddd' },
    { start: 4.5, end: 6.0, path: 'M 0 80 Q 50 20 100 80', color: isDarkMode ? '#333' : '#ccc' },
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
            <path
              key={i}
              d={line.path}
              fill="none"
              stroke={line.color}
              strokeWidth="0.1"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="100"
              strokeDashoffset={100 - progress * 100}
              style={{ opacity: active ? 1 : 0 }}
            />
          );
        })}
      </svg>
    </div>
  );
};
