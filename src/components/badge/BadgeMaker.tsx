"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Check, Copy, Download, Share2 } from "lucide-react";
import { PAGE_COPY } from "@/content/copy";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import ContentAction from "@/components/shared/ContentAction";
import ExternalLink from "@/components/shared/ExternalLink";
import SocialGlyph from "@/components/shared/SocialGlyph";
import { BADGE_PHOTO_SIZE, BADGE_SIZE, cleanBadgeText, drawBadge } from "./drawBadge";
import { badgeMissions } from "@/content/badgeMissions";
import styles from "./BadgeMaker.module.css";

const copy = PAGE_COPY.badge;
// Editable starting values; focusing a field selects them so typing replaces them.
const DEFAULT_HEADLINE = "Software Engineer";
const DEFAULT_ORGANISATION = "Developer community";

const badgeFilename = `devfest-indore-${EVENT.year}-badge.png`;
const date = `${EVENT_SHORT_DATE} ${EVENT.year}`;
const baseCaption = copy.caption
  .replace("{{event}}", EVENT.name)
  .replace("{{date}}", date)
  .replace("{{city}}", EVENT.venue.city)
  .replace("{{url}}", EVENT.links.website)
  .replace("{{badgeUrl}}", new URL("/badge", EVENT.links.website).href);
// Each button opens that platform's own composer. LinkedIn and X accept the post text in the
// link; none of them accepts an image from a website, so the PNG is saved for attaching.
type Platform = "linkedin" | "x" | "instagram";

type DrawingRequest = {
  mission: string;
  name: string;
  headline: string;
  organisation: string;
  city: string;
  photo: HTMLCanvasElement | null;
  astronaut: HTMLImageElement | null;
  eventLogo: HTMLImageElement | null;
  logo: HTMLImageElement | null;
};
type PreparedBadge = { request: DrawingRequest; file: File | null; url: string; canShare: boolean };

export default function BadgeMaker() {
  const [missionIndex, setMissionIndex] = useState(0);
  const mission = badgeMissions[missionIndex];
  const caption = `My DevFest mission: ${mission}\n\n${baseCaption}`;
  const composers = {
    linkedin: `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(caption)}`,
    x: `https://x.com/intent/post?text=${encodeURIComponent(caption)}`,
    instagram: "https://www.instagram.com/",
  };
  const [name, setName] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("name") || "";
  });
  const [headline, setHeadline] = useState(DEFAULT_HEADLINE);
  const [city, setCity] = useState("Indore");
  const [organisation, setOrganisation] = useState(DEFAULT_ORGANISATION);
  const [photo, setPhoto] = useState<HTMLCanvasElement | null>(null);
  const [astronaut, setAstronaut] = useState<HTMLImageElement | null>(null);
  const [eventLogo, setEventLogo] = useState<HTMLImageElement | null>(null);
  const [fontReady, setFontReady] = useState(false);
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  const [photoLoading, setPhotoLoading] = useState(false);
  const [photoError, setPhotoError] = useState("");
  const [prepared, setPrepared] = useState<PreparedBadge | null>(null);
  const [renderError, setRenderError] = useState<DrawingRequest | null>(null);
  const [message, setMessage] = useState("");
  const [sharing, setSharing] = useState(false);
  const photoRequest = useRef(0);
  const request = useMemo(
    () => ({
      name: cleanBadgeText(name),
      headline: cleanBadgeText(headline),
      city: cleanBadgeText(city),
      organisation: cleanBadgeText(organisation),
      mission,
      photo,
      astronaut,
      eventLogo,
      logo,
    }),
    [name, headline, organisation, city, mission, photo, logo, eventLogo, astronaut],
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
    image.src = "/images/badge/gdg-indore.png";
    const eventImage = new window.Image();
    eventImage.onload = () => {
      if (!cancelled) setEventLogo(eventImage);
    };
    eventImage.src = "/images/badge/devfest-indore-2026.png";
    const helmet = new window.Image();
    helmet.onload = () => {
      if (!cancelled) setAstronaut(helmet);
    };
    helmet.src = "/images/badge/astronaut.png";
    document.fonts?.ready.then(() => {
      if (!cancelled) setFontReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const family =
          getComputedStyle(document.documentElement)
            .getPropertyValue("--font-google-sans")
            .trim() || "sans-serif";
        if (cancelled) return;
        const canvas = document.createElement("canvas");
        drawBadge(canvas, {
          ...request,
          name: request.name || copy.previewName,
          fontFamily: `${family}, sans-serif`,
          eventName: EVENT.name,
          dateLine: `${date} · ${EVENT.venue.city}`,
        });
        const blob = await new Promise<Blob>((resolve, reject) =>
          canvas.toBlob(
            (blob) => (blob ? resolve(blob) : reject(new Error("PNG export failed"))),
            "image/png",
          ),
        );
        if (cancelled) return;
        // The file is ready before the click, preserving mobile share-sheet activation.
        let file: File | null = null;
        let canShare = false;
        try {
          file = new File([blob], badgeFilename, { type: "image/png" });
          canShare = !!navigator.canShare?.({ files: [file] });
        } catch {
          /* File sharing is optional. Preview and download use the PNG blob. */
        }
        setPrepared({ request, file, url: URL.createObjectURL(blob), canShare });
      } catch {
        if (!cancelled) setRenderError(request);
      }
    }
    void render();
    return () => {
      cancelled = true;
    };
  }, [request, fontReady]);

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
      crop.width = BADGE_PHOTO_SIZE;
      crop.height = BADGE_PHOTO_SIZE;
      const context = crop.getContext("2d");
      if (!context) throw new Error("Canvas is unavailable");
      const scale = Math.max(crop.width / image.naturalWidth, crop.height / image.naturalHeight);
      const w = image.naturalWidth * scale;
      const h = image.naturalHeight * scale;
      context.drawImage(image, (crop.width - w) / 2, (crop.height - h) * 0.35, w, h);
      setPhoto(crop);
    } catch {
      if (id === photoRequest.current) setPhotoError(copy.photoError);
    } finally {
      URL.revokeObjectURL(url);
      if (id === photoRequest.current) setPhotoLoading(false);
    }
  }

  function save(url: string) {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = badgeFilename;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
  }

  function download() {
    if (!ready || !current) return;
    save(current.url);
    setMessage(copy.downloadSuccess);
  }

  // Phones hand the image and caption to the chosen app. Elsewhere the platform's composer
  // opens in a new tab, the badge is saved and the caption copied.
  async function post(platform?: Platform) {
    if (!ready || !current || sharing) return;
    setMessage("");
    if (current.canShare && current.file) {
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
    if (!platform) return;
    window.open(composers[platform], "_blank", "noopener,noreferrer");
    save(current.url);
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
              alt={`${prepared.request.name || copy.previewName} · ${copy.attending} ${EVENT.name}`}
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
          <label htmlFor="badge-headline">Designation or course (optional)</label>
          <input
            id="badge-headline"
            autoComplete="off"
            maxLength={48}
            placeholder="B.Tech CSE, Android developer…"
            value={headline}
            onFocus={(event) => event.target.select()}
            onChange={(event) => {
              setHeadline(event.target.value);
              setMessage("");
            }}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="badge-organisation">College or company (optional)</label>
          <input
            id="badge-organisation"
            autoComplete="off"
            maxLength={48}
            placeholder="Your college or company"
            value={organisation}
            onFocus={(event) => event.target.select()}
            onChange={(event) => {
              setOrganisation(event.target.value);
              setMessage("");
            }}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="badge-city">City you’re travelling from (optional)</label>
          <input
            id="badge-city"
            autoComplete="address-level2"
            maxLength={48}
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              setMessage("");
            }}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor="badge-mission">What’s your DevFest mission?</label>
          <select
            id="badge-mission"
            value={missionIndex}
            onChange={(event) => {
              setMissionIndex(event.target.selectedIndex);
              setMessage("");
            }}
          >
            {badgeMissions.map((line, index) => (
              <option key={line} value={index}>
                {line}
              </option>
            ))}
          </select>
          <button
            type="button"
            className={styles.textButton}
            onClick={() => {
              setMissionIndex(
                (current) =>
                  (current + 1 + Math.floor(Math.random() * (badgeMissions.length - 1))) %
                  badgeMissions.length,
              );
              setMessage("");
            }}
          >
            Shuffle mission
          </button>
          <span className="sr-only" role="status">
            {mission}
          </span>
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
          {current?.canShare && (
            <button type="button" onClick={() => void post()} disabled={!ready || sharing}>
              <Share2 aria-hidden="true" />
              Share badge
            </button>
          )}
          <button type="button" onClick={download} disabled={!ready}>
            <Download aria-hidden="true" />
            {copy.download}
          </button>
          {!current?.canShare &&
            (Object.keys(composers) as Platform[]).map((platform) => (
              <button
                key={platform}
                type="button"
                disabled={!ready}
                onClick={() => void post(platform)}
              >
                <SocialGlyph platform={platform} />
                {copy[platform]}
              </button>
            ))}
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
