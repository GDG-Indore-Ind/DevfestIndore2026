"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { Laptop } from "lucide-react";
import { AGENDA_PAGE as copy } from "@/content/pages";
import ExternalLink from "@/components/shared/ExternalLink";
import styles from "./AgendaBoard.module.css";

export type AgendaTabId = "sessions" | "hall-1" | "hall-2" | "exhibits" | "activities";

export interface AgendaTabDefinition {
  id: AgendaTabId;
  label: string;
  count?: number;
}

export function AgendaTabs({
  tabs,
  itemTabMap,
  salmanSetup,
  panels,
}: {
  tabs: AgendaTabDefinition[];
  itemTabMap: Record<string, AgendaTabId>;
  salmanSetup?: { label: string; url: string }[];
  panels: Record<AgendaTabId, ReactNode>;
}) {
  const [activeTab, setActiveTab] = useState<AgendaTabId>("sessions");
  const baseId = useId();

  useEffect(() => {
    const resolveAndOpen = (rawHash: string) => {
      const fragment = rawHash.replace(/^#/, "");
      if (!fragment) return;
      let id: string;
      try {
        id = decodeURIComponent(fragment);
      } catch {
        return;
      }

      if (id === "workshops") {
        setActiveTab("hall-1");
        return;
      }
      if (
        id === "sessions" ||
        id === "hall-1" ||
        id === "hall-2" ||
        id === "exhibits" ||
        id === "activities"
      ) {
        setActiveTab(id);
        return;
      }

      const targetTab = itemTabMap[id];
      if (targetTab) {
        setActiveTab(targetTab);
      }

      requestAnimationFrame(() => {
        const element = document.getElementById(id);
        const details = element?.querySelector<HTMLDetailsElement>(
          ":scope > details[data-agenda-session]",
        );
        if (details) details.open = true;
        if (element) element.scrollIntoView({ block: "start" });
      });
    };

    const handleHashChange = () => resolveAndOpen(window.location.hash);

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a[href]");
      if (!anchor) return;
      const url = new URL((anchor as HTMLAnchorElement).href, window.location.href);
      if (url.origin === window.location.origin && url.pathname === window.location.pathname) {
        resolveAndOpen(url.hash);
      }
    };

    if (window.location.hash) resolveAndOpen(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("popstate", handleHashChange);
    document.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener("popstate", handleHashChange);
      document.removeEventListener("click", handleClick);
    };
  }, [itemTabMap]);

  const isWorkshopTab = activeTab === "hall-1" || activeTab === "hall-2";

  return (
    <div className={styles.board}>
      <div className={styles.tablistWrap}>
        <div className={styles.tablist} role="tablist" aria-label={copy.tabsLabel}>
          {tabs.map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`${baseId}-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${baseId}-panel-${tab.id}`}
                className={styles.tab}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.label}</span>
                {typeof tab.count === "number" && (
                  <span className={styles.tabCount}>{tab.count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {tabs.map((tab) => {
        const selected = activeTab === tab.id;
        return (
          <div
            key={tab.id}
            id={`${baseId}-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${tab.id}`}
            hidden={!selected}
            className={styles.panel}
          >
            {panels[tab.id]}
          </div>
        );
      })}

      {isWorkshopTab && (
        <aside className={styles.workshopReminder} aria-labelledby="workshop-reminder">
          <div className={styles.reminderIcon}>
            <Laptop size={20} aria-hidden="true" />
          </div>
          <div className={styles.reminderBody}>
            <h3 id="workshop-reminder">{copy.workshopReminder.title}</h3>
            <p>{copy.workshopReminder.lead}</p>
            {salmanSetup?.length ? (
              <div className={styles.workshopSetup}>
                <h4>{copy.workshopReminder.setupTitle}</h4>
                <ul>
                  {salmanSetup.map((resource) => (
                    <li key={resource.url}>
                      <ExternalLink href={resource.url}>{resource.label}</ExternalLink>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <Link href="/archive#workshops" className={styles.pastWorkshops}>
              {copy.pastWorkshopsLabel}
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
}
