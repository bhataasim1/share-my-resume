"use client";

import { ChevronDownIcon, ChevronUpIcon, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavItem, NavItemProps } from "@/types/types";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useHashState } from "@/lib/use-hash-state";

export default function Nav({ items, setOpen }: any) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const [hash, setHash] = useHashState();
  const router = useRouter();

  const [url, setUrl] = useState<string>(path);

  const updateUrl = (path: string, searchParams: any, hash: string) => {
    // Rest the url
    setUrl(path);

    // Update the url with the search params and hash
    if (hash) {
      setUrl(`${path}#${hash}`);
    }
    const params = new URLSearchParams(searchParams).toString();
    if (params) {
      setUrl(`${path}?${params}`);
    }
  };

  useEffect(() => {
    updateUrl(path, searchParams, hash);
  }, [path, searchParams, hash, url]);

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item: NavItem, index: number) => {
        return (
          item.href && (
            <NavItem
              key={index}
              item={item}
              index={index}
              setSidebarOpen={setOpen}
              initialOpen={
                // url === item.href ||
                item.children?.some((child) => child.href === url)
              }
              path={url}
            />
          )
        );
      })}
    </nav>
  );
}

function NavItem({
  item,
  index,
  setSidebarOpen,
  path,
  initialOpen,
}: NavItemProps) {
  const [open, setOpenState] = useState<boolean>(initialOpen || false);

  const isChildActive = item.children?.some(
    (child: NavItem) => child.href === path
    //   child.href === path.split("#")[0] ||
    //   child.href === path.split("?")[0]
  );

  useEffect(() => {
    if (isChildActive) {
      setOpenState(true);
    }
  }, [isChildActive]);

  return (
    <>
      <Link
        key={index}
        href={item.disabled ? "#" : item.href}
        onClick={() => {
          // if clicked on a parent item, don't close the sidebar
          if (item.children) {
            return;
          }
          setSidebarOpen && setSidebarOpen(false);
        }}
      >
        <span
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            item.href === path || isChildActive ? "bg-accent" : "transparent",
            item.disabled && "cursor-not-allowed opacity-80",
            "flex justify-between items-center"
          )}
        >
          <div className="nav-item--left flex">
            {item.icon && (
              <span className="mr-2">
                <item.icon size={18} />
              </span>
            )}
            <span>{item.label}</span>
          </div>
          <div className="nav-item--right">
            {item.children && (
              <span
                className="ml-auto"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenState((prev) => !prev);
                }}
              >
                {open ? (
                  <ChevronDownIcon
                    className={cn(
                      "transition-transform transform group-hover:rotate-180",
                      item.children && "rotate-180"
                    )}
                    size={18}
                  />
                ) : (
                  <ChevronUpIcon
                    className={cn(
                      "transition-transform transform group-hover:rotate-180",
                      item.children && "rotate-180"
                    )}
                    size={18}
                  />
                )}
              </span>
            )}
          </div>
        </span>
      </Link>

      {open && item.children && (
        <div className="ml-4">
          <Nav items={item.children} setOpen={setSidebarOpen} />
        </div>
      )}
    </>
  );
}
