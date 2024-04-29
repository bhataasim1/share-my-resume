"use client";
import { NavItem } from "@/types/types";
import {
  LucideHome,
  LucideMail,
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
  {
    label: "Contact",
    icon: LucideMail,
    href: "/contact",
  },
    // {
  //   label: "Todos",
  //   icon: LucideListTodo,
  //   href: "/admin/dashboard/todos",
  //   children: [
  //     {
  //       label: "Create",
  //       href: "/admin/dashboard/todos/create",
  //       children: [
  //         {
  //           label: "Basic Details",
  //           href: "/admin/dashboard/todos/create#basic-details",
  //         },
  //         {
  //           label: "Address Details",
  //           href: "/admin/dashboard/todos/create#address-details",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
