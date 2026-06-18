import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import type { GalleryItem } from "../../types";

interface GalleryMediaProps {
  item: GalleryItem;
  isLightbox?: boolean;
  onVideoLoad?: () => void;
  isVideoLoaded?: boolean;
  className?: string;
  /** 'contain' shows full image with possible empty space, 'cover' fills container and crops */
  variant?: "contain" | "cover";
  /** When true the play button is hidden and only the poster is shown (e.g. thumbnails). */
  disablePlay?: boolean;
}

/**
 * Renders a single gallery item (image or video) with lazy-loading support.
 * Videos are loaded on-demand when the user clicks play.
 */
export const GalleryMedia: React.FC<GalleryMediaProps> = ({
  item,
  isLightbox = false,
  onVideoLoad,
  isVideoLoaded = false,
  className = "",
  variant = "contain",
  disablePlay = false,
}) => {
  const [playRequested, setPlayRequested] = useState(false);
  const [resolvedSrc, setResolvedSrc] = useState<string | undefined>(item.src);

  const showVideo = item.type === "video" && (playRequested || isVideoLoaded);

  useEffect(() => {
    // Reset transient state whenever the displayed item changes (gallery navigation).
    setPlayRequested(false);
    setResolvedSrc(item.src);
  }, [item]);

  useEffect(() => {
    // Lazily resolve the video URL only once playback is requested.
    if (!showVideo || resolvedSrc || !item.loadSrc) return;
    let active = true;
    item.loadSrc().then((url) => {
      if (active) setResolvedSrc(url);
    });
    return () => {
      active = false;
    };
  }, [showVideo, resolvedSrc, item]);

  const handlePlay = () => {
    setPlayRequested(true);
    onVideoLoad?.();
  };

  const isCover = variant === "cover";

  const wrapperClass = isLightbox
    ? "w-full flex-1 min-h-0 min-w-0 flex items-center justify-center border border-(--border) bg-(--bg-main) overflow-hidden"
    : isCover
      ? "h-full w-full flex items-center justify-center overflow-hidden"
      : "h-36 flex items-center justify-center border border-(--border) bg-(--bg-panel)";

  const mediaClass = isLightbox
    ? "max-h-full max-w-full h-full w-full object-contain"
    : isCover
      ? "h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
      : "max-h-30 max-w-[90%] object-contain";

  const posterClass = isCover
    ? "h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
    : mediaClass;

  const containerClass = className ? `${wrapperClass} ${className}` : wrapperClass;

  const playOverlay = (
    <span className="absolute inline-flex items-center gap-2 px-3 py-2 border border-(--border) bg-(--bg-main) text-xs font-mono text-(--text-primary)">
      <Play size={12} />
      Play Video
    </span>
  );

  const posterPreview = item.poster ? (
    <img src={item.poster} alt={`${item.alt} preview`} className={posterClass} loading="eager" />
  ) : (
    <div className="text-xs font-mono text-(--text-dim)">Video</div>
  );

  return (
    <div className={containerClass}>
      {item.type === "video" ? (
        showVideo && resolvedSrc ? (
          <video
            className={mediaClass}
            controls
            autoPlay
            playsInline
            preload="none"
            src={resolvedSrc}
          />
        ) : disablePlay ? (
          posterPreview
        ) : (
          <button
            type="button"
            onClick={handlePlay}
            className="h-full w-full flex items-center justify-center relative"
            aria-label={`Load and play video: ${item.alt}`}
          >
            {posterPreview}
            {playOverlay}
          </button>
        )
      ) : (
        <img src={item.src} alt={item.alt} className={mediaClass} loading="eager" />
      )}
    </div>
  );
};
