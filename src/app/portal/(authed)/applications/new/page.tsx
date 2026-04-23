"use client";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { schemes } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Check, Upload, FileText, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

const steps = ["Choose scheme", "Applicant details", "Installation details", "Documents", "Review & submit"];

export default function NewApplicationPage() {
  const [step, setStep] = useState(0);
  const [schemeId, setSchemeId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const scheme = schemes.find((s) => s.id === schemeId);

  if (submitted) {
    const appId = `APP-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="p-10">
            <div className="h-16 w-16 mx-auto rounded-full bg-emerald/10 text-emerald flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Application submitted!</h2>
            <p className="text-muted-foreground mb-6">
              Your acknowledgement number is <span className="font-mono font-semibold text-foreground">{appId}</span>.
              We&apos;ll notify you via SMS and email at each stage of the workflow.
            </p>
            <div className="flex justify-center gap-2">
              <Button asChild variant="outline"><Link href="/portal/applications">View my applications</Link></Button>
              <Button asChild><Link href="/portal/dashboard">Go to dashboard</Link></Button>
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
          <Link href="/portal/applications" className="hover:underline">Applications</Link> / New
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">New Subsidy Application</h1>
      </div>

      {/* Stepper */}
      <div className="mb-6 overflow-x-auto">
        <ol className="flex items-center gap-2 min-w-max">
          {steps.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <div
                className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0",
                  i < step && "bg-emerald text-white",
                  i === step && "bg-primary text-primary-foreground",
                  i > step && "bg-muted text-muted-foreground"
                )}
              >
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn("text-sm whitespace-nowrap", i === step ? "font-semibold" : "text-muted-foreground")}>
                {s}
              </span>
              {i < steps.length - 1 && <div className="h-px w-6 bg-border mx-1" />}
            </li>
          ))}
        </ol>
      </div>

      <Card>
        <CardContent className="p-6 min-h-[360px]">
          {step === 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-1">Choose a scheme</h3>
              <p className="text-sm text-muted-foreground mb-5">Select the scheme you want to apply under.</p>
              <div className="grid md:grid-cols-2 gap-3">
                {schemes.filter((s) => s.status === "Active").map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSchemeId(s.id)}
                    className={cn(
                      "text-left p-4 rounded-lg border-2 transition",
                      schemeId === s.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{s.category}</Badge>
                      {schemeId === s.id && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="font-medium leading-snug mb-1">{s.shortName}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2">{s.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-1">Applicant details</h3>
              <p className="text-sm text-muted-foreground mb-5">Pre-filled from your Aadhaar / portal profile.</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Full name</Label>
                  <Input defaultValue="Aarav Naik" />
                </div>
                <div>
                  <Label>Aadhaar number</Label>
                  <Input defaultValue="XXXX-XXXX-4821" disabled />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" defaultValue="aarav.naik@example.com" />
                </div>
                <div>
                  <Label>Mobile</Label>
                  <Input type="tel" defaultValue="+91 98200 12345" />
                </div>
                <div className="sm:col-span-2">
                  <Label>Address</Label>
                  <Textarea defaultValue="H. No. 12, Alto-Porvorim, Bardez, North Goa — 403521" />
                </div>
                <div>
                  <Label>Electricity consumer no.</Label>
                  <Input placeholder="e.g. 12345678" />
                </div>
                <div>
                  <Label>Bank account (last 4)</Label>
                  <Input placeholder="XXXX" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-1">Installation details</h3>
              <p className="text-sm text-muted-foreground mb-5">
                {scheme?.shortName ?? "Selected scheme"} — provide installation specifics.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Capacity / size</Label>
                  <Input placeholder="e.g. 5 kW" />
                </div>
                <div>
                  <Label>Installation location</Label>
                  <Input placeholder="Address of installation site" />
                </div>
                <div>
                  <Label>Vendor (empanelled)</Label>
                  <Input placeholder="Select from list" />
                </div>
                <div>
                  <Label>Estimated cost (₹)</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="sm:col-span-2">
                  <Label>Additional notes</Label>
                  <Textarea placeholder="Any special conditions, site photos description, etc." />
                </div>
              </div>
            </div>
          )}

          {step === 3 && scheme && (
            <div>
              <h3 className="text-lg font-semibold mb-1">Upload documents</h3>
              <p className="text-sm text-muted-foreground mb-5">
                All documents are required. Accepted formats: PDF, JPG, PNG (max 5 MB each).
              </p>
              <div className="space-y-2">
                {scheme.documentsRequired.map((d) => (
                  <div key={d} className="flex items-center justify-between p-4 rounded-md border bg-muted/30">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div>
                        <div className="text-sm font-medium">{d}</div>
                        <div className="text-xs text-muted-foreground">No file selected</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4" /> Upload
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && scheme && (
            <div>
              <h3 className="text-lg font-semibold mb-1">Review & submit</h3>
              <p className="text-sm text-muted-foreground mb-5">Please verify the information below before submitting.</p>
              <div className="rounded-lg border divide-y">
                {[
                  { k: "Scheme", v: scheme.name },
                  { k: "Applicant", v: "Aarav Naik (XXXX-XXXX-4821)" },
                  { k: "Email / Mobile", v: "aarav.naik@example.com • +91 98200 12345" },
                  { k: "Installation", v: "5 kW rooftop solar, Porvorim" },
                  { k: "Vendor", v: "Goa Solar Solutions Pvt. Ltd." },
                  { k: "Subsidy claimed", v: `₹${scheme.maxSubsidy.toLocaleString("en-IN")}` },
                  { k: "Documents", v: `${scheme.documentsRequired.length} uploaded` },
                ].map((row) => (
                  <div key={row.k} className="grid grid-cols-3 p-3 text-sm">
                    <div className="text-muted-foreground">{row.k}</div>
                    <div className="col-span-2 font-medium">{row.v}</div>
                  </div>
                ))}
              </div>
              <label className="flex items-start gap-2 mt-5 text-sm">
                <input type="checkbox" defaultChecked className="mt-0.5" />
                <span>
                  I hereby declare that the information provided is true to the best of my knowledge.
                  I understand that false information may lead to rejection and recovery of subsidy.
                </span>
              </label>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-5 flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost">Save as draft</Button>
          {step < steps.length - 1 ? (
            <Button
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={step === 0 && !schemeId}
            >
              Next <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={() => setSubmitted(true)}>Submit application</Button>
          )}
        </div>
      </div>
    </>
  );
}
