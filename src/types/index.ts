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
  gallery?: GalleryItem[];
}

export interface Project {
  id: string;
  title: string;
  file: string;
  icon: LucideIcon;
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

export type ArchiveProjectCard = {
  id: string;
  title: string;
  role: string;
  context: string;
  year: string;
  focus: string;
  tags: string[];
  icon: LucideIcon;
  desc: string;
  deliverables: string;
  isSandbox?: boolean;
};

export interface GalleryItem {
  alt: string;
  caption?: string;
  type: "image" | "video";
  /** Eager-loaded URL for images (also used as eager video source if provided). */
  src?: string;
  /** Eager-loaded poster image shown before a video is played. */
  poster?: string;
  /** Lazy loader for video sources; resolves the URL only on demand. */
  loadSrc?: () => Promise<string>;
}

export interface SandboxProject {
  id: string;
  title: string;
  icon: LucideIcon;
  subtitle: string;
  heroSummary: string;
  details: string;
  learning: string;
  stack: string[];
  links: SandboxProjectLink[];
  gallery: GalleryItem[];
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
  fullscreenOnMobile?: boolean;
}

export interface ModalInstance {
  id: string;
  content: ReactNode;
  options: ModalOptions;
  isOpen: boolean;
}