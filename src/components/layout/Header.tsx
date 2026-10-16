import { useState } from "react";
import { ArrowRight, TrendingUp, Menu, X } from "lucide-react";
import { NAV_LINKS } from "../../lib/nav";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Brand logo */}
<a
  href="#"
  className="flex shrink-0 items-center gap-2"
  aria-label="Master Your Wealth - Home"
  onClick={() => setOpen(false)}
>
  <span className="flex size-9 items-center justify-center rounded-full bg-[#0797F2] text-white">
    <TrendingUp className="size-5" strokeWidth={2.5} />
  </span>

  <span className="flex flex-col leading-none">
    <span className="text-[11px] font-extrabold tracking-[0.06em] text-[#153153]">
      MASTER YOUR
    </span>
    <span className="mt-1 text-sm font-extrabold tracking-[0.04em] text-[#0797F2]">
      WEALTH
    </span>
  </span>
</a>


        {/* Desktop navigation */}
        <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#calculator"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-[1.03] hover:shadow-xl"
          >
            Start a SIP
            <ArrowRight className="size-4" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-accent md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {open && (
        <nav
          id="mobile-navigation"
          className="border-t border-border bg-background px-4 py-4 shadow-lg md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#calculator"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20"
          >
            Start a SIP
            <ArrowRight className="size-4" />
          </a>
        </nav>
      )}
    </header>
  );
}
