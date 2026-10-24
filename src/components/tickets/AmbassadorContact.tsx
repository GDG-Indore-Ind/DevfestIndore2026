import Link from "next/link";
import { AMBASSADORS_PAGE as page } from "@/content/pages";
import styles from "./AmbassadorContact.module.css";

export default function AmbassadorContact() {
  return (
    <section className="audience-section" aria-labelledby="ambassador-contact-title">
      <div className="audience-wrap">
        <div className={styles.panel}>
          <div>
            <h2 id="ambassador-contact-title">{page.title}</h2>
            <p>{page.ticketLead}</p>
          </div>
          <Link href="/ambassadors" className="audience-button">
            {page.navigationLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
