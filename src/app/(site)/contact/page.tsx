import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <section className="border-b bg-muted/30">
        <div className="container py-12">
          <div className="text-xs text-muted-foreground mb-2">
            <Link href="/" className="hover:underline">Home</Link> / Contact
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Contact Us</h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            Reach out to the Department via phone, email, or visit us at our office.
          </p>
        </div>
      </section>

      <section className="container py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Send a message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Query regarding..." />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here..." rows={6} />
              </div>
              <Button size="lg">Send Message</Button>
            </CardContent>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-3 mb-1">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Office</div>
                  <div className="text-sm text-muted-foreground">
                    Shri. Sohan A. Uskaikar, Director<br />
                    5th Floor, GIDC Building,<br />
                    Next to Passport Office,<br />
                    Patto, Panaji — Goa 403001
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-3 mb-1">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Phone</div>
                  <div className="text-sm text-muted-foreground">
                    0832-2419420<br />
                    Helpline: 1800-XXX-XXXX (Toll free)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-3 mb-1">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">
                    dir-nre.goa@gov.in<br />
                    helpdesk@dnre.goa.gov.in
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="flex gap-3 mb-1">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium">Office Hours</div>
                  <div className="text-sm text-muted-foreground">
                    Mon - Fri: 10:00 AM – 5:00 PM<br />
                    Closed on public holidays
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>
    </>
  );
}
