export const BADGE_SIZE = { width: 1080, height: 1080 } as const;
export const BADGE_NAME_LIMIT = 64;
/** The square crop fills the helmet visor. */
export const BADGE_PHOTO_SIZE = 900;

type BadgeDrawing = {
  theme: "light" | "dark";
  mission: string;
  name: string;
  headline: string;
  organisation: string;
  city: string;
  eventName: string;
  /** Shown in the footer, for example "28 November 2026 · Indore". */
  dateLine?: string;
  fontFamily: string;
  photo: HTMLCanvasElement | null;
  helmet: HTMLImageElement | null;
  eventLogo: HTMLImageElement | null;
  logo: HTMLImageElement | null;
};

export function cleanBadgeText(text: string) {
  return text
    .normalize("NFKC")
    .replace(/[\u0000-\u001f\u007f-\u009f‪-‮⁦-⁩]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const words = text.split(" ");
  const rows: string[] = [];
  let row = "";
  for (const word of words) {
    const next = row ? `${row} ${word}` : word;
    if (ctx.measureText(next).width <= maxWidth) {
      row = next;
      continue;
    }
    if (row) rows.push(row);
    row = "";
    for (const character of word) {
      if (row && ctx.measureText(row + character).width > maxWidth) {
        rows.push(row);
        row = "";
      }
      row += character;
    }
  }
  if (row) rows.push(row);
  return rows;
}

const GOOGLE_COLORS = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"] as const;

const palettes = {
  light: {
    background: "#fff",
    ink: "#202124",
    muted: "#50555a",
    action: "#185abc",
    orbit: "#d7e3f5",
    visor: "#dbe7fb",
    initials: "#315678",
    footer: "#f3f7ff",
    rule: "#c5d7f2",
    landmark: "#506e98",
  },
  dark: {
    background: "#10141d",
    ink: "#f1f3f4",
    muted: "#bdc5d3",
    action: "#a8c7fa",
    orbit: "#354b70",
    visor: "#24395d",
    initials: "#e9efff",
    footer: "#192230",
    rule: "#465566",
    landmark: "#a8c7fa",
  },
};

type LogoRegion = readonly [x: number, y: number, width: number, height: number];

const devFestWordmark: LogoRegion = [46, 0, 275, 56];
const gdgWordmark: LogoRegion = [200, 32, 542, 89];
const gdgArtwork: LogoRegion = [45, 36, 690, 80];
const reversedLockups = new WeakMap<HTMLImageElement, HTMLCanvasElement>();

function reverseWordmark(image: HTMLImageElement, region: LogoRegion) {
  const cached = reversedLockups.get(image);
  if (cached) return cached;

  const canvas = image.ownerDocument.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) return image;

  ctx.drawImage(image, 0, 0);
  const [x, y, width, height] = region;
  const pixels = ctx.getImageData(x, y, width, height);
  // Preserve the original wordmark's alpha, letter shapes and spacing.
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i] = 241;
    pixels.data[i + 1] = 243;
    pixels.data[i + 2] = 244;
  }
  ctx.putImageData(pixels, x, y);
  reversedLockups.set(image, canvas);
  return canvas;
}

function drawLockup(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  width: number,
  reverse: LogoRegion | false,
  artwork: LogoRegion = [0, 0, image.naturalWidth, image.naturalHeight],
) {
  const [sourceX, sourceY, sourceWidth, sourceHeight] = artwork;
  const height = (width * sourceHeight) / sourceWidth;
  const y = 88 - height / 2;
  const source = reverse ? reverseWordmark(image, reverse) : image;
  ctx.drawImage(source, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

/** A small line drawing of Rajwada's central gateway and flanking towers. */
function drawRajwada(ctx: CanvasRenderingContext2D, x: number, y: number, color: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(1, 38);
  ctx.lineTo(1, 17);
  ctx.lineTo(6, 17);
  ctx.quadraticCurveTo(7, 6, 13, 5);
  ctx.quadraticCurveTo(19, 6, 20, 17);
  ctx.lineTo(26, 17);
  ctx.lineTo(26, 9);
  ctx.quadraticCurveTo(32, -4, 38, 9);
  ctx.lineTo(38, 17);
  ctx.lineTo(44, 17);
  ctx.quadraticCurveTo(45, 6, 51, 5);
  ctx.quadraticCurveTo(57, 6, 58, 17);
  ctx.lineTo(63, 17);
  ctx.lineTo(63, 38);
  ctx.closePath();
  ctx.moveTo(26, 38);
  ctx.lineTo(26, 30);
  ctx.quadraticCurveTo(32, 19, 38, 30);
  ctx.lineTo(38, 38);
  for (const column of [10, 19, 45, 54]) {
    ctx.moveTo(column, 24);
    ctx.lineTo(column, 30);
  }
  ctx.stroke();
  ctx.restore();
}

export function drawBadge(canvas: HTMLCanvasElement, badge: BadgeDrawing) {
  const { width, height } = BADGE_SIZE;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable");
  ctx.imageSmoothingQuality = "high";
  const family = badge.fontFamily;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  const palette = palettes[badge.theme];
  const { ink, muted, action } = palette;
  const dark = badge.theme === "dark";
  const margin = 56;
  const cornerRadius = 40;
  const borderWidth = 12;
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, cornerRadius);
  ctx.clip();
  ctx.fillStyle = palette.background;
  ctx.fillRect(0, 0, width, height);

  // Header: the two lockups share one centre line.
  if (badge.eventLogo) {
    drawLockup(ctx, badge.eventLogo, margin, 360, dark && devFestWordmark);
  } else {
    ctx.fillStyle = ink;
    ctx.font = `600 40px ${family}`;
    ctx.fillText(badge.eventName, margin, 102);
  }
  if (badge.logo) {
    const logoWidth = 432;
    drawLockup(
      ctx,
      badge.logo,
      width - margin - logoWidth,
      logoWidth,
      dark && gdgWordmark,
      gdgArtwork,
    );
  } else {
    ctx.fillStyle = ink;
    ctx.font = `500 32px ${family}`;
    ctx.textAlign = "right";
    ctx.fillText("GDG Indore", width - margin, 99);
    ctx.textAlign = "left";
  }

  const textWidth = width - 2 * margin;
  ctx.fillStyle = palette.orbit;
  ctx.fillRect(margin, 164, textWidth, 2);

  // A single orbit frames the helmet, whose visor holds the attendee's portrait.
  const artX = 286;
  const artY = 506;
  ctx.beginPath();
  ctx.ellipse(artX, artY, 246, 68, -0.16, 0, Math.PI * 2);
  ctx.strokeStyle = palette.orbit;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.save();
  ctx.beginPath();
  let portraitX = artX;
  let portraitY = artY;
  let radius = 188;
  if (badge.helmet) {
    // The path follows the inner edge of the visor in the 399 × 397 source artwork.
    const scale = 1.5;
    ctx.translate(12, 205);
    ctx.scale(scale, scale);
    ctx.drawImage(badge.helmet, 0, 0, 399, 397);
    ctx.moveTo(123, 166);
    ctx.bezierCurveTo(138, 112, 190, 68, 240, 70);
    ctx.bezierCurveTo(290, 66, 327, 102, 347, 148);
    ctx.bezierCurveTo(368, 190, 371, 245, 348, 285);
    ctx.bezierCurveTo(339, 304, 332, 307, 306, 304);
    ctx.bezierCurveTo(248, 305, 154, 280, 129, 227);
    ctx.bezierCurveTo(120, 209, 116, 190, 123, 166);
    ctx.closePath();
    portraitX = 243;
    portraitY = 187;
    radius = 125;
  } else {
    ctx.arc(portraitX, portraitY, radius, 0, Math.PI * 2);
  }
  ctx.save();
  ctx.fillStyle = palette.visor;
  ctx.fill();
  ctx.clip();
  ctx.textAlign = "center";
  if (badge.photo) {
    ctx.drawImage(badge.photo, portraitX - radius, portraitY - radius, radius * 2, radius * 2);
  } else {
    const words = badge.name.split(" ");
    const initials = [words[0], ...words.slice(1).slice(-1)]
      .map((word) => Array.from(word)[0])
      .join("")
      .toLocaleUpperCase();
    ctx.font = `500 ${radius * 0.74}px ${family}`;
    ctx.textBaseline = "middle";
    ctx.fillStyle = palette.initials;
    ctx.fillText(initials, portraitX, portraitY, radius * 1.6);
  }
  ctx.restore();
  ctx.strokeStyle = action;
  ctx.lineWidth = badge.helmet ? 4 : 8;
  ctx.stroke();
  ctx.restore();

  // Align the identity beside the helmet, with enough height for long names and affiliations.
  const footerTop = 800;
  const identityX = 590;
  const identityWidth = width - margin - identityX;
  const headlineSize = 76;
  let size = headlineSize;
  ctx.font = `600 ${size}px ${family}`;
  let lines = wrap(ctx, badge.name, identityWidth);
  while (lines.length > 3 && size > 38) {
    size -= 2;
    ctx.font = `600 ${size}px ${family}`;
    lines = wrap(ctx, badge.name, identityWidth);
  }
  const lastPart = badge.organisation.split(/[,·]/).pop()?.trim();
  const city =
    lastPart?.localeCompare(badge.city, undefined, { sensitivity: "base" }) === 0 ? "" : badge.city;
  const affiliation = [badge.organisation, city].filter(Boolean).join(" · ");
  ctx.font = `500 36px ${family}`;
  const headlineLines = wrap(ctx, badge.headline, identityWidth);
  ctx.font = `500 32px ${family}`;
  const affiliationLines = wrap(ctx, affiliation, identityWidth);
  const identity = [
    { lines: ["I’m attending"], size: 34, weight: 600, color: action, gap: 0 },
    { lines, size, weight: 600, color: ink, gap: 22 },
    { lines: headlineLines, size: 36, weight: 500, color: action, gap: 24 },
    { lines: affiliationLines, size: 32, weight: 500, color: muted, gap: 12 },
  ].filter((group) => group.lines.length);
  const leading = 1.12;
  const blockHeight = identity.reduce(
    (height, group) => height + group.gap + group.lines.length * group.size * leading,
    0,
  );
  const fit = Math.min(1, ((footerTop - artY - 24) * 2) / blockHeight);
  let y = artY - (blockHeight * fit) / 2;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  for (const group of identity) {
    const fontSize = group.size * fit;
    const lineHeight = fontSize * leading;
    y += group.gap * fit;
    ctx.fillStyle = group.color;
    ctx.font = `${group.weight} ${fontSize}px ${family}`;
    for (const line of group.lines) {
      ctx.fillText(line, identityX, y + lineHeight / 2, identityWidth);
      y += lineHeight;
    }
  }

  // Give the mission and event details separate rows.
  ctx.fillStyle = palette.footer;
  ctx.fillRect(0, footerTop, width, height - footerTop);

  ctx.textBaseline = "alphabetic";
  ctx.textAlign = "left";
  ctx.fillStyle = action;
  ctx.font = `600 29px ${family}`;
  ctx.fillText("Mission", margin, footerTop + 34);
  ctx.fillStyle = ink;
  let missionSize = headlineSize;
  ctx.font = `600 ${missionSize}px ${family}`;
  let missionLines = wrap(ctx, badge.mission, textWidth);
  while (missionLines.length > 2 && missionSize > 38) {
    missionSize -= 2;
    ctx.font = `600 ${missionSize}px ${family}`;
    missionLines = wrap(ctx, badge.mission, textWidth);
  }
  missionLines
    .slice(0, 2)
    .forEach((row, i) => ctx.fillText(row, margin, footerTop + 100 + i * missionSize * 1.03));

  ctx.fillStyle = palette.rule;
  ctx.fillRect(margin, 1004, textWidth, 2);
  ctx.font = `500 29px ${family}`;
  ctx.fillStyle = muted;
  if (badge.dateLine) {
    drawRajwada(ctx, margin, 1011, palette.landmark);
    ctx.fillText(badge.dateLine, margin + 80, 1037, 448);
  }
  ctx.textAlign = "right";
  ctx.fillText("devfest.indore.community", width - margin, 1037, 440);
  ctx.restore();

  const frame = ctx.createLinearGradient(0, 0, width, height);
  GOOGLE_COLORS.forEach((color, i) => {
    frame.addColorStop(i / (GOOGLE_COLORS.length - 1), color);
  });
  const inset = borderWidth / 2;
  ctx.lineWidth = borderWidth;
  ctx.strokeStyle = frame;
  ctx.beginPath();
  ctx.roundRect(inset, inset, width - borderWidth, height - borderWidth, cornerRadius - inset);
  ctx.stroke();
}
