// --- TYPES ---

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface ProjectFeature {
  title: string;
  icon?: LucideIcon;
  desc: string;
}

export interface TechDeepDiveItem {
  label: string;
  val: string;
}

export interface ProjectImplementationRow {
  area: string;
  implementation: string;
}

export interface ProjectActions {
  sourceCode?: string;
  liveDemo?: string;
}

export interface ProjectDetail {
  problem?: string;
  solution?: string;
  takeaway?: string;
  features?: ProjectFeature[];
  tech_deep_dive?: TechDeepDiveItem[];
  implementationTable?: ProjectImplementationRow[];
  actions?: ProjectActions;
  image?: string;
  imageGallery?: string[];
}

export interface Project {
  id: string;
  title: string;
  file: string;
  desc: string;
  tags: string[];
  year: string;
  type: 'Cloud' | 'Backend' | 'Design' | 'Mobile';
  detail?: ProjectDetail;
}

export interface SandboxProjectLink {
  label: string;
  href?: string;
}

export interface SandboxGalleryItem {
  src: string;
  alt: string;
  caption: string;
  type: "image" | "video";
  poster?: string;
}

export interface SandboxProject {
  id: string;
  title: string;
  subtitle: string;
  heroSummary: string;
  details: string;
  learning: string;
  stack: string[];
  links: SandboxProjectLink[];
  gallery: SandboxGalleryItem[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface NavItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

export interface CommandItem {
  id: string;
  label: string;
  icon: LucideIcon;
  action: () => void;
}

// Modal Types
export interface ModalOptions {
  position?: 'center' | 'top'; // Custom positioning option
  closeOnOutsideClick?: boolean;
}

export interface ModalInstance {
  id: string;
  content: ReactNode;
  options: ModalOptions;
  isOpen: boolean;
}