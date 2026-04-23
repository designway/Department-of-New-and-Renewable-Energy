import Link from "next/link";
import { Phone, Mail, Accessibility } from "lucide-react";

export function SiteTopbar() {
  return (
    <div className="border-b bg-primary text-primary-foreground text-xs">
      <div className="container flex h-9 items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">भारत सरकार | Government of Goa</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="tel:+918322419420" className="hidden sm:flex items-center gap-1 hover:underline">
            <Phone className="h-3 w-3" /> 0832-2419420
          </a>
          <a href="mailto:helpdesk@dnre.goa.gov.in" className="hidden md:flex items-center gap-1 hover:underline">
            <Mail className="h-3 w-3" /> helpdesk@dnre.goa.gov.in
          </a>
          <div className="flex items-center gap-1">
            <span className="hidden sm:inline">Text size:</span>
            <button className="px-1 hover:underline" aria-label="Decrease text size">A-</button>
            <button className="px-1 hover:underline" aria-label="Default text size">A</button>
            <button className="px-1 hover:underline" aria-label="Increase text size">A+</button>
          </div>
          <Link href="#main" className="flex items-center gap-1 hover:underline" aria-label="Skip to main content">
            <Accessibility className="h-3 w-3" /> Skip to main
          </Link>
        </div>
      </div>
    </div>
  );
}
