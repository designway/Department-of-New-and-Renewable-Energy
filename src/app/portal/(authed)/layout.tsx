import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { PortalSidebar } from "@/components/portal-sidebar";
import { PortalTopbar } from "@/components/portal-topbar";
import { CitizenNav } from "@/components/citizen-nav";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const { role, user } = await getSession();
  if (!role || !user) redirect("/portal");

  if (role === "applicant") {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <PortalTopbar user={user} />
        <CitizenNav />
        <main className="flex-1 min-w-0 animate-fade-in">
          <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 md:py-10">{children}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <PortalTopbar user={user} />
      <div className="flex flex-1">
        <PortalSidebar role={role} />
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 animate-fade-in">{children}</main>
      </div>
    </div>
  );
}
