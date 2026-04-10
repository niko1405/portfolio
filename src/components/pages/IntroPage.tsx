import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context';
import { useScrollProgress } from '../../hooks';
import './intro/introPage.css';
import {
  SuddenLines,
  HeroSection,
  IntroSection,
  BridgeSection,
  PassionsMarqueeSection,
  ProjectsHorizontalSection,
  InterludeSection,
  FinalCircuitSequence,
} from './intro/sections';

/**
 * Cinematic intro route composed of multiple scroll-reactive sections.
 */
export const IntroPage = () => {
  const { scrollY, vh } = useScrollProgress();
  const { isReplayedIntro, setIsReplayedIntro } = useAppContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isReplayed = location.state?.isReplayed || isReplayedIntro;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (location.state?.isReplayed) {
      setIsReplayedIntro(true);
    }

    return () => {
      setIsReplayedIntro(false);
    };
  }, [location.state, setIsReplayedIntro]);

  const handleClose = () => {
    setIsReplayedIntro(false);
    navigate('/home');
  };

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    let node: HTMLElement | null = root.parentElement;
    let scrollParent: HTMLElement | null = null;

    while (node) {
      const style = window.getComputedStyle(node);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
        scrollParent = node;
        break;
      }
      node = node.parentElement;
    }

    if (!scrollParent) return;

    scrollParent.classList.add('intro-scrollbar-hidden');

    return () => {
      scrollParent?.classList.remove('intro-scrollbar-hidden');
    };
  }, []);

  return (
    <div ref={containerRef} className="mobile-overflow-clip relative bg-(--bg-main) text-(--text-primary)">
      {isReplayed && (
        <button
          onClick={handleClose}
          className="close-btn fixed top-6 right-6 z-9999 w-12 h-12 flex items-center justify-center bg-(--bg-panel) border border-(--border) hover:border-(--text-primary) transition-all duration-300 group shadow-lg"
          title="Close Intro"
          style={{ borderRadius: '4px' }}
        >
          <X
            size={20}
            strokeWidth={1.5}
            className="text-(--text-secondary) group-hover:text-(--text-primary) transition-all duration-300 group-hover:rotate-90"
          />
        </button>
      )}

      <div className="grain-overlay"></div>

      <SuddenLines scrollY={scrollY} vh={vh} />
      <HeroSection scrollY={scrollY} vh={vh} />
      <IntroSection />
      <BridgeSection />
      <PassionsMarqueeSection />
      <ProjectsHorizontalSection scrollY={scrollY} vh={vh} />
      <InterludeSection scrollY={scrollY} vh={vh} />
      <FinalCircuitSequence scrollY={scrollY} vh={vh} onEnter={() => navigate('/home')} />
    </div>
  );
};
