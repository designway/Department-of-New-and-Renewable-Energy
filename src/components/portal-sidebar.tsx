"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { type Role } from "@/lib/mock-data";
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  Inbox,
  CheckSquare,
  ClipboardList,
  Users,
  Settings,
  BarChart3,
  Award,
} from "lucide-react";

type NavItem = { href: string; label: string; icon: React.ReactNode };

const navs: Record<Role, NavItem[]> = {
  applicant: [
    { href: "/portal/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: "/portal/applications", label: "My Applications", icon: <FileText className="h-4 w-4" /> },
    { href: "/portal/applications/new", label: "New Application", icon: <FilePlus className="h-4 w-4" /> },
    { href: "/portal/sanctions", label: "Sanctions", icon: <Award className="h-4 w-4" /> },
  ],
  officer: [
    { href: "/portal/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: "/portal/review", label: "Review Queue", icon: <Inbox className="h-4 w-4" /> },
    { href: "/portal/review?filter=verified", label: "Verified", icon: <CheckSquare className="h-4 w-4" /> },
    { href: "/portal/applications", label: "All Applications", icon: <ClipboardList className="h-4 w-4" /> },
  ],
  admin: [
    { href: "/portal/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: "/portal/admin/schemes", label: "Schemes", icon: <FileText className="h-4 w-4" /> },
    { href: "/portal/admin/users", label: "Users", icon: <Users className="h-4 w-4" /> },
    { href: "/portal/applications", label: "Applications", icon: <ClipboardList className="h-4 w-4" /> },
    { href: "/portal/admin/reports", label: "MIS & Reports", icon: <BarChart3 className="h-4 w-4" /> },
    { href: "/portal/sanctions", label: "Sanctions", icon: <Award className="h-4 w-4" /> },
    { href: "/portal/admin/settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
  ],
};

export function PortalSidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = navs[role];

  return (
    <aside className="hidden md:flex md:w-60 lg:w-64 shrink-0 border-r bg-card flex-col">
      <div className="p-4 border-b">
        <div className="text-xs text-muted-foreground uppercase tracking-wide">Signed in as</div>
        <div className="text-sm font-semibold capitalize">{role}</div>
      </div>
      <nav className="p-3 space-y-1 flex-1">
        {items.map((item) => {
          const active = pathname === item.href.split("?")[0] || pathname.startsWith(item.href.split("?")[0] + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent hover:text-accent-foreground text-muted-foreground"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3 border-t text-xs text-muted-foreground">
        v0.1.0 • Demo prototype
      </div>
    </aside>
  );
}
