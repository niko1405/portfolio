import { ArrowUpRight, Box, HardDrive, Server, Shield, Terminal } from "lucide-react";
import type { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    id: "azure-vm",
    title: "Azure VM Manager",
    file: "azure_vm.tsx",
    desc: "Serverless Control Panel für Minecraft Instanzen.",
    tags: ["Azure", "React", "Serverless"],
    year: "2024",
    type: "Cloud",
    detail: {
      problem: "Kostenineffizienz durch 24/7 Server-Laufzeiten.",
      solution: "On-Demand VM-Steuerung via Web-Interface.",
      features: [
        { title: "Auth Gateway", icon: Shield, desc: "Azure Function prüft Hash-Werte. 401 bei ungültigem Passwort." },
        { title: "Smart Polling", icon: ArrowUpRight, desc: "Status-Check alle 30s. Inaktivitätserkennung im Frontend." },
        { title: "OS Automation", icon: Terminal, desc: "Custom Linux Commands ('mc_start', 'status') & Systemd." },
        { title: "Persistence", icon: HardDrive, desc: "Graceful Shutdown mit Backup in Azure Blob Container." }
      ],
      tech_deep_dive: [
        { label: "Linux Scripting", val: "Automatischer Start/Stop, SSH Shortcuts, Backup-Rotation" },
        { label: "State Mgmt", val: "Vermeidung von Race Conditions bei Multi-Tab Nutzung" },
        { label: "Cost Opt", val: "Auto-Deallocate der VM nach 10min Idle" }
      ]
    }
  },
  {
    id: "microservices",
    title: "K8s Microservices",
    file: "cluster.yml",
    desc: "Skalierbare Spring Boot Architektur.",
    tags: ["Java", "K8s", "Docker"],
    year: "2023",
    type: "Backend",
    detail: {
      problem: "Monolithische Skalierungsprobleme.",
      solution: "Verteiltes System mit autonomen Services.",
      features: [
        { title: "Orchestration", icon: Box, desc: "Kubernetes Deployments." },
        { title: "Data", icon: Server, desc: "PostgreSQL pro Service." }
      ]
    }
  },
  {
    id: "studymaxer",
    title: "Studymaxer",
    file: "ui_kit.fig",
    desc: "User Centered Design Study.",
    tags: ["Figma", "UX", "Prototyping"],
    year: "2023",
    type: "Design",
  },
  {
    id: "mobile-app",
    title: "7InTheWild",
    file: "App.tsx",
    desc: "Cross-Platform Outdoor Challenge App.",
    tags: ["React Native", "Expo"],
    type: "Mobile",
    year: "2022",
  }
];