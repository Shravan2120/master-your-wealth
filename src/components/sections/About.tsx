
import { useState } from "react";
import {
  ArrowRight,
  Compass,
  ShieldCheck,
  Sprout,
  UserRound,
  BriefcaseBusiness,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "./SectionHeading";

const FOUNDERS = [
  {
    id: "nidhi",
    name: "Nidhi Chauhan",
    role: "Co-founder",
    qualification: "Certified Financial Planner (CFP®)",
    icon: UserRound,
    paragraphs: [
      <>
        Nidhi Chauhan is the Co-founder of{" "}
        <strong className="text-[#153153]">Master Your Wealth</strong> and a
        Certified Financial Planner (CFP®), with{" "}
        <strong className="text-[#153153]">
          more than 2 years of professional experience with a banking
          institution in its Treasury & Investment Department
        </strong>
        . This experience has provided her valuable exposure to
        investment-related operations, financial markets, treasury functions,
        and investment management practices.
      </>,
      <>
        Driven by a passion for personal finance and wealth creation, Nidhi
        believes that successful financial planning begins with understanding
        each client’s unique goals, financial circumstances, and long-term
        aspirations. Her approach emphasises disciplined investing, thoughtful
        financial planning, and building sustainable financial habits. Her
        vision is to empower individuals, families, and businesses to make
        informed financial decisions and achieve their financial goals with
        confidence.
      </>,
      <>
        At <strong className="text-[#153153]">Master Your Wealth</strong>, the
        vision is to help clients navigate their financial journey with greater
        clarity and confidence through personalised financial planning support
        and investment solutions aligned with their objectives.
      </>,
      <>
        Under Nidhi’s leadership, Master Your Wealth strives to uphold the
        highest standards of professionalism, trust, and service excellence
        while creating sustainable value for its clients.
      </>,
    ],
  },
  {
    id: "sanket",
    name: "Sanket Chauhan",
    role: "Co-founder",
    qualification:
      "Company Secretary (CS) | LLB. | AMFI Registered Mutual Fund Distributor",
    icon: BriefcaseBusiness,
    paragraphs: [
      <>
        Sanket Chauhan is the Co-founder of{" "}
        <strong className="text-[#153153]">Master Your Wealth</strong>,
        bringing together his corporate governance expertise and a passion for
        helping individuals and families work towards their financial goals.
      </>,
      <>
        As a qualified Company Secretary in Practice (CS), Sanket possesses
        professional knowledge of corporate laws, regulatory compliance, and
        governance practices. Alongside this professional background, his role
        as a Mutual Fund Distributor reflects a commitment to helping clients
        explore investment opportunities and develop disciplined investment
        habits.
      </>,
      <>
        With a client-first approach, Sanket focuses on understanding
        individual financial aspirations and supporting clients in their
        investment journey through mutual fund distribution and goal-oriented
        financial planning support.
      </>,
      <>
        His core philosophy is built on{" "}
        <strong className="text-[#153153]">
          trust, transparency, integrity, and long-term relationships
        </strong>
        . Sanket believes that financial success is not merely about investing
        money, but about making informed decisions, maintaining financial
        discipline, and staying focused on long-term objectives.
      </>,

<>
  Through{" "}
  <strong className="text-[#153153]">Master Your Wealth</strong>, his vision
  is to make financial awareness and investment solutions more accessible,
  helping clients take meaningful steps towards their financial aspirations.
</>,

    ],
  },
] as const;

const VISION =
  "To empower every client with the knowledge, guidance, and financial strategies needed to pursue their life goals and achieve long-term financial well-being.";

const PHILOSOPHY = [
  {
    icon: Compass,
    title: "Plan with purpose",
    description: "Start with your life goals.",
  },
  {
    icon: ShieldCheck,
    title: "Invest with discipline",
    description: "Make informed decisions.",
  },
  {
    icon: Sprout,
    title: "Grow with confidence",
    description: "Keep your future in focus.",
  },
];

export function AboutSection() {
  const [activeFounder, setActiveFounder] = useState("nidhi");
  const reduceMotion = useReducedMotion();

  const founder =
    FOUNDERS.find((item) => item.id === activeFounder) ?? FOUNDERS[0];
  const FounderIcon = founder.icon;

  return (
    <section
      id="about"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:py-20"
    >
      <SectionHeading
        eyebrow="About Master Your Wealth"
        title="Personalised guidance. Purposeful wealth creation."
      />

      <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-slate-500 sm:text-base">
        Helping individuals, families, and businesses make informed financial
        decisions with clarity, care, and a long-term perspective.
      </p>

      <div className="mt-10">
        {/* Founder selection tabs */}
        <div
          className="grid grid-cols-2 gap-3 sm:gap-5"
          role="group"
          aria-label="Choose a founder"
        >
          {FOUNDERS.map((item) => {
            const Icon = item.icon;
            const selected = activeFounder === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveFounder(item.id)}
                aria-pressed={selected}
                className={`flex min-h-24 items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200 sm:gap-4 sm:p-5 ${
                  selected
                    ? "border-[#0797F2] bg-sky-50 shadow-md shadow-blue-900/5"
                    : "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${
                    selected
                      ? "bg-[#0797F2] text-white"
                      : "bg-sky-50 text-[#0797F2]"
                  }`}
                >
                  <Icon className="size-5" />
                </span>

                <span className="min-w-0">
                  <span className="block text-[10px] font-bold tracking-wider text-[#0797F2] sm:text-xs">
                    {item.role.toUpperCase()}
                  </span>
                  <span className="mt-1 block text-sm font-extrabold text-[#153153] sm:text-base">
                    {item.name}
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-500">
                    {item.id === "nidhi"
                      ? "Certified Financial Planner"
                      : "CS, LLB"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected founder profile */}
        <motion.div
          key={founder.id}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="flex items-start gap-3 sm:gap-4">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#0797F2] sm:size-14">
              <FounderIcon className="size-6 sm:size-7" />
            </span>

            <div className="min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0797F2]">
                Founder’s Profile
              </span>
              <h3 className="mt-1 text-2xl font-extrabold text-[#153153] sm:text-3xl">
                {founder.name}
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[#0797F2] sm:text-base">
                {founder.qualification}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
            {founder.paragraphs.map((paragraph, index) => (
              <p key={`${founder.id}-${index}`}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Our Vision */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <span className="h-7 w-1 rounded-full bg-[#0797F2]" />
          <h3 className="text-xl font-extrabold text-[#153153]">
            Our Vision
          </h3>
        </div>

        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
          {VISION}
        </p>
      </div>

      {/* Our Philosophy */}

{/* Our Philosophy */}
<div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
  <div className="mb-5">
    <div className="flex items-center gap-3">
      <span className="h-7 w-1 rounded-full bg-[#0797F2]" />
      <h3 className="text-xl font-extrabold text-[#153153] sm:text-2xl">
        Our Philosophy
      </h3>
    </div>

    <p className="mt-3 text-sm leading-relaxed text-slate-500">
      Plan with purpose. Invest with discipline. Grow with confidence.
    </p>
  </div>

  <div className="grid gap-4 sm:grid-cols-3">
    {PHILOSOPHY.map((item, index) => {
      const Icon = item.icon;

      return (
        <motion.div
          key={item.title}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            delay: reduceMotion ? 0 : index * 0.1,
            duration: 0.35,
          }}
          whileHover={reduceMotion ? undefined : { y: -3 }}
          className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 transition-shadow hover:shadow-md"
        >
          <Icon className="size-6 text-[#0797F2]" />

          <h4 className="mt-4 text-base font-bold text-[#153153]">
            {item.title}
          </h4>

          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            {item.description}
          </p>
        </motion.div>
      );
    })}
  </div>
</div>


      {/* Contact call to action */}
      <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-sky-50 p-5 sm:flex-row sm:items-center sm:p-6">
        <div>
          <h3 className="text-lg font-extrabold text-[#153153]">
            Let’s plan your financial future
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            Start a conversation about your financial goals.
          </p>
        </div>

        <a
          href="#contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0797F2] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0876D1]"
        >
          Get in touch
          <ArrowRight className="size-4" />
        </a>
      </div>
    </section>
  );
}
