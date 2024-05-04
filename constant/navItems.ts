"use client";
import { NavItem } from "@/types/types";
import {
  LucideBadgeInfo,
  LucideBriefcaseBusiness,
  LucideGraduationCap,
  LucideHome,
  LucidePanelBottom,
  LucideUser,
} from "lucide-react";

export const navItems: NavItem[] = [
  {
    label: "Home",
    icon: LucideHome,
    href: "/",
  },
  {
    label: "About",
    icon: LucideBadgeInfo,
    href: "/about",
  },
];

export const dashboardNavItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: LucidePanelBottom,
    href: "/user/dashboard",
  },
  {
    label: "Profile",
    icon: LucideUser,
    href: "/user/profile",
  },
  {
    label: "Education",
    icon: LucideGraduationCap,
    href: "/user/education",
  },
  {
    label: "Experience",
    icon: LucideBriefcaseBusiness,
    href: "/user/experience",
  },
];
