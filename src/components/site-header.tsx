import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Emblem } from "@/components/emblem";
import { HeaderLeaders } from "@/components/header-leaders";
import { MobileNavDrawer } from "@/components/mobile-nav-drawer";
import { Search, UserCircle, Home, Info, FileText, Bell, HelpCircle, Mail, LogIn, Sparkles } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/schemes", label: "Schemes" },
  { href: "/notifications", label: "Notifications" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

const mobileNav = [
  { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
  { href: "/about", label: "About", icon: <Info className="h-4 w-4" /> },
  { href: "/schemes", label: "Schemes", icon: <FileText className="h-4 w-4" /> },
  { href: "/notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
  { href: "/faqs", label: "FAQs", icon: <HelpCircle className="h-4 w-4" /> },
  { href: "/contact", label: "Contact", icon: <Mail className="h-4 w-4" /> },
  { href: "/portal", label: "Citizen Login", icon: <LogIn className="h-4 w-4" /> },
  { href: "/schemes", label: "Apply Now", icon: <Sparkles className="h-4 w-4" /> },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 md:h-20 items-center gap-3 md:gap-4">
        <Link href="/" className="flex items-center gap-2 md:gap-3 min-w-0">
          <Emblem className="h-10 w-10 md:h-12 md:w-12 shrink-0" />
          <div className="min-w-0 leading-tight">
            <div className="text-[10px] md:text-xs text-muted-foreground">Government of Goa</div>
            <div className="text-[13px] sm:text-sm md:text-base font-semibold">
              Department of New and Renewable Energy
            </div>
            <div className="text-[10px] md:text-xs text-muted-foreground hidden md:block">
              नवीन एवं नवीकरणीय ऊर्जा विभाग
            </div>
          </div>
        </Link>

        <HeaderLeaders className="ml-auto" />

        <div className="ml-auto md:hidden">
          <MobileNavDrawer items={mobileNav} title="DNRE Goa" />
        </div>
      </div>

      <nav className="border-t hidden md:block">
        <div className="container flex h-11 items-center gap-1 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground font-medium"
            >
              {item.label}
            </Link>
          ))}

          <div className="ml-auto flex items-center gap-2">
            <button className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-accent" aria-label="Search">
              <Search className="h-4 w-4" />
            </button>
            <Button asChild variant="outline" size="sm">
              <Link href="/portal">
                <UserCircle className="h-4 w-4" />
                Citizen Login
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/schemes">Apply Now</Link>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
