
import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  FileCheck2,
  HandCoins,
  HeartPulse,
  Landmark,
  PiggyBank,
  Scale,
  ShieldCheck,
  Sprout,
  Target,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

type ServiceCategory =
  | "Investment Solutions"
  | "Protection & Financial Planning"
  | "Business & Taxation"
  | "Loans & Financing";

type VisualType = "growth" | "protection" | "business" | "loans";

type Service = {
  name: string;
  category: ServiceCategory;
  icon: LucideIcon;
  visual: VisualType;
  description: string;
  points: string[];
};

const SERVICE_GROUPS: ServiceCategory[] = [
  "Investment Solutions",
  "Protection & Financial Planning",
  "Business & Taxation",
  "Loans & Financing",
];

const SERVICES: Service[] = [
  {
    name: "Mutual Funds",
    category: "Investment Solutions",
    icon: TrendingUp,
    visual: "growth",
    description:
      "Explore mutual fund options and understand how they may fit your financial goals, investment horizon and risk tolerance.",
    points: [
      "Explore different fund categories",
      "Understand SIP and lump-sum investing",
      "Review your investment goals",
    ],
  },
  {
    name: "Investment Planning",
    category: "Investment Solutions",
    icon: Target,
    visual: "growth",
    description:
      "Build a more structured approach to investing based on your financial goals, time horizon and individual circumstances.",
    points: [
      "Identify financial goals",
      "Consider your investment horizon",
      "Review suitable investment options",
    ],
  },
  {
    name: "Portfolio Restructuring",
    category: "Investment Solutions",
    icon: TrendingUp,
    visual: "growth",
    description:
      "Review your existing investment portfolio and explore adjustments aligned with your financial objectives and risk tolerance.",
    points: [
      "Review existing investments",
      "Assess portfolio allocation",
      "Identify potential adjustments",
    ],
  },
  {
    name: "Insurance",
    category: "Protection & Financial Planning",
    icon: HeartPulse,
    visual: "protection",
    description:
      "Understand insurance options and consider your coverage needs as part of a broader financial plan.",
    points: [
      "Explore insurance options",
      "Understand coverage requirements",
      "Review policy features",
    ],
  },
  {
    name: "Risk Management",
    category: "Protection & Financial Planning",
    icon: ShieldCheck,
    visual: "protection",
    description:
      "Identify financial risks and explore ways to incorporate risk awareness into your financial decisions and planning.",
    points: [
      "Understand financial risks",
      "Review protection needs",
      "Consider risk in financial decisions",
    ],
  },
  {
    name: "Estate Planning",
    category: "Protection & Financial Planning",
    icon: Scale,
    visual: "protection",
    description:
      "Plan how your assets and financial wishes may be organized and passed on to your intended beneficiaries.",
    points: [
      "Organize estate-related considerations",
      "Understand succession planning",
      "Review asset distribution goals",
    ],
  },
  {
    name: "Retirement Planning & Savings",
    category: "Protection & Financial Planning",
    icon: PiggyBank,
    visual: "protection",
    description:
      "Prepare for future financial needs by considering retirement goals, savings and long-term investment options.",
    points: [
      "Estimate retirement goals",
      "Explore long-term savings options",
      "Review your investment horizon",
    ],
  },
  {
    name: "Company Formation Services",
    category: "Business & Taxation",
    icon: BriefcaseBusiness,
    visual: "business",
    description:
      "Understand company formation options, registration requirements and the documentation involved in setting up a business.",
    points: [
      "Explore business entity structures",
      "Understand registration requirements",
      "Review documentation needs",
    ],
  },
  {
    name: "HUF Formation Services",
    category: "Business & Taxation",
    icon: Building2,
    visual: "business",
    description:
      "Understand the formation process, documentation and compliance considerations associated with a Hindu Undivided Family (HUF).",
    points: [
      "Understand HUF formation",
      "Review documentation requirements",
      "Learn about related compliance",
    ],
  },
  {
    name: "Income Tax Returns & GST Registration",
    category: "Business & Taxation",
    icon: FileCheck2,
    visual: "business",
    description:
      "Get assistance with income tax return filing, GST registration and related compliance requirements.",
    points: [
      "Income tax return filing",
      "GST registration assistance",
      "GST compliance support",
    ],
  },
  {
    name: "Loans",
    category: "Loans & Financing",
    icon: HandCoins,
    visual: "loans",
    description:
      "Explore financing options and understand eligibility criteria, terms and repayment commitments before borrowing.",
    points: [
      "Explore available loan options",
      "Understand eligibility requirements",
      "Review terms and repayment obligations",
    ],
  },
  {
    name: "Loans Against Mutual Funds/Shares",
    category: "Loans & Financing",
    icon: Wallet,
    visual: "loans",
    description:
      "Explore borrowing against eligible mutual fund units or shares, subject to lender criteria, collateral requirements and applicable terms.",
    points: [
      "Understand loan-against-securities facilities",
      "Review eligible investments",
      "Understand interest and collateral risks",
    ],
  },
];

const VISUALS: Record<
  VisualType,
  {
    eyebrow: string;
    heading: string;
    subtitle: string;
    icon: LucideIcon;
    labels: string[];
    background: string;
    accent: string;
  }
> = {
  growth: {
    eyebrow: "INVESTMENT SOLUTIONS",
    heading: "Build your financial future",
    subtitle: "Make informed choices with a clear investment approach.",
    icon: TrendingUp,
    labels: ["Set your goals", "Make a plan", "Review progress"],
    background: "from-sky-50 via-blue-50 to-indigo-100",
    accent: "#0797F2",
  },
  protection: {
    eyebrow: "FINANCIAL WELL-BEING",
    heading: "Plan for what matters",
    subtitle: "Consider protection, future needs and financial security.",
    icon: ShieldCheck,
    labels: ["Understand needs", "Assess risks", "Plan ahead"],
    background: "from-cyan-50 via-sky-50 to-blue-100",
    accent: "#0876D1",
  },
  business: {
    eyebrow: "BUSINESS & TAXATION",
    heading: "Navigate with clarity",
    subtitle: "Understand the processes behind business and tax compliance.",
    icon: Landmark,
    labels: ["Know requirements", "Prepare documents", "Stay compliant"],
    background: "from-indigo-50 via-blue-50 to-sky-100",
    accent: "#3158B7",
  },
  loans: {
    eyebrow: "LOANS & FINANCING",
    heading: "Explore your options",
    subtitle: "Understand financing, eligibility and repayment obligations.",
    icon: HandCoins,
    labels: ["Review options", "Check eligibility", "Understand terms"],
    background: "from-blue-50 via-sky-50 to-cyan-100",
    accent: "#0876D1",
  },
};

function ServiceVisual({ visual }: { visual: VisualType }) {
  const reduceMotion = useReducedMotion();
  const data = VISUALS[visual];
  const MainIcon = data.icon;

  return (
    <div
      className={`relative flex min-h-[330px] flex-col justify-between overflow-hidden rounded-3xl border border-white/70 bg-gradient-to-br ${data.background} p-6 sm:p-8`}
    >
      <div className="absolute -right-12 -top-12 size-48 rounded-full bg-white/60 blur-3xl" />
      <div className="absolute -bottom-16 -left-12 size-48 rounded-full bg-sky-300/20 blur-3xl" />

      <div className="relative z-10">
        <span
          className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/80 px-3 py-1.5 text-[10px] font-bold tracking-widest"
          style={{ color: data.accent }}
        >
          <Sprout className="size-3.5" />
          {data.eyebrow}
        </span>

        <h3 className="mt-5 max-w-xs text-2xl font-extrabold leading-tight text-[#153153] sm:text-3xl">
          {data.heading}
        </h3>

        <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-500">
          {data.subtitle}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-center py-5">
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : { y: [0, -6, 0], rotate: [0, 1, 0] }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex size-36 items-center justify-center rounded-[2rem] border border-white/90 bg-white/75 shadow-xl shadow-blue-900/5 backdrop-blur-sm sm:size-40"
        >
          <div
            className="absolute inset-3 rounded-[1.5rem] border"
            style={{ borderColor: `${data.accent}25` }}
          />

          <MainIcon
            className="size-20 sm:size-24"
            strokeWidth={1.35}
            style={{ color: data.accent }}
          />

          <motion.span
            animate={reduceMotion ? undefined : { scale: [1, 1.12, 1] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-3 -top-3 flex size-10 items-center justify-center rounded-xl border border-white bg-white text-[#0797F2] shadow-md"
          >
            <ArrowUpRight className="size-5" />
          </motion.span>
        </motion.div>
      </div>

      <div className="relative z-10 grid grid-cols-3 gap-2">
        {data.labels.map((label, index) => (
          <motion.div
            key={label}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : index * 0.12 }}
            className="rounded-xl border border-white/80 bg-white/75 p-3 text-center"
          >
            <span
              className="mx-auto flex size-7 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: data.accent }}
            >
              {index + 1}
            </span>
            <p className="mt-2 text-[10px] font-semibold leading-tight text-[#153153] sm:text-xs">
              {label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function ServicesSection() {
  const [activeCategory, setActiveCategory] =
    useState<ServiceCategory>("Investment Solutions");
  const [activeServiceName, setActiveServiceName] =
    useState("Mutual Funds");

  const reduceMotion = useReducedMotion();

  const filteredServices = SERVICES.filter(
    (service) => service.category === activeCategory,
  );

  const selected =
    SERVICES.find((service) => service.name === activeServiceName) ??
    SERVICES[0]!;

  function selectCategory(category: ServiceCategory) {
    setActiveCategory(category);

    const firstService = SERVICES.find(
      (service) => service.category === category,
    );

    if (firstService) {
      setActiveServiceName(firstService.name);
    }
  }

  return (
    <section
      id="services"
      className="scroll-mt-20 border-y bg-sky-soft"
    >
      <div className="mx-auto max-w-6xl px-4 py-20">
        <SectionHeading
          eyebrow="Our Services"
          title="Solutions for every stage of your financial journey"
        />

        <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground">
          Explore our investment, financial planning, business compliance
          and financing services in one place.
        </p>

        {/* Category filters */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {SERVICE_GROUPS.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => selectCategory(category)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-[#0797F2] bg-[#0797F2] text-white shadow-md shadow-blue-500/15"
                    : "border-slate-200 bg-white text-[#153153] hover:border-[#0797F2] hover:bg-sky-50"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Service selector and detail panel */}
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[300px_1fr]">
          <div className="rounded-2xl border bg-white/70 p-3 shadow-sm">
            <div className="flex items-center justify-between px-3 py-3">
              <h3 className="text-sm font-bold text-[#153153]">
                {activeCategory}
              </h3>
              <span className="rounded-full bg-sky-100 px-2.5 py-1 text-xs font-bold text-[#0876D1]">
                {filteredServices.length}
              </span>
            </div>

            <div className="space-y-2">
              {filteredServices.map((service) => {
                const Icon = service.icon;
                const isActive = selected.name === service.name;

                return (
                  <motion.button
                    key={service.name}
                    type="button"
                    onClick={() => setActiveServiceName(service.name)}
                    whileHover={reduceMotion ? undefined : { x: 3 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                    aria-pressed={isActive}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-left transition-colors ${
                      isActive
                        ? "border-[#0797F2] bg-[#0797F2] text-white shadow-md shadow-blue-500/15"
                        : "border-transparent bg-white text-[#153153] hover:border-sky-200 hover:bg-sky-50"
                    }`}
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                        isActive
                          ? "bg-white/15"
                          : "bg-sky-100 text-[#0797F2]"
                      }`}
                    >
                      <Icon className="size-5" />
                    </span>

                    <span className="min-w-0 flex-1 text-sm font-semibold leading-snug">
                      {service.name}
                    </span>

                    <ChevronRight
                      className={`size-4 shrink-0 ${
                        isActive ? "text-white" : "text-slate-400"
                      }`}
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Animated detail panel */}
          <div className="min-w-0 rounded-3xl border bg-card p-4 shadow-sm sm:p-6">
            <div className="grid items-center gap-6 md:grid-cols-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.name + "-visual"}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, scale: 0.97, y: 8 }
                  }
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, scale: 0.98, y: -5 }
                  }
                  transition={{ duration: 0.25 }}
                  className="min-w-0"
                >
                  <ServiceVisual visual={selected.visual} />
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.name + "-details"}
                  initial={
                    reduceMotion ? false : { opacity: 0, x: 10 }
                  }
                  animate={{ opacity: 1, x: 0 }}
                  exit={
                    reduceMotion ? undefined : { opacity: 0, x: -6 }
                  }
                  transition={{ duration: 0.22 }}
                  className="min-w-0 py-2"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0797F2]">
                    {selected.category}
                  </span>

                  <h3 className="mt-3 text-2xl font-extrabold leading-tight text-[#153153]">
                    {selected.name}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground">
                    {selected.description}
                  </p>

                  <ul className="mt-6 space-y-4">
                    {selected.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-[#0797F2]">
                          <Check className="size-3.5" />
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 border-t pt-5">
                    <p className="flex items-start gap-2 text-xs leading-relaxed text-slate-500">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#0797F2]" />
                      Service suitability, eligibility and terms depend on
                      individual circumstances and applicable requirements.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
          Contact us to confirm the availability and scope of individual
          services. Investments and financial products may involve risk.
        </p>
      </div>
    </section>
  );
}
