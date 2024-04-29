import React from "react";
import Link from "next/link";
import { buttonVariants } from "../../ui/button";
import { navItems } from "@/constant/navItems";
import { NavigationMenuItem } from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

const DesktopSidebar = () => {
  const path = usePathname();
  return (
    <nav className="hidden md:flex gap-2">
      <NavigationMenuItem>
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`${buttonVariants({
              variant: "ghost",
            })} active: ${path === item.href ? "bg-gray-700" : ""}`}
          >
            {item.label}
          </Link>
        ))}
      </NavigationMenuItem>
    </nav>
  );
};

export default DesktopSidebar;
