import { useState } from "react";
import { PROJECTS } from "../../data/projects";
import { ViewHeader } from "../shared/ViewHeader";
import { Box, Cloud, Search, Server, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProjectPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = [...new Set(PROJECTS.flatMap(p => p.tags))];

  const filteredProjects = PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = activeTag ? project.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

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
             {allTags.slice(0, 3).map(tag => (
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

      <div className="grow overflow-y-auto">
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
                   {project.type === 'Cloud' ? <Cloud size={16} strokeWidth={1.5} /> : 
                    project.type === 'Backend' ? <Server size={16} strokeWidth={1.5} /> : 
                    <Box size={16} strokeWidth={1.5} />}
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
      </div>
    </div>
  );
};