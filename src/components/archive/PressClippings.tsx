"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { PRESS_CLIPPINGS, type PressClipping } from "@/content/gallery";
import { ARCHIVE_PAGE as copy } from "@/content/pages";
import styles from "./PressClippings.module.css";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function source(item: PressClipping) {
  const published = item.date ? dateFormat.format(new Date(item.date)) : undefined;
  return [item.publication, published].filter(Boolean).join(" · ");
}

export default function PressClippings() {
  const [selected, setSelected] = useState<PressClipping | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  function open(item: PressClipping) {
    setSelected(item);
    dialog.current?.showModal();
  }
  return (
    <>
      <p className={styles.lead}>{copy.pressLead}</p>
      <ul className={styles.grid}>
        {PRESS_CLIPPINGS.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className={styles.open}
              onClick={() => open(item)}
              aria-label={`${copy.pressViewLabel}: ${item.title}`}
            >
              <span className={styles.thumb}>
                <Image
                  src={item.imageUrl}
                  alt=""
                  fill
                  sizes="(max-width: 620px) 90vw, (max-width: 980px) 45vw, 300px"
                />
              </span>
              <span className={styles.event}>{item.event}</span>
              <span className={styles.title}>{item.title}</span>
              {source(item) && <span className={styles.source}>{source(item)}</span>}
            </button>
          </li>
        ))}
      </ul>
      <dialog
        ref={dialog}
        className="community-dialog"
        aria-label={selected?.title ?? copy.pressTitle}
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <button
          autoFocus
          className="community-dialog-close"
          onClick={() => dialog.current?.close()}
          aria-label="Close clipping"
        >
          <X aria-hidden="true" />
          Close
        </button>
        {selected && (
          <figure>
            <Image
              src={selected.imageUrl}
              alt={`${selected.title}${source(selected) ? `, ${source(selected)}` : ""}`}
              width={selected.width}
              height={selected.height}
              sizes="90vw"
            />
            <figcaption>
              {selected.event}
              {source(selected) ? ` · ${source(selected)}` : ""}
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}
