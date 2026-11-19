"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Check, Copy, Download, Share2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { PAGE_COPY } from "@/content/copy";
import { EVENT, EVENT_SHORT_DATE } from "@/content/event";
import ExternalLink from "@/components/shared/ExternalLink";
import {
  BADGE_NAME_LIMIT,
  BADGE_PHOTO_SIZE,
  BADGE_SIZE,
  cleanBadgeText,
  drawBadge,
} from "./drawBadge";
import { badgeMissions } from "@/content/badgeMissions";
import MissionPicker from "./MissionPicker";
import styles from "./BadgeMaker.module.css";

const copy = PAGE_COPY.badge;
const badgeFilename = `devfest-indore-${EVENT.year}-badge.png`;
const date = `${EVENT_SHORT_DATE} ${EVENT.year}`;
const baseCaption = copy.caption
  .replace("{{event}}", EVENT.name)
  .replace("{{date}}", date)
  .replace("{{city}}", EVENT.venue.city)
  .replace("{{url}}", EVENT.links.website)
  .replace("{{badgeUrl}}", new URL("/badge", EVENT.links.website).href);

type DrawingRequest = {
  theme: ReturnType<typeof useTheme>["theme"];
  mission: string;
  name: string;
  headline: string;
  organisation: string;
  city: string;
  photo: HTMLCanvasElement | null;
  helmet: HTMLImageElement | null;
  eventLogo: HTMLImageElement | null;
  logo: HTMLImageElement | null;
};
type PreparedBadge = { request: DrawingRequest; file: File | null; url: string; canShare: boolean };

export default function BadgeMaker() {
  const { theme } = useTheme();
  const [mission, setMission] = useState<(typeof badgeMissions)[number]>(badgeMissions[0]);
  const caption = `${copy.missionLabel}: ${mission}\n\n${baseCaption}`;
  const [name, setName] = useState(() => {
    if (typeof window === "undefined") return copy.defaultName;
    const preset = new URLSearchParams(window.location.search).get("name") ?? "";
    return cleanBadgeText(preset).slice(0, BADGE_NAME_LIMIT) || copy.defaultName;
  });
  const [headline, setHeadline] = useState<string>(copy.defaultDesignation);
  const [city, setCity] = useState(EVENT.venue.city);
  const [organisation, setOrganisation] = useState<string>(copy.defaultOrganisation);
  const [photo, setPhoto] = useState<HTMLCanvasElement | null>(null);
  const [helmet, setHelmet] = useState<HTMLImageElement | null>(null);
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
  const captionDetails = useRef<HTMLDetailsElement>(null);
  const captionField = useRef<HTMLTextAreaElement>(null);
  const request = useMemo(
    () => ({
      theme,
      name: cleanBadgeText(name).slice(0, BADGE_NAME_LIMIT),
      headline: cleanBadgeText(headline),
      city: cleanBadgeText(city),
      organisation: cleanBadgeText(organisation),
      mission,
      photo,
      helmet,
      eventLogo,
      logo,
    }),
    [theme, name, headline, organisation, city, mission, photo, helmet, logo, eventLogo],
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
    const helmetImage = new window.Image();
    helmetImage.onload = () => {
      if (!cancelled) setHelmet(helmetImage);
    };
    helmetImage.src = "/images/badge/astronaut.png";
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

  async function shareImage() {
    if (!ready || !current?.canShare || !current.file || sharing) return;
    setSharing(true);
    setMessage("");
    try {
      await navigator.share({ files: [current.file], title: EVENT.name, text: caption });
      setMessage(copy.shareSuccess);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        setMessage(copy.shareError);
      }
    } finally {
      setSharing(false);
    }
  }

  async function copyCaption() {
    try {
      await navigator.clipboard.writeText(caption);
      setMessage(copy.copySuccess);
    } catch {
      setMessage(copy.copyError);
      if (captionDetails.current) captionDetails.current.open = true;
      captionField.current?.focus();
      captionField.current?.select();
    }
  }

  return (
    <section className={`audience-wrap ${styles.layout}`} aria-label={copy.detailsTitle}>
      <div className={styles.fields}>
        <div className={styles.fieldPair}>
          <div className={styles.field}>
            <label htmlFor="badge-name">{copy.nameLabel}</label>
            <input
              id="badge-name"
              autoComplete="off"
              autoCapitalize="words"
              enterKeyHint="done"
              maxLength={BADGE_NAME_LIMIT}
              placeholder={copy.namePlaceholder}
              value={name}
              onFocus={(event) => {
                if (name === copy.defaultName) event.currentTarget.select();
              }}
              onChange={(event) => {
                setName(event.target.value);
                setMessage("");
              }}
              required
              aria-describedby="badge-export-status"
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="badge-city">{copy.cityLabel}</label>
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
        </div>
        <div className={styles.fieldPair}>
          <div className={styles.field}>
            <label htmlFor="badge-headline">{copy.designationLabel}</label>
            <input
              id="badge-headline"
              autoComplete="off"
              maxLength={48}
              placeholder="B.Tech CSE, Android developer…"
              value={headline}
              onFocus={(event) => {
                if (headline === copy.defaultDesignation) event.currentTarget.select();
              }}
              onChange={(event) => {
                setHeadline(event.target.value);
                setMessage("");
              }}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="badge-organisation">{copy.organisationLabel}</label>
            <input
              id="badge-organisation"
              autoComplete="off"
              maxLength={48}
              placeholder="Your college or company"
              value={organisation}
              onFocus={(event) => {
                if (organisation === copy.defaultOrganisation) event.currentTarget.select();
              }}
              onChange={(event) => {
                setOrganisation(event.target.value);
                setMessage("");
              }}
            />
          </div>
        </div>
        <div className={styles.field}>
          <label htmlFor="badge-photo">{copy.photoLabel}</label>
          <input
            id="badge-photo"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            aria-describedby="badge-photo-hint"
            onChange={(event) => {
              void choosePhoto(event.target.files?.[0]);
              event.target.value = "";
            }}
          />
          <p id="badge-photo-hint" className={styles.hint}>
            {copy.photoPrivacy}
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
        <div className={styles.field}>
          <label htmlFor="badge-mission">{copy.missionLabel}</label>
          <MissionPicker
            value={mission}
            onChange={(next) => {
              setMission(next);
              setMessage("");
            }}
          />
        </div>
        <ExternalLink href={EVENT.links.codeOfConduct} className="audience-text-link">
          {copy.conductLink}
        </ExternalLink>
      </div>
      <div className={styles.output}>
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
              <div className={styles.canvas} role="img" aria-label={copy.previewLabel} />
            )}
          </div>
        </figure>
        <div className={styles.actions}>
          <button type="button" className={styles.download} onClick={download} disabled={!ready}>
            <Download aria-hidden="true" />
            {copy.download}
          </button>
          {current?.canShare && (
            <button type="button" onClick={() => void shareImage()} disabled={!ready || sharing}>
              <Share2 aria-hidden="true" />
              {copy.shareLabel}
            </button>
          )}
          <button type="button" onClick={() => void copyCaption()}>
            {message === copy.copySuccess ? (
              <Check aria-hidden="true" />
            ) : (
              <Copy aria-hidden="true" />
            )}
            {copy.copy}
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
        <p className={styles.feedback} role="status">
          {message}
        </p>
        <details className={styles.disclosure} ref={captionDetails}>
          <summary>{copy.shareOptionsLabel}</summary>
          <div className={styles.disclosureBody}>
            <textarea
              id="badge-caption"
              ref={captionField}
              aria-label={copy.captionLabel}
              className={styles.caption}
              value={caption}
              readOnly
              rows={3}
            />
          </div>
        </details>
      </div>
    </section>
  );
}
