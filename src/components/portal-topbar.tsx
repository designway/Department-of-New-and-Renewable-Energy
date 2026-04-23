import Link from "next/link";
import { Emblem } from "@/components/emblem";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

  return (
    <header className="border-b bg-background sticky top-0 z-40">
      <div className="h-16 px-4 lg:px-6 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Emblem className="h-9 w-9" />
          <div className="hidden sm:block">
            <div className="text-xs text-muted-foreground leading-none">DNRE Goa</div>
            <div className="text-sm font-semibold leading-tight">Citizen Portal</div>
          </div>
        </Link>

        <div className="ml-auto flex items-center gap-3">
          <button className="relative h-9 w-9 rounded-md hover:bg-accent flex items-center justify-center" aria-label="Notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-destructive" />
          </button>
          <div className="hidden sm:flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">{initials}</AvatarFallback>
            </Avatar>
            <div className="text-sm leading-tight">
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
            </div>
          </div>
          <form action={signOutAction}>
            <Button type="submit" variant="ghost" size="sm">
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">Sign out</span>
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
