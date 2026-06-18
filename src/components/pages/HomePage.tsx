import { ArrowRight, CheckCircle, Cloud, Activity, Server, Database, Monitor, Smartphone } from "lucide-react";
import dockerLogo from "../../assets/logos/docker.svg";
import kubernetesLogo from "../../assets/logos/kubernetes.svg";
import azureLogo from "../../assets/logos/azure.svg";
import githubActionsLogo from "../../assets/logos/github_actions.svg";
import keycloakLogo from "../../assets/logos/keycloak.svg";
import rabbitMqLogo from "../../assets/logos/rabbitmq.svg";
import { PROJECTS } from "../../data/projects";
import { useAppContext } from "../../context";
import { useParallax } from "../../hooks";
import { TechTag } from "../shared";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

type FeaturedProjectRepo = {
  projectId: string;
  repoPath: string;
};

type GitHubRepoResponse = {
  pushed_at?: string;
};

const getGithubRepoPath = (sourceCode: string): string | null => {
  try {
    const url = new URL(sourceCode);

    if (url.hostname !== "github.com") {
      return null;
    }

    const [owner, repo] = url.pathname.replace(/^\//, "").split("/");

    if (!owner || !repo) {
      return null;
    }

    return `${owner}/${repo.replace(/\.git$/, "")}`;
  } catch {
    return null;
  }
};

const FEATURED_PROJECT_REPOS: FeaturedProjectRepo[] = PROJECTS.flatMap((project) => {
  const sourceCode = project.detail?.actions?.sourceCode;

  if (!sourceCode) {
    return [];
  }

  const repoPath = getGithubRepoPath(sourceCode);

  return repoPath ? [{ projectId: project.id, repoPath }] : [];
});

// Architecture Diagram Component
const ArchitectureDiagram = () => {
  const { isDarkMode } = useAppContext();
  const diagramRef = useRef<HTMLDivElement | null>(null);
  const [isStackedLayout, setIsStackedLayout] = useState(false);
  const devLogoClassName = `h-4 w-4 object-contain grayscale contrast-150 ${isDarkMode ? "invert brightness-125" : "brightness-0"}`;

  useEffect(() => {
    const element = diagramRef.current;

    if (!element) {
      return;
    }

    const updateLayoutMode = () => {
      setIsStackedLayout(element.clientWidth < 880);
    };

    updateLayoutMode();

    const resizeObserver = new ResizeObserver(() => {
      updateLayoutMode();
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const stackNodeClassName = isStackedLayout
    ? "flex flex-col items-center gap-3 w-full"
    : "flex h-full flex-col items-center gap-3 min-w-0 w-full";

  const stackTagClassName = "text-[10px] md:text-[11px] leading-tight px-2 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary) max-w-full break-words text-center";

  const stackLabelClassName = "text-xs md:text-small font-bold text-(--text-primary) mb-1";

  const stackSectionClassName = isStackedLayout
    ? "grid grid-cols-1 gap-4"
    : "grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] items-stretch gap-x-4 gap-y-4";

  const separatorClassName = isStackedLayout
    ? "flex items-center justify-center py-0.5 text-xs font-mono text-(--text-dim)"
    : "flex items-center justify-center self-center px-1 text-xs font-mono text-(--text-dim)";

  return (
  <div ref={diagramRef} className="w-full p-6 md:p-8 border border-(--border) bg-(--bg-panel) relative overflow-hidden group rounded-lg">
    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
      <Activity size={100} />
    </div>

    <div className={`relative z-10 py-4 ${stackSectionClassName}`}>
      <div className={stackNodeClassName}>
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-(--bg-main) border border-(--border) flex items-center justify-center shadow-lg group-hover/node:border-(--text-primary) transition-colors relative z-10 shrink-0">
          <div className="relative">
            <Monitor size={28} className="text-(--text-primary) relative z-10" />
            <Smartphone size={16} className="text-(--text-secondary) absolute -right-2 -bottom-2 z-20 bg-(--bg-main) rounded p-0.5 border border-(--border)" />
          </div>
        </div>
        <div className="text-center w-full min-w-0">
          <div className={stackLabelClassName}>Frontend</div>
          <div className="flex flex-wrap justify-center gap-1 min-w-0 max-w-full">
            <span className={stackTagClassName}>React</span>
            <span className={stackTagClassName}>React Native</span>
            <span className={stackTagClassName}>TypeScript</span>
            <span className={stackTagClassName}>Tailwind CSS</span>
            <span className={stackTagClassName}>HTML</span>
            <span className={stackTagClassName}>Vite</span>
            <span className={stackTagClassName}>Figma</span>
          </div>
        </div>
      </div>

      <div className={separatorClassName}>REST/GQL/gRPC</div>

      <div className={stackNodeClassName}>
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-(--bg-main) border border-(--border) flex items-center justify-center shadow-lg group-hover/node:border-(--text-primary) transition-colors relative z-10 shrink-0">
          <Server size={28} className="text-(--text-primary)" />
        </div>
        <div className="text-center w-full min-w-0">
          <div className={stackLabelClassName}>Backend</div>
          <div className="flex flex-wrap justify-center gap-1 min-w-0 max-w-full">
            <span className={stackTagClassName}>Java / Spring Boot</span>
            <span className={stackTagClassName}>Python / FastAPI</span>
            <span className={stackTagClassName}>TypeScript / Bun (Node.js)</span>
          </div>
        </div>
      </div>

      <div className={separatorClassName}>SQL/ORM</div>

      <div className={stackNodeClassName}>
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-(--bg-main) border border-(--border) flex items-center justify-center shadow-lg group-hover/node:border-(--text-primary) transition-colors relative z-10 shrink-0">
          <Database size={28} className="text-(--text-primary)" />
        </div>
        <div className="text-center w-full min-w-0">
          <div className={stackLabelClassName}>Database</div>
          <div className="flex flex-wrap justify-center gap-1 min-w-0 max-w-full">
            <span className={stackTagClassName}>PostgreSQL / MySQL</span>
            <span className={stackTagClassName}>Hibernate / JPA</span>
            <span className={stackTagClassName}>MongoDB</span>
            <span className={stackTagClassName}>SQLAlchemy</span>
            <span className={stackTagClassName}>Prisma</span>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-8 pt-6 border-t border-(--border) border-dashed relative">
      <div className="text-center mb-6">
        <div className="text-xs font-mono text-(--text-dim) uppercase tracking-widest">Cloud & DevOps</div>
      </div>
      <div className="flex justify-center flex-wrap gap-6 md:gap-12">
        <div className="flex items-center gap-2 text-(--text-secondary) text-xs md:text-small">
          <img src={dockerLogo} alt="Docker logo" className="h-4 w-4 object-contain grayscale contrast-150" /> <span className="font-mono font-bold">Docker</span>
        </div>
        <div className="flex items-center gap-2 text-(--text-secondary) text-xs md:text-small">
          <img src={kubernetesLogo} alt="Kubernetes logo" className="h-4 w-4 object-contain grayscale contrast-150" /> <span className="font-mono font-bold">Kubernetes</span>
        </div>
        <div className="flex items-center gap-2 text-(--text-secondary) text-xs md:text-small">
          <img src={azureLogo} alt="Azure logo" className="h-4 w-4 object-contain grayscale contrast-150" /> <span className="font-mono font-bold">Azure</span>
        </div>
        <div className="flex items-center gap-2 text-(--text-secondary) text-xs md:text-small">
          <img src={githubActionsLogo} alt="GitHub Actions logo" className={devLogoClassName} /> <span className="font-mono font-bold">GitHub Actions</span>
        </div>
        <div className="flex items-center gap-2 text-(--text-secondary) text-xs md:text-small">
          <img src={keycloakLogo} alt="Keycloak logo" className={devLogoClassName} /> <span className="font-mono font-bold">Keycloak</span>
        </div>
        <div className="flex items-center gap-2 text-(--text-secondary) text-xs md:text-small">
          <img src={rabbitMqLogo} alt="RabbitMQ logo" className={devLogoClassName} /> <span className="font-mono font-bold">RabbitMQ</span>
        </div>
      </div>
    </div>
  </div>
  );
};

/**
 * Landing page with summary, featured project preview, and architecture snapshot.
 */
export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isIntroArrival = Boolean((location.state as { fromIntro?: boolean } | null)?.fromIntro);
  const parallax = useParallax(0.01);
  const [featuredProjectId, setFeaturedProjectId] = useState("fastapi");
  const [typedText, setTypedText] = useState("");

  const featuredProject = PROJECTS.find(project => project.id === featuredProjectId)
    ?? PROJECTS.find(project => project.id === "fastapi")
    ?? PROJECTS[0];

  useEffect(() => {
    const fullText = "intelligente, integrierte Systeme messbaren Mehrwert zu schaffen.";
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        i += 1;
        setTypedText(fullText.slice(0, i));
      } else {
        clearInterval(timer);
      }
    }, 30);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (FEATURED_PROJECT_REPOS.length === 0) {
      return;
    }

    const controller = new AbortController();

    const fetchLatestProject = async () => {
      try {
        const repoResults = await Promise.allSettled(
          FEATURED_PROJECT_REPOS.map(async ({ projectId, repoPath }) => {
            const response = await fetch(`https://api.github.com/repos/${repoPath}`, {
              signal: controller.signal
            });

            if (!response.ok) {
              return null;
            }

            const data = await response.json() as GitHubRepoResponse;

            if (!data.pushed_at) {
              return null;
            }

            return {
              projectId,
              pushedAt: new Date(data.pushed_at).getTime()
            };
          })
        );

        if (controller.signal.aborted) {
          return;
        }

        const newestProject = repoResults
          .filter((result): result is PromiseFulfilledResult<{ projectId: string; pushedAt: number } | null> => result.status === "fulfilled")
          .map(result => result.value)
          .filter((value): value is { projectId: string; pushedAt: number } => value !== null)
          .sort((left, right) => right.pushedAt - left.pushedAt)[0];

        if (newestProject) {
          setFeaturedProjectId(newestProject.projectId);
        }
      } catch {
        // Keep the fallback project when GitHub is unavailable.
      }
    };

    void fetchLatestProject();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className={`w-full max-w-screen-2xl ml-0 mr-auto px-6 md:px-12 lg:px-16 py-6 md:py-12 relative z-10 ${isIntroArrival ? "home-page-shell home-page-shell--intro" : "animate-fade-in"}`}>
      {/* Header Area */}
      <div className="home-intro-panel home-intro-panel--primary mb-16 space-y-12" style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}>
        <div className="border-b-minimal pb-8 space-y-4">
          <h1 className="home-intro-stagger home-intro-stagger--1 text-5xl md:text-7xl font-light tracking-tight text-(--text-primary)">
            Nikolas Vix
          </h1>
          <p className="home-intro-stagger home-intro-stagger--2 text-sm md:text-base text-(--text-secondary) font-light">
            Wirtschaftsinformatik-Student · Software & Process Architect
          </p>
          <div className="home-intro-stagger home-intro-stagger--3 flex gap-3 md:gap-4 text-xs font-mono text-(--text-dim) flex-wrap">
            <span>Wirtschaftsinformatik (HKA)</span>
            <span>Karlsruhe</span>
            <span>Verfügbar für Werkstudent/Praktikum</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Main Intro */}
          <div className="space-y-6">
            <h2 className="text-xs md:text-small font-mono text-(--text-secondary) uppercase tracking-widest mb-4">Introduction</h2>
            <p className="text-(--text-primary) font-light text-base md:text-lg leading-relaxed">
              Ich studiere Wirtschaftsinformatik im 4. Semester an der <span className="text-xs font-mono border border-(--border) px-1 py-0.5 text-(--text-secondary)">HKA</span> und verstehe mich als Brückenbauer zwischen Business-Anforderungen und moderner Softwarearchitektur.
              Mich fasziniert es, komplexe Geschäftsprozesse zu digitalisieren und durch <strong className="font-medium text-(--text-primary)">{typedText}</strong>
            </p>
            <p className="text-(--text-secondary) font-light text-sm md:text-base leading-relaxed">
              Ich lege dabei großen Wert auf sauberen, wartbaren Code sowie sinnvolle Automatisierung durch Workflow-Technologien.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/about')}
                className="text-xs md:text-small font-mono text-(--text-secondary) hover:text-(--text-primary) flex items-center gap-2 hover-imperfect"
              >
                Read full profile <ArrowRight size={12} />
              </button>
            </div>
          </div>

          {/* Competence Matrix */}
          <div className="space-y-6">
            <h2 className="text-xs md:text-small font-mono text-(--text-secondary) uppercase tracking-widest mb-4">Competence & Methods</h2>
            <div className="border border-(--border) bg-(--bg-panel) rounded overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-130 border-collapse">
                  <tbody>
                    <tr className="border-b border-(--border)">
                      <td className="w-[34%] px-4 py-3 md:px-5 md:py-4 text-xs md:text-small font-bold text-(--text-primary) border-r border-(--border)">Product  & UX</td>
                      <td className="px-4 py-3 md:px-5 md:py-4 text-xs md:text-small font-mono text-(--text-secondary)">User Centered Design (UCD), Design Thinking, Usability Principles</td>
                    </tr>
                    <tr className="border-b border-(--border)">
                      <td className="w-[34%] px-4 py-3 md:px-5 md:py-4 text-xs md:text-small font-bold text-(--text-primary) border-r border-(--border)">Software Engineering</td>
                      <td className="px-4 py-3 md:px-5 md:py-4 text-xs md:text-small font-mono text-(--text-secondary)">Microservice Architecture, REST & GraphQL API Design, CI/CD Workflows, Domain-Driven Design (DDD)</td>
                    </tr>
                    <tr className="border-b border-(--border)">
                      <td className="px-4 py-3 md:px-5 md:py-4 text-xs md:text-small font-bold text-(--text-primary) border-r border-(--border)">Business & Analysis</td>
                      <td className="px-4 py-3 md:px-5 md:py-4 text-xs md:text-small font-mono text-(--text-secondary)">Business Process Modeling (BPMN), Process Mining (Celonis), Requirements Engineering, Stakeholder Analysis, Robotic Process Automation (RPA)</td>
                    </tr>
                    <tr className="border-b border-(--border)">
                      <td className="px-4 py-3 md:px-5 md:py-4 text-xs md:text-small font-bold text-(--text-primary) border-r border-(--border)">AI & Digital Innovation</td>
                      <td className="px-4 py-3 md:px-5 md:py-4 text-xs md:text-small font-mono text-(--text-secondary)">AI Agents (Workflow Automation), AI-Assisted Dev</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* System Architecture */}
        <div>
          <h2 className="text-xs md:text-small font-mono text-(--text-secondary) uppercase tracking-widest mb-6">Technology Stack</h2>
          <ArchitectureDiagram />
        </div>
      </div>

      {/* Featured Project Section */}
      <div className="home-intro-panel home-intro-panel--secondary border-t-minimal pt-12">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <span className="text-xs md:text-small font-mono text-(--text-secondary) uppercase tracking-widest flex items-center gap-2">
            <CheckCircle size={14} className="text-(--text-primary)" /> Featured Project
          </span>
          <span className="text-xs font-mono text-(--text-dim)">Latest Push</span>
        </div>

        {featuredProject && (
          <div
            onClick={() => navigate(`/projects/${featuredProject.id}`)}
            className="group cursor-pointer border border-(--border) bg-(--bg-panel) hover:border-(--text-dim) transition-all p-6 md:p-10 relative overflow-hidden rounded"
          >
            <div className="absolute top-0 right-0 p-6 md:p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
              <Cloud size={150} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start relative z-10">
              <div>
                <h3 className="text-2xl md:text-3xl font-light text-(--text-primary) mb-4 group-hover:underline decoration-1 underline-offset-4 decoration-(--border) transition-all">
                  {featuredProject.title}
                </h3>
                <p className="text-(--text-secondary) font-light leading-relaxed text-sm md:text-base">
                  {featuredProject.desc}
                </p>
              </div>
              <div className="flex flex-col items-start md:items-end gap-6">
                <div className="flex gap-2 flex-wrap md:flex-wrap-reverse">
                  {featuredProject.tags.map(t => <TechTag key={t} text={t} />)}
                </div>
                <div className="flex items-center gap-2 text-xs md:text-small font-mono text-(--text-dim) group-hover:text-(--text-primary) transition-colors">
                  view_details <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};