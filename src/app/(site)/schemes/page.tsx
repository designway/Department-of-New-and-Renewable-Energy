import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { schemes } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ArrowRight, Sun, Wind, Leaf, BatteryCharging, Lightbulb } from "lucide-react";

export const metadata = { title: "Schemes" };

const categoryIcon: Record<string, React.ReactNode> = {
  Solar: <Sun className="h-5 w-5" />,
  Wind: <Wind className="h-5 w-5" />,
  Biogas: <Leaf className="h-5 w-5" />,
  EV: <BatteryCharging className="h-5 w-5" />,
  "Energy Efficiency": <Lightbulb className="h-5 w-5" />,
};

const statusVariant = {
  Active: "success",
  Upcoming: "warning",
  Closed: "muted",
} as const;

export default function SchemesPage() {
  return (
    <>
      <section className="border-b bg-muted/30">
        <div className="container py-12">
          <div className="text-xs text-muted-foreground mb-2">
            <Link href="/" className="hover:underline">Home</Link> / Schemes
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Subsidy Schemes</h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            Explore renewable energy subsidy schemes offered by the Department of New and Renewable
            Energy, Government of Goa. Click any scheme to view eligibility, documents, and apply online.
          </p>
        </div>
      </section>

      <section className="container py-10">
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", "Solar", "EV", "Biogas", "Wind", "Energy Efficiency"].map((c) => (
            <Badge
              key={c}
              variant={c === "All" ? "default" : "outline"}
              className="cursor-pointer px-3 py-1"
            >
              {c}
            </Badge>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {schemes.map((scheme) => (
            <Card key={scheme.id} className="flex flex-col hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                    {categoryIcon[scheme.category]}
                  </div>
                  <Badge variant={statusVariant[scheme.status]}>{scheme.status}</Badge>
                </div>
                <CardTitle className="text-base leading-snug">{scheme.name}</CardTitle>
                <CardDescription className="line-clamp-2">{scheme.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto space-y-3">
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-xs text-muted-foreground">Max subsidy</div>
                    <div className="font-semibold">
                      {scheme.maxSubsidy > 0 ? formatCurrency(scheme.maxSubsidy) : "—"}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Launched</div>
                    <div className="font-medium">{formatDate(scheme.launchedOn)}</div>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/schemes/${scheme.slug}`}>
                    View details <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
