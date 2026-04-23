import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Database, Send, Key, FileCheck } from "lucide-react";

export const metadata = { title: "Settings (Admin)" };

export default function SettingsPage() {
  const integrations = [
    { name: "PFMS / DBT", icon: <Database className="h-5 w-5" />, connected: true, note: "Connected via MNRE bridge" },
    { name: "SMS Gateway", icon: <Send className="h-5 w-5" />, connected: true, note: "TRAI-approved provider" },
    { name: "Email (SMTP)", icon: <Send className="h-5 w-5" />, connected: true, note: "smtp.goa.gov.in" },
    { name: "DigiLocker", icon: <FileCheck className="h-5 w-5" />, connected: false, note: "Pending onboarding" },
    { name: "eSign (NSDL)", icon: <Key className="h-5 w-5" />, connected: true, note: "For sanction orders" },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Configure integrations, security, and system-wide parameters.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Integrations</CardTitle>
            <CardDescription>External systems the portal connects with.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {integrations.map((i) => (
              <div key={i.name} className="flex items-center justify-between p-3 rounded-md border">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                    {i.icon}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{i.name}</div>
                    <div className="text-xs text-muted-foreground">{i.note}</div>
                  </div>
                </div>
                {i.connected ? (
                  <Badge variant="success">Connected</Badge>
                ) : (
                  <Badge variant="muted">Not connected</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Security & Compliance</CardTitle>
            <CardDescription>GIGW-compliant settings and audit.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-md bg-emerald/5 border border-emerald/20">
              <ShieldCheck className="h-5 w-5 text-emerald" />
              <div className="flex-1">
                <div className="text-sm font-medium">CERT-In audit</div>
                <div className="text-xs text-muted-foreground">Last audit: 12 Jan 2026 — Passed</div>
              </div>
              <Badge variant="success">Current</Badge>
            </div>
            <div>
              <Label>Session timeout (minutes)</Label>
              <Input type="number" defaultValue={15} />
            </div>
            <div>
              <Label>Max document size (MB)</Label>
              <Input type="number" defaultValue={5} />
            </div>
            <div>
              <Label>Audit retention (years)</Label>
              <Input type="number" defaultValue={7} />
            </div>
            <Button>Save changes</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Department details</CardTitle>
          </CardHeader>
          <CardContent className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Department name</Label>
              <Input defaultValue="Department of New and Renewable Energy" />
            </div>
            <div>
              <Label>Helpdesk email</Label>
              <Input defaultValue="helpdesk@dnre.goa.gov.in" />
            </div>
            <div>
              <Label>Helpdesk phone</Label>
              <Input defaultValue="0832-2419420" />
            </div>
            <div>
              <Label>Financial year</Label>
              <Input defaultValue="2025-26" />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
