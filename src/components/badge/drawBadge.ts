export const BADGE_SIZE = { width: 1080, height: 1080 } as const;
/** The cropped photo is square; the badge shows it in a circle. */
export const BADGE_PHOTO_SIZE = 900;

type BadgeDrawing = {
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
  astronaut: HTMLImageElement | null;
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
    if (ctx.measureText(next).width <= maxWidth || !row) row = next;
    else {
      rows.push(row);
      row = word;
    }
  }
  if (row) rows.push(row);
  return rows;
}

/** The mural is about 280 × 241 units; (x, baseY) is its left edge and the ground line. */
function drawRajwada(ctx: CanvasRenderingContext2D, x: number, baseY: number, scale: number) {
  ctx.save();
  ctx.translate(x, baseY - 241 * scale);
  ctx.scale(scale, scale);
  const outline = "#765743";
  const ivory = "#fff3d4";
  const stone = "#f2d4a5";
  ctx.strokeStyle = outline;
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";

  function block(x: number, y: number, w: number, h: number, fill: string) {
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
  }
  function arch(x: number, base: number, width: number, height: number, fill: string) {
    const radius = width / 2;
    const spring = base - height + radius;
    ctx.beginPath();
    ctx.moveTo(x, base);
    ctx.lineTo(x, spring);
    ctx.arc(x + radius, spring, radius, Math.PI, 2 * Math.PI);
    ctx.lineTo(x + width, base);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.stroke();
  }

  // The mural's cream walls, projecting balconies and dark window recesses.
  ctx.fillStyle = "#fce8ca";
  ctx.beginPath();
  ctx.arc(142, 143, 111, Math.PI, 2 * Math.PI);
  ctx.fill();
  block(6, 136, 268, 99, stone);
  block(24, 103, 232, 34, ivory);
  for (const x of [9, 209]) {
    block(x, 87, 62, 147, ivory);
    block(x - 3, 83, 68, 6, stone);
    arch(x + 20, 83, 22, 27, ivory);
    arch(x + 26, 83, 10, 18, outline);
    for (const base of [117, 160, 207]) {
      arch(x + 20, base, 22, 23, outline);
      block(x - 3, base + 7, 68, 5, stone);
    }
  }
  block(102, 60, 76, 175, ivory);
  for (const x of [107, 132, 157]) {
    arch(x, 59, 17, 23, ivory);
    arch(x + 5, 59, 7, 14, outline);
  }
  for (const y of [61, 107, 153]) {
    block(98, y, 84, 6, stone);
    for (const x of [111, 133, 155]) arch(x, y + 38, 14, 23, outline);
  }
  arch(118, 235, 44, 60, stone);
  arch(124, 235, 32, 50, outline);
  block(3, 235, 274, 6, stone);
  ctx.restore();
}

const GOOGLE = { blue: "#4285f4", red: "#ea4335", yellow: "#fbbc04", green: "#34a853" } as const;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** A four-point sparkle, the same motif as the site's orbital artwork. */
function sparkle(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, fill: string) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - r);
  ctx.quadraticCurveTo(cx, cy, cx + r, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy + r);
  ctx.quadraticCurveTo(cx, cy, cx - r, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy - r);
  ctx.fillStyle = fill;
  ctx.fill();
}

export function drawBadge(canvas: HTMLCanvasElement, badge: BadgeDrawing) {
  const { width, height } = BADGE_SIZE;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable");
  const family = badge.fontFamily;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  const ink = "#202124";
  const muted = "#50555a";
  const action = "#185abc";
  const margin = 56;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);

  // Header: the two lockups share one centre line.
  ctx.fillStyle = ink;
  if (badge.eventLogo) {
    const w = 288;
    ctx.drawImage(
      badge.eventLogo,
      margin,
      34,
      w,
      (w * badge.eventLogo.height) / badge.eventLogo.width,
    );
  } else {
    ctx.font = `600 34px ${family}`;
    ctx.fillText(badge.eventName, margin, 90);
  }
  if (badge.logo) {
    const w = 330;
    const h = (w * badge.logo.height) / badge.logo.width;
    ctx.drawImage(badge.logo, width - margin - w, 76 - h / 2, w, h);
  } else {
    ctx.font = `500 27px ${family}`;
    ctx.textAlign = "right";
    ctx.fillText("GDG Indore", width - margin, 84);
    ctx.textAlign = "left";
  }

  // One rounded stage holds the portrait and both illustrations, so they read as a single scene.
  const stage = { x: margin, y: 144, w: width - margin * 2, h: 388 };
  const cx = width / 2;
  const cy = stage.y + stage.h / 2 - 4;
  ctx.save();
  roundRect(ctx, stage.x, stage.y, stage.w, stage.h, 40);
  ctx.fillStyle = "#edf4ff";
  ctx.fill();
  ctx.clip();

  // A tilted orbit passes behind the portrait; a planet disc sits behind the astronaut.
  ctx.fillStyle = "#d7e6ff";
  ctx.beginPath();
  ctx.arc(912, cy + 44, 98, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#b4cdf3";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.ellipse(cx, cy, 330, 104, -0.24, 0, Math.PI * 2);
  ctx.stroke();
  for (const [angle, color] of [
    [3.6, GOOGLE.yellow],
    [0.45, GOOGLE.red],
  ] as const) {
    const px =
      cx + 330 * Math.cos(angle) * Math.cos(-0.24) - 104 * Math.sin(angle) * Math.sin(-0.24);
    const py =
      cy + 330 * Math.cos(angle) * Math.sin(-0.24) + 104 * Math.sin(angle) * Math.cos(-0.24);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(px, py, 11, 0, Math.PI * 2);
    ctx.fill();
  }
  sparkle(ctx, 756, cy - 128, 24, GOOGLE.blue);
  sparkle(ctx, 330, cy + 112, 14, GOOGLE.green);

  drawRajwada(ctx, stage.x + 22, stage.y + stage.h - 16, 0.9);
  if (badge.astronaut) {
    const w = 186;
    const h = (w * badge.astronaut.height) / badge.astronaut.width;
    ctx.drawImage(badge.astronaut, 826, stage.y + stage.h - 16 - h, w, h);
  }
  ctx.restore();

  // Portrait: white mat, four-colour Google ring, then the photo or initials.
  const photoRadius = 156;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(cx, cy, photoRadius + 28, 0, Math.PI * 2);
  ctx.fill();
  const ring = [GOOGLE.blue, GOOGLE.red, GOOGLE.yellow, GOOGLE.green];
  ctx.lineWidth = 13;
  ctx.lineCap = "butt";
  ring.forEach((color, i) => {
    const start = -Math.PI * 0.75 + i * (Math.PI / 2) + 0.05;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, photoRadius + 14, start, start + Math.PI / 2 - 0.1);
    ctx.stroke();
  });
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, photoRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#dbe7fb";
  ctx.fill();
  ctx.clip();
  ctx.textAlign = "center";
  if (badge.photo) {
    ctx.drawImage(
      badge.photo,
      cx - photoRadius,
      cy - photoRadius,
      photoRadius * 2,
      photoRadius * 2,
    );
  } else {
    const words = badge.name.split(" ");
    const initials = [words[0], ...words.slice(1).slice(-1)]
      .map((word) => Array.from(word)[0])
      .join("")
      .toLocaleUpperCase();
    ctx.font = `500 132px ${family}`;
    ctx.fillStyle = "#315678";
    ctx.fillText(initials, cx, cy + 46, 270);
  }
  ctx.restore();

  // The statement the badge exists to make, sitting on the stage's lower edge.
  ctx.textAlign = "center";
  ctx.font = `600 34px ${family}`;
  const pillText = "I’m attending";
  const pillW = ctx.measureText(pillText).width + 76;
  const pillH = 62;
  const pillY = stage.y + stage.h - pillH / 2;
  roundRect(ctx, cx - pillW / 2, pillY, pillW, pillH, pillH / 2);
  ctx.fillStyle = action;
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = "#fff";
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.fillText(pillText, cx, pillY + 42);

  // Name, role and organisation.
  ctx.fillStyle = ink;
  let size = 92;
  let lines: string[];
  do {
    ctx.font = `600 ${size}px ${family}`;
    lines = wrap(ctx, badge.name, 960);
    if (lines.length <= 2 || size <= 32) break;
    size -= 2;
  } while (true);
  let baseline = lines.length === 1 ? 684 : 656;
  for (const nameLine of lines) {
    ctx.fillText(nameLine, cx, baseline, 960);
    baseline += size;
  }
  let y = baseline - size + 52;
  if (badge.headline) {
    ctx.fillStyle = action;
    ctx.font = `500 44px ${family}`;
    ctx.fillText(badge.headline, cx, y, 956);
    y += 50;
  }
  const lastPart = badge.organisation.split(/[,·]/).pop()?.trim();
  const city =
    lastPart?.localeCompare(badge.city, undefined, { sensitivity: "base" }) === 0 ? "" : badge.city;
  ctx.fillStyle = muted;
  ctx.font = `400 40px ${family}`;
  ctx.fillText([badge.organisation, city].filter(Boolean).join(" · "), cx, y, 956);

  // Mission card with the date and site beneath it, closed by the four-colour stripe.
  const footerTop = 876;
  ctx.fillStyle = "#f3f7ff";
  ctx.fillRect(0, footerTop, width, height - footerTop);
  ctx.fillStyle = "#c5d7f2";
  ctx.fillRect(0, footerTop, width, 2);

  ctx.textAlign = "left";
  ctx.fillStyle = action;
  ctx.font = `600 26px ${family}`;
  ctx.fillText("MY MISSION", margin, footerTop + 48);
  ctx.fillStyle = ink;
  ctx.font = `500 42px ${family}`;
  wrap(ctx, badge.mission, 968)
    .slice(0, 2)
    .forEach((row, i) => ctx.fillText(row, margin, footerTop + 100 + i * 48, 968));

  ctx.font = `500 29px ${family}`;
  ctx.fillStyle = ink;
  if (badge.dateLine) ctx.fillText(badge.dateLine, margin, 1040, 520);
  ctx.fillStyle = muted;
  ctx.textAlign = "right";
  ctx.fillText("devfest.indore.community", width - margin, 1040, 440);

  const stripeY = height - 12;
  ring.forEach((color, i) => {
    ctx.fillStyle = color;
    ctx.fillRect((width / 4) * i, stripeY, width / 4, 12);
  });
}
