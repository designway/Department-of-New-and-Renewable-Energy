import Image from "next/image";
import { cn } from "@/lib/utils";

export function Emblem({ className = "h-12 w-12" }: { className?: string }) {
  return (
    <div className={cn("relative shrink-0", className)}>
      <Image
        src="/images/goa-emblem.png"
        alt="Government of Goa"
        fill
        sizes="64px"
        className="object-contain"
        priority
      />
    </div>
  );
}
