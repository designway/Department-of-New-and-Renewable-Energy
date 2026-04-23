import Link from "next/link";
import { faqs } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export const metadata = { title: "FAQs" };

export default function FaqsPage() {
  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  return (
    <>
      <section className="border-b bg-muted/30">
        <div className="container py-12">
          <div className="text-xs text-muted-foreground mb-2">
            <Link href="/" className="hover:underline">Home</Link> / FAQs
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            Find answers to common questions about DNRE schemes, applications, and processes.
          </p>
        </div>
      </section>

      <section className="container py-10 space-y-10">
        {categories.map((cat) => (
          <div key={cat}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" /> {cat}
            </h2>
            <div className="space-y-3">
              {faqs
                .filter((f) => f.category === cat)
                .map((f, i) => (
                  <Card key={i}>
                    <CardContent className="p-5">
                      <div className="font-medium mb-2">{f.q}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
