"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type MobileNavItem = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

export function MobileNavDrawer({
  items,
  title,
  footer,
}: {
  items: MobileNavItem[];
  title?: string;
  footer?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="md:hidden h-9 w-9 flex items-center justify-center rounded-md hover:bg-accent"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm animate-fade-in md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[82%] max-w-sm bg-background border-l shadow-xl transition-transform duration-200 md:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Navigation menu"}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="font-semibold">{title ?? "Menu"}</div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="h-9 w-9 flex items-center justify-center rounded-md hover:bg-accent"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="p-3 overflow-y-auto h-[calc(100%-4rem)]">
          <ul className="space-y-1">
            {items.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <li key={`${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {footer && <div className="mt-4 pt-4 border-t">{footer}</div>}
        </nav>
      </aside>
    </>
  );
}
