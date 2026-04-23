import Link from "next/link";
import { getSession } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/status-badge";
import { applications } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Search, FilePlus, Eye, Download, ArrowRight, FileText } from "lucide-react";

export const metadata = { title: "Applications" };

export default async function ApplicationsPage() {
  const { role, user } = await getSession();
  const scoped =
    role === "applicant" && user ? applications.filter((a) => a.applicantId === user.id) : applications;

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            {role === "applicant" ? "My Applications" : "All Applications"}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {scoped.length} {scoped.length === 1 ? "application" : "applications"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by ID, scheme..." className="pl-9 w-full sm:w-64" />
          </div>
          {role === "applicant" && (
            <Button asChild>
              <Link href="/portal/applications/new">
                <FilePlus className="h-4 w-4" /> New
              </Link>
            </Button>
          )}
          {role === "admin" && (
            <Button variant="outline">
              <Download className="h-4 w-4" /> Export
            </Button>
          )}
        </div>
      </div>

      {role === "applicant" ? (
        scoped.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {scoped.map((a) => {
              const done = a.workflow.filter((w) => w.status === "approved").length;
              const pct = Math.round((done / a.workflow.length) * 100);
              const next = a.workflow.find((w) => w.status === "in_progress" || w.status === "pending")?.stage;
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
                      <div className="text-xs text-muted-foreground mt-1">
                        Submitted {formatDate(a.submittedOn)} • {a.location}
                      </div>
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
        )
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Applications</CardTitle>
            <CardDescription>Click any row to view full details and workflow history.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Scheme</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scoped.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-mono text-xs">{a.id}</TableCell>
                    <TableCell className="max-w-[260px] truncate">{a.schemeName}</TableCell>
                    <TableCell>{a.applicantName}</TableCell>
                    <TableCell className="text-sm">{formatDate(a.submittedOn)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{a.location}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{formatCurrency(a.amount)}</TableCell>
                    <TableCell><StatusBadge status={a.status} /></TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={role === "officer" ? `/portal/review/${a.id}` : `/portal/applications/${a.id}`}>
                          <Eye className="h-4 w-4" /> View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </>
  );
}

function EmptyState() {
  return (
    <div className="rounded-xl border border-dashed bg-card p-12 text-center">
      <div className="h-14 w-14 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
        <FileText className="h-6 w-6" />
      </div>
      <div className="text-lg font-semibold mb-1">No applications yet</div>
      <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">
        Start your first application and track everything here — from submission to disbursement.
      </p>
      <Button asChild>
        <Link href="/portal/applications/new">
          Apply for a subsidy <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
