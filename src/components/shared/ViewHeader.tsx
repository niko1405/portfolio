// Header section for pages
export const ViewHeader: React.FC<{ title: string; path: string; children?: React.ReactNode }> = ({ title, path, children }) => (
  <div className="p-8 border-b-minimal flex flex-col md:flex-row md:items-end justify-between gap-6 bg-(--bg-main) sticky top-0 z-20">
    <div>
      <h2 className="text-3xl font-light mb-1 text-(--text-primary)">{title}</h2>
      <p className="font-mono text-xs text-(--text-dim)">{path}</p>
    </div>
    {children}
  </div>
);