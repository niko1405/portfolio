import { ArrowUpRight, Box, Brain, Briefcase, Cloud, Code2, CreditCard, GitBranch, Guitar, HardDrive, Package, Palette, Server, Shield, Smartphone, Terminal, Wrench } from "lucide-react";
import type { ArchiveProjectCard, GalleryItem, Project, SandboxProject } from "../types";

// Images (incl. video posters) are bundled eagerly so previews render instantly.
const PROJECT_IMAGES = import.meta.glob<string>("../assets/projects/**/*.{png,jpg,jpeg,svg}", {
  eager: true,
  import: "default"
});

// Videos are loaded lazily; the URL is only resolved when the user presses play.
const PROJECT_VIDEOS = import.meta.glob<string>("../assets/projects/**/*.mp4", {
  import: "default"
});

const imageUrl = (relativePath: string): string | undefined =>
  PROJECT_IMAGES[`../assets/projects/${relativePath}`];

const videoLoader = (relativePath: string): (() => Promise<string>) | undefined =>
  PROJECT_VIDEOS[`../assets/projects/${relativePath}`];

/** Resolves the eager poster image for a video by matching `previews/<name>.{jpg,png}`. */
const findPoster = (folder: string, name: string): string | undefined =>
  imageUrl(`${folder}/previews/${name}.jpg`) ?? imageUrl(`${folder}/previews/${name}.png`);

interface GallerySource {
  /** Filename within the project folder, e.g. "auth.jpg" or "Home.mp4". */
  file: string;
  alt: string;
  caption?: string;
}

const makeGalleryItem = (folder: string, source: GallerySource): GalleryItem => {
  const name = source.file.replace(/\.[^.]+$/, "");

  if (source.file.endsWith(".mp4")) {
    const loadSrc = videoLoader(`${folder}/${source.file}`);
    if (!loadSrc) throw new Error(`Missing project video: ${folder}/${source.file}`);
    return {
      type: "video",
      alt: source.alt,
      caption: source.caption,
      poster: findPoster(folder, name),
      loadSrc
    };
  }

  const src = imageUrl(`${folder}/${source.file}`);
  if (!src) throw new Error(`Missing project image: ${folder}/${source.file}`);
  return { type: "image", alt: source.alt, caption: source.caption, src };
};

/**
 * Builds a typed gallery for a project folder.
 * - With `sources`: explicit order/captions are preserved.
 * - Without: auto-collects all media (videos + images, excluding `previews/`), sorted by name.
 */
const buildGallery = (folder: string, sources?: GallerySource[]): GalleryItem[] => {
  if (sources) {
    return sources.map(source => makeGalleryItem(folder, source));
  }

  const prefix = `../assets/projects/${folder}/`;
  const files = [
    ...Object.keys(PROJECT_IMAGES),
    ...Object.keys(PROJECT_VIDEOS)
  ]
    .filter(path => path.startsWith(prefix) && !path.includes("/previews/"))
    .map(path => path.slice(prefix.length))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return files.map(file =>
    makeGalleryItem(folder, { file, alt: `${folder} ${file.replace(/\.[^.]+$/, "")}` })
  );
};

// Azure VM
const azureSlides = buildGallery("azure_vm");

// Spring Backend
const jobconnectSlides = buildGallery("spring_backend");

// Studymaxer
const studymaxerSlides = buildGallery("studymaxer");

// Chora Backend
const choraBackendSlides = buildGallery("fastapi");

// Enterprise Process Automation
const enterpriseProcessAutomationSlides = buildGallery("dvg");

// Sandbox visuals (curated order + captions)
const reactNativeSlides = buildGallery("react_native", [
  { file: "auth.jpg", alt: "7InTheWild authentication screen", caption: "Authentication flow as entry point to the mobile app." },
  { file: "livechat.png", alt: "7InTheWild live chat screen", caption: "Live chat module integrated in the mobile experience." },
  { file: "Home.mp4", alt: "7InTheWild home screen video", caption: "Home screen interactions and app navigation." },
  { file: "Discover.mp4", alt: "7InTheWild discover screen video", caption: "Discover workflow and content exploration." },
  { file: "Messages.mp4", alt: "7InTheWild messages screen video", caption: "Messaging and conversation handling in-app." },
  { file: "Profile.mp4", alt: "7InTheWild profile screen video", caption: "Profile area and account-related interactions." },
  { file: "Survey.mp4", alt: "7InTheWild survey screen video", caption: "Survey experience and response flow." },
  { file: "Voting.mp4", alt: "7InTheWild voting screen video", caption: "Voting mechanics and interaction states." },
  { file: "AP_Post.mp4", alt: "7InTheWild admin panel post video", caption: "Admin panel workflow for post management." },
  { file: "AP_Survey.mp4", alt: "7InTheWild admin panel survey video", caption: "Admin panel survey creation and management." }
]);

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
      solution: "Entwicklung einer klaren Schichtenarchitektur (API, Service, Repository, Entity) auf Basis von FastAPI und SQLAlchemy 2.x. CRUD- und Pagination-Workflows werden über REST bereitgestellt, komplexe hierarchische Abfragen über einen dedizierten GraphQL-Router. Die Infrastruktur ist vollständig containerisiert und durch Prometheus/Grafana instrumentiert.",
      takeaway: "Dieses Projekt hat mir vor allem gezeigt, wie universell gute Softwarearchitektur ist: Da wir Konzepte wie Schichtenarchitektur und Domain-Driven Design bereits im Java/Spring-Umfeld verinnerlicht hatten, fiel der Transfer auf einen neuen Tech-Stack (Python/FastAPI) erstaunlich leicht. Die größere Herausforderung und gleichzeitig mein wichtigstes Learning lag in der Zusammenarbeit im Team. Ich habe gelernt, wie essenziell ein sauberer Git-Workflow ist. Ich bin nun sicher im Umgang mit Branching-Strategien, im Lösen komplexer Merge-Konflikte und in der Automatisierung von Qualitätsstandards durch GitHub Actions.",
      features: [
        {
          title: "Multi-Protocol APIs (REST & GraphQL)",
          icon: ArrowUpRight,
          desc: "Implementierung flexibler Schnittstellen: CRUD-Operationen und Pagination via REST, komplexe hierarchische Abfragen über einen eigenen GraphQL-Router. Beide Oberflächen sind strikt rollenbasiert über Keycloak autorisiert."
        },
        {
          title: "Clean Python Architecture",
          icon: Box,
          desc: "Konsequenter Aufbau einer Schichtenarchitektur (API, Service, Repository, Entity) in Python. Nutzung von SQLAlchemy 2.x als ORM für typsichere Datenbankabfragen und Wahrung relationaler Integritätsregeln in PostgreSQL."
        },
        {
          title: "QA & Automated Testing",
          icon: Terminal,
          desc: "Umfassende Testabdeckung durch Unit-, Integrations- und Lasttests (Locust). Für die Tests gibt es ein automatisiertes Fixture-Setup für die Befüllung von Datenbank und Keycloak."
        },
        {
          title: "Observability & DevOps",
          icon: Server,
          desc: "Vollständige Containerisierung (Docker Compose) inklusive Monitoring-Infrastruktur. Instrumentierung der FastAPI-Endpunkte mit Prometheus und Grafana zur Server-Live-Überwachung."
        }
      ],
      implementationTable: [
        { area: "Backend Core", implementation: "Python, FastAPI, GraphQL, SQLAlchemy 2.x" },
        { area: "Database & Auth", implementation: "PostgreSQL, Keycloak (JWT)" },
        { area: "QA & Testing", implementation: "Pytest, Locust (Lasttests), Ruff (Linting), SonarQube" },
        { area: "DevOps & Team", implementation: "GitHub Actions (CI/CD), Docker, Git" },
        { area: "Observability & Docs", implementation: "Prometheus, Grafana, MkDocs (Material), PlantUML" }
      ],
      actions: {
        sourceCode: "https://github.com/niko1405/chora-backend"
      },
      gallery: choraBackendSlides
    }
  },
  {
    id: "enterprise-process-automation",
    title: "Enterprise Process Automation",
    file: "enterprise_process_automation.bpmn",
    icon: Briefcase,
    desc: "Ein ganzheitliches Projekt zur Digitalisierung und Automatisierung eines unternehmensinternen Rechnungsprozesses. Das System orchestriert eingehende Rechnungen (PDF per E-Mail) durch einen vollständigen, Event-getriebenen Workflow: Von der automatischen KI-basierten Datenextraktion über Validierung und Duplikatsprüfung bis hin zur ERP-Eintragung und Zahlungsauslösung. Die Architektur kombiniert Process Orchestration (Camunda 8), asynchrone Messaging-Infrastruktur (RabbitMQ), Microservices (gRPC), RPA mit uiPath sowie KI-Automatisierung (n8n).",
    tags: [
        "Camunda 8",
        "Process Orchestration",
        "Microservices",
        "gRPC",
        "RabbitMQ",
        "Event-Driven Architecture",
        "PostgreSQL",
        "Docker",
        "BPMN",
        "RPA",
        "AI Agents",
        "n8n",
        "Python",
        "Workflow Automation"
    ],
    year: "2026",
    type: "Backend",
    detail: {
        problem: "Mittelständische Unternehmen verarbeiten Eingangsrechnungen manuell mit erheblichen Medienbrüchen: E-Mails mit PDF-Anhängen werden ausgedruckt, Daten manuell ins ERP übertragen (Fehlerquelle), Zahlungsfreigaben per E-Mail eingeholt, und Duplikate erst spät erkannt. Die Prozesskette ist intransparent, skaliert schlecht bei steigendem Volumen und bietet keine Nachvollziehbarkeit von Stati. Die technische Herausforderung liegt in der Integration heterogener Systeme (E-Mail, ERP, KI-Services) zu einem resilienten, automatisierten Workflow ohne Datenverlust.",
        solution: "Entwicklung eines verteilten, event-getriebenen Rechnungsbearbeitungssystems auf Basis von Camunda 8 Cloud als zentraler Orchestrator. Die Architektur trennt Prozesslogik (Camunda), Metadaten (PostgreSQL via gRPC) und Zahlungsauslösung (RabbitMQ) sauber. Eingehende E-Mails werden von einem Worker gepollt, per KI (n8n) in strukturierte Daten umgewandelt, und durch einen BPMN-Workflow geleitet: Validierung → Duplikatsprüfung (gRPC) → Genehmigung → Eintragung in ERP-System mithilfe eines Unattendant Robots in uiPath → Zahlungsauftrag (Worker publiziert an RabbitMQ) → Payment Service verarbeitet und aktualisiert Rechnungs-Status. Alle Komponenten sind containerisiert (Docker Compose) und kommunizieren teilweise asynchron über Message Queues bzw. über Web-Hooks.",
        takeaway: "Dieses Projekt zeigt, dass Enterprise-Automation mehr ist als Code schreiben: Es erfordert das Verständnis von langlaufenden, stateful Prozessen, der Wahl geeigneter Kommunikationsmuster (synchrone vs. asynchrone Komm.) und der Modellierung komplexer Geschäftsregeln in BPMN. Besonders wertvoll war die Erfahrung mit Camunda 8 als 'Smart Orchestrator' – die Prozessengine hält den Zustand, während Worker stateless und skalierbar bleiben. Die Kombination aus KI-Extraktion (Human-in-the-Loop via Request-Info-Worker) und RPA (Simulation zur Eintragung ins ERP-System) demonstriert praxisnah, wie hybride Automationsszenarien umgesetzt werden.",
        features: [
            {
                title: "Camunda 8 Process Orchestration",
                icon: GitBranch,
                desc: "Zentraler Orchestrator für den gesamten Rechnungsprozess. Camunda 8 Cloud führt das BPMN-Modell aus, verwaltet Prozessvariablen und Variants (Duplikat, Rückfrage, Ablehnung) und koordiniert fünf zustandslose externe Worker via Job-Streaming."
            },
            {
                title: "Distributed Microservices Architecture",
                icon: Box,
                desc: "Trennung von Zuständigkeiten über technologiepassende Schnittstellen: gRPC (Protobuf) für synchrone CRUD-Operationen auf Invoice-Metadaten (Duplikatsprüfung, Status-Updates), RabbitMQ für asynchrone, fehlertolerante Zahlungsverarbeitung (payment_orders Queue). PostgreSQL als ACID-konforme Metadaten-Datenbank, nicht als ERP-Ersatz. Alle Services sind als Docker-Container deploybar mit Health-Checks und Retry-Logik."
            },
            {
                title: "KI-basierte PDF-Datenextraktion",
                icon: Brain,
                desc: "Automatisierte Verarbeitung eingehender PDF-Rechnungen: Der mail-listener-worker konvertiert die erste PDF-Seite zu Base64, sendet sie an einen n8n-Webhook, wo ein KI-Workflow (LLM-basiert) strukturierte Daten extrahiert (Rechnungsnummer, Betrag, Lieferant). Unsichere Extraktionen werden via request-info-worker an den menschlichen Prozessverantwortlichen zur Klärung weitergeleitet (Human-in-the-Loop)."
            },
            {
                title: "Event-Driven Payment Processing",
                icon: CreditCard,
                desc: "Entkoppelte Zahlungsauslösung über Message Queues. Der execute-payment-worker publiziert keine Daten direkt an ein ERP-System, sondern sendet einen schlanken Payment-Order ({ id, invoice_id }) an RabbitMQ. Der Payment Service konsumiert diese, simuliert die Verarbeitung (mit Retry-Logik) und aktualisiert via gRPC den Invoice-Status auf 'erp_exported'. Das Ergebnis wird an die payment_results Queue publiziert für Audit-Trails."
            },
            {
                title: "Resiliente Worker-Infrastruktur",
                icon: Shield,
                desc: "Fünf spezialisierte Camunda-Worker mit robuster Fehlerbehandlung mit strukturiertem Logging für Observability. Die Worker implementieren ein einheitliches Fehler-Schema (Validation, Business, Technical Errors), das in Camunda als BPMN-Error-Events weiterverarbeitet werden kann (z.B. Ablehnung bei Duplikat)."
            },
            {
                title: "Developer Experience & Tooling",
                icon: Wrench,
                desc: "Vollständige Container-Entwicklungsumgebung via Docker Compose. Lokaler Prozess-Start mit 'uv run scripts/send_invoice_mail.py' generiert Test-Rechnungen und triggert den vollständigen Workflow. CI/CD mit GitHub Actions (Linting mit ruff, Docker-Build-Checks, Import-Validierung)."
            }
        ],
        implementationTable: [
            { area: "Process Orchestration", implementation: "Camunda 8 Cloud (SaaS), BPMN 2.0, Job Workers (Python)" },
            { area: "Service Communication", implementation: "gRPC (protobuf) für synchrone Ops, RabbitMQ (AMQP) für async Events" },
            { area: "Data Persistence", implementation: "PostgreSQL 15 (ACID), SQLAlchemy 2.0 (ORM)" },
            { area: "AI & Automation", implementation: "n8n (Workflow Automation), LLM-basierte PDF-Extraktion, Base64-Pipeline" },
            { area: "Infrastructure", implementation: "Docker Compose, Health Checks, Mailpit (SMTP), pgAdmin, RabbitMQ Management" },
            { area: "Programming & Tooling", implementation: "Python 3.11, uv (Package Manager), ruff (Linting), GitHub Actions CI" },
            { area: "Error Handling", implementation: "Structured Logging (JSON), BPMN Error Events, Retry-Policies, Dead Letter Queues" },
            { area: "Process Entry", implementation: "SMTP-Ingestion (Mailpit), PDF-Attachment Processing, n8n Webhook Integration" }
        ],
        actions: {
          sourceCode: "https://github.com/niko1405/zahlungssystem"
        },
        gallery: enterpriseProcessAutomationSlides
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
      gallery: azureSlides
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
      problem: "Der Markt für Studienorientierung ist unübersichtlich und oft wenig ansprechend für jüngere Zielgruppen. Wir mussten durch striktes User Research die echten Bedürfnisse verstehen, ein tragfähiges Geschäftsmodell ableiten und dieses Wissen dann in ein intuitives UI/UX-Design übersetzen.",
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
      gallery: studymaxerSlides
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
      gallery: jobconnectSlides
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
    gallery: reactNativeSlides
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