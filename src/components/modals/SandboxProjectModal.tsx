import { ChevronLeft, ChevronRight, ExternalLink, GalleryHorizontal, Github, Play, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useApp } from "../../context/AppContext";
import { useModal } from "../../context/ModalContext";
import type { SandboxProject } from "../../types";

interface SandboxProjectModalProps {
  project: SandboxProject;
}

export const SandboxProjectModal: React.FC<SandboxProjectModalProps> = ({ project }) => {
  const { closeModal } = useModal();
  const { isDarkMode } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [loadedVideoIndices, setLoadedVideoIndices] = useState<number[]>([]);

  const hasGallery = project.gallery.length > 0;
  const galleryLength = project.gallery.length;
  const activeItem = project.gallery[activeIndex];
  const isActiveVideoLoaded = loadedVideoIndices.includes(activeIndex);

  const dotKey = useMemo(
    () => project.gallery.map((item, index) => `${item.alt}-${index}`),
    [project.gallery]
  );

  const linkTone = isDarkMode
    ? "bg-white text-black border-white hover:bg-slate-200"
    : "bg-black text-white border-black hover:bg-slate-800";

  useEffect(() => {
    // Preload all preview images/posters so gallery navigation feels instant,
    // while videos remain unloaded until user explicitly presses play.
    const previewSources = project.gallery
      .map((item) => (item.type === "image" ? item.src : item.poster))
      .filter((src): src is string => Boolean(src));

    previewSources.forEach((src) => {
      const preview = new Image();
      preview.src = src;
    });
  }, [project.gallery]);

  const loadVideoAtIndex = (index: number) => {
    setLoadedVideoIndices((prev) => (prev.includes(index) ? prev : [...prev, index]));
  };

  const showPrev = () => {
    if (!hasGallery) return;
    setActiveIndex((prev) => (prev - 1 + galleryLength) % galleryLength);
  };

  const showNext = () => {
    if (!hasGallery) return;
    setActiveIndex((prev) => (prev + 1) % galleryLength);
  };

  const renderGalleryMedia = (isLightbox = false) => {
    if (!hasGallery) return null;

    const wrapperClass = isLightbox
      ? "h-[55vh] w-full max-w-4xl flex items-center justify-center border border-(--border) bg-(--bg-main)"
      : "h-36 flex items-center justify-center border border-(--border) bg-(--bg-panel)";
    const imageClass = isLightbox ? "max-h-[52vh] max-w-[92%] object-contain" : "max-h-30 max-w-[90%] object-contain";
    const videoClass = isLightbox ? "max-h-[52vh] max-w-[92%] object-contain" : "max-h-30 max-w-[90%] object-contain";

    return (
      <div className={wrapperClass}>
        {activeItem.type === "video" ? (
          isActiveVideoLoaded ? (
            <video
              className={videoClass}
              controls
              autoPlay
              playsInline
              preload="none"
              src={activeItem.src}
            />
          ) : (
            <button
              type="button"
              onClick={() => loadVideoAtIndex(activeIndex)}
              className="h-full w-full flex items-center justify-center relative"
              aria-label={`Load and play video ${activeIndex + 1}`}
            >
              {activeItem.poster ? (
                <img
                  src={activeItem.poster}
                  alt={`${activeItem.alt} preview`}
                  className={imageClass}
                />
              ) : (
                <div className="text-xs font-mono text-(--text-dim)">Video bereit zum Laden</div>
              )}
              <span className="absolute inline-flex items-center gap-2 px-3 py-2 border border-(--border) bg-(--bg-main) text-xs font-mono text-(--text-primary)">
                <Play size={12} />
                Play Video
              </span>
            </button>
          )
        ) : (
          <img src={activeItem.src} alt={activeItem.alt} className={imageClass} />
        )}
      </div>
    );
  };

  return (
    <div className="bg-(--bg-panel) border border-(--border) shadow-2xl overflow-hidden">
      <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-(--border)">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-(--text-dim) mb-2">
            Sandbox Project
          </div>
          <h3 className="text-2xl font-light text-(--text-primary)">{project.title}</h3>
          <p className="text-sm text-(--text-secondary) font-mono mt-1">{project.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={closeModal}
          className="text-(--text-dim) hover:text-(--text-primary) transition-colors"
          aria-label="Close sandbox project details"
        >
          <X size={16} />
        </button>
      </div>

      <div className="px-6 py-6 space-y-6">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-(--text-dim) mb-3">
            Insights
          </div>
          <p className="text-sm leading-relaxed text-(--text-secondary)">{project.details}</p>
        </div>

        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-(--text-dim) mb-3">
            Learning
          </div>
          <p className="text-sm leading-relaxed text-(--text-secondary)">{project.learning}</p>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            disabled={!hasGallery}
            className="inline-flex items-center gap-2 px-6 py-3 border border-(--text-primary) text-(--text-primary) text-sm font-mono font-semibold tracking-wide hover:bg-(--bg-main) hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Open gallery in large view"
          >
            <GalleryHorizontal size={14} />
            Open Gallery
          </button>
        </div>

        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-(--text-dim) mb-3">
            Tech Stack
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 border border-(--border) bg-(--bg-main) text-[11px] font-mono text-(--text-secondary)"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-(--text-dim) mb-3">
            Links
          </div>
          <div className="flex flex-wrap gap-2">
            {project.links.map((link) =>
              link.href ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-3 py-2 border text-xs font-mono transition-colors ${linkTone}`}
                >
                  <Github size={12} />
                  {link.label}
                  <ExternalLink size={12} />
                </a>
              ) : (
                <span
                  key={link.label}
                  className={`inline-flex items-center gap-2 px-3 py-2 border text-xs font-mono opacity-65 ${linkTone}`}
                >
                  <Github size={12} />
                  {link.label}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {isLightboxOpen && hasGallery && (
        <div
          className="fixed inset-0 z-60 p-4 md:p-10 flex items-center justify-center bg-black/85"
          role="dialog"
          aria-modal="true"
          aria-label="Sandbox gallery large view"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="w-full max-w-5xl space-y-4" onClick={(event) => event.stopPropagation()}>
            <div className="flex justify-between items-center gap-4">
              <div className="text-xs font-mono text-white/80">{activeItem.caption}</div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-white/30 text-xs font-mono text-white hover:bg-white/10 transition-colors"
                aria-label="Close gallery large view"
              >
                <X size={14} />
                Close
              </button>
            </div>

            {renderGalleryMedia(true)}

            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={showPrev}
                className="inline-flex items-center gap-1 px-3 py-2 border border-white/30 text-xs font-mono text-white hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={14} />
                Prev
              </button>

              <div className="flex items-center gap-2">
                {project.gallery.map((_, index) => (
                  <button
                    key={`lightbox-${dotKey[index]}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 w-2 rounded-full transition-opacity ${index === activeIndex ? "bg-white opacity-100" : "bg-white/40 opacity-80"}`}
                    aria-label={`Show gallery image ${index + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={showNext}
                className="inline-flex items-center gap-1 px-3 py-2 border border-white/30 text-xs font-mono text-white hover:bg-white/10 transition-colors"
              >
                Next
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};