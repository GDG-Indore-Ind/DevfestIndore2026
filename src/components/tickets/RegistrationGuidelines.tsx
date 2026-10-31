import { ArrowRight } from "lucide-react";
import ExternalLink from "@/components/shared/ExternalLink";
import { EVENT } from "@/content/event";
import { GUIDELINES_PAGE as page } from "@/content/pages";
import { REGISTRATION_CHECKLIST, TICKET_POLICIES, getPublicPass } from "@/content/tickets";
import styles from "./RegistrationGuidelines.module.css";

export default function RegistrationGuidelines() {
  return (
    <section
      className="audience-section"
      id="registration-guidelines"
      aria-labelledby="registration-guidelines-title"
    >
      <div className="audience-wrap audience-faq-layout">
        <div className="audience-section-heading">
          <h2 id="registration-guidelines-title">{page.title}</h2>
          <p>{page.lead}</p>
          <nav className={styles.jump} aria-label={page.title}>
            <p>{page.navigationLabel}</p>
            {page.sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
                <ArrowRight aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
        <div>
          {page.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className={styles.section}
              aria-labelledby={`${section.id}-title`}
            >
              <h3 id={`${section.id}-title`}>{section.title}</h3>
              {section.id === "before-booking" &&
                REGISTRATION_CHECKLIST.map((item) => (
                  <div className={styles.policy} key={item.title}>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                ))}
              {section.policyIds.map((id) => {
                const policy = TICKET_POLICIES.find((item) => item.id === id)!;
                return (
                  <article className={styles.policy} key={id}>
                    {policy.appliesTo && (
                      <p className={styles.scope}>
                        {policy.appliesTo.map((passId) => getPublicPass(passId).name).join(" · ")}
                      </p>
                    )}
                    <h4>{policy.title}</h4>
                    <p>{policy.text}</p>
                  </article>
                );
              })}
              {section.id === "support" && (
                <ExternalLink href={EVENT.links.codeOfConduct} className="audience-text-link">
                  Code of conduct
                </ExternalLink>
              )}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
