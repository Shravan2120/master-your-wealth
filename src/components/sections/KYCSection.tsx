
import { useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  ExternalLink,
  FileCheck2,
  FileText,
  Fingerprint,
  ShieldCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

type KYCLink = {
  title: string;
  description: string;
  url: string;
  icon: LucideIcon;
  tag?: string;
};

const KRA_LINKS: KYCLink[] = [
  {
    title: "CVL KRA",
    description: "Check your KYC registration status.",
    url: "https://www.cvlkra.com/kycpaninquiry.aspx",
    icon: ShieldCheck,
  },
  {
    title: "CAMS KRA",
    description: "Access investor KYC status services.",
    url: "https://camskra.com/investorservices#kyc_check_check",
    icon: BadgeCheck,
  },
  {
    title: "NSDL KRA",
    description: "Visit the NSDL KRA portal.",
    url: "https://kra.ndml.in/kra/web/v3/#/",
    icon: FileCheck2,
  },
  {
    title: "NSE KRA",
    description: "Visit the NSE KRA website.",
    url: "https://www.nsekra.com/",
    icon: Building2,
  },
];

const CKYC_LINKS: KYCLink[] = [
  {
    title: "Karvy KRA",
    description: "Access the Karvy KRA portal for KYC-related services.",
    url: "https://www.karvykra.com/index.aspx?ReturnUrl=%2f",
    icon: Fingerprint,
  },
];

const INDIVIDUAL_FORMS: KYCLink[] = [
  {
    title: "Individual KYC Form",
    description: "KYC application form for individual applicants.",
    url: "https://www.investwell.in/updation/parameter/ckyc/CKYC-KRA-KYC-Individuals.pdf",
    icon: UserRound,
    tag: "PDF",
  },
  {
    title: "Individual Change Form",
    description: "Update or change individual KYC details.",
    url: "http://www.investwell.in/updation/parameter/ckyc/kyc-ind-change-new.pdf",
    icon: FileText,
    tag: "PDF",
  },
  {
    title: "Supplementary CKYC Form",
    description: "Supplementary form for CKYC-related requirements.",
    url: "http://www.investwell.in/updation/parameter/ckyc/Supplementary-CKYC-Application-Form.pdf",
    icon: FileCheck2,
    tag: "PDF",
  },
];

const NON_INDIVIDUAL_FORMS: KYCLink[] = [
  {
    title: "Non-Individual KYC Form",
    description: "KYC application form for non-individual entities.",
    url: "http://www.investwell.in/updation/parameter/ckyc/KYC-NonIndividual-new.pdf",
    icon: Building2,
    tag: "PDF",
  },
  {
    title: "Non-Individual Change Form",
    description: "Update or change non-individual KYC details.",
    url: "http://www.investwell.in/updation/parameter/ckyc/KYC-Nonind-change-new.pdf",
    icon: FileText,
    tag: "PDF",
  },
  {
    title: "Non-Individual Annexure",
    description: "Additional annexure for non-individual KYC applications.",
    url: "http://www.investwell.in/updation/parameter/ckyc/KYC-NonIndividual-Annexure-new.pdf",
    icon: FileCheck2,
    tag: "PDF",
  },
];

const TABS = [
  "Individual Forms",
  "Non-Individual Forms",
    "KYC Status"
] as const;

type Tab = (typeof TABS)[number];

function ResourceCard({ item }: { item: KYCLink }) {
  const Icon = item.icon;
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={reduceMotion ? undefined : { y: -3 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-[#0797F2]/50 hover:shadow-lg hover:shadow-blue-900/5"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#0797F2] transition-colors group-hover:bg-[#0797F2] group-hover:text-white">
          <Icon className="size-5" />
        </span>

        <div className="flex items-center gap-2">
          {item.tag && (
            <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold tracking-wide text-slate-600">
              {item.tag}
            </span>
          )}

          <ExternalLink className="size-4 text-slate-400 transition-colors group-hover:text-[#0797F2]" />
        </div>
      </div>

      <h3 className="mt-4 font-bold text-[#153153]">{item.title}</h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">
        {item.description}
      </p>

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#0797F2]">
        Open resource
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </motion.a>
  );
}

function ResourceGrid({ items }: { items: KYCLink[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ResourceCard key={item.title} item={item} />
      ))}
    </div>
  );
}

export function KYCSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Individual Forms");

  const content: Record<Tab, { title: string; items: KYCLink[] }[]> = {
    "KYC Status": [
      {
        title: "Check KYC Status",
        items: KRA_LINKS,
      },
      {
        title: "CKYC Resources",
        items: CKYC_LINKS,
      },
    ],
    "Individual Forms": [
      {
        title: "Individual KYC Forms",
        items: INDIVIDUAL_FORMS,
      },
    ],
    "Non-Individual Forms": [
      {
        title: "Non-Individual KYC Forms",
        items: NON_INDIVIDUAL_FORMS,
      },
    ],
  };

  return (
    <section
      id="kyc"
      className="scroll-mt-20 border-y border-sky-100 bg-slate-50/70"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-14">
        <SectionHeading
          eyebrow="Investor Resources"
          title="KYC & Compliance"
        />

        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-slate-500">
          Check your KYC status or access the required application forms.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {TABS.map((tab) => {
            const selected = activeTab === tab;

            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                aria-pressed={selected}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                  selected
                    ? "border-[#0797F2] bg-[#0797F2] text-white"
                    : "border-slate-200 bg-white text-[#153153] hover:border-[#0797F2] hover:text-[#0797F2]"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="mt-7">
          {content[activeTab].map((group) => (
            <div key={group.title}>
              <h3 className="mb-4 text-lg font-bold text-[#153153]">
                {group.title}
              </h3>

              <ResourceGrid items={group.items} />
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs leading-relaxed text-slate-500">
          External links open third-party portals or documents. Please verify
          the requirements before submitting your information.
        </p>
      </div>
    </section>
  );
}
