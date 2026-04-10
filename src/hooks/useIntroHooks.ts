import React, { useEffect, useState } from 'react';

/**
 * Provides viewport height and debounced scroll position for intro animations.
 */
export const useScrollProgress = () => {
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
        setScrollY((prev) => (prev === nextScrollY ? prev : nextScrollY));
      });
    };

    const handleResize = () => {
      if (resizeRaf !== null) return;
      resizeRaf = window.requestAnimationFrame(() => {
        resizeRaf = null;
        const nextVh = window.innerHeight;
        setVh((prev) => (Math.abs(prev - nextVh) >= 24 ? nextVh : prev));
      });
    };

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

/**
 * Returns a ref and activation flag once the element enters the viewport.
 */
export const useInView = (threshold = 0.2) => {
  const [active, setActive] = useState(false);
  const ref = React.useRef<HTMLElement | null>(null);

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

/**
 * Computes a mouse-driven 3D tilt transform for card-like elements.
 */
export const useTilt = (activeRef: React.RefObject<HTMLDivElement | null>) => {
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
