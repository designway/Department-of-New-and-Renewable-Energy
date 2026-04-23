import Link from "next/link";
import {
  ArrowRight,
  Sun,
  Wind,
  Leaf,
  Zap,
  BatteryCharging,
  Lightbulb,
  FileText,
  ShieldCheck,
  BarChart3,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeroAnimations } from "@/components/hero-animations";
import { schemes, notifications } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

const categoryIcon: Record<string, React.ReactNode> = {
  Solar: <Sun className="h-5 w-5" />,
  Wind: <Wind className="h-5 w-5" />,
  Biogas: <Leaf className="h-5 w-5" />,
  EV: <BatteryCharging className="h-5 w-5" />,
  "Energy Efficiency": <Lightbulb className="h-5 w-5" />,
};

export default function Home() {
  const featured = schemes.filter((s) => s.status === "Active").slice(0, 4);
  const latestNews = notifications.slice(0, 4);

  const stats = {
    schemes: schemes.filter((s) => s.status === "Active").length,
    beneficiaries: schemes.reduce((s, x) => s + x.beneficiaries, 0),
    disbursed: schemes.reduce((s, x) => s + x.totalDisbursed, 0),
    capacity: "150+ MW",
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden gov-gradient text-white">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <HeroAnimations />
        <div className="container relative py-12 md:py-16 xl:py-20">
          <div className="max-w-3xl">
            <Badge variant="warning" className="bg-saffron text-white border-0 mb-4">
              Integrated Web Portal • EOI 2026
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
              Powering Goa&apos;s clean energy future — one application at a time.
            </h1>
            <p className="text-base md:text-lg text-white/90 mb-6 max-w-2xl">
              A single-window platform for citizens, institutions, and officers to
              access renewable energy schemes, apply for subsidies, and track
              disbursements transparently.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="saffron">
                <Link href="/schemes">
                  Browse Schemes <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white">
                <Link href="/portal">Apply for Subsidy</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b">
        <div className="container py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Active Schemes", value: stats.schemes, icon: <FileText className="h-5 w-5" /> },
              { label: "Beneficiaries", value: stats.beneficiaries.toLocaleString("en-IN"), icon: <ShieldCheck className="h-5 w-5" /> },
              { label: "Subsidy Disbursed", value: formatCurrency(stats.disbursed), icon: <Zap className="h-5 w-5" /> },
              { label: "RE Capacity Installed", value: stats.capacity, icon: <BarChart3 className="h-5 w-5" /> },
            ].map((s) => (
              <div key={s.label} className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</div>
                  <div className="text-2xl font-semibold tabular-nums">{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured schemes */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Flagship Schemes</h2>
            <p className="text-muted-foreground mt-1">Curated renewable-energy programs open for applications.</p>
          </div>
          <Button asChild variant="link">
            <Link href="/schemes">View all <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((scheme) => (
            <Card key={scheme.id} className="flex flex-col hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                    {categoryIcon[scheme.category]}
                  </div>
                  <Badge variant="secondary">{scheme.category}</Badge>
                </div>
                <CardTitle className="text-base leading-snug">{scheme.name}</CardTitle>
                <CardDescription className="line-clamp-2">{scheme.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="text-xs text-muted-foreground mb-1">Maximum Subsidy</div>
                <div className="text-lg font-semibold text-primary mb-3">
                  {scheme.maxSubsidy > 0 ? formatCurrency(scheme.maxSubsidy) : "Discounted rates"}
                </div>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/schemes/${scheme.slug}`}>Learn more & apply</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Notifications + How it works */}
      <section className="bg-muted/40 border-y">
        <div className="container py-16 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">Latest Notifications</h2>
                <p className="text-muted-foreground text-sm mt-1">Circulars, tenders, and announcements.</p>
              </div>
              <Button asChild variant="link" size="sm">
                <Link href="/notifications">See all</Link>
              </Button>
            </div>
            <div className="space-y-3">
              {latestNews.map((n) => (
                <Card key={n.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="hidden sm:block text-center w-14 shrink-0 pt-1">
                      <div className="text-xs text-muted-foreground">
                        {new Date(n.date).toLocaleDateString("en-IN", { month: "short" }).toUpperCase()}
                      </div>
                      <div className="text-xl font-semibold tabular-nums leading-none">
                        {new Date(n.date).getDate()}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-[10px]">{n.type}</Badge>
                        <span className="text-xs text-muted-foreground sm:hidden">{formatDate(n.date)}</span>
                      </div>
                      <div className="font-medium leading-snug mb-1">{n.title}</div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{n.summary}</p>
                    </div>
                    {n.fileSize && (
                      <button className="shrink-0 h-9 w-9 rounded-md hover:bg-accent flex items-center justify-center" aria-label="Download">
                        <Download className="h-4 w-4" />
                      </button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold tracking-tight mb-6">How to Apply</h2>
            <ol className="space-y-5">
              {[
                { n: "1", t: "Choose a scheme", d: "Browse schemes and review eligibility and required documents." },
                { n: "2", t: "Register / log in", d: "Use Aadhaar or email to log in to the citizen portal." },
                { n: "3", t: "Submit application", d: "Fill the form, upload documents, and submit online." },
                { n: "4", t: "Track & receive", d: "Track status in real time. Subsidy is disbursed via DBT on sanction." },
              ].map((s) => (
                <li key={s.n} className="flex gap-4">
                  <div className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold shrink-0">
                    {s.n}
                  </div>
                  <div>
                    <div className="font-medium">{s.t}</div>
                    <div className="text-sm text-muted-foreground">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="rounded-xl border bg-card p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-2">Ready to switch to renewable energy?</h3>
            <p className="text-muted-foreground">
              Apply online in minutes. Track every step. Receive subsidy directly to your bank account.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild size="lg">
              <Link href="/portal">Go to Portal</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get Help</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
