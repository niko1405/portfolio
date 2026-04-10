import React from 'react';
import type { LucideIcon } from 'lucide-react';

export type DetailHighlight = {
  label: string;
  icon: LucideIcon;
  tooltipTitle: string;
  tooltipText: string;
};

type DetailHighlightChipProps = {
  item: DetailHighlight;
  isMobileTooltipMode: boolean;
  isTooltipOpen: boolean;
  onToggle: (label: string) => void;
};

/**
 * Interactive chip with hover/tap tooltip for intro detail highlights.
 */
export const DetailHighlightChip = ({
  item,
  isMobileTooltipMode,
  isTooltipOpen,
  onToggle,
}: DetailHighlightChipProps) => {
  const Icon = item.icon;
  const tooltipId = `intro-detail-tooltip-${item.label.replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}`;

  return (
    <div role="listitem" className="group/detail relative outline-none">
      <button
        type="button"
        aria-expanded={isTooltipOpen}
        aria-controls={tooltipId}
        onClick={() => {
          if (!isMobileTooltipMode) return;
          onToggle(item.label);
        }}
        className="flex items-center gap-3 rounded-full border border-(--border) bg-(--bg-panel)/80 px-4 py-2.5 text-(--text-secondary) shadow-[0_10px_24px_rgba(0,0,0,0.2)] dark:shadow-[0_10px_28px_rgba(0,0,0,0.42)] backdrop-blur-xs transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-(--text-dim) hover:text-(--text-primary) focus-visible:-translate-y-1 focus-visible:scale-[1.02] focus-visible:border-(--text-dim) focus-visible:text-(--text-primary)"
      >
        <Icon size={14} className="shrink-0" />
        <span className="text-xs md:text-sm">{item.label}</span>
      </button>

      <div
        id={tooltipId}
        role="tooltip"
        className={`absolute left-1/2 top-full z-30 mt-3 w-[min(18rem,calc(100vw-3rem))] sm:w-70 -translate-x-1/2 rounded-2xl border border-(--text-dim)/40 bg-(--bg-panel) p-4 text-left shadow-2xl transition-all duration-250 ${
          isTooltipOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-1 opacity-0 pointer-events-none'
        } sm:translate-y-1 sm:opacity-0 sm:pointer-events-none sm:group-hover/detail:translate-y-0 sm:group-hover/detail:opacity-100 sm:group-focus-within/detail:translate-y-0 sm:group-focus-within/detail:opacity-100`}
      >
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-(--text-dim)/40 bg-(--bg-panel)" />
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-(--text-dim)">{item.tooltipTitle}</p>
        <p className="mt-2 text-xs md:text-[13px] leading-relaxed text-(--text-secondary)">{item.tooltipText}</p>
      </div>
    </div>
  );
};
