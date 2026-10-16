
import { useEffect, useState } from "react";
import {
  Calculator,
  ChartNoAxesCombined,
  ShieldCheck
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  formatINR,
  sipFutureValue,
  sipYearlySeries,
} from "../../lib/funds";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="hero-grid-bg relative overflow-hidden">
        <motion.div
          className="pointer-events-none absolute -top-32 right-0 size-[480px] rounded-full bg-primary/10 blur-3xl"
          animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:py-24">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-4 py-1.5 text-xs font-semibold text-accent-foreground">
              <ShieldCheck className="size-3.5" />
              Your Partner in Financial Planning
            </span>

            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-tight tracking-tight text-navy md:text-5xl lg:text-6xl">
              Grow your wealth, one{" "}
              <span className="text-primary">SIP</span> at a time
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Explore mutual funds, plan your investments, and take a
              thoughtful approach towards your financial goals with
              Master Your Wealth.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-transform hover:scale-[1.03]"
              >
                <Calculator className="size-4" />
                Calculate your SIP
              </a>

              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-7 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-accent"
              >
                Explore services
              </a>
            </div>
          </motion.div>

          <HeroCard reduceMotion={!!reduceMotion} />
        </div>
      </section>

      <StatsStrip />
    </>
  );
}

function AnimatedNumber({
  value,
  duration = 2200,
  prefix = "",
  reduceMotion = false,
}: {
  value: number;
  duration?: number;
  prefix?: string;
  reduceMotion?: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setCurrent(value);
      return;
    }

    let frameId = 0;
    let startTime: number | null = null;

    setCurrent(0);

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1,
      );

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCurrent(value * easedProgress);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [value, duration, reduceMotion]);

  return (
    <span>
      {prefix}
      {formatINR(current)}
    </span>
  );
}

function HeroCard({ reduceMotion }: { reduceMotion: boolean }) {
  const monthly = 10000;
  const annualRate = 12;
  const years = 15;

  const { fv, invested, gains } = sipFutureValue(
    monthly,
    annualRate,
    years,
  );

  const series = sipYearlySeries(monthly, annualRate, years);
  const max = Math.max(...series.map((point) => point.value), 1);

  const chartPoints = series.map((point, index) => ({
    x: (index / Math.max(series.length - 1, 1)) * 100,
    y: 100 - (point.value / max) * 90,
  }));

  const linePath = chartPoints
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`,
    )
    .join(" ");

  const areaPath = `${linePath} L 100 100 L 0 100 Z`;

  return (
    <motion.div
      className="relative mx-2 mb-7 mt-5 sm:mx-4 md:mx-0 md:mb-0 md:mt-0"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15 }}
    >
      <div className="rounded-3xl border border-primary/15 bg-card p-5 shadow-2xl shadow-primary/10 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              ₹10,000/month for 15 yrs @ 12%
            </p>

            <p className="mt-1 text-3xl font-extrabold text-navy sm:text-4xl">
              <AnimatedNumber value={fv} reduceMotion={reduceMotion} />
            </p>
          </div>

          <motion.span
            className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary"
            animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChartNoAxesCombined className="size-5" />
          </motion.span>
        </div>

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="mt-5 h-36 w-full overflow-hidden sm:h-44"
          role="img"
          aria-label="Illustrative SIP growth chart over 15 years"
        >
          <defs>
            <linearGradient
              id="heroGrowthGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="var(--primary)"
                stopOpacity="0.4"
              />
              <stop
                offset="100%"
                stopColor="var(--primary)"
                stopOpacity="0.02"
              />
            </linearGradient>

            <clipPath id="heroGrowthClip">
              <motion.rect
                x="0"
                width="100"
                initial={{ y: 100, height: 0 }}
                animate={{ y: 0, height: 100 }}
                transition={{
                  duration: reduceMotion ? 0 : 2.2,
                  delay: reduceMotion ? 0 : 0.3,
                  ease: "easeOut",
                }}
              />
            </clipPath>
          </defs>

          <g clipPath="url(#heroGrowthClip)">
            <path d={areaPath} fill="url(#heroGrowthGradient)" />
            <path
              d={linePath}
              fill="none"
              stroke="var(--primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>Year 1</span>
          <span>Year 15</span>
        </div>
      </div>

      {/* Invested amount */}
      <motion.div
        className="absolute -bottom-5 -left-2 rounded-2xl border border-primary/15 bg-card px-4 py-3 shadow-xl shadow-primary/10 sm:-left-4 sm:px-5"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <p className="text-xs text-muted-foreground">Invested</p>
        <p className="text-lg font-bold text-navy">
          <AnimatedNumber
            value={invested}
            duration={1800}
            reduceMotion={reduceMotion}
          />
        </p>
      </motion.div>

      {/* Estimated gains */}
      <motion.div
        className="absolute -right-2 -top-5 rounded-2xl border border-primary/15 bg-card px-4 py-3 shadow-xl shadow-primary/10 sm:-right-4 sm:px-5"
        initial={reduceMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
      >
        <p className="text-xs text-muted-foreground">Est. gains</p>
        <p className="text-lg font-bold text-gain">
          <AnimatedNumber
            value={gains}
            prefix="+"
            duration={2200}
            reduceMotion={reduceMotion}
          />
        </p>
      </motion.div>
    </motion.div>
  );
}


export function StatsStrip() {
  const reduceMotion = useReducedMotion();

  const stats = [
    { value: "₹50", label: "Minimum SIP" },
    { value: "100+", label: "Funds to explore" },
    { value: "200+", label: "Happy investors" },
  ];

  return (
    <section className="border-y border-sky-100 bg-sky-50/80">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-3 sm:gap-8 sm:py-9">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="flex flex-col items-center justify-center text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
          >
            <p className="text-3xl font-extrabold leading-tight tracking-tight text-[#0797F2] sm:text-4xl">
              {stat.value}
            </p>

            <p className="mt-2 text-sm text-[#153153]/75">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


