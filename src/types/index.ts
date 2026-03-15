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

export interface ProjectDetail {
  problem?: string;
  solution?: string;
  features?: ProjectFeature[];
  tech_deep_dive?: TechDeepDiveItem[];
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