import Link from "next/link";
import { getSession } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { applications } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Download, Award, IndianRupee } from "lucide-react";
import { StatCard } from "@/components/stat-card";

export const metadata = { title: "Sanctions & Disbursement" };

export default async function SanctionsPage() {
  const { role, user } = await getSession();
  const sanctioned = applications.filter((a) => a.sanctionNo);
  const scoped = role === "applicant" && user ? sanctioned.filter((a) => a.applicantId === user.id) : sanctioned;

  const disbursed = scoped.filter((a) => a.status === "Disbursed");
  const totalAmount = scoped.reduce((s, a) => s + a.amount, 0);

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Sanctions & Disbursement</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Sanction orders issued and subsidy disbursement status via DBT / PFMS.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total sanctions" value={scoped.length} icon={<Award className="h-5 w-5" />} />
        <StatCard label="Disbursed" value={disbursed.length} icon={<IndianRupee className="h-5 w-5" />} />
        <StatCard label="Total value" value={formatCurrency(totalAmount)} icon={<IndianRupee className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Sanction Orders</CardTitle>
          <CardDescription>Click to download the official sanction PDF.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sanction No.</TableHead>
                <TableHead>Application</TableHead>
                <TableHead>Beneficiary</TableHead>
                <TableHead>Scheme</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">PDF</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scoped.map((a) => {
                const issuedDate = a.workflow.find((w) => w.stage === "Sanction")?.date;
                return (
                  <TableRow key={a.id}>
                    <TableCell className="font-mono text-xs">{a.sanctionNo}</TableCell>
                    <TableCell>
                      <Link href={`/portal/applications/${a.id}`} className="hover:underline font-mono text-xs">
                        {a.id}
                      </Link>
                    </TableCell>
                    <TableCell>{a.applicantName}</TableCell>
                    <TableCell className="max-w-[220px] truncate">{a.schemeName}</TableCell>
                    <TableCell className="text-sm">{issuedDate ? formatDate(issuedDate) : "—"}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{formatCurrency(a.amount)}</TableCell>
                    <TableCell>
                      <Badge variant={a.status === "Disbursed" ? "success" : "warning"}>
                        {a.status === "Disbursed" ? "Disbursed" : "Sanction issued"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
