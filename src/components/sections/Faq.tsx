
import { useState } from "react";

const FAQS = [
  {
    q: "What is a SIP?",
    a: "A Systematic Investment Plan (SIP) lets you invest a fixed amount in a mutual fund at regular intervals — usually monthly — instead of a one-time lump sum.",
  },
  {
    q: "How much do I need to start?",
    a: "Many funds allow SIPs starting at just ₹100–₹500 per month. There's no upper limit — invest what fits your budget.",
  },
  {
    q: "Can I pause or stop my SIP?",
    a: "Yes. SIPs are completely flexible. You can pause, increase, decrease, or stop them anytime without penalty.",
  },
  {
    q: "Are SIP returns guaranteed?",
    a: "No. Mutual funds are market-linked and returns vary. Historically, diversified equity funds have delivered 10–14% annualized over long periods, but past performance doesn't guarantee future results.",
  },
  {
    q: "Is my money safe?",
    a: "Mutual funds in India are regulated by SEBI and your units are held in your name with the fund house or demat account, not with any app or advisor.",
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 border-t bg-sky-soft">
      <div className="mx-auto max-w-3xl px-4 py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            FAQ
          </p>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">
            Common questions, answered
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIdx === index;

            return (
              <div key={faq.q} className="rounded-2xl border bg-card shadow-sm">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-semibold text-navy"
                  onClick={() => setOpenIdx(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>

                  <span
                    aria-hidden="true"
                    className={`shrink-0 text-xl text-primary transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <p className="px-6 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
