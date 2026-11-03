import { Check } from "lucide-react";
import { TICKET_BENEFIT_GROUPS, type TicketBenefit } from "@/content/tickets";
import styles from "./BenefitGroups.module.css";

/** Benefits grouped as event access, food and goodies, and lounges, in content order. */
export default function BenefitGroups({
  benefits,
  layout = "stack",
}: {
  benefits: TicketBenefit[];
  /** `columns` sets the groups side by side on wider screens. */
  layout?: "stack" | "columns";
}) {
  return (
    <div className={`${styles.groups} ${layout === "columns" ? styles.columns : ""}`}>
      {TICKET_BENEFIT_GROUPS.map((group) => {
        const items = benefits.filter((benefit) => benefit.group === group.id);
        if (!items.length) return null;
        return (
          <div key={group.id} className={styles.group}>
            <h3>{group.label}</h3>
            <ul>
              {items.map((benefit) => (
                <li key={benefit.label}>
                  <Check aria-hidden="true" />
                  <span>
                    {benefit.label}
                    {benefit.detail && <small>{benefit.detail}</small>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
