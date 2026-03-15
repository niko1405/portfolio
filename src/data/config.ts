import { FileText, LayoutGrid, User } from "lucide-react";
import type { NavItem } from "../types";

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', icon: FileText, label: 'README.md' },
  { id: 'projects', icon: LayoutGrid, label: 'projects.tsx' },
  { id: 'about', icon: User, label: 'me.json' },
];