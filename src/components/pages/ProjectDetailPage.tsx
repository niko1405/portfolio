import { useNavigate, useParams } from "react-router-dom";
import { PROJECTS } from "../../data/projects";
import { useParallax } from "../../hooks/useParallax";
import { ArrowUpRight, Box, CheckCircle, Cloud, Github, Server, Terminal } from "lucide-react";
import { TechTag } from "../shared/TechTag";

export const ProjectDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const parallax = useParallax(0.01);

  const project = PROJECTS.find(p => p.id === projectId) || PROJECTS[0];

  return (
    <div className="h-full flex flex-col animate-fade-in bg-(--bg-main) relative z-10">
      <div className="h-12 border-b-minimal flex items-center px-8 gap-3 text-xs font-mono text-(--text-secondary)">
        <span className="hover:text-(--text-primary) cursor-pointer" onClick={() => navigate('/projects')}>../</span>
        <span>{project.file}</span>
      </div>

      <div className="grow overflow-y-auto p-8 md:p-16 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-16">
           <div className="flex items-center gap-4 mb-6">
             <div className="p-3 bg-(--bg-panel) border border-(--border)">
               {project.type === 'Cloud' ? <Cloud size={32} /> : <Box size={32} />}
             </div>
             <div>
               <h1 className="text-4xl font-bold text-(--text-primary)">{project.title}</h1>
               <div className="flex gap-4 mt-2 text-xs font-mono text-(--text-dim)">
                 <span>v1.0.0</span>
                 <span>|</span>
                 <span>{project.year}</span>
               </div>
             </div>
           </div>
           
           <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map(t => <TechTag key={t} text={t} />)}
           </div>

           <p className="text-xl font-light text-(--text-secondary) max-w-2xl leading-relaxed border-l-2 border-(--border) pl-6">
             {project.desc}
           </p>
        </div>

        {/* Bento Grid Layout for Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-(--border)">
           
           {/* 1. Challenge */}
           <div className="md:col-span-1 p-8 border-b md:border-b-0 md:border-r border-(--border) bg-(--bg-panel)">
              <h3 className="font-mono text-xs text-(--text-dim) uppercase mb-4 tracking-widest flex items-center gap-2">
                <ArrowUpRight size={12}/> The Challenge
              </h3>
              <p className="text-(--text-primary) font-light text-sm leading-relaxed">
                {project.detail?.problem || "Optimierung der Systemarchitektur."}
              </p>
           </div>

           {/* 2. Solution */}
           <div className="md:col-span-2 p-8 border-b md:border-b-0 border-(--border)">
              <h3 className="font-mono text-xs text-(--text-dim) uppercase mb-4 tracking-widest flex items-center gap-2">
                <CheckCircle size={12}/> The Solution
              </h3>
              <p className="text-(--text-secondary) font-light text-sm leading-relaxed">
                {project.detail?.solution || "Entwicklung einer skalierbaren Lösung."}
              </p>
           </div>

           {/* 3. Features Grid */}
           {project.detail?.features && (
             <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-(--border)">
                {project.detail.features.map((f, i) => (
                  <div key={i} className="p-6 border-r border-(--border) last:border-r-0 hover:bg-(--bg-panel) transition-colors group">
                    <div className="mb-3 text-(--text-dim) group-hover:text-(--text-primary) transition-colors">
                      {f.icon ? <f.icon size={20} strokeWidth={1.5} /> : <Box size={20} />}
                    </div>
                    <div className="text-sm font-medium text-(--text-primary) mb-1">{f.title}</div>
                    <div className="text-xs text-(--text-secondary) leading-relaxed">{f.desc}</div>
                  </div>
                ))}
             </div>
           )}

           {/* 4. Tech Deep Dive (Specific for Azure) */}
           {project.detail?.tech_deep_dive && (
             <div className="md:col-span-2 p-8 border-t border-r border-(--border) bg-(--bg-main)">
                <h3 className="font-mono text-xs text-(--text-dim) uppercase mb-6 tracking-widest flex items-center gap-2">
                  <Terminal size={12}/> Technical Implementation
                </h3>
                <div className="space-y-4">
                  {project.detail.tech_deep_dive.map((item, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 border-b border-(--border) last:border-0 pb-3 last:pb-0">
                      <span className="text-xs font-mono text-(--text-secondary) w-32 shrink-0">{item.label}</span>
                      <span className="text-sm text-(--text-primary) font-light">{item.val}</span>
                    </div>
                  ))}
                </div>
             </div>
           )}

           {/* 5. Actions */}
           <div 
             className="md:col-span-1 p-8 border-t border-(--border) bg-(--bg-panel) flex flex-col justify-center gap-4"
             style={{ transform: `translate(${parallax.x * 0.5}px, ${parallax.y * 0.5}px)` }}
           >
              <button className="hover-imperfect w-full py-3 bg-(--text-primary) text-(--bg-main) font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                <Github size={14} /> Source Code
              </button>
              <button className="hover-imperfect w-full py-3 border border-(--border) text-(--text-primary) font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-(--bg-main)">
                <Server size={14} /> Live Demo
              </button>
           </div>

        </div>
      </div>
    </div>
  );
};