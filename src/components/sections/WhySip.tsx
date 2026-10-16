
import {
  IndianRupee,
  TrendingUp,
  ShieldCheck,
  Wallet,
} from "lucide-react";

export function WhySipSection() {
  const items = [
    {
      icon: IndianRupee,
      title: "Start small",
      text: "Begin with just ₹100 a month. No lump sum needed — consistency beats timing.",
    },
    {
      icon: TrendingUp,
      title: "Power of compounding",
      text: "Your returns earn returns. The longer you stay invested, the faster wealth grows.",
    },
    {
      icon: ShieldCheck,
      title: "Rupee cost averaging",
      text: "Buy more units when markets dip and fewer when they rise — automatically.",
    },
    {
      icon: Wallet,
      title: "Disciplined investing",
      text: "Auto-debit every month builds a habit that FDs and gold simply can't match.",
    },
  ];

  return (
    <section
      id="why-sip"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Why SIP
        </p>

        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
          The smartest habit for Indian investors
        </h2>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
          >
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-accent text-primary">
              <item.icon className="size-6" />
            </span>

            <h3 className="mt-4 font-bold text-navy">{item.title}</h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
