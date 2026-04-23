"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { type Role } from "@/lib/mock-data";
import { portalNavs } from "@/lib/portal-navs";

export function PortalNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = portalNavs[role];

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-16 md:top-20 z-30">
      <div className="container flex h-11 items-center gap-1 text-sm overflow-x-auto">
        {items.map((item) => {
          const base = item.href.split("?")[0];
          const active =
            pathname === base || (base !== "/portal/dashboard" && pathname.startsWith(base + "/"));
          return (
            <Link
              key={`${item.label}-${item.href}`}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-md font-medium whitespace-nowrap transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
