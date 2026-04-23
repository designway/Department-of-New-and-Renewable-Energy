import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { getApplication, applications } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  CheckCircle2,
  Circle,
  XCircle,
  Loader2,
  Download,
  ShieldCheck,
  MapPin,
  Zap,
  User as UserIcon,
  FileText,
  Printer,
} from "lucide-react";

export function generateStaticParams() {
  return applications.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return { title: id };
}

const stepIcon = {
  approved: <CheckCircle2 className="h-5 w-5 text-emerald" />,
  rejected: <XCircle className="h-5 w-5 text-destructive" />,
  in_progress: <Loader2 className="h-5 w-5 text-saffron" />,
  pending: <Circle className="h-5 w-5 text-muted-foreground" />,
};

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = getApplication(id);
  if (!app) notFound();

  const completed = app.workflow.filter((w) => w.status === "approved").length;
  const progress = Math.round((completed / app.workflow.length) * 100);

  return (
    <>
      <div className="mb-6">
        <div className="text-xs text-muted-foreground mb-2">
          <Link href="/portal/applications" className="hover:underline">Applications</Link> / {app.id}
        </div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-muted-foreground">{app.id}</span>
              <StatusBadge status={app.status} />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">{app.schemeName}</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4" /> Print
            </Button>
            {app.sanctionNo && (
              <Button size="sm">
                <Download className="h-4 w-4" /> Sanction Order
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Application Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div>
                  <dt className="text-xs text-muted-foreground uppercase">Applicant</dt>
                  <dd className="font-medium flex items-center gap-2 mt-1">
                    <UserIcon className="h-4 w-4 text-muted-foreground" /> {app.applicantName}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground uppercase">Submitted on</dt>
                  <dd className="font-medium mt-1">{formatDate(app.submittedOn)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-muted-foreground uppercase">Location</dt>
                  <dd className="font-medium flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" /> {app.location}
                  </dd>
                </div>
                {app.capacity && (
                  <div>
                    <dt className="text-xs text-muted-foreground uppercase">Capacity / Size</dt>
                    <dd className="font-medium flex items-center gap-2 mt-1">
                      <Zap className="h-4 w-4 text-muted-foreground" /> {app.capacity}
                    </dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs text-muted-foreground uppercase">Subsidy claimed</dt>
                  <dd className="font-semibold text-primary text-lg mt-1">{formatCurrency(app.amount)}</dd>
                </div>
                {app.sanctionNo && (
                  <div>
                    <dt className="text-xs text-muted-foreground uppercase">Sanction no.</dt>
                    <dd className="font-mono text-sm mt-1">{app.sanctionNo}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Documents</CardTitle>
              <CardDescription>Uploaded by applicant — {app.documents.filter((d) => d.verified).length}/{app.documents.length} verified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {app.documents.map((d) => (
                <div key={d.name} className="flex items-center justify-between p-3 rounded-md border">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                    <div className="text-sm font-medium truncate">{d.name}</div>
                    {d.verified ? (
                      <Badge variant="success" className="text-[10px]">
                        <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                      </Badge>
                    ) : (
                      <Badge variant="warning" className="text-[10px]">Pending verification</Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Workflow progress</CardTitle>
              <CardDescription>{progress}% complete</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
                <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
              <ol className="relative space-y-5">
                {app.workflow.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="shrink-0">
                      {stepIcon[step.status]}
                      {i < app.workflow.length - 1 && (
                        <div className="ml-[9px] mt-1 h-6 w-px bg-border" />
                      )}
                    </div>
                    <div className="flex-1 -mt-0.5 pb-1">
                      <div className="text-sm font-medium">{step.stage}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {step.actor}{step.date ? ` • ${formatDate(step.date)}` : ""}
                      </div>
                      {step.remarks && (
                        <div className="text-xs italic text-muted-foreground mt-1">“{step.remarks}”</div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </aside>
      </div>
    </>
  );
}
