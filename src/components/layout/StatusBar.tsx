import { Command, GitBranch } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CommandPaletteContent } from "../modals/CommandPalette";
import { useModal } from "../../context/ModalContext";

export const StatusBar: React.FC = () => {
    const { openModal } = useModal();

    const [lastCommitDate, setLastCommitDate] = useState<Date | null>(null);
    const [isLoadingLastUpdate, setIsLoadingLastUpdate] = useState<boolean>(true);

    const githubOwner = import.meta.env.VITE_GITHUB_OWNER as string | undefined;
    const githubRepo = import.meta.env.VITE_GITHUB_REPO as string | undefined;

    useEffect(() => {
        const controller = new AbortController();

        const fetchLastCommit = async () => {
            if (!githubOwner || !githubRepo) {
                setIsLoadingLastUpdate(false);
                return;
            }

            try {
                const response = await fetch(
                    `https://api.github.com/repos/${githubOwner}/${githubRepo}/commits?per_page=1`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }

                const data: Array<{ commit?: { committer?: { date?: string } } }> = await response.json();
                const commitDate = data[0]?.commit?.committer?.date;

                if (commitDate) {
                    setLastCommitDate(new Date(commitDate));
                }
            } catch {
                setLastCommitDate(null);
            } finally {
                setIsLoadingLastUpdate(false);
            }
        };

        void fetchLastCommit();

        return () => {
            controller.abort();
        };
    }, [githubOwner, githubRepo]);

    const lastUpdatedLabel = useMemo(() => {
        if (isLoadingLastUpdate) {
            return "last updated: ...";
        }

        if (!lastCommitDate) {
            return "last updated: n/a";
        }

        const elapsedMs = Date.now() - lastCommitDate.getTime();
        const totalMinutes = Math.floor(elapsedMs / (1000 * 60));
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        if (totalDays >= 1) {
            return `last updated: ${Math.max(0, totalDays)}d ago`;
        }

        if (totalHours >= 1) {
            return `last updated: ${Math.max(0, totalHours)}h ago`;
        }

        return `last updated: ${Math.max(0, totalMinutes)}m ago`;
    }, [isLoadingLastUpdate, lastCommitDate]);

    return (
        <div className="hidden md:flex h-6 border-t-minimal items-center px-4 justify-between text-[10px] text-(--text-secondary) bg-(--bg-main) select-none font-mono" >
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1"><GitBranch size={10} /> <span>feature/internship</span></div>
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 cursor-pointer hover:text-(--text-primary)" onClick={() => openModal(<CommandPaletteContent />, { position: 'top' })}>
                    <Command size={10} />
                    <span>Cmd+K</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-(--text-dim) rounded-full"></div>
                    <span className="text-(--text-secondary)">{lastUpdatedLabel}</span>
                </div>
            </div>
        </div >
    );
};