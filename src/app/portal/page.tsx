import Link from "next/link";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Emblem } from "@/components/emblem";
import { User, Shield, Briefcase, ArrowRight, Info } from "lucide-react";
import { getSession } from "@/lib/auth";
import { signInAs } from "./actions";

export const metadata = { title: "Portal Login" };

export default async function PortalLoginPage() {
  const { role } = await getSession();
  if (role) redirect("/portal/dashboard");

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <header className="border-b bg-background">
        <div className="container h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Emblem className="h-9 w-9" />
            <div>
              <div className="text-xs text-muted-foreground leading-none">Government of Goa</div>
              <div className="text-sm font-semibold leading-tight">DNRE Citizen Portal</div>
            </div>
          </Link>
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to website
          </Link>
        </div>
      </header>

      <div className="flex-1 container py-10 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Welcome to the Citizen Portal
          </h1>
          <p className="text-muted-foreground mb-8 max-w-lg">
            Apply for subsidies, track your applications, upload documents, and receive
            disbursements — all in one secure window.
          </p>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sign in</CardTitle>
              <CardDescription>Log in using Aadhaar or registered email.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="login">Aadhaar / Email</Label>
                <Input id="login" placeholder="XXXX-XXXX-XXXX or you@example.com" />
              </div>
              <div>
                <Label htmlFor="pw">Password / OTP</Label>
                <Input id="pw" type="password" placeholder="••••••" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded" /> Remember me
                </label>
                <a href="#" className="text-primary hover:underline">Forgot password?</a>
              </div>
              <Button size="lg" className="w-full" disabled>
                Sign in (disabled in demo)
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                New user?{" "}
                <a href="#" className="text-primary hover:underline">Create an account</a>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border-saffron/30 bg-saffron/5">
            <CardHeader>
              <div className="flex items-center gap-2 text-saffron text-xs font-semibold uppercase tracking-wide mb-1">
                <Info className="h-4 w-4" /> Demo Mode
              </div>
              <CardTitle>Quick role switcher</CardTitle>
              <CardDescription>
                This is a prototype with mock data. Choose a role to preview the portal.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <form action={async () => { "use server"; await signInAs("applicant"); }}>
                <button type="submit" className="w-full text-left">
                  <RoleCard
                    icon={<User className="h-5 w-5" />}
                    title="Applicant (Citizen)"
                    desc="Submit applications, upload documents, track status."
                  />
                </button>
              </form>
              <form action={async () => { "use server"; await signInAs("officer"); }}>
                <button type="submit" className="w-full text-left">
                  <RoleCard
                    icon={<Briefcase className="h-5 w-5" />}
                    title="Scrutiny Officer"
                    desc="Verify documents, inspect sites, recommend approval."
                  />
                </button>
              </form>
              <form action={async () => { "use server"; await signInAs("admin"); }}>
                <button type="submit" className="w-full text-left">
                  <RoleCard
                    icon={<Shield className="h-5 w-5" />}
                    title="Administrator (Director)"
                    desc="Manage schemes, users, reports; issue sanctions."
                  />
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function RoleCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border bg-background hover:border-primary hover:shadow-sm transition">
      <div className="h-10 w-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-muted-foreground" />
    </div>
  );
}
