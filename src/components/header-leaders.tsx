import { cn } from "@/lib/utils";

type Leader = {
  name: string;
  title: string;
  imageSrc: string;
};

const leaders: Leader[] = [
  {
    name: "Dr. Pramod Sawant",
    title: "Hon'ble Chief Minister",
    imageSrc: "/images/cm.jpg",
  },
  {
    name: "Shri. Sudin Dhavalikar",
    title: "Hon'ble Minister, Power & NRE",
    imageSrc: "/images/minister.jpg",
  },
];

export function HeaderLeaders({ className }: { className?: string }) {
  return (
    <div className={cn("hidden lg:flex items-center gap-5", className)}>
      {leaders.map((l, i) => (
        <div key={l.name} className="flex items-center gap-3">
          {i > 0 && <div className="h-10 w-px bg-border -ml-2" aria-hidden />}
          <div
            role="img"
            aria-label={l.name}
            className="h-12 w-12 rounded-full bg-muted bg-center bg-cover ring-2 ring-primary/10 shadow-sm shrink-0"
            style={{ backgroundImage: `url(${l.imageSrc})` }}
          />
          <div className="leading-tight">
            <div className="text-[11px] text-muted-foreground uppercase tracking-wider">{l.title}</div>
            <div className="text-sm font-semibold">{l.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
