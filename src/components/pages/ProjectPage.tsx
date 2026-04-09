import { useState } from "react";
import { PROJECTS, SANDBOX_PROJECTS } from "../../data/projects";
import { ViewHeader } from "../shared/ViewHeader";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/ModalContext";
import { SandboxProjectModal } from "../modals/SandboxProjectModal";

export const ProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = [...new Set(PROJECTS.flatMap((p) => p.tags))];

  // Build a balanced tag mix by picking one representative tag per project.
  // Prefer unique tags across projects, then fall back to the first available one.
  const suggestedTags = (() => {
    const usedTags = new Set<string>();

    return PROJECTS.map((project) => {
      const uniqueCandidate = project.tags.find((tag) => !usedTags.has(tag));
      const selectedTag = uniqueCandidate ?? project.tags[0];
      if (selectedTag) {
        usedTags.add(selectedTag);
      }
      return selectedTag;
    }).filter((tag): tag is string => Boolean(tag));
  })();

  const filteredProjects = PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = activeTag ? project.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  const filteredSandboxProjects = SANDBOX_PROJECTS.filter(project => {
    const haystack = `${project.title} ${project.subtitle} ${project.heroSummary} ${project.details} ${project.stack.join(" ")}`.toLowerCase();
    return haystack.includes(searchTerm.toLowerCase());
  });

  const openSandboxProject = (projectId: string) => {
    const project = SANDBOX_PROJECTS.find((item) => item.id === projectId);
    if (!project) return;

    openModal(<SandboxProjectModal project={project} />, { position: "center", fullscreenOnMobile: true });
  };

  return (
    <div className="h-full flex flex-col animate-fade-in relative z-10">
      <ViewHeader title="Projekte" path="/src/projects">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
           <div className="flex items-center gap-2 border-b border-(--border) px-2 py-1">
             <Search size={14} className="text-(--text-dim)" />
             <input 
               type="text" 
               placeholder="grep projects..." 
               className="bg-transparent border-none outline-none text-xs font-mono text-(--text-primary) w-32 focus:w-48 transition-all placeholder-[#333]"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           
           <div className="flex gap-2 overflow-x-auto no-scrollbar">
             {(suggestedTags.length > 0 ? suggestedTags : allTags.slice(0, 3)).map(tag => (
               <button 
                 key={tag} 
                 onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                 className={`text-[10px] font-mono px-2 py-1 border transition-colors ${activeTag === tag ? 'border-(--text-secondary) text-(--text-primary)' : 'border-(--border) text-(--text-dim) hover:text-(--text-secondary)'}`}
               >
                 {tag}
               </button>
             ))}
             {activeTag && <button onClick={() => setActiveTag(null)} className="text-[10px] font-mono px-2 py-1 text-(--text-dim) hover:text-white"><X size={10} /></button>}
           </div>
        </div>
      </ViewHeader>

      <div className="grow overflow-y-auto flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-(--border)">
          {filteredProjects.length > 0 ? filteredProjects.map((project, i) => (
            <div 
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className={`
                bg-(--bg-main) p-8 cursor-pointer transition-colors group flex flex-col h-full relative
                border-r border-(--border) border-t
                hover:bg-(--bg-panel)
                ${(i + 1) % 3 === 0 ? 'lg:border-r-0' : ''} 
              `}
            >
              <div className="flex justify-between items-start mb-12">
                 <div className="flex items-center gap-3 text-(--text-secondary) group-hover:text-(--text-primary) transition-colors">
                   <project.icon size={16} strokeWidth={1.5} />
                 </div>
                 <span className="font-mono text-[10px] text-(--text-dim)">{project.year}</span>
              </div>
              
              <div className="mt-auto">
                <h3 className="text-lg font-medium mb-2 text-(--text-primary) group-hover:translate-x-1 transition-transform duration-300">{project.title}</h3>
                <p className="text-xs text-(--text-secondary) font-mono line-clamp-1 opacity-60">
                  {project.desc}
                </p>
              </div>
            </div>
          )) : (
            <div className="col-span-3 p-8 text-center text-(--text-dim) font-mono text-sm">
              No modules found matching query.
            </div>
          )}
        </div>

        <div className="border-b border-(--border) bg-(--bg-main) mt-8 md:mt-auto md:pt-12">
          <div className="px-8 py-6 flex items-center justify-between gap-4 border-b border-(--border) bg-(--bg-panel)">
            <div>
              <div className="hidden md:block text-[10px] font-mono uppercase tracking-[0.28em] text-(--text-dim) mb-1">
                Sonstige Projekte / Sandbox
              </div>
              <h3 className="text-lg font-medium text-(--text-primary)">Experimental Workbench</h3>
            </div>
            <div className="md:hidden text-[10px] font-mono text-(--text-dim) text-right leading-relaxed self-center">
              Sonstige Projekte / Sandbox
            </div>
            <div className="hidden md:block text-[10px] font-mono text-(--text-dim) max-w-64 text-right leading-relaxed">
              Kleine Testflächen für neue Stacks, Ideen und Frameworks.
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-(--border)">
            {filteredSandboxProjects.length > 0 ? filteredSandboxProjects.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => openSandboxProject(project.id)}
                className={`group text-left px-8 py-6 border-r border-b border-(--border) last:border-r-0 last:border-b-0 transition-colors hover:bg-(--bg-panel) ${index % 2 === 0 ? "bg-[rgba(255,255,255,0.02)]" : "bg-transparent"}`}
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1 text-(--text-dim) group-hover:text-(--text-primary) transition-colors">
                    <project.icon size={18} strokeWidth={1.5} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-base font-medium text-(--text-primary) group-hover:translate-x-1 transition-transform duration-300">
                          {project.title}
                        </h3>
                        <p className="text-xs font-mono text-(--text-dim) mt-1">{project.subtitle}</p>
                      </div>
                      <span className="text-[10px] font-mono text-(--text-dim) uppercase tracking-widest">
                        Sandbox
                      </span>
                    </div>

                    <p className="text-xs text-(--text-secondary) leading-relaxed line-clamp-2 md:line-clamp-3">
                      {project.heroSummary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 border border-(--border) text-[10px] font-mono text-(--text-dim)"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            )) : (
              <div className="col-span-2 p-8 text-center text-(--text-dim) font-mono text-sm">
                No sandbox modules found matching query.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};