import Link from "next/link";
import { Check } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/shared/PageIntro";
import { EVENT, EVENT_TICKETS } from "@/content/event";
import { pageMetadata } from "@/lib/pageMetadata";

const pass = EVENT_TICKETS.passes.find((item) => item.id === "vip")!;
export const metadata = pageMetadata("/flight-deck", pass.name, pass.summary);

export default function FlightDeckPage() {
  return (
    <div className="audience-site space-subpage practical-page">
      <Navbar />
      <main id="main-content">
        <PageIntro
          title={pass.name}
          lead={pass.summary}
          motif="tickets"
          meta={<span>VIP &amp; Speaker Access · ₹{pass.price?.toLocaleString("en-IN")}</span>}
        />
        <section
          className="audience-wrap audience-section"
          style={{ paddingBlock: "var(--section-space-tight)" }}
        >
          <div className="grid gap-4 md:grid-cols-[1.3fr_1fr] items-start">
            <div className="rounded-2xl border p-5" style={{ borderColor: "var(--audience-line)" }}>
              <h2 className="mb-3 text-lg font-medium">What’s included</h2>
              <ul className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                {pass.benefits.map((benefit) => (
                  <li key={benefit.label} className="flex gap-2">
                    <Check
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: "var(--audience-blue)" }}
                    />
                    <span>{benefit.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="rounded-2xl border p-5"
              style={{ borderColor: "var(--audience-line)", background: "var(--audience-tint)" }}
            >
              <h2 className="mb-3 text-lg font-medium">How to book</h2>
              <ul className="list-disc space-y-1.5 pl-5 text-sm">
                {pass.eligibility.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
              {pass.note && (
                <p className="my-3 text-sm" style={{ color: "var(--audience-muted)" }}>
                  {pass.note}
                </p>
              )}
              <a href={EVENT.links.booking} className="audience-button space-primary-button">
                Book on KonfHub
              </a>
              <p className="mt-3 text-sm">
                <Link href="/tickets" className="audience-text-link">
                  See all passes
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
