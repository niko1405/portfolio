import { useLocation, useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../../data/config";
import { useEffect } from "react";

export const Tabs: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const page = location.pathname;

    return (
        <div className="h-10 md:h-12 lg:h-20 border-b-minimal flex items-center bg-(--bg-main) sticky top-0 z-10 shrink-0 overflow-x-auto no-scrollbar transition-colors gap-0">
            {NAV_ITEMS.map(item => (
                <div
                    key={item.id}
                    onClick={() => navigate(`/${item.id}`)}
                    className={`
                 h-full px-3 md:px-6 lg:px-8 flex items-center gap-2 md:gap-3 text-[10px] md:text-xs lg:text-body font-mono cursor-pointer border-r-minimal transition-colors select-none whitespace-nowrap flex-shrink-0
                 ${page.includes(item.id)
                            ? 'bg-(--bg-main) text-(--text-primary) border-t-2 border-t-(--text-primary)'
                            : 'text-(--text-dim) hover:text-(--text-secondary) bg-(--bg-main)'}
               `}
                >
                    <item.icon size={14} className="hidden md:block" />
                    <item.icon size={12} className="md:hidden" />
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
};