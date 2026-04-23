import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { schemes } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Plus, Edit3, Search } from "lucide-react";

export const metadata = { title: "Schemes (Admin)" };

const statusVariant = {
  Active: "success",
  Upcoming: "warning",
  Closed: "muted",
} as const;

export default function AdminSchemesPage() {
  return (
    <>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Schemes Administration</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Create, update, and configure subsidy schemes.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search schemes..." className="pl-9 w-64" />
          </div>
          <Button>
            <Plus className="h-4 w-4" /> New scheme
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All schemes</CardTitle>
          <CardDescription>{schemes.length} schemes configured across all categories.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Max Subsidy</TableHead>
                <TableHead className="text-right">Beneficiaries</TableHead>
                <TableHead className="text-right">Disbursed</TableHead>
                <TableHead>Launched</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schemes.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="font-medium">{s.shortName}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1 max-w-[320px]">{s.name}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{s.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[s.status]}>{s.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {s.maxSubsidy > 0 ? formatCurrency(s.maxSubsidy) : "—"}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{s.beneficiaries.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatCurrency(s.totalDisbursed)}</TableCell>
                  <TableCell className="text-sm">{formatDate(s.launchedOn)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
