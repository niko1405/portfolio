import { Outlet } from 'react-router-dom';
import { useModal } from '../context/ModalContext';
import { useKeyboardShortcuts } from '../hooks';
import { Sidebar } from './layout/Sidebar';
import { StatusBar } from './layout/StatusBar';
import { Tabs } from './layout/Tabs';
import { CommandPaletteContent } from './modals/CommandPalette';
import { Background } from './shared';

const MainApp = () => {
    const { openModal, closeModal } = useModal();

    // set keyboard shortcuts
    useKeyboardShortcuts([
        {
            key: 'k',
            meta: true, // Cmd or Ctrl + K
            action: () => openModal(<CommandPaletteContent />, { position: 'top' }),
        },
        {
            key: 'Escape',
            preventDefault: false,
            action: () => closeModal(),
        },
    ]);

    return (
        <div className="flex h-dvh md:h-screen w-screen text-(--text-primary) bg-(--bg-main) relative overflow-hidden">
            <Background />

            <Sidebar />

            {/* Editor */}
            <div className="grow flex flex-col min-w-0 min-h-0 bg-transparent z-20 relative md:ml-16">
                <Tabs />

                {/* Content */}
                <div className="grow min-h-0 overflow-hidden relative">
                    <div className="mobile-overflow-clip h-full overflow-y-auto md:overflow-x-visible">
                        <Outlet />
                    </div>
                </div>

                <StatusBar />
            </div>
        </div>
    );
};

export default MainApp;

