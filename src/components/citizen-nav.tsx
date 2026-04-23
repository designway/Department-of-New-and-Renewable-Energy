"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, FileText, Sparkles, Award } from "lucide-react";

const items = [
  { href: "/portal/dashboard", label: "Home", icon: <Home className="h-4 w-4" /> },
  { href: "/portal/applications", label: "My Applications", icon: <FileText className="h-4 w-4" /> },
  { href: "/portal/applications/new", label: "Apply for Subsidy", icon: <Sparkles className="h-4 w-4" /> },
  { href: "/portal/sanctions", label: "Sanctions", icon: <Award className="h-4 w-4" /> },
];

export function CitizenNav() {
  const pathname = usePathname();
  return (
    <nav className="border-b bg-background/80 backdrop-blur sticky top-16 z-30">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 flex items-center gap-1 overflow-x-auto h-12">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-4 h-full text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                active
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
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
