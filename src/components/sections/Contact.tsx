import { useRef, useState, type FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  UserRound,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

// Configure these in your local .env.local file.
// VITE_* values are included in the browser bundle; never put secret keys here.
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? "";
const WORKER_URL = import.meta.env.VITE_CONTACT_WORKER_URL ?? "";

const PHONE = "8928271789";
const EMAIL = "contact@masteryourwealth.in";
const ADDRESS =
  "Office No. 302, Kateeleshwari Arcade, LBS Road, Near Mulund Check Naka, Mulund West, Mumbai - 400080";

const MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.2539379736027!2d72.95281217520798!3d19.184107982042903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b90281c88717%3A0x4df5e0199a904550!2sKateeleshwari%20Apartment!5e0!3m2!1sen!2sin!4v1792077077671!5m2!1sen!2sin";

const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Kateeleshwari+Apartment%2C+LBS+Road%2C+Mulund+West%2C+Mumbai";

const input =
  "w-full min-w-0 rounded-lg border border-slate-200 bg-[#F5F2EC] px-4 py-3 text-sm text-[#153153] outline-none transition focus:border-[#0797F2] focus:ring-2 focus:ring-[#0797F2]/15 placeholder:text-slate-500";

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const captchaRef = useRef<ReCAPTCHA>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!authorized) {
      setErrorMessage("Please authorize us to contact you before submitting.");
      return;
    }

    if (!RECAPTCHA_SITE_KEY || !WORKER_URL) {
      setErrorMessage(
        "The form setup is incomplete. Please configure the reCAPTCHA site key and Cloudflare Worker URL."
      );
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const recaptchaToken = captchaRef.current?.getValue();

    if (!recaptchaToken) {
      setErrorMessage("Please complete the reCAPTCHA checkbox.");
      return;
    }

    const payload = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      mobile: String(formData.get("mobile") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      recaptchaToken,
      // Honeypot field: legitimate visitors should leave this empty.
      website: String(formData.get("website") ?? "").trim(),
    };

    setIsSubmitting(true);

    try {
      const response = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { success?: boolean; error?: string }
        | null;

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.error ||
            "We couldn't send your enquiry. Please try again in a moment."
        );
      }

      setSent(true);
      setAuthorized(false);
      setMessage("");
      form.reset();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      captchaRef.current?.reset();
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-[#F7F9FC]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16 lg:py-20">
        <SectionHeading
          eyebrow="Get in touch"
          title="Let's Plan Your Financial Future"
        />

        <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-6 text-slate-500">
          Have questions about your financial goals? Connect with Master Your
          Wealth and take the next step towards planning your future.
        </p>

        <div className="mt-9 grid items-stretch gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
          {/* Contact details and map */}
          <div className="flex min-w-0 flex-col">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <p className="text-sm leading-6 text-slate-600">
                Whether you're planning investments, preparing for a major
                life goal, or looking for financial planning support, we're
                here to help.
              </p>

              <div className="mt-6 space-y-4">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex items-center gap-3"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#0797F2]">
                    <Mail className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-slate-500">Email</span>
                    <span className="mt-0.5 block break-words text-sm font-medium text-[#153153] transition-colors group-hover:text-[#0797F2]">
                      {EMAIL}
                    </span>
                  </span>
                </a>

                <a
                  href={`tel:${PHONE}`}
                  className="group flex items-center gap-3"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#0797F2]">
                    <Phone className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-slate-500">Phone</span>
                    <span className="mt-0.5 block text-sm font-medium text-[#153153] transition-colors group-hover:text-[#0797F2]">
                      {PHONE}
                    </span>
                  </span>
                </a>

                <a
                  href={MAP_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#0797F2]">
                    <MapPin className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-slate-500">
                      Office Address
                    </span>
                    <span className="mt-0.5 block text-sm leading-6 text-[#153153] transition-colors group-hover:text-[#0797F2]">
                      {ADDRESS}
                    </span>
                  </span>
                </a>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="mt-5 min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-[#0797F2]" />
                  <span className="text-sm font-semibold text-[#153153]">
                    Find Our Office
                  </span>
                </div>
                <a
                  href={MAP_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-xs font-semibold text-[#0797F2] hover:underline"
                >
                  Open in Maps ↗
                </a>
              </div>

              <iframe
                src={MAP_URL}
                title="Master Your Wealth office location at Kateeleshwari Apartment, Mulund West, Mumbai"
                width="100%"
                height="260"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="block w-full"
              />
            </div>
          </div>

          {/* Contact form */}
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            {sent ? (
              <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="size-12 text-[#0797F2]" />
                <h3 className="mt-4 text-xl font-bold text-[#153153]">
                  Thank you for your interest!
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Your enquiry has been submitted. Our team will contact you
                  soon.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setAuthorized(false);
                    setMessage("");
                    setErrorMessage("");
                  }}
                  className="mt-5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-[#153153] hover:bg-slate-50"
                >
                  Back to form
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-extrabold text-[#153153]">
                  Send Us a Message
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Tell us a little about yourself and your financial goals.
                </p>

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  {/* Honeypot anti-spam field. Keep it in the form but out of sight. */}
                  <div
                    aria-hidden="true"
                    className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden"
                  >
                    <label htmlFor="contact-website">
                      Leave this field empty
                    </label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="min-w-0">
                      <span className="mb-1.5 block text-xs font-medium text-slate-600">
                        First Name *
                      </span>
                      <span className="relative block">
                        <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <input
                          required
                          name="firstName"
                          autoComplete="given-name"
                          placeholder="First name"
                          className={`${input} pl-9`}
                        />
                      </span>
                    </label>

                    <label className="min-w-0">
                      <span className="mb-1.5 block text-xs font-medium text-slate-600">
                        Last Name *
                      </span>
                      <input
                        required
                        name="lastName"
                        autoComplete="family-name"
                        placeholder="Last name"
                        className={input}
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-slate-600">
                      Email Address *
                    </span>
                    <span className="relative block">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className={`${input} pl-9`}
                      />
                    </span>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-slate-600">
                      Phone Number *
                    </span>
                    <span className="relative block">
                      <Phone className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <input
                        required
                        name="mobile"
                        type="tel"
                        autoComplete="tel"
                        pattern="[0-9+ ]{10,14}"
                        title="Enter 10–14 characters using digits, spaces or +"
                        placeholder="Your phone number"
                        className={`${input} pl-9`}
                      />
                    </span>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-xs font-medium text-slate-600">
                      Financial Goals / Message *
                    </span>
                    <span className="relative block">
                      <MessageSquare className="pointer-events-none absolute left-3 top-3.5 size-4 text-slate-400" />
                      <textarea
                        required
                        name="message"
                        rows={4}
                        maxLength={500}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Tell us how we can help you..."
                        className={`${input} min-h-28 resize-y pl-9`}
                      />
                    </span>
                    <span className="mt-1 block text-right text-xs text-slate-400">
                      {message.length}/500
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-5 text-slate-600">
                    <input
                      type="checkbox"
                      checked={authorized}
                      onChange={(event) =>
                        setAuthorized(event.target.checked)
                      }
                      required
                      name="contactAuthorization"
                      className="mt-1 size-4 shrink-0 accent-[#0797F2]"
                    />
                    <span>
                      I authorize Master Your Wealth to contact me regarding
                      my financial goals and the information submitted here.
                    </span>
                  </label>

                  <div className="overflow-x-auto">
                    <ReCAPTCHA
                      ref={captchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                    />
                  </div>

                  {errorMessage && (
                    <p
                      role="alert"
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                    >
                      {errorMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!authorized || isSubmitting}
                    className="w-full rounded-xl bg-[#0797F2] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-blue-900/10 transition hover:bg-[#0876D1] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                  </button>

                  <p className="text-center text-xs leading-5 text-slate-400">
                    Your information is submitted securely for us to respond
                    to your enquiry.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
