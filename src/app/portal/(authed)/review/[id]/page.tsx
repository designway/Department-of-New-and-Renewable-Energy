"use client";
import Link from "next/link";
import { useState, use } from "react";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StatusBadge } from "@/components/status-badge";
import { getApplication } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  Circle,
  Download,
  FileText,
  MapPin,
  User as UserIcon,
  Zap,
  ShieldCheck,
  CheckSquare,
  Square,
} from "lucide-react";

const stepIcon = {
  approved: <CheckCircle2 className="h-5 w-5 text-emerald" />,
  rejected: <XCircle className="h-5 w-5 text-destructive" />,
  in_progress: <Loader2 className="h-5 w-5 text-saffron" />,
  pending: <Circle className="h-5 w-5 text-muted-foreground" />,
};

export default function ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const app = getApplication(id);
  if (!app) notFound();

  const [docsChecked, setDocsChecked] = useState<Record<string, boolean>>(
    Object.fromEntries(app.documents.map((d) => [d.name, d.verified]))
  );
  const [remarks, setRemarks] = useState("");
  const [decision, setDecision] = useState<"approve" | "reject" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const allVerified = Object.values(docsChecked).every(Boolean);

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="p-10">
            <div className="h-16 w-16 mx-auto rounded-full bg-emerald/10 text-emerald flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Decision recorded</h2>
            <p className="text-muted-foreground mb-6">
              {app.id} has been marked {decision === "approve" ? "recommended for approval" : "rejected"}. The applicant will be notified.
            </p>
            <div className="flex justify-center gap-2">
              <Button asChild variant="outline"><Link href="/portal/review">Back to queue</Link></Button>
              <Button asChild><Link href="/portal/dashboard">Dashboard</Link></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <div className="text-xs text-muted-foreground mb-2">
          <Link href="/portal/review" className="hover:underline">Review queue</Link> / {app.id}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs text-muted-foreground">{app.id}</span>
              <StatusBadge status={app.status} />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">{app.schemeName}</h1>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground uppercase">Subsidy claimed</div>
            <div className="text-2xl font-semibold text-primary tabular-nums">{formatCurrency(app.amount)}</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Applicant & installation</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <Field icon={<UserIcon className="h-4 w-4" />} label="Applicant" value={app.applicantName} />
                <Field label="Submitted on" value={formatDate(app.submittedOn)} />
                <Field icon={<MapPin className="h-4 w-4" />} label="Location" value={app.location} />
                {app.capacity && <Field icon={<Zap className="h-4 w-4" />} label="Capacity" value={app.capacity} />}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Document verification</CardTitle>
              <CardDescription>Tick each document after visual and record verification.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {app.documents.map((d) => {
                const checked = docsChecked[d.name];
                return (
                  <div
                    key={d.name}
                    className="flex items-center justify-between p-3 rounded-md border bg-muted/20"
                  >
                    <button
                      onClick={() => setDocsChecked((p) => ({ ...p, [d.name]: !p[d.name] }))}
                      className="flex items-center gap-3 min-w-0 flex-1 text-left"
                    >
                      {checked ? (
                        <CheckSquare className="h-5 w-5 text-emerald shrink-0" />
                      ) : (
                        <Square className="h-5 w-5 text-muted-foreground shrink-0" />
                      )}
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-sm font-medium">{d.name}</span>
                      {checked && (
                        <Badge variant="success" className="text-[10px]">
                          <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                        </Badge>
                      )}
                    </button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
              {!allVerified && (
                <div className="text-xs text-muted-foreground pt-1">
                  Verify all documents before recommending approval.
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Officer decision</CardTitle>
              <CardDescription>Provide remarks and choose an action.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  placeholder="Note any observations, discrepancies, or reasons..."
                  rows={4}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => { setDecision("approve"); setSubmitted(true); }}
                  disabled={!allVerified}
                  className="bg-emerald hover:bg-emerald/90 text-white"
                >
                  <CheckCircle2 className="h-4 w-4" /> Recommend Approval
                </Button>
                <Button
                  onClick={() => { setDecision("reject"); setSubmitted(true); }}
                  variant="destructive"
                >
                  <XCircle className="h-4 w-4" /> Reject
                </Button>
                <Button variant="outline">Request clarification</Button>
                <Button variant="ghost">Save & continue later</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <aside>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Workflow</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-5">
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

function Field({ icon, label, value }: { icon?: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground uppercase">{label}</dt>
      <dd className="font-medium flex items-center gap-2 mt-1">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        {value}
      </dd>
    </div>
  );
}
