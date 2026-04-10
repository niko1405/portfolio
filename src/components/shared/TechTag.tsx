// Labels for skills
/**
 * Small monospace pill used for technology labels.
 */
export const TechTag: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => (
  <span className={`text-[10px] font-mono border border-(--border) px-2 py-1 text-(--text-secondary) bg-(--bg-panel) ${className}`}>
    {text}
  </span>
);