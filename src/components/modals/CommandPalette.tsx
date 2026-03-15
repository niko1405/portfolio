import { useEffect, useMemo, useRef, useState } from "react";
import { useModal } from "../../context/ModalContext";
import { useNavigate } from "react-router-dom";
import type { CommandItem } from "../../types";
import { ArrowRight, FileText, Github, LayoutGrid, Mail, Search, Send, User } from "lucide-react";
import { ContactModalContent } from "./ContactModal";

export const CommandPaletteContent: React.FC = () => {
  const navigate = useNavigate();
  const { closeModal, openModal } = useModal();
  const [input, setInput] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: CommandItem[] = useMemo(() => {
    const base: CommandItem[] = [
      { id: 'home', label: 'Go to Home', icon: FileText, action: () => navigate('/home') },
      { id: 'projects', label: 'Go to Projects', icon: LayoutGrid, action: () => navigate('/projects') },
      { id: 'about', label: 'Go to About', icon: User, action: () => navigate('/about') },
      { id: 'email', label: 'Copy Email', icon: Mail, action: () => { navigator.clipboard.writeText('mail@example.com'); alert('Email copied!'); } },
      { id: 'github', label: 'Open GitHub', icon:Github, action: () => window.open('https://github.com', '_blank') },
      { id: 'contact', label: 'Contact Me', icon: Send, action: () => openModal(<ContactModalContent />, { position: 'center' }) },
    ];
    if (!input) return base;
    return base.filter(cmd => cmd.label.toLowerCase().includes(input.toLowerCase()));
  }, [input, navigate, openModal]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      setSelectedIndex(prev => (prev + 1) % commands.length);
    } else if (e.key === 'ArrowUp') {
      setSelectedIndex(prev => (prev - 1 + commands.length) % commands.length);
    } else if (e.key === 'Enter') {
      commands[selectedIndex]?.action();
      closeModal(); // Close palette after action
    }
  };

  return (
    <div className="bg-(--bg-panel) border border-(--border) shadow-2xl overflow-hidden flex flex-col">
      <div className="flex items-center px-4 py-3 border-b border-(--border)">
        <Search size={16} className="text-(--text-dim) mr-3" />
        <input 
          ref={inputRef}
          type="text" 
          className="bg-transparent border-none outline-none grow text-sm font-mono text-(--text-primary) placeholder-(--text-dim) placeholder-opacity-60"
          placeholder="Type a command..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <span className="text-[10px] text-(--text-dim) border border-(--border) px-1.5 rounded">ESC</span>
      </div>
      <div className="py-2">
        {commands.length === 0 ? <div className="px-4 py-3 text-xs text-(--text-dim) font-mono">No commands found.</div> : 
          commands.map((cmd, i) => (
            <div 
              key={cmd.id}
              className={`px-4 py-2 flex items-center justify-between cursor-pointer text-sm font-mono transition-colors ${i === selectedIndex ? 'bg-(--bg-hover) text-(--text-primary)' : 'text-(--text-secondary)'} hover:bg-(--bg-hover)`}
              onClick={() => { cmd.action(); closeModal(); }}
              onMouseEnter={() => setSelectedIndex(i)}
            >
              <div className="flex items-center gap-3"><cmd.icon size={14} /><span>{cmd.label}</span></div>
              {i === selectedIndex && <ArrowRight size={12} className="opacity-50" />}
            </div>
          ))
        }
      </div>
    </div>
  );
};