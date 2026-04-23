import Link from "next/link";
import { Emblem } from "@/components/emblem";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MobileNavDrawer } from "@/components/mobile-nav-drawer";
import { portalNavs } from "@/lib/portal-navs";
import { Bell, LogOut } from "lucide-react";
import { type User } from "@/lib/mock-data";
import { signOutAction } from "@/app/portal/actions";

export function PortalTopbar({ user }: { user: User }) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const mobileItems = portalNavs[user.role];
  const portalLabel = user.role === "applicant" ? "Citizen Portal" : "Department Portal";

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 md:h-20 items-center gap-3 md:gap-4">
        <Link href="/" className="flex items-center gap-2 md:gap-3 min-w-0">
          <Emblem className="h-10 w-10 md:h-12 md:w-12 shrink-0" />
          <div className="min-w-0 leading-tight">
            <div className="text-[10px] md:text-xs text-muted-foreground">Government of Goa</div>
            <div className="text-[13px] sm:text-sm md:text-base font-semibold truncate">
              Department of New and Renewable Energy
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground hidden md:block">{portalLabel}</div>
          </div>
        </Link>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button className="relative h-9 w-9 rounded-md hover:bg-accent flex items-center justify-center" aria-label="Notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-destructive" />
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div className="text-sm leading-tight hidden md:block">
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
            </div>
          </div>
          <Avatar className="h-8 w-8 sm:hidden">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">{initials}</AvatarFallback>
          </Avatar>
          <form action={signOutAction} className="hidden sm:block">
            <Button type="submit" variant="ghost" size="sm" aria-label="Sign out">
              <LogOut className="h-4 w-4" /> <span className="hidden lg:inline">Sign out</span>
            </Button>
          </form>

          <MobileNavDrawer
            items={mobileItems}
            title={portalLabel}
            footer={
              <form action={signOutAction}>
                <Button type="submit" variant="outline" size="sm" className="w-full">
                  <LogOut className="h-4 w-4" /> Sign out
                </Button>
              </form>
            }
          />
        </div>
      </div>
    </header>
  );
}
