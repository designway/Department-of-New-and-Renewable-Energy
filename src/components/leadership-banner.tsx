import { cn } from "@/lib/utils";

type Leader = {
  name: string;
  title: string;
  initials: string;
  imageSrc?: string;
};

const leaders: Leader[] = [
  {
    name: "Dr. Pramod Sawant",
    title: "Hon'ble Chief Minister of Goa",
    initials: "PS",
    imageSrc: "/images/cm.jpg",
  },
  {
    name: "Shri. Sudin Dhavalikar",
    title: "Hon'ble Minister for Power and NRE",
    initials: "SD",
    imageSrc: "/images/minister.jpg",
  },
];

export function LeadershipBanner({ compact = false }: { compact?: boolean }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(265 60% 28%) 0%, hsl(250 55% 22%) 50%, hsl(235 50% 18%) 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 3%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 3%), radial-gradient(circle at 60% 70%, rgba(255,255,255,0.08) 0%, transparent 4%), radial-gradient(circle at 30% 80%, rgba(255,255,255,0.12) 0%, transparent 3%), radial-gradient(circle at 90% 60%, rgba(255,255,255,0.08) 0%, transparent 3%)",
          }}
        />
      </div>
      <div className={cn("container relative", compact ? "py-8" : "py-12 md:py-16")}>
        <div
          className={cn(
            "grid gap-6 md:gap-12",
            "grid-cols-2 max-w-3xl mx-auto"
          )}
        >
          {leaders.map((l) => (
            <div key={l.name} className="flex flex-col items-center text-center text-white">
              <div
                role="img"
                aria-label={l.name}
                className={cn(
                  "relative rounded-full overflow-hidden border-4 border-white/20 shadow-2xl mb-3 bg-white/10 bg-center bg-cover flex items-center justify-center text-white/80 text-3xl font-semibold",
                  compact ? "h-24 w-24" : "h-32 w-32 md:h-44 md:w-44"
                )}
                style={l.imageSrc ? { backgroundImage: `url(${l.imageSrc})` } : undefined}
              >
                {!l.imageSrc && l.initials}
              </div>
              <div className={cn("font-semibold leading-tight", compact ? "text-sm" : "text-base md:text-lg")}>
                {l.name}
              </div>
              <div className={cn("text-white/80 leading-tight mt-1", compact ? "text-xs" : "text-xs md:text-sm")}>
                {l.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
