import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { notifications } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { Download, Calendar, Filter } from "lucide-react";

export const metadata = { title: "Notifications & Circulars" };

const typeVariant = {
  Circular: "default",
  Notification: "secondary",
  Tender: "warning",
  "Press Release": "success",
} as const;

export default function NotificationsPage() {
  return (
    <>
      <section className="border-b bg-muted/30">
        <div className="container py-12">
          <div className="text-xs text-muted-foreground mb-2">
            <Link href="/" className="hover:underline">Home</Link> / Notifications
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Notifications & Circulars</h1>
          <p className="text-muted-foreground mt-3 max-w-3xl">
            Official notifications, circulars, tenders, and press releases issued by the Department.
          </p>
        </div>
      </section>

      <section className="container py-10">
        <div className="flex flex-wrap gap-2 mb-6 items-center">
          <Filter className="h-4 w-4 text-muted-foreground" />
          {["All", "Circular", "Notification", "Tender", "Press Release"].map((t) => (
            <Badge key={t} variant={t === "All" ? "default" : "outline"} className="cursor-pointer px-3 py-1">
              {t}
            </Badge>
          ))}
        </div>

        <div className="space-y-3">
          {notifications.map((n) => (
            <Card key={n.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="hidden sm:block text-center w-14 shrink-0 pt-1">
                  <div className="text-xs text-muted-foreground">
                    {new Date(n.date).toLocaleDateString("en-IN", { month: "short" }).toUpperCase()}
                  </div>
                  <div className="text-xl font-semibold tabular-nums leading-none">
                    {new Date(n.date).getDate()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{new Date(n.date).getFullYear()}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={typeVariant[n.type]}>{n.type}</Badge>
                    <span className="text-xs text-muted-foreground sm:hidden flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {formatDate(n.date)}
                    </span>
                  </div>
                  <div className="font-medium leading-snug mb-1">{n.title}</div>
                  <p className="text-sm text-muted-foreground">{n.summary}</p>
                </div>
                {n.fileSize && (
                  <div className="shrink-0 text-right">
                    <button className="inline-flex items-center gap-2 h-9 px-3 rounded-md text-sm hover:bg-accent border">
                      <Download className="h-4 w-4" /> PDF
                    </button>
                    <div className="text-xs text-muted-foreground mt-1">{n.fileSize}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
