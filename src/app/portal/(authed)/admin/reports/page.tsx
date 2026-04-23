import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/stat-card";
import { applications, schemes } from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";
import { Download, FileBarChart, TrendingUp, Users, IndianRupee, MapPin } from "lucide-react";

export const metadata = { title: "MIS & Reports" };

export default function ReportsPage() {
  const totalDisbursed = schemes.reduce((s, x) => s + x.totalDisbursed, 0);
  const totalBeneficiaries = schemes.reduce((s, x) => s + x.beneficiaries, 0);
  const approvalRate = Math.round(
    (applications.filter((a) => ["Sanctioned", "Disbursed"].includes(a.status)).length / applications.length) * 100
  );

  const byCategory = schemes.reduce<Record<string, { disbursed: number; beneficiaries: number }>>((acc, s) => {
    acc[s.category] = acc[s.category] || { disbursed: 0, beneficiaries: 0 };
    acc[s.category].disbursed += s.totalDisbursed;
    acc[s.category].beneficiaries += s.beneficiaries;
    return acc;
  }, {});

  const byStatus = applications.reduce<Record<string, number>>((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {});

  const statusColor: Record<string, string> = {
    Submitted: "bg-blue-500",
    "Under Verification": "bg-saffron",
    Scrutiny: "bg-saffron/70",
    Approved: "bg-emerald",
    Rejected: "bg-destructive",
    Sanctioned: "bg-emerald/80",
    Disbursed: "bg-emerald",
    Draft: "bg-muted-foreground",
  };

  const reports = [
    { name: "Scheme-wise fund utilisation (FY 2025-26)", type: "Finance", size: "1.2 MB" },
    { name: "Beneficiary master — district-wise", type: "Beneficiary", size: "3.4 MB" },
    { name: "Pending applications > 15 days", type: "SLA", size: "420 KB" },
    { name: "DBT reconciliation with PFMS", type: "Finance", size: "890 KB" },
    { name: "Quarterly performance — Q4 FY25-26", type: "Performance", size: "2.1 MB" },
    { name: "Vendor empanelment register", type: "Master", size: "650 KB" },
  ];

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">MIS & Reports</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Real-time analytics on scheme performance, beneficiaries, and fund utilisation.
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4" /> Export all
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total disbursed" value={formatCurrency(totalDisbursed)} icon={<IndianRupee className="h-5 w-5" />} trend={{ value: "+12% vs last FY", positive: true }} />
        <StatCard label="Beneficiaries" value={totalBeneficiaries.toLocaleString("en-IN")} icon={<Users className="h-5 w-5" />} trend={{ value: "+284 this quarter", positive: true }} />
        <StatCard label="Approval rate" value={`${approvalRate}%`} icon={<TrendingUp className="h-5 w-5" />} trend={{ value: "+3% vs last quarter", positive: true }} />
        <StatCard label="Active schemes" value={schemes.filter((s) => s.status === "Active").length} icon={<FileBarChart className="h-5 w-5" />} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">By category</CardTitle>
            <CardDescription>Disbursement distribution across scheme categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(byCategory).map(([cat, data]) => {
                const pct = Math.round((data.disbursed / totalDisbursed) * 100);
                return (
                  <div key={cat}>
                    <div className="flex items-center justify-between mb-1 text-sm">
                      <div className="font-medium">{cat}</div>
                      <div className="text-muted-foreground tabular-nums">{formatCurrency(data.disbursed)} • {pct}%</div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {data.beneficiaries.toLocaleString("en-IN")} beneficiaries
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Applications by status</CardTitle>
            <CardDescription>Current pipeline distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(byStatus).map(([status, count]) => {
                const pct = Math.round((count / applications.length) * 100);
                return (
                  <div key={status} className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-sm ${statusColor[status] || "bg-muted"}`} />
                    <div className="flex-1 flex items-center justify-between text-sm">
                      <span className="font-medium">{status}</span>
                      <span className="text-muted-foreground tabular-nums">{count} • {pct}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> Coverage: North Goa 58% • South Goa 42%
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Standard reports</CardTitle>
          <CardDescription>Pre-configured reports available for download.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {reports.map((r) => (
              <div key={r.name} className="flex items-center justify-between p-4 hover:bg-muted/50 transition">
                <div className="flex items-center gap-3 min-w-0">
                  <FileBarChart className="h-5 w-5 text-muted-foreground shrink-0" />
                  <div className="min-w-0">
                    <div className="font-medium truncate">{r.name}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className="text-[10px]">{r.type}</Badge>
                      <span className="text-xs text-muted-foreground">{r.size}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" /> XLSX
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
