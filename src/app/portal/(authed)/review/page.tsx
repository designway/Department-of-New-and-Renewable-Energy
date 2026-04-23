import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { applications } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Search, Eye, AlertTriangle } from "lucide-react";

export const metadata = { title: "Review Queue" };

export default function ReviewQueuePage() {
  const toVerify = applications.filter((a) => a.status === "Submitted" || a.status === "Under Verification");
  const toScrutinize = applications.filter((a) => a.status === "Scrutiny");
  const decided = applications.filter((a) => ["Approved", "Rejected", "Sanctioned", "Disbursed"].includes(a.status));

  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Review Queue</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Verify documents, conduct scrutiny, and recommend approval or rejection.
          </p>
        </div>
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search applicants, IDs..." className="pl-9 w-full sm:w-72" />
        </div>
      </div>

      <Tabs defaultValue="verify">
        <TabsList>
          <TabsTrigger value="verify">
            To verify <Badge variant="warning" className="ml-2">{toVerify.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="scrutiny">
            Scrutiny <Badge variant="warning" className="ml-2">{toScrutinize.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="decided">
            Decided <Badge variant="muted" className="ml-2">{decided.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="verify">
          <QueueTable items={toVerify} />
        </TabsContent>
        <TabsContent value="scrutiny">
          <QueueTable items={toScrutinize} />
        </TabsContent>
        <TabsContent value="decided">
          <QueueTable items={decided} />
        </TabsContent>
      </Tabs>
    </>
  );
}

function QueueTable({ items }: { items: typeof applications }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">
          {items.length} {items.length === 1 ? "application" : "applications"}
        </CardTitle>
        <CardDescription>SLA: decision within 15 working days of submission.</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Scheme</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>SLA</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((a) => {
              const days = Math.floor((Date.now() - new Date(a.submittedOn).getTime()) / (1000 * 60 * 60 * 24));
              const overdue = days > 15;
              return (
                <TableRow key={a.id}>
                  <TableCell className="font-mono text-xs">{a.id}</TableCell>
                  <TableCell className="font-medium">{a.applicantName}</TableCell>
                  <TableCell className="max-w-[220px] truncate">{a.schemeName}</TableCell>
                  <TableCell className="text-sm">{formatDate(a.submittedOn)}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatCurrency(a.amount)}</TableCell>
                  <TableCell><StatusBadge status={a.status} /></TableCell>
                  <TableCell>
                    {overdue ? (
                      <Badge variant="destructive" className="text-[10px]">
                        <AlertTriangle className="h-3 w-3 mr-1" /> {days}d overdue
                      </Badge>
                    ) : (
                      <span className="text-xs text-muted-foreground">{days}d</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm">
                      <Link href={`/portal/review/${a.id}`}>
                        <Eye className="h-4 w-4" /> Review
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {items.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-sm text-muted-foreground py-8">
                  No applications in this queue.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
