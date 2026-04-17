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
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const devLogoClassName = `h-4 w-4 object-contain grayscale contrast-150 ${isDarkMode ? "invert brightness-125" : "brightness-0"}`;

  return (
  <div className="w-full p-6 md:p-8 border border-(--border) bg-(--bg-panel) relative overflow-hidden group rounded-lg">
    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
      <Activity size={100} />
    </div>
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 relative z-10 py-4 flex-wrap">
      <div className="flex flex-col items-center gap-3 group/node shrink-0">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-(--bg-main) border border-(--border) flex items-center justify-center shadow-lg group-hover/node:border-(--text-primary) transition-colors relative z-10">
          <div className="relative">
            <Monitor size={28} className="text-(--text-primary) relative z-10" />
            <Smartphone size={16} className="text-(--text-secondary) absolute -right-2 -bottom-2 z-20 bg-(--bg-main) rounded p-0.5 border border-(--border)" />
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs md:text-small font-bold text-(--text-primary) mb-1">Frontend</div>
          <div className="flex flex-wrap justify-center gap-1">
            <span className="text-xs px-1.5 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary)">React</span>
            <span className="text-xs px-1.5 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary)">React Native</span>
            <span className="text-xs px-1.5 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary)">TypeScript</span>
            <span className="text-xs px-1.5 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary)">Tailwind CSS</span>
            <span className="text-xs px-1.5 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary)">HTML</span>
            <span className="text-xs px-1.5 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary)">Vite</span>
            <span className="text-xs px-1.5 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary)">Figma</span>
          </div>
        </div>
      </div>

      <div className="shrink-0 w-full md:w-auto text-center text-xs font-mono text-(--text-dim)">REST/GQL/gRPC</div>

      <div className="flex flex-col items-center gap-3 group/node shrink-0">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-(--bg-main) border border-(--border) flex items-center justify-center shadow-lg group-hover/node:border-(--text-primary) transition-colors relative z-10">
          <Server size={28} className="text-(--text-primary)" />
        </div>
        <div className="text-center">
          <div className="text-xs md:text-small font-bold text-(--text-primary) mb-1">Backend</div>
          <div className="flex flex-wrap justify-center gap-1">
            <span className="text-xs px-1.5 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary)">FastAPI</span>
            <span className="text-xs px-1.5 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary)">Java / Spring Boot</span>
            <span className="text-xs px-1.5 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary)">Python</span>
            <span className="text-xs px-1.5 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary)">Node.js</span>
          </div>
        </div>
      </div>

      <div className="shrink-0 w-full md:w-auto text-center text-xs font-mono text-(--text-dim)">SQL/ORM</div>

      <div className="flex flex-col items-center gap-3 group/node shrink-0">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-(--bg-main) border border-(--border) flex items-center justify-center shadow-lg group-hover/node:border-(--text-primary) transition-colors relative z-10">
          <Database size={28} className="text-(--text-primary)" />
        </div>
        <div className="text-center">
          <div className="text-xs md:text-small font-bold text-(--text-primary) mb-1">Database</div>
          <div className="flex flex-wrap justify-center gap-1">
            <span className="text-xs px-1.5 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary)">PostgreSQL / MySQL</span>
            <span className="text-xs px-1.5 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary)">Hibernate / JPA</span>
            <span className="text-xs px-1.5 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary)">MongoDB</span>
            <span className="text-xs px-1.5 py-0.5 border border-(--border) rounded bg-(--bg-main) text-(--text-secondary)">SQLAlchemy</span>
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
    <div className="w-full max-w-screen-2xl ml-0 mr-auto px-6 md:px-12 lg:px-16 py-6 md:py-12 animate-fade-in relative z-10">
      {/* Header Area */}
      <div className="mb-16 space-y-12" style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}>
        <div className="border-b-minimal pb-8 space-y-4">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-(--text-primary)">
            Nikolas Vix
          </h1>
          <p className="text-sm md:text-base text-(--text-secondary) font-light">
            Wirtschaftsinformatik-Student · Software & Process Architect
          </p>
          <div className="flex gap-3 md:gap-4 text-xs font-mono text-(--text-dim) flex-wrap">
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
              Ich lege dabei großen Wert auf sauberen, wartbaren Code sowie effiziente Automatisierung.
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
                      <td className="px-4 py-3 md:px-5 md:py-4 text-xs md:text-small font-mono text-(--text-secondary)">Business Process Modeling (BPMN), Process Mining (Celonis), Requirements Engineering, Stakeholder Analysis</td>
                    </tr>
                    <tr className="border-b border-(--border)">
                      <td className="px-4 py-3 md:px-5 md:py-4 text-xs md:text-small font-bold text-(--text-primary) border-r border-(--border)">AI & Digital Innovation</td>
                      <td className="px-4 py-3 md:px-5 md:py-4 text-xs md:text-small font-mono text-(--text-secondary)">AI-Assisted Dev, Prompt Engineering Basics, Data-driven Decision Making</td>
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
      <div className="border-t-minimal pt-12">
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