import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getScheme, schemes } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { CheckCircle2, FileText, ArrowRight, Users, IndianRupee } from "lucide-react";

export function generateStaticParams() {
  return schemes.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scheme = getScheme(slug);
  return { title: scheme?.name ?? "Scheme" };
}

export default async function SchemeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const scheme = getScheme(slug);
  if (!scheme) notFound();

  return (
    <>
      <section className="border-b bg-muted/30">
        <div className="container py-10">
          <div className="text-xs text-muted-foreground mb-3">
            <Link href="/" className="hover:underline">Home</Link> /{" "}
            <Link href="/schemes" className="hover:underline">Schemes</Link> / {scheme.shortName}
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Badge variant="outline">{scheme.category}</Badge>
            <Badge variant={scheme.status === "Active" ? "success" : scheme.status === "Upcoming" ? "warning" : "muted"}>
              {scheme.status}
            </Badge>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight max-w-4xl">{scheme.name}</h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">{scheme.description}</p>
        </div>
      </section>

      <section className="container py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Eligibility Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {scheme.eligibility.map((e) => (
                  <li key={e} className="flex gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
                    <span>{e}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documents Required</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {scheme.documentsRequired.map((d) => (
                  <li key={d} className="flex gap-3 text-sm">
                    <FileText className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Application Process</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4 text-sm">
                {[
                  "Register or log in to the citizen portal with your Aadhaar / email.",
                  "Start a new application under this scheme and fill applicant details.",
                  "Upload scanned copies of all required documents (max 5 MB each, PDF/JPG).",
                  "Submit the application — an acknowledgement number will be issued.",
                  "Application is routed through verification, site inspection, and scrutiny.",
                  "On approval, a sanction order is generated and subsidy is disbursed via DBT.",
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-muted-foreground pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-6">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Maximum Subsidy</div>
              <div className="text-3xl font-bold text-primary mb-4">
                {scheme.maxSubsidy > 0 ? formatCurrency(scheme.maxSubsidy) : "—"}
              </div>
              <Button asChild size="lg" className="w-full">
                <Link href="/portal">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Login required to submit application
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Scheme Statistics</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Beneficiaries</div>
                  <div className="font-semibold">{scheme.beneficiaries.toLocaleString("en-IN")}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <IndianRupee className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Disbursed so far</div>
                  <div className="font-semibold">{formatCurrency(scheme.totalDisbursed)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Launched</div>
                  <div className="font-semibold">{formatDate(scheme.launchedOn)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </>
  );
}
