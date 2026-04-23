import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { SiteTopbar } from "@/components/site-topbar";
import { PortalTopbar } from "@/components/portal-topbar";
import { PortalNav } from "@/components/portal-nav";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const { role, user } = await getSession();
  if (!role || !user) redirect("/portal");

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <SiteTopbar />
      <PortalTopbar user={user} />
      <PortalNav role={role} />
      <main className="flex-1 min-w-0 animate-fade-in">
        <div className="container py-6 md:py-8 lg:py-10">{children}</div>
      </main>
    </div>
  );
}
