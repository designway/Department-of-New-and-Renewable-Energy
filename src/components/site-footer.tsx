import Link from "next/link";
import { Emblem } from "@/components/emblem";
import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t bg-muted/40">
      <div className="h-1 gov-stripe" />
      <div className="container py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-3">
            <Emblem className="h-10 w-10" />
            <div>
              <div className="text-sm font-semibold">DNRE Goa</div>
              <div className="text-xs text-muted-foreground">Government of Goa</div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Promoting clean and sustainable energy solutions across the state of Goa
            through innovative schemes, subsidies, and policy interventions.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link href="/schemes" className="hover:text-foreground">Schemes</Link></li>
            <li><Link href="/notifications" className="hover:text-foreground">Notifications</Link></li>
            <li><Link href="/faqs" className="hover:text-foreground">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Policies</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-foreground">Accessibility (GIGW)</a></li>
            <li><a href="#" className="hover:text-foreground">RTI</a></li>
            <li><a href="#" className="hover:text-foreground">Sitemap</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>5th Floor, GIDC Building, Next to Passport Office, Patto, Panaji — Goa 403001</span>
            </li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0" /> 0832-2419420</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0" /> helpdesk@dnre.goa.gov.in</li>
          </ul>
        </div>
      </div>

      <div className="border-t">
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Department of New and Renewable Energy, Government of Goa. All rights reserved.</div>
          <div>Last updated: {new Date().toLocaleDateString("en-IN")} | Visitors: 1,24,857</div>
        </div>
      </div>
    </footer>
  );
}
