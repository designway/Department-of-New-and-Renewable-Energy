import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { applications, schemes, statsForRole } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  FileText,
  CheckCircle2,
  Clock,
  IndianRupee,
  Inbox,
  AlertTriangle,
  Users,
  Activity,
  ArrowRight,
  Sun,
  Wind,
  Leaf,
  BatteryCharging,
  Lightbulb,
  Sparkles,
  ShieldCheck,
  HeadphonesIcon,
  FileCheck,
} from "lucide-react";

export const metadata = { title: "Home" };

const categoryIcon: Record<string, React.ReactNode> = {
  Solar: <Sun className="h-6 w-6" />,
  Wind: <Wind className="h-6 w-6" />,
  Biogas: <Leaf className="h-6 w-6" />,
  EV: <BatteryCharging className="h-6 w-6" />,
  "Energy Efficiency": <Lightbulb className="h-6 w-6" />,
};

export default async function DashboardPage() {
  const { role, user } = await getSession();
  if (!role || !user) redirect("/portal");

  if (role === "applicant") return <ApplicantHome userId={user.id} name={user.name} />;

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {role === "officer" && "Applications awaiting your review and action."}
            {role === "admin" && "Department-wide performance and utilisation."}
          </p>
        </div>
      </div>

      {role === "officer" && <OfficerDashboard />}
      {role === "admin" && <AdminDashboard />}
    </>
  );
}

function ApplicantHome({ userId, name }: { userId: string; name: string }) {
  const mine = applications.filter((a) => a.applicantId === userId);
  const active = mine.filter((a) => !["Disbursed", "Rejected"].includes(a.status));
  const completed = mine.filter((a) => ["Disbursed", "Sanctioned"].includes(a.status));
  const featured = schemes.filter((s) => s.status === "Active").slice(0, 3);

  const progressOf = (a: (typeof applications)[number]) => {
    const done = a.workflow.filter((w) => w.status === "approved").length;
    return Math.round((done / a.workflow.length) * 100);
  };
  const nextStage = (a: (typeof applications)[number]) =>
    a.workflow.find((w) => w.status === "in_progress" || w.status === "pending")?.stage;

  return (
    <>
      {/* Hero */}
      <section className="rounded-2xl gov-gradient text-white p-8 md:p-10 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.25) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15) 0%, transparent 40%)",
            }}
          />
        </div>
        <div className="relative max-w-2xl">
          <Badge variant="warning" className="bg-saffron text-white border-0 mb-3">
            Citizen Portal
          </Badge>
          <h1 className="text-2xl md:text-4xl font-semibold leading-tight mb-3">
            Namaskar, {name.split(" ")[0]} — ready to go solar?
          </h1>
          <p className="text-white/85 text-sm md:text-base mb-6">
            Apply for renewable energy subsidies, track your application in real time, and receive
            your benefit directly to your bank account.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="saffron">
              <Link href="/portal/applications/new">
                Apply for a subsidy <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:text-white"
            >
              <Link href="/portal/applications">View my applications</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Active applications */}
      {active.length > 0 && (
        <section className="mb-10">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Your active applications</h2>
              <p className="text-muted-foreground text-sm mt-1">
                {active.length} in progress — click any card for full details.
              </p>
            </div>
            <Button asChild variant="link" size="sm">
              <Link href="/portal/applications">See all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {active.slice(0, 4).map((a) => {
              const pct = progressOf(a);
              const next = nextStage(a);
              return (
                <Link
                  key={a.id}
                  href={`/portal/applications/${a.id}`}
                  className="group rounded-xl border bg-card p-5 hover:shadow-md hover:border-primary/40 transition"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <div className="text-xs text-muted-foreground font-mono mb-1">{a.id}</div>
                      <div className="font-semibold leading-tight line-clamp-2">{a.schemeName}</div>
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>Progress</span>
                      <span className="tabular-nums">{pct}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="text-muted-foreground">
                      {next ? (
                        <>Next: <span className="text-foreground font-medium">{next}</span></>
                      ) : (
                        "Complete"
                      )}
                    </div>
                    <div className="font-semibold tabular-nums">{formatCurrency(a.amount)}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* Apply CTA / scheme tiles */}
      <section className="mb-10">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold tracking-tight">Apply for a subsidy</h2>
            <p className="text-muted-foreground text-sm mt-1">
              Pick a scheme to start a new application — it takes about 5 minutes.
            </p>
          </div>
          <Button asChild variant="link" size="sm">
            <Link href="/schemes">Browse all schemes <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {featured.map((s) => (
            <Link
              key={s.id}
              href={`/portal/applications/new?scheme=${s.slug}`}
              className="group rounded-xl border bg-card p-5 hover:shadow-md hover:border-primary/40 transition flex flex-col"
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                {categoryIcon[s.category]}
              </div>
              <div className="font-semibold leading-snug mb-1.5">{s.shortName}</div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{s.description}</p>
              <div className="mt-auto pt-4 border-t flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-muted-foreground uppercase tracking-wide">Up to</div>
                  <div className="text-base font-semibold text-primary">
                    {s.maxSubsidy > 0 ? formatCurrency(s.maxSubsidy) : "Special rate"}
                  </div>
                </div>
                <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Completed + help */}
      <section className="grid lg:grid-cols-3 gap-6">
        {completed.length > 0 && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-base">Subsidies you&apos;ve received</CardTitle>
              <CardDescription>
                {formatCurrency(completed.reduce((s, a) => s + a.amount, 0))} credited to your bank account so far.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {completed.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-4">
                    <div className="min-w-0 flex items-start gap-3">
                      <div className="h-9 w-9 rounded-md bg-emerald/10 text-emerald flex items-center justify-center shrink-0">
                        <IndianRupee className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium truncate">{a.schemeName}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {a.sanctionNo ?? a.id} • {formatDate(a.submittedOn)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-semibold tabular-nums">{formatCurrency(a.amount)}</div>
                      <Badge variant="success" className="text-[10px] mt-0.5">{a.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className={completed.length === 0 ? "lg:col-span-3" : ""}>
          <CardHeader>
            <CardTitle className="text-base">Things to keep handy</CardTitle>
            <CardDescription>Documents typically asked during an application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { icon: <ShieldCheck className="h-4 w-4" />, t: "Aadhaar + PAN" },
              { icon: <FileCheck className="h-4 w-4" />, t: "Recent electricity bill" },
              { icon: <FileText className="h-4 w-4" />, t: "Property ownership proof" },
              { icon: <Sparkles className="h-4 w-4" />, t: "Bank passbook for DBT" },
            ].map((x) => (
              <div key={x.t} className="flex items-center gap-3 text-sm">
                <div className="h-8 w-8 rounded-md bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                  {x.icon}
                </div>
                <div className="font-medium">{x.t}</div>
              </div>
            ))}
            <Button asChild variant="outline" size="sm" className="w-full mt-2">
              <Link href="/faqs">
                <HeadphonesIcon className="h-4 w-4" /> Need help? Read FAQs
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </>
  );
}

function OfficerDashboard() {
  const s = statsForRole("officer") as any;
  const queue = applications.filter((a) =>
    ["Submitted", "Under Verification", "Scrutiny"].includes(a.status)
  );

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="In queue" value={s.queue} icon={<Inbox className="h-5 w-5" />} />
        <StatCard label="Processed today" value={s.approvedToday} icon={<CheckCircle2 className="h-5 w-5" />} />
        <StatCard label="Flagged" value={s.flagged} icon={<AlertTriangle className="h-5 w-5" />} />
        <StatCard label="SLA overdue" value={s.overdue} icon={<Clock className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Pending review</CardTitle>
          <CardDescription>Applications currently in verification or scrutiny.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {queue.map((a) => (
              <Link
                key={a.id}
                href={`/portal/review/${a.id}`}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition"
              >
                <div className="min-w-0">
                  <div className="font-medium truncate">{a.applicantName} — {a.schemeName}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {a.id} • Submitted {formatDate(a.submittedOn)} • {a.location}
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-sm font-semibold tabular-nums">{formatCurrency(a.amount)}</div>
                  <StatusBadge status={a.status} />
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

function AdminDashboard() {
  const s = statsForRole("admin") as any;

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total applications" value={s.totalApplications} icon={<FileText className="h-5 w-5" />} />
        <StatCard label="Active schemes" value={s.activeSchemes} icon={<Activity className="h-5 w-5" />} />
        <StatCard label="Disbursed" value={formatCurrency(s.totalDisbursed)} icon={<IndianRupee className="h-5 w-5" />} />
        <StatCard label="Beneficiaries" value={s.beneficiaries.toLocaleString("en-IN")} icon={<Users className="h-5 w-5" />} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Scheme performance</CardTitle>
            <CardDescription>Fund utilisation by scheme (FY 2025-26)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {schemes.filter((s) => s.status === "Active").map((sch) => {
                const pct = Math.min(100, Math.round((sch.totalDisbursed / (sch.maxSubsidy * (sch.beneficiaries + 50))) * 100));
                return (
                  <div key={sch.id}>
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <div className="font-medium truncate pr-2">{sch.shortName}</div>
                      <div className="text-muted-foreground tabular-nums">
                        {formatCurrency(sch.totalDisbursed)}
                      </div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
                      <span>{sch.beneficiaries.toLocaleString("en-IN")} beneficiaries</span>
                      <span>{pct}% utilised</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent sanctions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {applications
              .filter((a) => a.status === "Sanctioned" || a.status === "Disbursed")
              .map((a) => (
                <div key={a.id} className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-medium line-clamp-1">{a.applicantName}</div>
                    <div className="text-xs text-muted-foreground">{a.sanctionNo}</div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold tabular-nums">{formatCurrency(a.amount)}</div>
                    <Badge variant="success" className="text-[10px] mt-0.5">{a.status}</Badge>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
