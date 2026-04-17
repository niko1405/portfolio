import { ArrowUpRight, Box, Brain, Briefcase, Cloud, Code2, Guitar, HardDrive, Package, Palette, Server, Shield, Smartphone, Terminal } from "lucide-react";
import type { ArchiveProjectCard, Project, SandboxProject } from "../types";

const PROJECT_MEDIA = import.meta.glob<string>("../assets/projects/**/*.{png,jpg,jpeg,svg,mp4}", {
  eager: true,
  import: "default"
});

const getProjectMedia = (relativePath: string): string => {
  const fullPath = `../assets/projects/${relativePath}`;
  const src = PROJECT_MEDIA[fullPath];

  if (!src) {
    throw new Error(`Missing project media asset: ${fullPath}`);
  }

  return src;
};

const collectProjectMedia = (folder: string, extension: "png" | "svg"): string[] =>
  Object.entries(PROJECT_MEDIA)
    .filter(([path]) => path.startsWith(`../assets/projects/${folder}/`) && path.endsWith(`.${extension}`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, src]) => src);

// Azure VM
const onlineImage = getProjectMedia("azure_vm/online.png");
const startingImage = getProjectMedia("azure_vm/starting.png");
const unreachableImage = getProjectMedia("azure_vm/unreachable.png");
const stopImage = getProjectMedia("azure_vm/stop.png");
const backupImage = getProjectMedia("azure_vm/backup.png");

// Spring Backend
const jobconnectImage = getProjectMedia("spring_backend/jobconnect.png");
const jobOfferControllerImage = getProjectMedia("spring_backend/JobOfferController.png");
const jobOfferServiceImage = getProjectMedia("spring_backend/JobOfferService.png");
const komponenten = getProjectMedia("spring_backend/Komponenten.png");
const k8sImage = getProjectMedia("spring_backend/k8.png");
const postmanImage = getProjectMedia("spring_backend/postman.png");

// Sandbox visuals
const rnAuthImage = getProjectMedia("react_native/auth.jpg");
const rnLivechatImage = getProjectMedia("react_native/livechat.png");
const rnHomeVideo = getProjectMedia("react_native/Home.mp4");
const rnDiscoverVideo = getProjectMedia("react_native/Discover.mp4");
const rnMessagesVideo = getProjectMedia("react_native/Messages.mp4");
const rnProfileVideo = getProjectMedia("react_native/Profile.mp4");
const rnSurveyVideo = getProjectMedia("react_native/Survey.mp4");
const rnVotingVideo = getProjectMedia("react_native/Voting.mp4");
const rnApPostVideo = getProjectMedia("react_native/AP_Post.mp4");
const rnApSurveyVideo = getProjectMedia("react_native/AP_Survey.mp4");
const rnHomePoster = getProjectMedia("react_native/previews/Home.jpg");
const rnDiscoverPoster = getProjectMedia("react_native/previews/Discover.jpg");
const rnMessagesPoster = getProjectMedia("react_native/previews/Messages.jpg");
const rnProfilePoster = getProjectMedia("react_native/previews/Profile.jpg");
const rnSurveyPoster = getProjectMedia("react_native/previews/Survey.jpg");
const rnVotingPoster = getProjectMedia("react_native/previews/Voting.jpg");
const rnApPostPoster = getProjectMedia("react_native/previews/AP_Post.jpg");
const rnApSurveyPoster = getProjectMedia("react_native/previews/AP_Survey.jpg");

// Studymaxer
const studymaxerSlides = collectProjectMedia("studymaxer", "png");

// Chora Backend
const choraBackendSlides = collectProjectMedia("fastapi", "svg");

// Enterprise Process Automation
const enterpriseProcessAutomationSlides = collectProjectMedia("dvg", "png");

export const PROJECTS: Project[] = [
    {
    id: "fastapi",
    title: "Chora Backend",
    file: "pyproject.toml",
    icon: Guitar,
    desc: "Ein modernes, in Python geschriebenes Backend zur Verwaltung von Daten einer Musikplattform. Das Projekt adaptiert bewährte Enterprise-Architekturmuster auf das FastAPI-Ökosystem und erweitert diese um eine GraphQL-Schnittstelle. Ein besonderer Fokus lag auf der sauberen Zusammenarbeit im Team durch strikte Git-Workflows und automatisierte CI/CD-Pipelines.",
    tags: ["Python", "FastAPI", "GraphQL", "CI/CD"],
    year: "2026",
    type: "Backend",
    detail: {
      problem: "Die zentrale Herausforderung war der Aufbau eines robusten Python-Backends, das gleichzeitig flexible API-Zugriffe (REST und GraphQL), strikte rollenbasierte Sicherheit via Keycloak sowie hohe Qualitätsstandards bei Tests, Monitoring und Teamprozessen vereint.",
      solution: "Entwicklung einer klaren Schichtenarchitektur (API, Service, Repository, Entity) auf Basis von FastAPI und SQLAlchemy 2.x. CRUD- und Pagination-Workflows werden über REST bereitgestellt, komplexe hierarchische Abfragen über einen dedizierten GraphQL-Router. Die Infrastruktur ist vollständig containerisiert und durch Prometheus/Grafana observability-ready instrumentiert.",
      takeaway: "Dieses Projekt hat mir vor allem gezeigt, wie universell gute Softwarearchitektur ist: Da wir Konzepte wie Schichtenarchitektur und Domain-Driven Design bereits im Java/Spring-Umfeld verinnerlicht hatten, fiel der Transfer auf einen neuen Tech-Stack (Python/FastAPI) erstaunlich leicht. Die größere Herausforderung und gleichzeitig mein wichtigstes Learning lag in der Zusammenarbeit im Team. Ich habe gelernt, wie essenziell ein sauberer Git-Workflow ist. Der souveräne Umgang mit Branching-Strategien, das Lösen komplexer Merge-Konflikte und die Automatisierung von Qualitätsstandards durch GitHub Actions gehören nun zu meinem Standard-Repertoire.",
      features: [
        {
          title: "Multi-Protocol APIs (REST & GraphQL)",
          icon: ArrowUpRight,
          desc: "Implementierung flexibler Schnittstellen: CRUD-Operationen und Pagination via REST, komplexe hierarchische Abfragen über einen eigenen GraphQL-Router. Beide Oberflächen sind strikt rollenbasiert über Keycloak autorisiert."
        },
        {
          title: "Clean Python Architecture",
          icon: Box,
          desc: "Konsequenter Aufbau einer Schichtenarchitektur (API, Service, Repository, Entity) in Python. Nutzung von SQLAlchemy 2.x als ORM fuer typsichere Datenbankabfragen und Wahrung relationaler Integritaetsregeln in PostgreSQL."
        },
        {
          title: "QA & Automated Testing",
          icon: Terminal,
          desc: "Umfassende Testabdeckung durch Unit-, Integrations- und Lasttests (Locust). Vor den Tests sorgt ein automatisiertes Fixture-Setup fuer die Befuellung von Datenbank und Keycloak, um realitaetsnahe Bedingungen zu schaffen."
        },
        {
          title: "Observability & DevOps",
          icon: Server,
          desc: "Vollstaendige Containerisierung (Docker Compose) inklusive Monitoring-Infrastruktur. Instrumentierung der FastAPI-Endpunkte mit Prometheus und Grafana zur Live-Ueberwachung der System-Metriken."
        }
      ],
      implementationTable: [
        { area: "Backend Core", implementation: "Python, FastAPI, GraphQL, SQLAlchemy 2.x" },
        { area: "Database & Auth", implementation: "PostgreSQL, psycopg3, Keycloak (JWT)" },
        { area: "QA & Testing", implementation: "Pytest, Locust (Lasttests), Ruff (Linting), SonarQube" },
        { area: "DevOps & Team", implementation: "GitHub Actions (CI/CD), Docker, Git (Rebase/Merge)" },
        { area: "Observability & Docs", implementation: "Prometheus, Grafana, MkDocs (Material), PlantUML" }
      ],
      actions: {
        sourceCode: "https://github.com/niko1405/chora-backend"
      },
      image: choraBackendSlides[0],
      imageGallery: choraBackendSlides
    }
  },
  {
    id: "enterprise-process-automation",
    title: "Enterprise Process Automation",
    file: "enterprise_process_automation.bpmn",
    icon: Briefcase,
    desc: "Ein ganzheitliches Projekt zur Digitalisierung und Automatisierung eines unternehmensinternen Rechnungsprozesses. Das Projekt simuliert einen realen Enterprise-Use-Case und durchläuft alle Phasen der Prozessoptimierung: Von der Architektur-Grundlage (gRPC & Messaging) über Process Mining und BPMN-Modellierung bis hin zur Integration von RPA-Bots und KI-Agenten zur automatisierten Datenextraktion.",
    tags: ["Microservices", "gRPC", "RabbitMQ", "Process Mining", "BPMN", "RPA", "AI Agents"],
    year: "2026",
    type: "Backend",
    detail: {
      problem: "Ein mittelständisches Unternehmen kämpft bei der Verarbeitung von Eingangsrechnungen mit Medienbrüchen, manuellen Übertragungsfehlern und Intransparenz. Die Herausforderung besteht nicht nur in der reinen Softwareentwicklung, sondern in der methodischen Analyse (Bottleneck-Identifikation) und der Konzeption einer zukunftssicheren, verteilten Zielarchitektur, die im Team agil umgesetzt wird.",
      solution: "Entwicklung eines modularen, prozessgesteuerten Systems. Die technische Basis bildet eine asynchrone Integrationsarchitektur (gRPC & RabbitMQ) für das Zahlungs- und Metadaten-Handling. Darauf aufbauend wird ein digitaler Workflow implementiert, der manuelle ERP-Eingaben durch Robotic Process Automation (RPA) ersetzt und KI-Agenten zur PDF-Datenextraktion (inkl. Human-in-the-Loop-Kontrolle) orchestriert.",
      takeaway: "Dieses Modul zeigt mir eindrucksvoll, dass exzellenter Code nur ein Teil der Lösung ist. Echter unternehmerischer Mehrwert entsteht erst, wenn man den Geschäftsprozess versteht (Process Mining), ihn sauber strukturiert (BPMN) und dann das exakt passende Werkzeug wählt - sei es ein gRPC-Microservice, ein RPA-Bot oder ein KI-Agent. Zudem lerne ich durch die agile Zusammenarbeit im 4er-Team mit Jira und Confluence die Arbeitsweise in modernen Enterprise-IT-Abteilungen kennen und schätzen.",
      features: [
        {
          title: "Distributed Integration Architecture",
          icon: Box,
          desc: "Aufbau der technischen Fundamente: Implementierung eines gRPC-Services für das Metadaten-Management und Anbindung eines asynchronen Zahlungssystems über RabbitMQ (Message Broker) zur Entkopplung der Services."
        },
        {
          title: "Process Mining & BPMN",
          icon: ArrowUpRight,
          desc: "Datengetriebene Prozessanalyse: Auswertung von Event-Logs mittels Celonis zur Identifikation von Prozessvarianten und Bottlenecks im Ist-Zustand. Überführung der Erkenntnisse in ein standardisiertes BPMN-Soll-Modell."
        },
        {
          title: "RPA & AI-Agents",
          icon: Brain,
          desc: "Automatisierung manueller Workloads: Einsatz von Robotic Process Automation (RPA) für die automatische Dateneingabe in ERP-Frontends. Integration eines KI-Agenten zur intelligenten Extraktion von Rechnungsdaten aus PDFs mit Plausibilitätsprüfungen."
        },
        {
          title: "Agile Enterprise Collaboration",
          icon: Shield,
          desc: "Simulation eines realen Unternehmensumfelds: Steuerung des gesamten Software Development Life Cycles (SDLC) in einem 4-köpfigen Entwicklungsteam. Strikte Nutzung von Jira für das Sprint- und Ticket-Tracking sowie Confluence für die Architektur-Dokumentation."
        }
      ],
      implementationTable: [
        { area: "Integration & Architektur", implementation: "gRPC, RabbitMQ (Message Broker), Microservice Patterns" },
        { area: "Process Management", implementation: "Celonis (Process Mining), BPMN, Workflow Engines" },
        { area: "Automation & AI", implementation: "Robotic Process Automation (RPA), AI Agents (PDF Extraction)" },
        { area: "Team & Collaboration", implementation: "Agile Development (Sprints), Jira, Confluence, Git/GitHub" }
      ],
      image: enterpriseProcessAutomationSlides[0],
      imageGallery: enterpriseProcessAutomationSlides
    }
  },
    {
    id: "azure-vm",
    title: "Azure VM Manager",
    file: "azure_vm.tsx",
    icon: Cloud,
    desc: "Ein Fullstack-System zur On-Demand-Steuerung von Azure-Instanzen. Das Tool ermöglicht es Endnutzern, kostspielige Cloud-Ressourcen sicher zu starten und zu stoppen, während im Hintergrund eine intelligente Automatisierung für Backups und Kosteneffizienz sorgt.",
    tags: ["Azure", "Serverless", "Powershell", "Automation"],
    year: "2026",
    type: "Cloud",
    detail: {
      problem: "Cloud-Hosting für Game-Server (Minecraft) verursacht hohe 24/7-Laufzeitkosten. Das manuelle Management über das Azure Portal ist für Mitspieler zu komplex und aus Sicherheitsgründen nicht tragbar.",
      solution: "Entwicklung eines leichtgewichtigen Web-Dashboards zur intuitiven Remote-Steuerung, kombiniert mit einer Serverless Middleware (Azure Functions) als sicheres API-Gateway. OS-Level-Skripte auf der VM garantieren dabei Datenintegrität durch automatisierte Backups und maximale Kosteneffizienz.",
      takeaway: "Dieses Projekt hat mir gezeigt, dass die größte Herausforderung in der Cloud nicht die Bereitstellung von Ressourcen ist, sondern deren effiziente Orchestrierung. Besonders lehrreich war die Implementierung eines automatisierten Lifecycle-Managements: Systeme so zu gestalten, dass sie Abhängigkeiten selbstständig auflösen und aktuell halten, ist der Schlüssel für langfristige Wartbarkeit. In Kombination mit einem Graceful Shutdown zur Sicherung der Datenintegrität hat dies mein Verständnis für robuste und autarke Systemarchitekturen geschärft.",
      features: [
        {
          title: "Serverless Auth Gateway",
          icon: Shield,
          desc: "Realisierung der Zugriffssteuerung über eine PowerShell-basierte Azure Function. Diese validiert Requests gegen Passwort-Hashes und interagiert direkt mit der Azure Management API."
        },
        {
          title: "Deep Health Monitoring",
          icon: ArrowUpRight,
          desc: "Intelligentes Status-Polling (30s-Intervall) im Frontend. Das System validiert nicht nur den Power-State der VM, sondern führt einen TCP-Socket-Check auf Port 25565 durch, um die tatsächliche Dienst-Verfügbarkeit zu garantieren."
        },
        {
          title: "Automated Cloud Backup",
          icon: HardDrive,
          desc: "Implementierung einer Backup-Pipeline: Vor dem Stoppen wird der Server-Prozess sicher beendet, die Welt komprimiert und redundant im Azure Blob Storage (FIFO-Rotation, max. 7 Versionen) gesichert."
        },
        {
          title: "Auto-Provisioning & Patching",
          icon: Package,
          desc: "Ein dedizierter Bootstrapper validiert bei jedem Start die Paper-Version gegen die API und übernimmt das Dependency Management, um automatisch die kompatible Java-Runtime (JRE) bereitzustellen."
        },
        {
          title: "Smart Idle-Detection (Cost-Save)",
          icon: Terminal,
          desc: "Ein Watchdog-Skript überwacht aktive Verbindungen auf OS-Ebene. Bei 10-minütiger Inaktivität wird automatisch ein geordneter Shutdown eingeleitet, was die Betriebskosten um bis zu 80% senkt."
        }
      ],
      implementationTable: [
        { area: "Frontend", implementation: "Vanilla JS & CSS für maximale Performance und Zero-Dependency-Footprint." },
        { area: "Cloud Logic", implementation: "Azure Functions (PowerShell) mit Managed Identities für Keyless-Security." },
        { area: "Automation", implementation: "Bash-Skripte, Systemd-Units und Crontabs zur Prozess-Orchestrierung, automatisiertes Lifecycle-Management." },
        { area: "Networking", implementation: "SSH-Tunneling, Port-Listening und REST-API-Kommunikation." },
        { area: "Infrastructure", implementation: "Azure Virtual Machines (B-Series), Azure Blob Storage, GitHub Pages." }
      ],
      actions: {
        sourceCode: "https://github.com/niko1405/mc-server-control",
        liveDemo: "https://niko1405.github.io/mc-server-control/"
      },
      image: onlineImage,
      imageGallery: [startingImage, onlineImage, unreachableImage, backupImage, stopImage]
    }
  },
  {
    id: "studymaxer",
    title: "Studymaxer",
    file: "ui_kit.fig",
    icon: Palette,
    desc: "Eine moderne Plattform zur Studien- und Berufsorientierung, entwickelt nach strengen User-Centered Design (UCD) Prinzipien. Das Projekt demonstriert den kompletten Produktlebenszyklus einer Anwendung - von der initialen Zielgruppenanalyse und Geschäftsmodellierung über iteratives UI/UX-Design in Figma bis hin zur finalen technischen Umsetzung als responsives React/TypeScript-Frontend.",
    tags: ["React", "TypeScript", "Figma", "UX", "UCD", "BMC"],
    year: "2025",
    type: "Design",
    detail: {
      problem: "Der Markt für Studienorientierung ist unübersichtlich und oft wenig ansprechend für e junge Zielgruppe. Die Herausforderung lag darin, dieses komplexe Thema methodisch zu knacken: Wir mussten erst durch striktes User Research die echten Bedürfnisse verstehen, ein tragfähiges Geschäftsmodell ableiten und dieses Wissen dann in ein intuitives UI/UX-Design übersetzen.",
      solution: "Entwicklung von 'Studymaxer', einer modernen Plattform zur Studienorientierung. Der gesamte Produktlebenszyklus wurde durchlaufen: Vom Requirements Engineering (Interviews, Personas) über die Geschäftsmodellierung (Business Model Canvas) bis hin zum interaktiven Figma-Prototypen und der finalen Umsetzung als responsive React/TypeScript App.",
      takeaway: "Dieses Projekt hat mir gezeigt, dass der sauberste Code wertlos ist, wenn er am Nutzer vorbeientwickelt wird. Die UCD-Methoden, insbesondere die Interviews, haben uns geholfen, unsere eigenen Annahmen zu hinterfragen und den Fokus richtig zu setzen. Technisch war es eine grossartige Erfahrung, ein durchdachtes Figma-Designsystem sauber in modulare React-Komponenten zu übersetzen. Mein wichtigstes Takeaway aus dem gesamten Designprozess: 'Keep it simple - less is better'.",
      features: [
        {
          title: "UCD Research & Empathy",
          icon: Brain,
          desc: "Fundierte Zielgruppenanalyse durch reale Nutzerinterviews. Einsatz von Empathy Maps, Customer Journeys und Personas, um Annahmen zu validieren und die echten Pain Points der Nutzer zu identifizieren."
        },
        {
          title: "UI/UX & Prototyping",
          icon: Palette,
          desc: "Iteratives Design in Figma. Fokus auf 'Minimal Cognitive Load' durch klare Informationsarchitektur, intuitive Navigation und ein modernes, zielgruppengerechtes Dark-Mode-UI."
        },
        {
          title: "Frontend Engineering",
          icon: Code2,
          desc: "Pixelgenaue Übersetzung der Design-Mockups in eine performante Single Page Application. Umsetzung mit React und TypeScript unter Einhaltung moderner Frontend-Patterns."
        },
        {
          title: "Business Strategy & Ecosystem",
          icon: Briefcase,
          desc: "Konzeption der App als dreiseitiger Marktplatz (B2C für Nutzer, B2B für Mentoren und Institutionen). Ausarbeitung der wirtschaftlichen Tragfähigkeit mittels Business Model Canvas (BMC)."
        }
      ],
      implementationTable: [
        { area: "Frontend Development", implementation: "React, TypeScript, CSS (Responsive Design)" },
        { area: "UI/UX Design", implementation: "Figma, Wireframing, High-Fidelity Prototyping" },
        { area: "User Research", implementation: "Interviews, Personas, Empathy Maps, Customer Journeys" },
        { area: "Business / Strategy", implementation: "Business Model Canvas (BMC), Ecosystem Mapping" }
      ],
      actions: {
        sourceCode: "https://github.com/niko1405/studymaxer",
        liveDemo: "https://studymaxer.netlify.app/"
      },
      image: studymaxerSlides[0],
      imageGallery: studymaxerSlides
    }
  },
  {
    id: "microservices",
    title: "Spring Backend Microservice",
    file: "jobconnect-backend.yml",
    icon: Server,
    desc: "Ein modularer Spring Boot Backend-Server für eine Job-Matching-Plattform. Das Projekt diente zur praktischen Anwendung fortgeschrittener Software-Engineering-Methoden, von Domain-Driven Design über OAuth2-Security bis hin zur Cloud-Native Orchestrierung mit Kubernetes.",
    tags: ["Java", "Spring Boot", "Kubernetes", "Keycloak", "PostgreSQL"],
    year: "2025-26",
    type: "Backend",
    detail: {
      problem: "Die Entwicklung eines skalierbaren Backends für eine Job-Matching-Plattform, das strengen Software-Engineering-Standards folgt. Die Herausforderung bestand darin, die Anwendungslogik sauber zu strukturieren (Separation of Concerns) unter Einhaltung hoher Qualitätsstandards bei Sicherheit, Testing und Dokumentation.",
      solution: "Ein Spring Boot Backend, das nach Prinzipien des Domain-Driven Design (DDD) im MVC-Pattern strukturiert ist. Die Persistenz wird relational über Hibernate/PostgreSQL gelöst, während Keycloak eine standardkonforme OAuth2-Absicherung bietet. Das System wurde vollständig containerisiert und in einem Kubernetes-Cluster orchestriert.",
      takeaway: "Dieses Projekt hat mir die praktische Relevanz von sauberer Softwarearchitektur verdeutlicht. Die strikte Anwendung von Domain-Driven Design half dabei, eine klare Trennung der Fachdomänen zu wahren und so eine solide, leicht erweiterbare Basis für die Architektur zu schaffen. Besonders beeindruckt hat mich dabei die Effizienz des Spring-Ökosystems: Komplexe Anforderungen wie Security, Persistenz oder Dependency Injection lassen sich durch die durchdachten Spring-Workflows extrem elegant und entwicklerfreundlich umsetzen. Zudem bot die Integration von Keycloak und das Deployment im Kubernetes-Cluster tiefgreifende Einblicke in die Best Practices moderner, verteilter Systeme.",
      features: [
        {
          title: "Softwarearchitektur",
          icon: Box,
          desc: "Konsequente Trennung von API-Schicht, Geschäftslogik und Datenhaltung. Der Einsatz von Dependency Injection und DTOs (Data Transfer Objects) sorgt für eine lose Kopplung und hohe Wartbarkeit des Codes."
        },
        {
          title: "Identity & Access Management",
          icon: Shield,
          desc: "Integration von Keycloak über Spring Security. Absicherung der REST-Endpunkte durch JWT-basierte Authentifizierung und rollenbasierte Autorisierung (OAuth2/OIDC)."
        },
        {
          title: "Cloud-Native Deployment",
          icon: Server,
          desc: "Lokales Setup der Services (Backend, Datenbank, Keycloak) mittels Docker Compose. Bereitstellung und Orchestrierung der verteilten Architektur in einem Kubernetes-Cluster inklusive Pod-Management und Port-Forwarding."
        },
        {
          title: "Testing & API-Dokumentation",
          icon: Terminal,
          desc: "Validierung der Core-Logik durch systematische Unit- und Integrationstests (JUnit, Mockito). Automatisierte Bereitstellung der interaktiven API-Spezifikation via Swagger/OpenAPI sowie Dokumentation mit Asciidoctor und Javadoc."
        }
      ],
      implementationTable: [
        { area: "Backend Core", implementation: "Java, Spring Boot, Spring Data JPA / Hibernate" },
        { area: "IAM & Security", implementation: "Keycloak, Spring Security, OAuth2 / OIDC" },
        { area: "Database", implementation: "PostgreSQL" },
        { area: "DevOps", implementation: "Docker, Docker Compose, Kubernetes (K8s)" },
        { area: "QA & Docs", implementation: "JUnit, Mockito, Swagger, Asciidoctor, Javadoc" }
      ],
      actions: {
        sourceCode: "https://github.com/niko1405/jobconnect-backend"
      },
      image: onlineImage,
      imageGallery: [jobconnectImage, jobOfferControllerImage, jobOfferServiceImage, komponenten, k8sImage, postmanImage]
    }
  },
];

export const SANDBOX_PROJECTS: SandboxProject[] = [
  {
    id: "7inthewild",
    title: "7InTheWild",
    icon: Smartphone,
    subtitle: "MERN-Stack Mobile App",
    heroSummary: "Learning-by-Doing Sandbox Projektzur Evaluierung von Cross-Platform-Entwicklung mit Mobile-App, Admin-Panel und eigenem Backend.",
    details: "Ein Full-Stack-Projekt zur Evaluierung von Cross-Platform-Entwicklung. Das Frontend wurde in React Native (Expo) umgesetzt und nutzt Redux Toolkit für das systemweite State-Management (inklusive Dark Mode & User Sessions) sowie eine komplexe, dreistufige React Navigation (Stack, Drawer, Tabs). Das Backend folgt einer Node.js/Express MVC-Architektur mit MongoDB/Mongoose zur Datenpersistenz und nutzt Sanity.io als Headless CMS für dynamische Blog-Inhalte.",
    learning: "Der technische Fokus lag auf der Integration verteilter Systeme: Die Implementierung von bidirektionaler Echtzeit-Kommunikation via Socket.IO (für Live-Chats), die Anbindung von Google OAuth und die Orchestrierung von Push-Benachrichtigungen über das Expo Server SDK (inkl. In-App-Routing). Ein wertvolles Praxis-Learning war zudem der Umgang mit Multipart-Datei-Uploads (Multer & Cloudinary) sowie spezifischen Mobile-Constraints wie Offline-Handling (netinfo) und Ad-Integration.",
    stack: ["React Native", "Expo", "Node.js", "Express", "MongoDB", "Redux Toolkit", "Socket.IO", "Sanity CMS"],
    links: [
      { label: "App Repo", href: "https://github.com/niko1405/7InTheWild-App" },
      { label: "Backend Repo", href: "https://github.com/niko1405/7InTheWild-Backend" }
    ],
    gallery: [
      {
        src: rnAuthImage,
        alt: "7InTheWild authentication screen",
        caption: "Authentication flow as entry point to the mobile app.",
        type: "image"
      },
      {
        src: rnLivechatImage,
        alt: "7InTheWild live chat screen",
        caption: "Live chat module integrated in the mobile experience.",
        type: "image"
      },
      {
        src: rnHomeVideo,
        alt: "7InTheWild home screen video",
        caption: "Home screen interactions and app navigation.",
        type: "video",
        poster: rnHomePoster
      },
      {
        src: rnDiscoverVideo,
        alt: "7InTheWild discover screen video",
        caption: "Discover workflow and content exploration.",
        type: "video",
        poster: rnDiscoverPoster
      },
      {
        src: rnMessagesVideo,
        alt: "7InTheWild messages screen video",
        caption: "Messaging and conversation handling in-app.",
        type: "video",
        poster: rnMessagesPoster
      },
      {
        src: rnProfileVideo,
        alt: "7InTheWild profile screen video",
        caption: "Profile area and account-related interactions.",
        type: "video",
        poster: rnProfilePoster
      },
      {
        src: rnSurveyVideo,
        alt: "7InTheWild survey screen video",
        caption: "Survey experience and response flow.",
        type: "video",
        poster: rnSurveyPoster
      },
      {
        src: rnVotingVideo,
        alt: "7InTheWild voting screen video",
        caption: "Voting mechanics and interaction states.",
        type: "video",
        poster: rnVotingPoster
      },
      {
        src: rnApPostVideo,
        alt: "7InTheWild admin panel post video",
        caption: "Admin panel workflow for post management.",
        type: "video",
        poster: rnApPostPoster
      },
      {
        src: rnApSurveyVideo,
        alt: "7InTheWild admin panel survey video",
        caption: "Admin panel survey creation and management.",
        type: "video",
        poster: rnApSurveyPoster
      }
    ]
  }
];

/**
 * Builds the normalized project cards used by the intro archive section.
 */
export const buildArchiveProjects = (): ArchiveProjectCard[] => [
  ...PROJECTS.map((project) => {
    const actionLabels = [
      project.detail?.actions?.sourceCode ? 'Source Code' : null,
      project.detail?.actions?.liveDemo ? 'Live Demo' : null,
    ].filter(Boolean) as string[];

    return {
      id: project.id,
      title: project.title,
      role: project.type,
      context: project.file,
      year: project.year,
      focus: project.detail?.features?.[0]?.title ?? project.tags[0] ?? project.type,
      tags: project.tags,
      icon: project.icon,
      desc: project.desc,
      deliverables: actionLabels.length > 0 ? actionLabels.join(', ') : 'Projektdokumentation',
    };
  }),
  ...SANDBOX_PROJECTS
    .filter((project) => project.id === '7inthewild')
    .map((project) => ({
      id: project.id,
      title: project.title,
      role: 'Sandbox',
      context: project.subtitle,
      year: 'Sandbox',
      focus: project.heroSummary,
      tags: project.stack,
      icon: project.icon,
      desc: project.details,
      deliverables: project.links.map((link) => link.label).join(', '),
      isSandbox: true,
    })),
];