
import { useMemo, useState } from "react";
import {
  ArrowRight,
  Calculator,
  GraduationCap,
  Heart,
  Landmark,
  PiggyBank,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  formatINR,
  sipFutureValue,
} from "../../lib/funds";


type CalculatorId =
  | "sip"
  | "retirement"
  | "education"
  | "emi"
  | "marriage"
  | "sip-lumpsum"
  | "return";

const CALCULATORS = [
  { id: "sip", label: "SIP Calculator", icon: TrendingUp, description: "Plan regular monthly investments." },
  { id: "retirement", label: "Retirement", icon: PiggyBank, description: "Estimate your retirement corpus." },
  { id: "education", label: "Education", icon: GraduationCap, description: "Plan for future education costs." },
  { id: "emi", label: "EMI Calculator", icon: Landmark, description: "Estimate your monthly loan payment." },
  { id: "marriage", label: "Marriage", icon: Heart, description: "Plan for a future wedding expense." },
  { id: "sip-lumpsum", label: "SIP + Lumpsum", icon: Wallet, description: "Combine regular and one-time investing." },
  { id: "return", label: "Return Calculator", icon: Calculator, description: "Project a one-time investment." },
] as const;

function money(value: number) {
  return formatINR(Math.max(0, Number.isFinite(value) ? value : 0));
}



function futureValueOfMonthlyInvestment(
  monthly: number,
  annualRate: number,
  years: number
) {
  const months = Math.max(0, Math.round(years * 12));
  const rate = annualRate / 1200;

  if (months === 0) return 0;
  if (rate === 0) return monthly * months;

  return monthly * ((Math.pow(1 + rate, months) - 1) / rate);
}

function futureValueOfLumpsum(
  amount: number,
  annualRate: number,
  years: number
) {
  return amount * Math.pow(1 + annualRate / 100, years);
}

function monthlyPayment(principal: number, annualRate: number, years: number) {
  const months = years * 12;
  const rate = annualRate / 1200;

  if (months <= 0) return 0;
  if (rate === 0) return principal / months;

  const power = Math.pow(1 + rate, months);
  return (principal * rate * power) / (power - 1);
}

function formatCompact(value: number) {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)} Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)} L`;
  return money(value);
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  format = (v) => String(v),
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  format?: (value: number) => string;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <label className="text-sm font-medium leading-6 text-[#153153]">
          {label}
        </label>
        <span className="shrink-0 rounded-lg bg-sky-50 px-3 py-1.5 text-sm font-bold text-[#153153]">
          {format(value)}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="mt-3 w-full cursor-pointer accent-[#0797F2]"
        aria-label={label}
      />

      <div className="mt-1 flex justify-between text-xs text-slate-400">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function ResultCard({
  label,
  value,
  highlight = false,
  note,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  note?: string;
}) {
  return (
    <div
      className={`min-w-0 rounded-2xl p-4 ${
        highlight ? "bg-[#0797F2] text-white" : "bg-sky-50"
      }`}
    >
      <p
        className={`text-xs ${
          highlight ? "text-white/80" : "text-slate-500"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-2 break-words text-xl font-extrabold sm:text-2xl ${
          highlight ? "text-white" : "text-[#153153]"
        }`}
      >
        {value}
      </p>
      {note && (
        <p
          className={`mt-1 text-xs ${
            highlight ? "text-white/75" : "text-slate-500"
          }`}
        >
          {note}
        </p>
      )}
    </div>
  );
}

function CalculatorIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-7">
      <h3 className="text-xl font-extrabold text-[#153153] sm:text-2xl">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}

function Disclaimer() {
  return (
    <p className="mt-6 text-xs leading-relaxed text-slate-500">
      These calculations are illustrative estimates based on the inputs and
      assumed rates of return. Actual investment returns, inflation, costs and
      future expenses may differ. Mutual fund investments are subject to market
      risks. This is not investment advice.
    </p>
  );
}


function SIPCalculator() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(15);

  const { invested, fv, gains } = useMemo(
    () => sipFutureValue(monthly, rate, years),
    [monthly, rate, years]
  );

  const investedPct = fv > 0 ? Math.min(100, (invested / fv) * 100) : 0;

  return (
    <>
      <CalculatorIntro
        title="SIP Calculator"
        description="Discover how regular monthly investing could help you build wealth over time."
      />

      <div className="grid gap-6 xl:grid-cols-2">
        {/* Investment inputs */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="space-y-8">
            <Slider
              label="Monthly investment"
              value={monthly}
              min={500}
              max={1000000}
              step={500}
              format={money}
              onChange={setMonthly}
            />

            <Slider
              label="Expected annual return"
              value={rate}
              min={0}
              max={20}
              step={0.5}
              format={(v) => `${v}%`}
              onChange={setRate}
            />

            <Slider
              label="Investment period"
              value={years}
              min={1}
              max={40}
              format={(v) => `${v} years`}
              onChange={setYears}
            />
          </div>

          {/* Invested versus estimated gains */}
          <div className="mt-8">
            <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="bg-[#0797F2] transition-all"
                style={{ width: `${investedPct}%` }}
              />
              <div
                className="bg-emerald-400 transition-all"
                style={{ width: `${100 - investedPct}%` }}
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#0797F2]" />
                Invested amount
              </span>

              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-emerald-400" />
                Estimated gains
              </span>
            </div>
          </div>
        </div>

        {/* Results, matching the other calculators */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <p className="text-sm font-semibold text-[#153153]">
            Your SIP projection
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ResultCard
              label="Monthly investment"
              value={money(monthly)}
            />

            <ResultCard
              label="Total amount invested"
              value={formatCompact(invested)}
            />

            <ResultCard
              label="Estimated gains"
              value={formatCompact(gains)}
            />

            <ResultCard
              label="Estimated total value"
              value={formatCompact(fv)}
              highlight
            />
          </div>

          <Disclaimer />
        </div>
      </div>
    </>
  );
}


function RetirementCalculator() {
  const [age, setAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [expenses, setExpenses] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [monthlySavings, setMonthlySavings] = useState(10000);
  const [existing, setExisting] = useState(500000);
  const [preReturn, setPreReturn] = useState(12);
  const [postReturn, setPostReturn] = useState(7);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);

  const yearsToRetire = Math.max(0, retireAge - age);
  const retirementYears = Math.max(1, lifeExpectancy - retireAge);
  const retirementMonthlyExpense =
    expenses * Math.pow(1 + inflation / 100, yearsToRetire);
  const monthlyPostRate = (postReturn - inflation) / 1200;
  const corpus =
    monthlyPostRate === 0
      ? retirementMonthlyExpense * 12 * retirementYears
      : monthlyPostRate > -1
        ? retirementMonthlyExpense *
          ((1 - Math.pow(1 + monthlyPostRate, -retirementYears * 12)) /
            monthlyPostRate)
        : retirementMonthlyExpense * 12 * retirementYears;

  const futureExisting = futureValueOfLumpsum(
    existing,
    preReturn,
    yearsToRetire
  );
  const futureSavings = futureValueOfMonthlyInvestment(
    monthlySavings,
    preReturn,
    yearsToRetire
  );
  const projectedCorpus = futureExisting + futureSavings;
  const shortfall = Math.max(0, corpus - projectedCorpus);
  const extraMonthly =
    yearsToRetire > 0
      ? shortfall /
        Math.max(
          1,
          futureValueOfMonthlyInvestment(1, preReturn, yearsToRetire)
        )
      : shortfall;

  return (
    <>
      <CalculatorIntro
        title="Retirement Calculator"
        description="Estimate the savings you may need for retirement and compare them with your projected corpus."
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="space-y-7">
            <Slider label="Your current age" value={age} min={18} max={70} format={(v) => `${v} years`} onChange={(v) => { setAge(v); if (retireAge <= v) setRetireAge(Math.min(80, v + 1)); }} />
            <Slider label="Retirement age" value={retireAge} min={Math.max(19, age + 1)} max={80} format={(v) => `${v} years`} onChange={setRetireAge} />
            <Slider label="Monthly household expenses today" value={expenses} min={10000} max={1000000} step={5000} format={money} onChange={setExpenses} />
            <Slider label="Expected inflation" value={inflation} min={0} max={12} step={0.5} format={(v) => `${v}%`} onChange={setInflation} />
            <Slider label="Current monthly savings" value={monthlySavings} min={0} max={1000000} step={1000} format={money} onChange={setMonthlySavings} />
            <Slider label="Existing retirement savings" value={existing} min={0} max={50000000} step={100000} format={formatCompact} onChange={setExisting} />
            <Slider label="Expected pre-retirement return" value={preReturn} min={0} max={20} step={0.5} format={(v) => `${v}%`} onChange={setPreReturn} />
            <Slider label="Expected post-retirement return" value={postReturn} min={0} max={12} step={0.5} format={(v) => `${v}%`} onChange={setPostReturn} />
            <Slider label="Life expectancy" value={lifeExpectancy} min={Math.max(61, retireAge + 1)} max={100} format={(v) => `${v} years`} onChange={setLifeExpectancy} />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <p className="text-sm font-semibold text-[#153153]">Your retirement estimate</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ResultCard label="Years to retirement" value={`${yearsToRetire} years`} />
            <ResultCard label="Monthly expense at retirement" value={formatCompact(retirementMonthlyExpense)} />
            <ResultCard label="Estimated required corpus" value={formatCompact(corpus)} highlight />
            <ResultCard label="Projected corpus" value={formatCompact(projectedCorpus)} />
            <ResultCard label="Potential shortfall" value={formatCompact(shortfall)} note={shortfall > 0 ? `Consider saving about ${formatCompact(extraMonthly)}/month in addition to current savings.` : "Your projection covers the estimated target."} />
          </div>
          <Disclaimer />
        </div>
      </div>
    </>
  );
}

function EducationCalculator() {
  const [childAge, setChildAge] = useState(8);
  const [collegeAge, setCollegeAge] = useState(18);
  const [duration, setDuration] = useState(4);
  const [annualCost, setAnnualCost] = useState(200000);
  const [savings, setSavings] = useState(0);
  const [monthlySavings, setMonthlySavings] = useState(5000);
  const [rate, setRate] = useState(12);
  const [inflation, setInflation] = useState(6);

  const years = Math.max(0, collegeAge - childAge);
  const totalFutureCost = Array.from({ length: duration }, (_, i) =>
    annualCost * Math.pow(1 + inflation / 100, years + i)
  ).reduce((sum, value) => sum + value, 0);
  const futureSavings = futureValueOfLumpsum(savings, rate, years);
  const futureMonthlySavings = futureValueOfMonthlyInvestment(
    monthlySavings,
    rate,
    years
  );
  const projectedSavings = futureSavings + futureMonthlySavings;
  const shortfall = Math.max(0, totalFutureCost - projectedSavings);
  const monthlyNeeded =
    years > 0
      ? shortfall / Math.max(1, futureValueOfMonthlyInvestment(1, rate, years))
      : shortfall;

  return (
    <>
      <CalculatorIntro title="Education Calculator" description="Estimate future education costs and the monthly savings that may help you prepare." />
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="space-y-7">
            <Slider label="Child's current age" value={childAge} min={0} max={24} format={(v) => `${v} years`} onChange={(v) => { setChildAge(v); if (collegeAge <= v) setCollegeAge(Math.min(30, v + 1)); }} />
            <Slider label="College starting age" value={collegeAge} min={Math.max(1, childAge + 1)} max={30} format={(v) => `${v} years`} onChange={setCollegeAge} />
            <Slider label="Duration of education" value={duration} min={1} max={10} format={(v) => `${v} years`} onChange={setDuration} />
            <Slider label="Current annual education cost" value={annualCost} min={50000} max={5000000} step={25000} format={money} onChange={setAnnualCost} />
            <Slider label="Existing education savings" value={savings} min={0} max={50000000} step={50000} format={formatCompact} onChange={setSavings} />
            <Slider label="Monthly savings" value={monthlySavings} min={0} max={500000} step={1000} format={money} onChange={setMonthlySavings} />
            <Slider label="Expected annual return" value={rate} min={0} max={20} step={0.5} format={(v) => `${v}%`} onChange={setRate} />
            <Slider label="Education cost inflation" value={inflation} min={0} max={15} step={0.5} format={(v) => `${v}%`} onChange={setInflation} />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <p className="text-sm font-semibold text-[#153153]">Education funding estimate</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ResultCard label="Years until college" value={`${years} years`} />
            <ResultCard label="Estimated total cost" value={formatCompact(totalFutureCost)} highlight />
            <ResultCard label="Projected savings" value={formatCompact(projectedSavings)} />
            <ResultCard label="Potential shortfall" value={formatCompact(shortfall)} />
            <ResultCard label="Additional monthly saving target" value={formatCompact(monthlyNeeded)} note="Approximate amount over the remaining years." />
          </div>
          <Disclaimer />
        </div>
      </div>
    </>
  );
}

function EMICalculator() {
  const [principal, setPrincipal] = useState(2000000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(20);

  const emi = monthlyPayment(principal, rate, years);
  const totalPayment = emi * years * 12;
  const totalInterest = Math.max(0, totalPayment - principal);

  return (
    <>
      <CalculatorIntro title="EMI Calculator" description="Estimate your monthly loan instalment, total repayment and interest based on the amount, rate and tenure." />
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="space-y-8">
            <Slider label="Loan amount" value={principal} min={50000} max={100000000} step={50000} format={formatCompact} onChange={setPrincipal} />
            <Slider label="Annual interest rate" value={rate} min={0} max={30} step={0.25} format={(v) => `${v}%`} onChange={setRate} />
            <Slider label="Loan tenure" value={years} min={1} max={30} format={(v) => `${v} years`} onChange={setYears} />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <p className="text-sm font-semibold text-[#153153]">Your loan estimate</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ResultCard label="Monthly EMI" value={money(emi)} highlight />
            <ResultCard label="Loan amount" value={formatCompact(principal)} />
            <ResultCard label="Total interest" value={formatCompact(totalInterest)} />
            <ResultCard label="Total repayment" value={formatCompact(totalPayment)} />
          </div>
          <Disclaimer />
        </div>
      </div>
    </>
  );
}

function MarriageCalculator() {
  const [age, setAge] = useState(5);
  const [marriageAge, setMarriageAge] = useState(25);
  const [cost, setCost] = useState(1000000);
  const [monthlySavings, setMonthlySavings] = useState(5000);
  const [existing, setExisting] = useState(100000);
  const [rate, setRate] = useState(12);
  const [inflation, setInflation] = useState(6);

  const years = Math.max(0, marriageAge - age);
  const futureCost = cost * Math.pow(1 + inflation / 100, years);
  const projected = futureValueOfLumpsum(existing, rate, years) +
    futureValueOfMonthlyInvestment(monthlySavings, rate, years);
  const shortfall = Math.max(0, futureCost - projected);
  const neededMonthly = years > 0
    ? shortfall / Math.max(1, futureValueOfMonthlyInvestment(1, rate, years))
    : shortfall;

  return (
    <>
      <CalculatorIntro title="Marriage Calculator" description="Plan ahead for a future wedding by estimating its cost and the savings you may need." />
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="space-y-7">
            <Slider label="Child's current age" value={age} min={0} max={24} format={(v) => `${v} years`} onChange={(v) => { setAge(v); if (marriageAge <= v) setMarriageAge(Math.min(40, v + 1)); }} />
            <Slider label="Expected marriage age" value={marriageAge} min={Math.max(1, age + 1)} max={40} format={(v) => `${v} years`} onChange={setMarriageAge} />
            <Slider label="Estimated wedding cost today" value={cost} min={100000} max={50000000} step={100000} format={formatCompact} onChange={setCost} />
            <Slider label="Monthly savings" value={monthlySavings} min={0} max={500000} step={1000} format={money} onChange={setMonthlySavings} />
            <Slider label="Existing wedding savings" value={existing} min={0} max={50000000} step={50000} format={formatCompact} onChange={setExisting} />
            <Slider label="Expected annual return" value={rate} min={0} max={20} step={0.5} format={(v) => `${v}%`} onChange={setRate} />
            <Slider label="Wedding cost inflation" value={inflation} min={0} max={15} step={0.5} format={(v) => `${v}%`} onChange={setInflation} />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <p className="text-sm font-semibold text-[#153153]">Wedding savings estimate</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ResultCard label="Years remaining" value={`${years} years`} />
            <ResultCard label="Estimated future cost" value={formatCompact(futureCost)} highlight />
            <ResultCard label="Projected savings" value={formatCompact(projected)} />
            <ResultCard label="Potential shortfall" value={formatCompact(shortfall)} />
            <ResultCard label="Additional monthly saving target" value={formatCompact(neededMonthly)} />
          </div>
          <Disclaimer />
        </div>
      </div>
    </>
  );
}

function SIPLumpsumCalculator() {
  const [lumpsum, setLumpsum] = useState(200000);
  const [monthly, setMonthly] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const lumpsumFV = futureValueOfLumpsum(lumpsum, rate, years);
  const sipFV = futureValueOfMonthlyInvestment(monthly, rate, years);
  const invested = lumpsum + monthly * years * 12;
  const total = lumpsumFV + sipFV;

  return (
    <>
      <CalculatorIntro title="SIP + Lumpsum Calculator" description="See how a one-time investment and monthly contributions could grow together over time." />
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="space-y-8">
            <Slider label="One-time investment" value={lumpsum} min={0} max={50000000} step={50000} format={formatCompact} onChange={setLumpsum} />
            <Slider label="Monthly SIP" value={monthly} min={0} max={1000000} step={500} format={money} onChange={setMonthly} />
            <Slider label="Expected annual return" value={rate} min={0} max={20} step={0.5} format={(v) => `${v}%`} onChange={setRate} />
            <Slider label="Investment period" value={years} min={1} max={40} format={(v) => `${v} years`} onChange={setYears} />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <p className="text-sm font-semibold text-[#153153]">Combined investment projection</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ResultCard label="Total amount invested" value={formatCompact(invested)} />
            <ResultCard label="One-time investment value" value={formatCompact(lumpsumFV)} />
            <ResultCard label="SIP investment value" value={formatCompact(sipFV)} />
            <ResultCard label="Estimated total value" value={formatCompact(total)} highlight />
            <ResultCard label="Estimated gains" value={formatCompact(Math.max(0, total - invested))} />
          </div>
          <Disclaimer />
        </div>
      </div>
    </>
  );
}

function ReturnCalculator() {
  const [principal, setPrincipal] = useState(200000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);

  const future = futureValueOfLumpsum(principal, rate, years);
  const gains = future - principal;

  return (
    <>
      <CalculatorIntro title="Return Calculator" description="Estimate the future value of a one-time investment using an assumed annual return." />
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <div className="space-y-8">
            <Slider label="One-time investment" value={principal} min={1000} max={50000000} step={1000} format={formatCompact} onChange={setPrincipal} />
            <Slider label="Investment period" value={years} min={1} max={60} format={(v) => `${v} years`} onChange={setYears} />
            <Slider label="Expected annual return" value={rate} min={0} max={30} step={0.5} format={(v) => `${v}%`} onChange={setRate} />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
          <p className="text-sm font-semibold text-[#153153]">Investment projection</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ResultCard label="Initial investment" value={formatCompact(principal)} />
            <ResultCard label="Estimated gains" value={formatCompact(gains)} />
            <ResultCard label="Estimated future value" value={formatCompact(future)} highlight />
          </div>
          <Disclaimer />
        </div>
      </div>
    </>
  );
}

export function CalculatorSection() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorId>("sip");
  const reduceMotion = useReducedMotion();

  const activeItem =
    CALCULATORS.find((item) => item.id === activeCalculator) ?? CALCULATORS[0];
  const ActiveIcon = activeItem.icon;

  return (
    <section id="calculator" className="scroll-mt-20 border-y border-sky-100 bg-sky-50/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#0797F2]">
            Financial planning tools
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#153153] sm:text-4xl">
            Plan today. Prepare for tomorrow.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
            Explore calculators for investing, retirement, education, loans and
            other important financial goals.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)] xl:gap-8">
          {/* Calculator navigation */}
          <aside className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-24">
            <p className="px-3 pb-3 pt-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              Choose a calculator
            </p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
              {CALCULATORS.map((item) => {
                const Icon = item.icon;
                const selected = activeCalculator === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveCalculator(item.id)}
                    aria-pressed={selected}
                    className={`flex min-w-0 items-start gap-2.5 rounded-xl border p-3 text-left transition-colors sm:gap-3 ${
                      selected
                        ? "border-sky-200 bg-sky-50"
                        : "border-transparent hover:border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                        selected
                          ? "bg-[#0797F2] text-white"
                          : "bg-slate-100 text-[#153153]"
                      }`}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-xs font-bold leading-5 sm:text-sm ${
                          selected ? "text-[#153153]" : "text-slate-700"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="mt-1 hidden text-xs leading-relaxed text-slate-500 lg:block">
                        {item.description}
                      </span>
                    </span>
                    {selected && (
                      <ArrowRight className="mt-2 hidden size-4 shrink-0 text-[#0797F2] lg:block" />
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Selected calculator */}
          <motion.div
            key={activeCalculator}
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8"
          >
            <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
              <span className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-[#0797F2]">
                <ActiveIcon className="size-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#0797F2]">
                  Calculator
                </p>
                <p className="mt-1 font-bold text-[#153153]">
                  {activeItem.label}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveCalculator("sip")}
                className="ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#153153]"
                aria-label="Return to SIP calculator"
              >
                <RotateCcw className="size-3.5" />
                <span className="hidden sm:inline">Back to SIP</span>
              </button>
            </div>

            {activeCalculator === "sip" && <SIPCalculator />}
            {activeCalculator === "retirement" && <RetirementCalculator />}
            {activeCalculator === "education" && <EducationCalculator />}
            {activeCalculator === "emi" && <EMICalculator />}
            {activeCalculator === "marriage" && <MarriageCalculator />}
            {activeCalculator === "sip-lumpsum" && <SIPLumpsumCalculator />}
            {activeCalculator === "return" && <ReturnCalculator />}
          </motion.div>
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl items-start gap-3 rounded-2xl border border-sky-100 bg-white/80 p-4">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-[#0797F2]" />
          <p className="text-xs leading-relaxed text-slate-500">
            All calculators provide estimates for planning and educational
            purposes. They do not guarantee investment performance or future
            costs. Actual results may differ. Please review your financial
            circumstances and seek appropriate professional advice when needed.
          </p>
        </div>
      </div>
    </section>
  );
}
