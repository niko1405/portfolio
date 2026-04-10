import React from 'react';
import { useInView } from '../../../../hooks';

export const BridgeSection = () => {
  const [ref, active] = useInView(0.4);
  const words = "Turning complex business logic into clean, scalable software. I enjoy building tools that don't just work but solve real-world problems.".split(' ');

  return (
    <section id="bridge-section" ref={ref} className="min-h-[60vh] flex items-center justify-center relative z-10 bg-(--bg-main) py-24 border-t border-(--border)">
      <div className={`max-w-5xl px-8 text-center ${active ? 'reveal-active' : ''} reveal-text`}>
        <h2 className="text-3xl md:text-6xl font-light leading-tight">
          {words.map((word, i) => (
            <span key={i} style={{ transitionDelay: `${i * 30}ms` }} className="mr-3 inline-block">
              {word === 'business' || word === 'software.' || word === 'real-world' ? (
                <b className="font-serif italic text-(--text-primary) border-b border-(--accent)">{word}</b>
              ) : (
                <span className="text-(--text-dim)">{word}</span>
              )}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
};
