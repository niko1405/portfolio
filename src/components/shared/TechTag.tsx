// Labels for skills
export const TechTag: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => (
  <span className={`text-[10px] font-mono border border-(--border) px-2 py-1 text-(--text-secondary) bg-[#0c0c0c] ${className}`}>
    {text}
  </span>
);