import { useNavigate, useParams } from "react-router-dom";
import { PROJECTS } from "../../data/projects";
import { useParallax } from "../../hooks";
import { ArrowLeft, ArrowRight, ArrowUpRight, Box, CheckCircle, Github, Server, Terminal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { TechTag } from "../shared";
import { useAppContext } from "../../context";

/**
 * Full detail view for a selected project with media gallery and actions.
 */
export const ProjectDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: projectId } = useParams();
  const parallax = useParallax(0.01);
  const { isDarkMode } = useAppContext();

  const project = PROJECTS.find(p => p.id === projectId) || PROJECTS[0];
  const gallery = project.detail?.imageGallery?.length
    ? project.detail.imageGallery
    : project.detail?.image
      ? [project.detail.image]
      : [];
  const galleryLength = gallery.length;

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  const showPrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryLength) % galleryLength);
  };

  const showNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryLength);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft" && galleryLength > 1) {
        setActiveImageIndex((prev) => (prev - 1 + galleryLength) % galleryLength);
      }
      if (event.key === "ArrowRight" && galleryLength > 1) {
        setActiveImageIndex((prev) => (prev + 1) % galleryLength);
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [galleryLength, isLightboxOpen]);

  const pageTone = isDarkMode
    ? ""
    : "bg-gradient-to-b from-[rgba(255,255,255,0.82)] via-[rgba(255,255,255,0.5)] to-transparent";
  const panelTone = isDarkMode
    ? ""
    : "rounded-xl shadow-[0_10px_32px_rgba(15,23,42,0.08)]";
  const cardTone = isDarkMode
    ? ""
    : "bg-white/70 backdrop-blur-[2px]";
  const lightboxOverlayTone = isDarkMode
    ? "bg-black/85"
    : "bg-[rgba(243,244,246,0.92)] backdrop-blur-[2px]";
  const lightboxFrameTone = isDarkMode
    ? "border-white/30 bg-black/20"
    : "border-slate-300/80 bg-white/85 shadow-[0_12px_36px_rgba(15,23,42,0.16)]";
  const lightboxControlTone = isDarkMode
    ? "border-white/40 bg-black/45 text-white hover:bg-black/65"
    : "border-slate-300 bg-white/85 text-slate-700 hover:bg-white";
  const lightboxDotActiveTone = isDarkMode ? "bg-white opacity-100" : "bg-slate-700 opacity-100";
  const lightboxDotTone = isDarkMode ? "bg-white/60 opacity-70" : "bg-slate-400 opacity-80";

  return (
    <div className={`h-full flex flex-col animate-fade-in bg-(--bg-main) relative z-10 ${pageTone}`}>
      <div className="h-12 border-b-minimal flex items-center px-8 gap-3 text-xs font-mono text-(--text-secondary)">
        <span className="hover:text-(--text-primary) cursor-pointer" onClick={() => navigate('/projects')}>../</span>
        <span>{project.file}</span>
      </div>

      <div className="grow overflow-y-auto p-6 md:p-12 max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className={`mb-16 ${!isDarkMode ? "pr-1" : ""}`}>
           <div className="flex items-center gap-4 mb-6">
             <div className={`p-3 bg-(--bg-panel) border border-(--border) ${cardTone}`}>
               <project.icon size={32} />
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
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-0 border border-(--border) overflow-hidden ${panelTone}`}>
           
           {/* 1. Challenge */}
            <div className={`md:col-span-1 p-8 border-b md:border-b-0 md:border-r border-(--border) bg-(--bg-panel) ${cardTone}`}>
              <h3 className="font-mono text-xs text-(--text-dim) uppercase mb-4 tracking-widest flex items-center gap-2">
                <ArrowUpRight size={12}/> The Challenge
              </h3>
              <p className="text-(--text-primary) font-light text-sm leading-relaxed">
                {project.detail?.problem || "Optimierung der Systemarchitektur."}
              </p>
           </div>

           {/* 2. Solution */}
           <div className={`md:col-span-2 p-8 border-b md:border-b-0 border-(--border) ${!isDarkMode ? "bg-white/50" : ""}`}>
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
                  <div key={i} className={`p-6 border-r border-(--border) last:border-r-0 hover:bg-(--bg-panel) transition-colors group ${!isDarkMode ? "bg-white/40" : ""}`}>
                    <div className="mb-3 text-(--text-dim) group-hover:text-(--text-primary) transition-colors">
                      {f.icon ? <f.icon size={20} strokeWidth={1.5} /> : <Box size={20} />}
                    </div>
                    <div className="text-sm font-medium text-(--text-primary) mb-1">{f.title}</div>
                    <div className="text-xs text-(--text-secondary) leading-relaxed">{f.desc}</div>
                  </div>
                ))}
             </div>
           )}

           {/* 4. Technology & Implementation Table */}
           {project.detail?.implementationTable ? (
             <div className={`md:col-span-2 p-8 border-t md:border-r border-(--border) bg-(--bg-main) ${!isDarkMode ? "bg-white/50" : ""}`}>
                <h3 className="font-mono text-xs text-(--text-dim) uppercase mb-6 tracking-widest flex items-center gap-2">
                  <Terminal size={12}/> Technology & Implementation
                </h3>
                <div className="overflow-x-auto border border-(--border)">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-(--bg-panel)">
                        <th className="text-left p-3 border-b border-r border-(--border) font-mono text-xs tracking-widest text-(--text-dim) uppercase">Bereich</th>
                        <th className="text-left p-3 border-b border-(--border) font-mono text-xs tracking-widest text-(--text-dim) uppercase">Technologie & Umsetzung</th>
                      </tr>
                    </thead>
                    <tbody>
                      {project.detail.implementationTable.map((row) => (
                        <tr key={row.area} className="align-top">
                          <td className="p-3 border-b border-r border-(--border) text-(--text-primary) font-medium whitespace-nowrap">{row.area}</td>
                          <td className="p-3 border-b border-(--border) text-(--text-secondary) font-light leading-relaxed">{row.implementation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
           ) : project.detail?.tech_deep_dive && (
             <div className={`md:col-span-2 p-8 border-t md:border-r border-(--border) bg-(--bg-main) ${!isDarkMode ? "bg-white/50" : ""}`}>
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

           {/* 5. Visual & Actions */}
           <div
             className={`md:col-span-1 p-6 md:p-8 border-t border-(--border) bg-(--bg-panel) flex flex-col justify-center gap-5 ${cardTone}`}
             style={{ transform: `translate(${parallax.x * 0.5}px, ${parallax.y * 0.5}px)` }}
           >
              {gallery.length > 0 && (
                <div className="border border-(--border) bg-(--bg-main) p-2">
                  <div className="aspect-4/3 overflow-hidden group">
                    <button
                      type="button"
                      onClick={() => openLightbox(0)}
                      className="h-full w-full cursor-zoom-in"
                      aria-label="Open image gallery"
                    >
                      <img
                        src={gallery[0]}
                        alt={`${project.title} preview`}
                        className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </button>
                  </div>
                </div>
              )}

              <a
                href={project.detail?.actions?.sourceCode || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-imperfect w-full py-3 bg-(--text-primary) text-(--bg-main) font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <Github size={14} /> Source Code
              </a>
              {project.detail?.actions?.liveDemo && (
                <a
                  href={project.detail.actions.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover-imperfect w-full py-3 border border-(--border) text-(--text-primary) font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-(--bg-main)"
                >
                  <Server size={14} /> Live Demo
                </a>
              )}
           </div>

           {/* 6. Takeaway / Learning */}
           {project.detail?.takeaway && (
             <div className={`md:col-span-3 p-8 border-t border-(--border) ${!isDarkMode ? "bg-white/60" : "bg-(--bg-main)"}`}>
               <h3 className="font-mono text-xs text-(--text-dim) uppercase mb-4 tracking-widest flex items-center gap-2">
                 <CheckCircle size={12} /> Takeaway / Learning
               </h3>
               <p className="text-(--text-secondary) font-light text-sm md:text-base leading-relaxed max-w-4xl">
                 {project.detail.takeaway}
               </p>
             </div>
           )}

        </div>
      </div>

      {isLightboxOpen && gallery.length > 0 && (
        <div
          className={`fixed inset-0 z-50 p-4 md:p-10 flex items-center justify-center ${lightboxOverlayTone}`}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image gallery"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className={`fixed top-4 right-4 md:top-6 md:right-6 z-60 p-2 border ${lightboxControlTone}`}
            aria-label="Close gallery"
          >
            <X size={22} />
          </button>

          <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-center">
              <div className={`relative border ${lightboxFrameTone}`}>
                <img
                  src={gallery[activeImageIndex]}
                  alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                  className="block w-auto max-h-[80vh] max-w-[min(92vw,1200px)] object-contain"
                />

                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPrevImage}
                      className={`absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2 p-2 border ${lightboxControlTone}`}
                      aria-label="Previous image"
                    >
                      <ArrowLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={showNextImage}
                      className={`absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-1/2 p-2 border ${lightboxControlTone}`}
                      aria-label="Next image"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {gallery.length > 1 && (
              <div className="mt-3 flex justify-center gap-2">
                {gallery.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition-opacity ${index === activeImageIndex ? lightboxDotActiveTone : lightboxDotTone}`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};