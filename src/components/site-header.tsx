import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Emblem } from "@/components/emblem";
import { HeaderLeaders } from "@/components/header-leaders";
import { Menu, Search, UserCircle } from "lucide-react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/schemes", label: "Schemes" },
  { href: "/notifications", label: "Notifications" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-20 items-center gap-4">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <Emblem className="h-12 w-12 shrink-0" />
          <div className="hidden sm:block min-w-0">
            <div className="text-xs leading-tight text-muted-foreground">Government of Goa</div>
            <div className="text-base font-semibold leading-tight truncate">
              Department of New and Renewable Energy
            </div>
            <div className="text-xs leading-tight text-muted-foreground">
              नवीन एवं नवीकरणीय ऊर्जा विभाग
            </div>
          </div>
          <div className="sm:hidden text-sm font-semibold">DNRE Goa</div>
        </Link>

        <HeaderLeaders className="ml-auto" />

        <button className="md:hidden ml-auto h-9 w-9 flex items-center justify-center rounded-md hover:bg-accent" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
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
