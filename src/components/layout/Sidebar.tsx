import { Command, Github, Mail, Sun, Moon, RotateCcw, X } from "lucide-react";
import { CommandPaletteContent } from "../modals/CommandPalette";
import { ContactModalContent } from "../modals/ContactModal";
import { useModal } from "../../context/ModalContext";
import { useApp } from "../../context/AppContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Minimalistisches Hamburger Menu Icon
const HamburgerIcon = () => (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="0" y1="8" x2="20" y2="8" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="0" y1="15" x2="20" y2="15" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
);

export const Sidebar: React.FC = () => {
    const { openModal } = useModal();
    const { isDarkMode, toggleDarkMode } = useApp();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const navigate = useNavigate();

    const { isReplayedIntro, setIsReplayedIntro } = useApp();

    const handleReplayIntro = () => {
        setIsReplayedIntro(true);
        navigate('/intro', { state: { isReplayed: true } });
        window.scrollTo(0, 0);
    };

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMobileOpen) {
                setIsMobileOpen(false);
            }
        };
        
        if (isMobileOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMobileOpen]);

    const buttonClass = "p-2 text-(--text-secondary) hover:text-(--text-primary) transition-colors";

    // Desktop Sidebar (hidden on mobile)
    return (
        <>
            {/* Mobile Menu Button - Top Right */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="md:hidden fixed top-4 right-4 z-50 p-3 text-(--text-secondary) hover:text-(--text-primary) transition-colors bg-(--bg-main) border border-(--border) rounded"
                title="Menu"
            >
                <HamburgerIcon />
            </button>

            {/* Mobile Menu Backdrop */}
            {isMobileOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Mobile Sidebar - Same as Desktop but overlayed */}
            <div 
                className={`md:hidden fixed top-0 left-0 h-full w-16 border-r border-(--border) z-50 flex flex-col items-center py-6 gap-6 shrink-0 bg-(--bg-main) transform transition-transform duration-300 ease-out ${
                    isMobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                {/* Close Button at top */}
                <button
                    onClick={() => setIsMobileOpen(false)}
                    className="p-2 text-(--text-secondary) hover:text-(--text-primary) transition-colors mb-4"
                >
                    <X size={18} strokeWidth={1.5} />
                </button>

                <div className="flex flex-col items-center gap-2 pt-2 text-[10px] font-bold tracking-widest text-(--text-primary) vertical-text uppercase">
                    Nikolas
                </div>

                <div className="flex flex-col gap-6 mt-2">
                    <button
                        onClick={() => {
                            openModal(<CommandPaletteContent />, { position: 'top' });
                            setIsMobileOpen(false);
                        }}
                        className={buttonClass}
                        title="Command Palette"
                    >
                        <Command size={18} strokeWidth={1.5} />
                    </button>
                    <button
                        onClick={() => {
                            toggleDarkMode();
                        }}
                        className={buttonClass}
                        title={isDarkMode ? "Light Mode" : "Dark Mode"}
                    >
                        {isDarkMode ? (
                            <Sun size={18} strokeWidth={1.5} />
                        ) : (
                            <Moon size={18} strokeWidth={1.5} />
                        )}
                    </button>
                    <button
                        onClick={() => {
                            handleReplayIntro();
                            setIsMobileOpen(false);
                        }}
                        className={buttonClass}
                        title="Replay Intro"
                    >
                        <RotateCcw size={18} strokeWidth={1.5} />
                    </button>
                </div>

                <div className="mt-auto flex flex-col gap-6 mb-2 text-(--text-secondary) items-center w-full">
                    <button
                        onClick={() => {
                            openModal(<ContactModalContent />, { position: 'center' });
                            setIsMobileOpen(false);
                        }}
                        className="hover:text-(--text-primary) transition-colors flex justify-center w-full"
                    >
                        <Mail size={18} strokeWidth={1.5} />
                    </button>
                    <a 
                        href="#" 
                        className="hover:text-(--text-primary) transition-colors flex justify-center w-full"
                        onClick={() => setIsMobileOpen(false)}
                    >
                        <Github size={18} strokeWidth={1.5} />
                    </a>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex fixed left-0 top-0 h-screen w-16 border-r-minimal flex-col items-center py-6 gap-6 shrink-0 bg-(--bg-main) z-30">
                <div className="flex flex-col items-center gap-0 pt-2 text-small font-bold tracking-widest text-(--text-primary) vertical-text uppercase">
                    Nikolas
                </div>

                <div className="flex flex-col gap-6 mt-2">
                    <button
                        onClick={() => openModal(<CommandPaletteContent />, { position: 'top' })}
                        className={buttonClass}
                        title="Command Palette (Cmd+K)"
                    >
                        <Command size={18} strokeWidth={1.5} />
                    </button>
                    <button
                        onClick={toggleDarkMode}
                        className={buttonClass}
                        title={isDarkMode ? "Light Mode" : "Dark Mode"}
                    >
                        {isDarkMode ? (
                            <Sun size={18} strokeWidth={1.5} />
                        ) : (
                            <Moon size={18} strokeWidth={1.5} />
                        )}
                    </button>
                    <button
                        onClick={handleReplayIntro}
                        className={buttonClass}
                        title="Replay Intro"
                    >
                        <RotateCcw size={18} strokeWidth={1.5} />
                    </button>
                </div>

                <div className="mt-auto flex flex-col gap-6 mb-2 text-(--text-secondary) items-center w-full">
                    <button
                        onClick={() => openModal(<ContactModalContent />, { position: 'center' })}
                        className="hover:text-(--text-primary) transition-colors flex justify-center w-full"
                    >
                        <Mail size={18} strokeWidth={1.5} />
                    </button>
                    <a href="#" className="hover:text-(--text-primary) transition-colors flex justify-center w-full"><Github size={18} strokeWidth={1.5} /></a>
                </div>
            </div>
        </>
    );
};