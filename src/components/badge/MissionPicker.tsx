import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";
import { badgeMissions } from "@/content/badgeMissions";
import { PAGE_COPY } from "@/content/copy";
import styles from "./MissionPicker.module.css";

const copy = PAGE_COPY.badge;
const listId = "badge-mission-options";
type Mission = (typeof badgeMissions)[number];

export default function MissionPicker({
  value,
  onChange,
}: {
  value: Mission;
  onChange: (mission: Mission) => void;
}) {
  const [query, setQuery] = useState<string | null>(null);
  const [active, setActive] = useState(-1);
  const list = useRef<HTMLUListElement>(null);
  const open = query !== null;
  const matches = badgeMissions.filter((mission) =>
    mission.toLowerCase().includes(query?.trim().toLowerCase() ?? ""),
  );

  useEffect(() => {
    if (active >= 0) list.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function show() {
    if (open) return;
    setQuery("");
    setActive(-1);
  }

  function close() {
    setQuery(null);
    setActive(-1);
  }

  function choose(mission: Mission) {
    onChange(mission);
    close();
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) setQuery("");
      if (!matches.length) return;
      const next = active + (event.key === "ArrowDown" ? 1 : -1);
      setActive(next < 0 ? matches.length - 1 : next % matches.length);
    } else if (event.key === "Enter" && open && matches[active]) {
      event.preventDefault();
      choose(matches[active]);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      close();
    }
  }

  return (
    <>
      <div className={styles.row}>
        <div className={styles.picker}>
          <input
            id="badge-mission"
            role="combobox"
            type="text"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={open && matches[active] ? `${listId}-${active}` : undefined}
            placeholder={copy.searchMission}
            value={query ?? value}
            onFocus={show}
            onClick={show}
            onBlur={close}
            onKeyDown={onKeyDown}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
          />
          <ChevronDown aria-hidden="true" className={styles.chevron} />
          <div className={styles.popup} hidden={!open}>
            <ul id={listId} role="listbox" aria-label={copy.missionLabel} ref={list}>
              {matches.map((mission, index) => (
                <li
                  key={mission}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={mission === value}
                  data-active={index === active}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => choose(mission)}
                >
                  {mission}
                  {mission === value && <Check aria-hidden="true" />}
                </li>
              ))}
            </ul>
            {!matches.length && <p role="status">{copy.noMissions}</p>}
          </div>
        </div>
        <button
          type="button"
          className={styles.dice}
          aria-label={copy.shuffleMission}
          title={copy.shuffleMission}
          onClick={() => {
            const alternatives = badgeMissions.filter((mission) => mission !== value);
            choose(alternatives[Math.floor(Math.random() * alternatives.length)]);
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 2 22 7.8 12 13.6 2 7.8Z" fill="currentColor" opacity=".64" />
            <path d="M2 7.8 12 13.6v8.9L2 16.7Z" fill="currentColor" opacity=".84" />
            <path d="M12 13.6 22 7.8v8.9L12 22.5Z" fill="currentColor" />
            <g className={styles.pips}>
              <ellipse cx="8.6" cy="7.8" rx="1.5" ry="1.04" />
              <ellipse cx="15.4" cy="7.8" rx="1.5" ry="1.04" />
              <ellipse cx="7" cy="15" rx="1.03" ry="1.4" transform="rotate(-30 7 15)" />
              <ellipse cx="14.9" cy="17.7" rx="1" ry="1.34" transform="rotate(30 14.9 17.7)" />
              <ellipse cx="17" cy="15.2" rx="1" ry="1.34" transform="rotate(30 17 15.2)" />
              <ellipse cx="19.1" cy="12.7" rx="1" ry="1.34" transform="rotate(30 19.1 12.7)" />
            </g>
          </svg>
        </button>
      </div>
      <span className="sr-only" role="status">
        {value}
      </span>
    </>
  );
}
