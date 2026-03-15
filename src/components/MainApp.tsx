import { Outlet, useNavigate } from "react-router-dom"
import { Sidebar } from "./layout/Sidebar";
import { Background } from "./shared/Background";
import { Tabs } from "./layout/Tabs";
import { StatusBar } from "./layout/StatusBar";
import { useModal } from "../context/ModalContext";
import { CommandPaletteContent } from "./modals/CommandPalette";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";

const MainApp = () => {
    const { openModal, closeModal } = useModal();

    // set keyboard shortcuts
    useKeyboardShortcuts([
        {
            key: 'k',
            meta: true, // Cmd or Ctrl + K
            action: () => openModal(<CommandPaletteContent />, { position: 'top' })
        },
        {
            key: 'Escape',
            preventDefault: false,
            action: () => closeModal()
        },
    ]);

    return (
        <div className="flex h-screen w-screen text-(--text-primary) bg-(--bg-main) relative overflow-hidden">

            <Background />

            <Sidebar />

            {/* Editor */}
            <div className="grow flex flex-col min-w-0 bg-transparent z-20 relative md:ml-16">

                <Tabs />

                {/* Content */}
                <div className="grow overflow-hidden relative">
                    <div className="mobile-overflow-clip h-full overflow-y-auto md:overflow-x-visible">
                        <Outlet />
                    </div>
                </div>

                <StatusBar />

            </div>
        </div>
    );
}

export default MainApp

