"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Check, Copy, Download } from "lucide-react";
import { PAGE_COPY } from "@/content/copy";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import ContentAction from "@/components/shared/ContentAction";
import ExternalLink from "@/components/shared/ExternalLink";
import SocialGlyph from "@/components/shared/SocialGlyph";
import { BADGE_SIZE, cleanBadgeText, drawBadge, type BadgeColor } from "./drawBadge";
import styles from "./BadgeMaker.module.css";

const copy = PAGE_COPY.badge;
const themes = PAGE_COPY.home.themes;
const date = `${EVENT_SHORT_DATE} ${EVENT.year}`;
const caption = copy.caption
  .replace("{{event}}", EVENT.name)
  .replace("{{date}}", date)
  .replace("{{city}}", EVENT.venue.city)
  .replace("{{url}}", EVENT.links.website)
  .replace("{{badgeUrl}}", new URL("/badge", EVENT.links.website).href);
// Each button opens that platform's own composer. LinkedIn and X accept the post text in the
// link; none of them accepts an image from a website, so the PNG is saved for attaching.
const composers = {
  linkedin: `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(caption)}`,
  x: `https://x.com/intent/post?text=${encodeURIComponent(caption)}`,
  instagram: "https://www.instagram.com/",
};
type Platform = keyof typeof composers;

type DrawingRequest = {
  name: string;
  affiliation: string;
  theme: (typeof themes)[number];
  photo: HTMLCanvasElement | null;
  logo: HTMLImageElement | null;
};
type PreparedBadge = { request: DrawingRequest; file: File; url: string; canShare: boolean };

export default function BadgeMaker() {
  const [name, setName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [themeId, setThemeId] = useState(themes[0].id);
  const [photo, setPhoto] = useState<HTMLCanvasElement | null>(null);
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [prepared, setPrepared] = useState<PreparedBadge | null>(null);
  const [renderError, setRenderError] = useState<DrawingRequest | null>(null);
  const [message, setMessage] = useState("");
  const [sharing, setSharing] = useState(false);
  const photoRequest = useRef(0);
  const theme = themes.find((theme) => theme.id === themeId)!;
  const request = useMemo(
    () => ({
      name: cleanBadgeText(name),
      affiliation: cleanBadgeText(affiliation),
      theme,
      photo,
      logo,
    }),
    [name, affiliation, theme, photo, logo],
  );
  const current = prepared?.request === request ? prepared : null;
  const ready = !!current && !!request.name && !photoLoading;
  const failed = renderError === request;

  useEffect(() => {
    let cancelled = false;
    const image = new window.Image();
    // Without the mark the badge still carries the chapter name as text.
    image.onload = () => {
      if (!cancelled) setLogo(image);
    };
    image.src = "/gdg-logo.png";
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        await document.fonts.ready;
        const family =
          getComputedStyle(document.documentElement)
            .getPropertyValue("--font-google-sans")
            .trim() || "sans-serif";
        await document.fonts.load(`600 72px ${family}`, request.name || copy.previewName);
        if (cancelled) return;
        const canvas = document.createElement("canvas");
        drawBadge(canvas, {
          ...request,
          name: request.name || copy.previewName,
          theme: request.theme.label,
          color: request.theme.color as BadgeColor,
          fontFamily: `${family}, sans-serif`,
          eventName: EVENT.name,
          date,
          city: EVENT.venue.city,
          venue: EVENT.venue.name,
          organizer: "Google Developer Group",
          chapter: EVENT.venue.city,
          website: new URL(EVENT.links.website).host,
          attending: copy.attending,
        });
        const blob = await new Promise<Blob>((resolve, reject) =>
          canvas.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error("PNG export failed"))),
            "image/png",
          ),
        );
        if (cancelled) return;
        // The file is ready before the click, preserving mobile share-sheet activation.
        const file = new File([blob], `devfest-indore-${EVENT.year}-badge.png`, {
          type: "image/png",
        });
        let canShare = false;
        try {
          canShare = !!navigator.canShare?.({ files: [file] });
        } catch {
          /* Download remains available. */
        }
        setPrepared({ request, file, url: URL.createObjectURL(file), canShare });
      } catch {
        if (!cancelled) setRenderError(request);
      }
    }
    void render();
    return () => {
      cancelled = true;
    };
  }, [request]);

  useEffect(
    () => () => {
      photoRequest.current++;
    },
    [],
  );

  useEffect(() => {
    if (!prepared) return;
    return () => URL.revokeObjectURL(prepared.url);
  }, [prepared]);

  async function choosePhoto(file: File | undefined) {
    if (!file) return;
    const id = ++photoRequest.current;
    setPhotoError("");
    setPhotoLoading(false);
    setMessage("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setPhotoError(copy.photoError);
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setPhotoError(copy.photoSizeError);
      return;
    }
    setPhotoLoading(true);
    const url = URL.createObjectURL(file);
    try {
      const image = new window.Image();
      image.src = url;
      await image.decode();
      if (id !== photoRequest.current) return;
      const crop = document.createElement("canvas");
      crop.width = crop.height = 768;
      const context = crop.getContext("2d");
      if (!context) throw new Error("Canvas is unavailable");
      const side = Math.min(image.naturalWidth, image.naturalHeight);
      if (!side) throw new Error("Empty image");
      context.drawImage(
        image,
        (image.naturalWidth - side) / 2,
        (image.naturalHeight - side) / 2,
        side,
        side,
        0,
        0,
        768,
        768,
      );
      setPhoto(crop);
    } catch {
      if (id === photoRequest.current) setPhotoError(copy.photoError);
    } finally {
      URL.revokeObjectURL(url);
      if (id === photoRequest.current) setPhotoLoading(false);
    }
  }

  function save(file: File) {
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = file.name;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
  }

  function download() {
    if (!ready || !current) return;
    save(current.file);
    setMessage(copy.downloadSuccess);
  }

  // Phones hand the image and caption to the chosen app. Elsewhere the platform's composer
  // opens in a new tab, the badge is saved and the caption copied.
  async function post(platform: Platform) {
    if (!ready || !current || sharing) return;
    setMessage("");
    if (current.canShare) {
      setSharing(true);
      try {
        await navigator.share({ files: [current.file], title: EVENT.name, text: caption });
        setMessage(copy.shareSuccess);
      } catch (error) {
        if (!(error instanceof DOMException && error.name === "AbortError"))
          setMessage(copy.shareError);
      } finally {
        setSharing(false);
      }
      return;
    }
    // Opened first, while the click still counts as the user's action, so it is not blocked.
    window.open(composers[platform], "_blank", "noopener,noreferrer");
    save(current.file);
    let copied = true;
    try {
      await navigator.clipboard.writeText(caption);
    } catch {
      copied = false;
    }
    setMessage(copy.posted[platform][copied ? "copied" : "saved"]);
  }

  async function copyCaption() {
    try {
      await navigator.clipboard.writeText(caption);
      setMessage(copy.copySuccess);
    } catch {
      setMessage(copy.copyError);
      const field = document.getElementById("badge-caption") as HTMLTextAreaElement | null;
      field?.focus();
      field?.select();
    }
  }

  return (
    <section className={`audience-wrap ${styles.layout}`} aria-label={copy.detailsTitle}>
      <figure className={styles.preview} aria-busy={!current && !failed}>
        <div className={styles.canvasStage}>
          {/* An image, not a canvas, so a long press saves it where downloads are blocked. */}
          {prepared ? (
            <Image
              className={styles.canvas}
              src={prepared.url}
              width={BADGE_SIZE.width}
              height={BADGE_SIZE.height}
              unoptimized
              alt={`${prepared.request.name || copy.previewName} · ${copy.attending} ${EVENT.name} · ${date} · ${EVENT.venue.city} · ${prepared.request.theme.label}`}
            />
          ) : (
            <div
              className={`${styles.canvas} ${styles.placeholder}`}
              role="img"
              aria-label={copy.previewLabel}
            />
          )}
        </div>
        <figcaption>
          {copy.previewHint}{" "}
          <span>
            {BADGE_SIZE.width} × {BADGE_SIZE.height} PNG
          </span>
        </figcaption>
      </figure>
      <div className={styles.controls}>
        <h2>{copy.detailsTitle}</h2>
        <div className={styles.field}>
          <label htmlFor="badge-name">{copy.nameLabel}</label>
          <input
            id="badge-name"
            autoComplete="off"
            autoCapitalize="words"
            enterKeyHint="done"
            maxLength={64}
            placeholder={copy.namePlaceholder}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setMessage("");
            }}
            aria-describedby="badge-export-status"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="badge-affiliation">{copy.affiliationLabel}</label>
          <input
            id="badge-affiliation"
            autoComplete="off"
            maxLength={80}
            placeholder={copy.affiliationPlaceholder}
            value={affiliation}
            onChange={(event) => {
              setAffiliation(event.target.value);
              setMessage("");
            }}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="badge-photo">{copy.photoLabel}</label>
          <input
            id="badge-photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            aria-describedby="badge-photo-hint badge-privacy"
            onChange={(event) => {
              void choosePhoto(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
          <p id="badge-photo-hint" className={styles.hint}>
            {copy.photoHint}
          </p>
          {(photo || photoLoading) && (
            <button
              type="button"
              className={styles.textButton}
              onClick={() => {
                photoRequest.current++;
                setPhoto(null);
                setPhotoLoading(false);
                setPhotoError("");
                setMessage("");
              }}
            >
              {copy.photoRemove}
            </button>
          )}
          <p role="status" className={styles.hint}>
            {photoLoading ? copy.photoLoading : photoError}
          </p>
        </div>
        <fieldset className={styles.choices}>
          <legend>{copy.themeLabel}</legend>
          <div className={styles.themeGrid}>
            {themes.map((option) => (
              <label key={option.id} className={styles.choice}>
                <input
                  type="radio"
                  name="badge-theme"
                  value={option.id}
                  checked={themeId === option.id}
                  onChange={() => {
                    setThemeId(option.id);
                    setMessage("");
                  }}
                />
                <span className={`${styles.swatch} ${styles[option.color]}`} aria-hidden="true" />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <p id="badge-privacy" className={styles.hint}>
          {copy.photoPrivacy}
        </p>
        <p className={styles.hint}>
          {copy.conduct}{" "}
          <ExternalLink href={EVENT.links.codeOfConduct} className="audience-text-link">
            {copy.conductLink}
          </ExternalLink>
        </p>
      </div>
      <div className={styles.share}>
        <div className={styles.actions}>
          <button type="button" onClick={download} disabled={!ready}>
            <Download aria-hidden="true" />
            {copy.download}
          </button>
          <button
            type="button"
            className={styles.linkedin}
            onClick={() => void post("linkedin")}
            disabled={!ready || sharing}
            aria-describedby="badge-share-hint"
          >
            <SocialGlyph platform="linkedin" />
            {copy.linkedin}
          </button>
          <button
            type="button"
            className={styles.instagram}
            onClick={() => void post("instagram")}
            disabled={!ready || sharing}
            aria-describedby="badge-share-hint"
          >
            <SocialGlyph platform="instagram" />
            {copy.instagram}
          </button>
          <button
            type="button"
            className={styles.x}
            onClick={() => void post("x")}
            disabled={!ready || sharing}
            aria-describedby="badge-share-hint"
          >
            <SocialGlyph platform="x" />
            {copy.x}
          </button>
        </div>
        <p id="badge-export-status" className={styles.hint} role="status">
          {failed
            ? copy.renderError
            : !request.name
              ? copy.nameRequired
              : !current
                ? copy.preparing
                : ""}
        </p>
        <p id="badge-share-hint" className={styles.hint}>
          {current?.canShare ? copy.shareHint : copy.shareUnavailable}
        </p>
        <div className={styles.captionHeading}>
          <label htmlFor="badge-caption">{copy.captionLabel}</label>
          <button type="button" className={styles.textButton} onClick={() => void copyCaption()}>
            {message === copy.copySuccess ? (
              <Check aria-hidden="true" />
            ) : (
              <Copy aria-hidden="true" />
            )}
            {copy.copy}
          </button>
        </div>
        <textarea id="badge-caption" className={styles.caption} value={caption} readOnly rows={3} />
        <p className={styles.feedback} role="status">
          {message}
        </p>
        <div className={styles.ticketNote}>
          <p>{copy.ticketNote}</p>
          <ContentAction href="/tickets" icon="tickets" tone="blue">
            {copy.ticketAction}
          </ContentAction>
        </div>
      </div>
    </section>
  );
}
