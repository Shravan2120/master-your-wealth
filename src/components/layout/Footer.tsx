
import { TrendingUp, Phone, Mail, MapPin } from "lucide-react";
import { NAV_LINKS } from "../../lib/nav";

const PHONE = "8928271789";
const EMAIL = "contact@masteryourwealth.in";
const ADDRESS =
  "Office No. 302, Kateeleshwari Arcade, LBS Road, Near Mulund Check Naka, Mulund West, Mumbai - 400080";

const SERVICES = [
  { label: "SIP Calculator", href: "#calculator" },
  { label: "Retirement Planning", href: "#calculator" },
  { label: "Education Planning", href: "#calculator" },
  { label: "KYC & Compliance", href: "#kyc" },
];

export function Footer() {
  return (
    <footer className="bg-[#153153] text-white">
      <div className="mx-auto max-w-7xl px-5 py-9 sm:px-6 lg:px-8">
        {/* Main footer columns */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.8fr_0.9fr_1.35fr] lg:gap-10">
          {/* Brand */}
          <div>
            <a
              href="#"
              className="inline-flex items-center gap-2.5"
              aria-label="Master Your Wealth home"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#0797F2] text-white">
                <TrendingUp className="size-5" strokeWidth={2.5} />
              </span>

              <span className="flex flex-col leading-none">
                <span className="text-[11px] font-extrabold tracking-[0.06em]">
                  MASTER YOUR
                </span>
                <span className="mt-1 text-sm font-extrabold tracking-[0.04em] text-[#0797F2]">
                  WEALTH
                </span>
              </span>
            </a>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
              Personalised financial planning and investment solutions to help
              you work towards your financial goals.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <nav
              aria-label="Footer navigation"
              className="mt-4 flex flex-col items-start gap-2.5"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 transition-colors hover:text-[#0797F2]"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Services and calculators */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Tools & Services
            </h3>

            <div className="mt-4 flex flex-col items-start gap-2.5">
              {SERVICES.map((service) => (
                <a
                  key={service.label}
                  href={service.href}
                  className="text-sm text-white/60 transition-colors hover:text-[#0797F2]"
                >
                  {service.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Contact Us
            </h3>

            <div className="mt-4 space-y-3.5">
              <a
                href={MAP_URL()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-sm leading-5 text-white/60 transition-colors hover:text-white"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-[#0797F2]" />
                <span>{ADDRESS}</span>
              </a>

              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-2.5 text-sm text-white/60 transition-colors hover:text-white"
              >
                <Phone className="size-4 shrink-0 text-[#0797F2]" />
                <span>{PHONE}</span>
              </a>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center gap-2.5 break-all text-sm text-white/60 transition-colors hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-[#0797F2]" />
                <span>{EMAIL}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Registration and disclaimer */}
        <div className="mt-8 border-t border-white/15 pt-5">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/65">
            <span className="font-semibold text-white/85">
              AMFI Registered Mutual Funds Distributor
            </span>
            <span>ARN: 270494</span>
            <span>Initial Registration: 16/06/2023</span>
            <span>Validity: 07/06/2029</span>
          </div>

          <p className="mt-3 text-[12px] leading-relaxed text-white/50">
          Risk Factors — Mutual fund investments are subject to market risks. 
          Read all scheme-related documents carefully before investing.
          Mutual fund schemes do not assure or guarantee any returns. 
          Past performance may or may not be sustained in the future. 
          There is no guarantee that the investment objective of any suggested scheme will be achieved.
          Investors are advised to check and evaluate exit loads and other applicable costs, including 
          the Total Expense Ratio (TER), before making investment decisions. Please review the relevant 
          scheme documents carefully.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-5 border-t border-white/15 pt-4 text-center">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Master Your Wealth. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function MAP_URL() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
}
