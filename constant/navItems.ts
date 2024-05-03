"use client";
import { NavItem } from "@/types/types";
import {
  LucideBookOpenText,
  LucideBriefcaseBusiness,
  LucideHome,
  LucideUser,
  LucideUsers,
} from "lucide-react";

export const navItems: NavItem[] = [
  {
    label: "Home",
    icon: LucideHome,
    href: "/",
  },
  {
    label: "About",
    icon: LucideUsers,
    href: "/about",
  },
];

export const dashboardNavItems: NavItem[] = [
  {
    label: "Home",
    icon: LucideHome,
    href: "/",
  },
  {
    label: "About",
    icon: LucideUsers,
    href: "/about",
  },
  {
    label: "Profile",
    icon: LucideUser,
    href: "/user/profile",
  },
  {
    label: "Education",
    icon: LucideBookOpenText,
    href: "/user/education",
  },
  {
    label: "Experience",
    icon: LucideBriefcaseBusiness,
    href: "/user/expreience",
  },
];
