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

export type PortalNavItem = { href: string; label: string; icon: React.ReactNode };

export const portalNavs: Record<Role, PortalNavItem[]> = {
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
