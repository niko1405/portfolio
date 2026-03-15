import { useEffect, useState } from "react";

export const useParallax = (sensitivity: number = 0.02) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.clientX) * sensitivity;
      const y = (window.innerHeight / 2 - e.clientY) * sensitivity;
      setOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sensitivity]);

  return offset;
};
