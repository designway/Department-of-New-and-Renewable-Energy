import { Badge } from "@/components/ui/badge";
import { type ApplicationStatus } from "@/lib/mock-data";

const variantFor: Record<ApplicationStatus, "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "muted"> = {
  Draft: "muted",
  Submitted: "secondary",
  "Under Verification": "warning",
  Scrutiny: "warning",
  Approved: "success",
  Rejected: "destructive",
  Sanctioned: "success",
  Disbursed: "success",
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return <Badge variant={variantFor[status]}>{status}</Badge>;
}
