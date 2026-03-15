import { ArrowRight, X } from "lucide-react";
import { useModal } from "../../context/ModalContext";

export const ContactModalContent: React.FC = () => {
  const { closeModal } = useModal();
  
  return (
    <div className="bg-(--bg-panel) border border-(--border) shadow-2xl flex flex-col p-8">
      <div className="flex justify-between items-center mb-8">
        <span className="text-xs font-mono text-(--text-secondary) uppercase tracking-widest">Compose</span>
        <button onClick={closeModal} className="text-(--text-dim) hover:text-(--text-primary) transition-colors"><X size={14}/></button>
      </div>
      <div className="space-y-6 font-mono text-sm">
        <div className="grid grid-cols-[60px_1fr] items-baseline gap-2">
          <label className="text-(--text-dim)">From:</label>
          <input type="email" className="bg-transparent border-b border-(--border) focus:border-(--text-primary) outline-none py-1 text-(--text-primary) placeholder-(--text-dim) placeholder-opacity-50" placeholder="your@email.com" />
        </div>
        <div className="grid grid-cols-[60px_1fr] items-baseline gap-2">
          <label className="text-(--text-dim)">Subj:</label>
          <input type="text" className="bg-transparent border-b border-(--border) focus:border-(--text-primary) outline-none py-1 text-(--text-primary) placeholder-(--text-dim) placeholder-opacity-50" placeholder="Hello" />
        </div>
        <div className="pt-4">
          <textarea className="w-full h-32 bg-transparent border-none p-0 text-(--text-primary) focus:outline-none resize-none placeholder-(--text-dim) placeholder-opacity-40" placeholder="Write your message..." />
        </div>
      </div>
      <div className="flex justify-end mt-8 border-t border-(--border) pt-4">
        <button 
          className="text-xs font-bold font-mono text-(--text-primary) hover:text-(--accent) flex items-center gap-2 group transition-colors"
          onClick={() => { alert('Sent!'); closeModal(); }}
        >
          SEND MESSAGE <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform"/>
        </button>
      </div>
    </div>
  );
};