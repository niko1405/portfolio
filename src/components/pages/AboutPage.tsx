import { Briefcase, Code, Dumbbell, FileDown, Gamepad2, Guitar } from "lucide-react";
import { useState } from "react";
import { useParallax } from "../../hooks";
import { ViewHeader } from "../shared";
import { ContactModalContent } from "../modals/ContactModal";
import { useModal } from "../../context";
import profileImage from "../../assets/profile.jpg";
import cvPdf from "../../assets/documents/CV.pdf";
import { BIRTH_DATE, calculateAge } from "../../utils/introHelpers";

/**
 * About page presenting profile details, values, and downloadable records.
 */
export const AboutPage: React.FC = () => {
  const parallax = useParallax(0.01);
  const { openModal } = useModal();
  const [isProfileImageLoaded, setIsProfileImageLoaded] = useState(false);
  const [isProfileImageError, setIsProfileImageError] = useState(false);

  return (
    <div className="h-full flex flex-col animate-fade-in relative z-10 overflow-y-auto">
      <ViewHeader title="Profile" path="/src/config/me.json" />

      {/* Seamless Bento Grid */}
      <div className="max-w-7xl mx-auto w-full p-8 pt-0 about-bento-contrast">
        <div className="grid grid-cols-1 md:grid-cols-6 md:auto-rows-[minmax(120px,auto)] border-t border-l border-(--border)">

          {/* 1. Profile Picture */}
          <div
            className="md:col-span-2 md:row-span-3 border-r border-b border-(--border) bg-[#0c0c0c] aspect-square md:aspect-auto min-h-80 relative overflow-hidden group"
            style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
          >
            {!isProfileImageLoaded && !isProfileImageError && (
              <div className="absolute inset-0 bg-(--bg-panel) animate-pulse" aria-hidden="true" />
            )}

            {isProfileImageError && (
              <div className="absolute inset-0 flex items-center justify-center bg-(--bg-panel) px-6 text-center">
                <p className="text-xs font-mono uppercase tracking-wide text-(--text-dim)">
                  Profile image temporarily unavailable
                </p>
              </div>
            )}

            <img
              src={profileImage}
              alt="Profilbild"
              className={`absolute inset-0 h-full w-full object-cover object-bottom scale-150 transition-opacity ${isProfileImageLoaded ? "opacity-100" : "opacity-0"}`}
              loading="eager"
              decoding="async"
              onLoad={() => {
                setIsProfileImageLoaded(true);
                setIsProfileImageError(false);
              }}
              onError={() => {
                setIsProfileImageLoaded(false);
                setIsProfileImageError(true);
              }}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
          </div>

          {/* 2. Bio */}
          <div className="md:col-span-4 md:row-span-2 border-r border-b border-(--border) p-8 md:p-12 bg-(--bg-main) flex flex-col justify-center">
            <h3 className="font-mono text-xs text-(--text-dim) uppercase mb-6 tracking-widest">Bio</h3>
            <p className="text-(--text-secondary) font-light leading-relaxed text-base md:text-xl">
              Hi, ich bin Nikolas, {calculateAge(BIRTH_DATE)} Jahre alt und studiere Wirtschaftsinformatik. <br />
              Mein Interesse liegt darin, Probleme von der ersten Prozess-Idee bis zum fertigen Code zu lösen. Ich arbeite genau dort, wo Business und IT aufeinandertreffen: 
              Bevor ich eine technische Architektur baue, will ich den dahinterliegenden Geschäftsprozess verstehen, modellieren und optimieren. Durch meine bisherigen Projekte 
              habe ich mir ein breites Fundament aufgebaut, um strukturierte, ganzheitliche Lösungen zu entwickeln.
            </p>
          </div>

          {/* 3. Stats & Current Status */}
          <div className="md:col-span-1 border-r border-b border-(--border) p-6 bg-(--bg-panel) flex flex-col justify-between hover:bg-(--bg-main) transition-colors">
            <div className="text-xs font-mono text-(--text-dim)">SEMESTER</div>
            <div className="text-xl font-light text-(--text-primary)">4. Fachsemester</div>
          </div>
          <div className="md:col-span-1 border-r border-b border-(--border) p-6 bg-(--bg-panel) flex flex-col justify-between hover:bg-(--bg-main) transition-colors">
            <div className="text-xs font-mono text-(--text-dim)">LOC</div>
            <div className="text-lg font-light text-(--text-primary)">Karlsruhe</div>
          </div>
          <div className="md:col-span-2 border-r border-b border-(--border) p-6 bg-(--bg-panel) flex flex-col justify-between hover:bg-(--bg-main) transition-colors">
            <div className="text-xs font-mono text-(--text-dim)">STATUS</div>
            <div className="text-sm md:text-base font-light text-(--text-primary)">Searching for Internship (Sep/Oct 2026)</div>
          </div>

          {/* 4. Personal Stack / Soft Skills */}
          <div className="md:col-span-3 border-r border-b border-(--border) p-8 bg-(--bg-main)">
            <h3 className="font-mono text-xs text-(--text-dim) uppercase mb-6 tracking-widest">Personal Stack / Soft Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border border-(--border) p-4 bg-(--bg-panel)">
                <div className="text-xs font-mono text-(--text-dim) mb-2">Arbeitsweise</div>
                <div className="text-sm text-(--text-primary) font-light">Analytisch und prozessorientiert</div>
              </div>
              <div className="border border-(--border) p-4 bg-(--bg-panel)">
                <div className="text-xs font-mono text-(--text-dim) mb-2">Team</div>
                <div className="text-sm text-(--text-primary) font-light">Kommunikativ, verlässlich, lernbereit</div>
              </div>
              <div className="border border-(--border) p-4 bg-(--bg-panel)">
                <div className="text-xs font-mono text-(--text-dim) mb-2">Mindset</div>
                <div className="text-sm text-(--text-primary) font-light">Qualitätsbewusstsein und kontinuierliche Verbesserung</div>
              </div>
              <div className="border border-(--border) p-4 bg-(--bg-panel)">
                <div className="text-xs font-mono text-(--text-dim) mb-2">Fokus</div>
                <div className="text-sm text-(--text-primary) font-light">Lösungsorientiertes Handeln</div>
              </div>
            </div>
          </div>

          {/* 5. Hobbies */}
          <div className="md:col-span-3 border-r border-b border-(--border) p-8 bg-(--bg-main)">
            <h3 className="font-mono text-xs text-(--text-dim) uppercase mb-6 tracking-widest">Interessen</h3>
            <div className="md:hidden relative h-44">
              <div
                className="absolute inline-flex items-center gap-2 border border-(--border) px-3 py-2 bg-(--bg-panel)"
                style={{ top: "2%", left: "2%", transform: "rotate(-2.5deg)" }}
              >
                <Gamepad2 size={15} className="text-(--text-primary)" />
                <span className="text-xs text-(--text-primary) font-light whitespace-nowrap">Server-Hosting</span>
              </div>

              <div
                className="absolute inline-flex items-center gap-2 border border-(--border) px-3 py-2 bg-(--bg-panel)"
                style={{ top: "42%", left: "8%", transform: "rotate(1.8deg)" }}
              >
                <Dumbbell size={15} className="text-(--text-primary)" />
                <span className="text-xs text-(--text-primary) font-light whitespace-nowrap">Fitness</span>
              </div>

              <div
                className="absolute inline-flex items-center gap-2 border border-(--border) px-3 py-2 bg-(--bg-panel)"
                style={{ top: "16%", right: "2%", transform: "rotate(-1.2deg)" }}
              >
                <Guitar size={15} className="text-(--text-primary)" />
                <span className="text-xs text-(--text-primary) font-light whitespace-nowrap">Musik</span>
              </div>
            </div>

            <div className="hidden md:block relative h-56">
              <div
                className="absolute inline-flex items-center gap-3 border border-(--border) px-4 py-3 bg-(--bg-panel)"
                style={{ top: "8%", left: "4%", transform: "rotate(-2deg)" }}
              >
                <Gamepad2 size={18} className="text-(--text-primary)" />
                <span className="text-sm text-(--text-primary) font-light whitespace-nowrap">Server-Hosting</span>
              </div>

              <div
                className="absolute inline-flex items-center gap-3 border border-(--border) px-4 py-3 bg-(--bg-panel)"
                style={{ top: "45%", left: "36%", transform: "rotate(1.5deg)" }}
              >
                <Dumbbell size={18} className="text-(--text-primary)" />
                <span className="text-sm text-(--text-primary) font-light whitespace-nowrap">Fitness</span>
              </div>

              <div
                className="absolute inline-flex items-center gap-3 border border-(--border) px-4 py-3 bg-(--bg-panel)"
                style={{ top: "18%", right: "5%", transform: "rotate(-1deg)" }}
              >
                <Guitar size={18} className="text-(--text-primary)" />
                <span className="text-sm text-(--text-primary) font-light whitespace-nowrap">Musik</span>
              </div>

              <div
                className="absolute inline-flex items-center gap-3 border border-(--border) px-4 py-3 bg-(--bg-panel)"
                style={{ top: "70%", right: "10%", transform: "rotate(3deg)" }}
              >
                <Code size={18} className="text-(--text-primary)" />
                <span className="text-sm text-(--text-primary) font-light whitespace-nowrap">Coding</span>
              </div>
            </div>
          </div>

          {/* 6. Education Timeline */}
          <div className="md:col-span-6 border-r border-b border-(--border) p-8 md:p-10 bg-(--bg-panel) hover:bg-(--bg-main) transition-colors">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div>
                <div className="text-xs font-mono text-(--text-dim) uppercase tracking-widest">Education / Timeline</div>
                <p className="text-(--text-secondary) text-sm mt-2 max-w-xl">
                  Akademischer Weg und nächste praktische Schritte im Berufsleben.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 md:justify-end">
                <a
                  href={cvPdf}
                  download="CV_Nikolas_Vix.pdf"
                  className="inline-flex items-center gap-2 border border-(--border) bg-(--bg-main) px-4 py-2 text-xs font-mono text-(--text-primary) uppercase tracking-wide hover:bg-(--bg-panel) transition-colors"
                >
                  <FileDown size={14} />
                  CV Download
                </a>
              </div>
            </div>

            <div className="md:hidden relative">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-(--text-dim) z-0"></div>

              <div className="relative pl-7 pb-10">
                <div className="absolute left-2 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border border-(--text-dim) bg-(--text-primary) z-10"></div>
                <div className="text-[10px] text-(--text-dim) font-mono uppercase tracking-widest mb-1">Since 2024</div>
                <div className="text-sm text-(--text-primary) font-light">B.Sc. Wirtschaftsinformatik</div>
                <div className="text-xs text-(--text-secondary) font-mono mt-1">Hochschule Karlsruhe</div>
              </div>

              <div className="relative pl-7">
                <div className="absolute left-2 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border border-(--text-dim) bg-(--bg-main) z-10"></div>
                <div className="text-[10px] text-(--text-dim) font-mono uppercase tracking-widest mb-1">Now</div>
                <button
                  type="button"
                  onClick={() => openModal(<ContactModalContent />, { position: "center" })}
                  className="inline-flex items-center gap-2 border border-(--border) px-3 py-2 bg-(--bg-main) hover:border-(--text-dim) cursor-pointer transition-colors"
                >
                  <Briefcase size={14} className="text-(--text-primary)" />
                  <span className="text-xs font-mono text-(--text-primary) uppercase tracking-wide">Searching Internship</span>
                </button>
              </div>
            </div>

            <div className="hidden md:block mt-2">
              <div className="relative pt-2 pb-10">
                <div className="absolute left-[14%] right-[14%] top-14 h-0.5 bg-(--text-dim) z-0"></div>
                <div className="absolute left-[14%] top-14 h-7 w-0.5 bg-(--text-dim) z-0"></div>
                <div className="absolute left-[86%] top-14 h-7 w-0.5 bg-(--text-dim) z-0"></div>
                <div className="absolute left-[14%] top-14 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--text-dim) bg-(--text-primary) z-10"></div>
                <div className="absolute left-[86%] top-14 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-(--text-dim) bg-(--bg-main) z-10"></div>

                <div className="mt-24 grid grid-cols-2 gap-10">
                  <div className="max-w-sm ml-6 border border-(--border) bg-(--bg-main) p-5">
                    <div className="text-[10px] text-(--text-dim) font-mono uppercase tracking-widest mb-2">Since 2024</div>
                    <div className="text-base text-(--text-primary) font-light">B.Sc. Wirtschaftsinformatik</div>
                    <div className="text-xs text-(--text-secondary) font-mono mt-1">Hochschule Karlsruhe</div>
                  </div>

                  <div onClick={() => openModal(<ContactModalContent />, { position: "center" })} className="max-w-sm ml-auto mr-6 border border-(--border) bg-(--bg-main) p-5">
                    <div className="text-[10px] text-(--text-dim) font-mono uppercase tracking-widest mb-2">Now</div>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 hover:text-(--text-primary) cursor-pointer transition-colors"
                    >
                      <Briefcase size={14} className="text-(--text-primary)" />
                      <span className="text-xs font-mono text-(--text-primary) uppercase tracking-wide">Searching Internship</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 px-4 text-center">
          <p className="mx-auto text-(--text-dim) text-[10px] md:text-sm font-mono uppercase tracking-[0.18em] whitespace-normal md:whitespace-nowrap leading-relaxed">
            MINIMALISMUS IST NICHT NUR EIN DESIGN-STIL, SONDERN
            <br className="md:hidden" /> MEINE PHILOSOPHIE FÜR SOFTWARE-ARCHITEKTUR
          </p>
        </div>
      </div>
    </div>
  );
};