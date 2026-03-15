import { User } from "lucide-react";
import { useParallax } from "../../hooks/useParallax";
import { ViewHeader } from "../shared/ViewHeader";
import { SKILLS } from "../../data/skills";

export const AboutPage: React.FC = () => {
  const parallax = useParallax(0.01);

  return (
    <div className="h-full flex flex-col animate-fade-in relative z-10 overflow-y-auto">
      <ViewHeader title="Profile" path="/src/config/me.json" />

      {/* Seamless Bento Grid */}
      <div className="max-w-7xl mx-auto w-full p-8 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-4 border-t border-l border-(--border)">
          
          {/* 1. Profile Picture */}
          <div 
            className="md:col-span-1 md:row-span-2 border-r border-b border-(--border) bg-[#0c0c0c] aspect-square relative overflow-hidden group"
            style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
          >
             <div className="absolute inset-0 flex items-center justify-center grayscale contrast-125 bg-[#080808]">
                <User size={64} className="text-[#333]" />
             </div>
             <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
          </div>

          {/* 2. Bio */}
          <div className="md:col-span-3 border-r border-b border-(--border) p-8 md:p-12 bg-(--bg-main) flex flex-col justify-center">
             <h3 className="font-mono text-xs text-(--text-dim) uppercase mb-6 tracking-widest">Bio</h3>
             <p className="text-(--text-secondary) font-light leading-relaxed text-xl">
               Ich suche nach Systemen, die Skalierbarkeit und Wartbarkeit priorisieren. 
               Minimalismus ist nicht nur ein Design-Stil, sondern meine Philosophie für Software-Architektur.
             </p>
          </div>

          {/* 3. Stats & Details */}
          <div className="md:col-span-1 border-r border-b border-(--border) p-6 bg-(--bg-panel) flex flex-col justify-between">
             <div className="text-xs font-mono text-(--text-dim)">GPA</div>
             <div className="text-3xl font-light text-(--text-primary)">1.3</div>
          </div>
          <div className="md:col-span-1 border-r border-b border-(--border) p-6 bg-(--bg-panel) flex flex-col justify-between">
             <div className="text-xs font-mono text-(--text-dim)">LOC</div>
             <div className="text-lg font-light text-(--text-primary)">Karlsruhe</div>
          </div>
          <div className="md:col-span-1 border-r border-b border-(--border) p-6 bg-(--bg-panel) flex flex-col justify-between">
             <div className="text-xs font-mono text-(--text-dim)">ROLE</div>
             <div className="text-sm font-light text-(--text-primary)">Backend Architect</div>
          </div>

          {/* 4. Stack */}
          <div className="md:col-span-2 border-r border-b border-(--border) p-8">
             <h3 className="font-mono text-xs text-(--text-dim) uppercase mb-6 tracking-widest">Stack</h3>
             <div className="grid grid-cols-2 gap-8">
                {SKILLS.slice(0, 2).map((group, i) => (
                  <div key={i}>
                    <div className="text-xs font-bold text-(--text-primary) mb-2">{group.category}</div>
                    <ul className="space-y-1 text-xs text-(--text-secondary)] font-mono">
                      {group.items.map(item => <li key={item}>- {item}</li>)}
                    </ul>
                  </div>
                ))}
             </div>
          </div>

          {/* 5. Education */}
          <div className="md:col-span-2 border-r border-b border-(--border) p-8 flex flex-col justify-between hover:bg-(--bg-panel) transition-colors">
             <div className="text-xs font-mono text-(--text-dim) uppercase mb-2 tracking-widest">Education</div>
             <div>
               <div className="text-lg text-(--text-primary) font-light">B.Sc. Wirtschaftsinformatik</div>
               <div className="text-xs text-(--text-secondary) font-mono mt-1">Hochschule Karlsruhe • Since 2022</div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};