import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Target, Users, Compass, Mail, MapPin } from "lucide-react";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <section className="border-b bg-muted/30">
        <div className="container py-12">
          <div className="text-xs text-muted-foreground mb-2">About Us</div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Department of New and Renewable Energy</h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            The nodal department for promotion, implementation, and monitoring of renewable energy
            programmes in the state of Goa.
          </p>
        </div>
      </section>

      <section className="container py-12">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-[auto,1fr]">
            <div className="bg-primary text-primary-foreground p-8 flex flex-col items-center justify-center text-center md:w-64">
              <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-xl mb-4 bg-white">
                <Image
                  src="/images/director.png"
                  alt="Shri. Sohan A. Uskaikar"
                  fill
                  sizes="128px"
                  className="object-cover scale-110"
                  style={{ objectPosition: "center 20%" }}
                />
              </div>
              <div className="font-semibold text-lg leading-tight">Shri. Sohan A. Uskaikar</div>
              <div className="text-sm text-white/80 mt-1">Director</div>
              <div className="text-xs text-white/70 mt-0.5">New and Renewable Energy</div>
            </div>
            <div className="p-8">
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                From the Director&apos;s Desk
              </div>
              <h2 className="text-2xl font-semibold mb-3">Leadership Message</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Goa is at the forefront of India&apos;s renewable energy transition. Through focused
                scheme design, citizen-centric service delivery, and strong collaboration with the
                Ministry of New and Renewable Energy, our Department is committed to making clean
                energy accessible, affordable, and equitable for every household, farmer, and
                enterprise in the state.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm pt-4 border-t">
                <div className="flex gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <div className="font-medium">Office</div>
                    <div className="text-muted-foreground">
                      5th Floor, GIDC Building, Next to Passport Office,<br />
                      Patto, Panaji — Goa 403001
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Mail className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-muted-foreground">dir-nre.goa@gov.in</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      <section className="container pb-12 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Mandate</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Department of New and Renewable Energy (DNRE), Government of Goa was
              established as the state-level nodal agency for implementing schemes of the Ministry
              of New and Renewable Energy (MNRE), Government of India, as well as state-specific
              renewable energy initiatives. The Department works closely with the electricity
              department, distribution licensees, and urban / rural local bodies to accelerate the
              adoption of solar, wind, biogas, and energy-efficient technologies.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">Functions</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>Formulation and implementation of state renewable energy policies</li>
              <li>Disbursement of central and state subsidies for RE installations</li>
              <li>Empanelment of vendors, installers, and service providers</li>
              <li>Public awareness, capacity building, and skill development</li>
              <li>Monitoring and reporting of scheme outcomes and fund utilisation</li>
              <li>Coordination with MNRE, PFMS, DISCOMs, and other stakeholders</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">Organisation</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Department is headed by the Director (DNRE), supported by technical and
              administrative officers, and a pool of field officers for site inspections and
              verification. The Director reports to the Secretary (Power), Government of Goa.
            </p>
          </div>
        </div>

        <aside className="space-y-4">
          {[
            { icon: <Target className="h-5 w-5" />, t: "Mission", d: "Ensure universal access to clean, reliable, and affordable renewable energy in Goa." },
            { icon: <Compass className="h-5 w-5" />, t: "Vision", d: "Goa — a net-zero-emissions model state by 2050 through diverse renewable energy deployment." },
            { icon: <Leaf className="h-5 w-5" />, t: "Values", d: "Sustainability, transparency, public service, and accountability." },
            { icon: <Users className="h-5 w-5" />, t: "Stakeholders", d: "Citizens, farmers, MSMEs, industries, ULBs, panchayats, and vendors." },
          ].map((b) => (
            <Card key={b.t}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                    {b.icon}
                  </div>
                  <CardTitle className="text-base">{b.t}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">{b.d}</p>
              </CardContent>
            </Card>
          ))}
        </aside>
      </section>
    </>
  );
}
