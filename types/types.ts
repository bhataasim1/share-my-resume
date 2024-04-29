import { LucideIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export interface NavItem {
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: LucideIcon;
  label: string;
  description?: string;
  children?: NavItem[];
}

export interface SidebarItem extends NavItem {
  onClick?: () => void;
}

export interface NavItemProps {
  item: NavItem;
  index: number;
  setSidebarOpen?: Dispatch<SetStateAction<boolean>>;
  path: string;
  initialOpen?: boolean;
}
