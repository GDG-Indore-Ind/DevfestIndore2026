export const BADGE_SIZE = { width: 1080, height: 1350 } as const;
/** The cropped photo is square; the badge shows it in a circle. */
export const BADGE_PHOTO_SIZE = 900;

type BadgeDrawing = {
  mission: string;
  name: string;
  headline: string;
  organisation: string;
  eventName: string;
  fontFamily: string;
  photo: HTMLCanvasElement | null;
  logo: HTMLImageElement | null;
};

export function cleanBadgeText(text: string) {
  return text
    .normalize("NFKC")
    .replace(/[\u0000-\u001f\u007f-\u009f‪-‮⁦-⁩]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

const google = { blue: "#4285f4", red: "#ea4335", yellow: "#fbbc04", green: "#34a853" };
const ink = "#202124";
const muted = "#5f6368";
const line = "#dadce0";
const tint = "#e8f0fe";

/** Shrinks the font until the text fits the width, then draws it centred. */
function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  y: number,
  weight: number,
  start: number,
  min: number,
  maxWidth: number,
  family: string,
) {
  let size = start;
  do {
    ctx.font = `${weight} ${size}px ${family}`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 2;
  } while (size > min);
  ctx.fillText(text, 540, y, maxWidth);
}

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, lines: number) {
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
  return rows.slice(0, lines);
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

  // A white ID card on a quiet grey ground.
  ctx.fillStyle = "#f1f3f4";
  ctx.fillRect(0, 0, width, height);
  ctx.save();
  ctx.shadowColor = "#00000022";
  ctx.shadowBlur = 28;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(30, 30, 1020, 1290, 56);
  ctx.fill();
  ctx.restore();
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(30, 30, 1020, 1290, 56);
  ctx.clip();

  // Lanyard slot and the four-colour top edge.
  ctx.fillStyle = "#e8eaed";
  ctx.beginPath();
  ctx.roundRect(450, 66, 180, 34, 17);
  ctx.fill();
  [google.blue, google.red, google.yellow, google.green].forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.fillRect(30 + index * 255, 30, 255, 10);
  });

  // Lockup: chapter mark, divider, event name.
  if (badge.logo) {
    const logoWidth = 360;
    ctx.drawImage(
      badge.logo,
      80,
      138,
      logoWidth,
      (logoWidth * badge.logo.height) / badge.logo.width,
    );
  } else {
    ctx.fillStyle = ink;
    ctx.font = `600 32px ${family}`;
    ctx.fillText("Google Developer Groups Indore", 80, 180);
  }
  ctx.fillStyle = line;
  ctx.fillRect(478, 132, 3, 92);
  const year = badge.eventName.match(/\b\d{4}\b/)?.[0] ?? "";
  const title = badge.eventName.replace(year, "").trim();
  ctx.fillStyle = ink;
  ctx.font = `700 52px ${family}`;
  ctx.fillText(title, 508, 172, 480);
  ctx.font = `700 52px ${family}`;
  let x = 508;
  [google.blue, google.red, google.yellow, google.green].forEach((color, index) => {
    const digit = year[index] ?? "";
    ctx.fillStyle = color;
    ctx.fillText(digit, x, 226);
    x += ctx.measureText(digit).width;
  });

  // Rajwada-style palace silhouette, soft and behind the photo.
  ctx.save();
  ctx.translate(30, 770);
  ctx.scale(1.7, 1.7);
  ctx.fillStyle = tint;
  ctx.fillRect(0, -26, 260, 26);
  for (let tier = 0; tier < 4; tier++) {
    const tx = 28 + tier * 15;
    const ty = -52 - tier * 23;
    const tw = 166 - tier * 30;
    ctx.fillStyle = tint;
    ctx.fillRect(tx, ty, tw, 29);
    ctx.fillRect(tx - 5, ty, tw + 10, 4);
    ctx.fillStyle = "#ffffff";
    for (let wx = tx + 11; wx < tx + tw - 8; wx += 20) {
      ctx.beginPath();
      ctx.arc(wx, ty + 14, 4, Math.PI, 2 * Math.PI);
      ctx.lineTo(wx + 4, ty + 21);
      ctx.lineTo(wx - 4, ty + 21);
      ctx.fill();
    }
  }
  ctx.restore();

  // Photo in a four-colour ring.
  const cx = 540;
  const cy = 520;
  const radius = 200;
  ctx.lineWidth = 16;
  [google.blue, google.red, google.yellow, google.green].forEach((color, index) => {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(
      cx,
      cy,
      radius + 18,
      (index * Math.PI) / 2 - Math.PI / 2 + 0.04,
      ((index + 1) * Math.PI) / 2 - Math.PI / 2 - 0.04,
    );
    ctx.stroke();
  });
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();
  if (badge.photo) {
    ctx.drawImage(badge.photo, cx - radius, cy - radius, radius * 2, radius * 2);
  } else {
    ctx.fillStyle = tint;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
    const words = badge.name.split(" ");
    const initials = [words[0], ...(words.length > 1 ? words.slice(-1) : [])]
      .map((word) => Array.from(word)[0])
      .join("")
      .toLocaleUpperCase();
    ctx.fillStyle = google.blue;
    ctx.font = `600 170px ${family}`;
    ctx.textAlign = "center";
    ctx.fillText(initials, cx, cy + 60, 300);
    ctx.textAlign = "left";
  }
  ctx.restore();

  // Attendee pill between hairlines.
  ctx.fillStyle = line;
  ctx.fillRect(84, 814, 250, 3);
  ctx.fillRect(746, 814, 250, 3);
  ctx.fillStyle = google.blue;
  ctx.beginPath();
  ctx.roundRect(370, 776, 340, 76, 38);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.font = `600 36px ${family}`;
  ctx.textAlign = "center";
  ctx.fillText("ATTENDEE", 540, 826);

  // Name, optional headline and organisation chip.
  ctx.fillStyle = ink;
  fitText(ctx, badge.name, 938, 700, 78, 40, 920, family);
  let nextY = 938;
  if (badge.headline) {
    ctx.fillStyle = muted;
    nextY += 56;
    fitText(ctx, badge.headline, nextY, 500, 40, 28, 880, family);
  }
  ctx.fillStyle = ink;
  const place = badge.organisation ? `${badge.organisation} · Indore` : "Indore";
  ctx.font = `500 32px ${family}`;
  const chipWidth = Math.min(ctx.measureText(place).width + 72, 920);
  const chipY = nextY + 34;
  ctx.strokeStyle = line;
  ctx.lineWidth = 3;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(540 - chipWidth / 2, chipY, chipWidth, 64, 32);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = ink;
  ctx.fillText(place, 540, chipY + 43, chipWidth - 48);

  // The attendee's mission.
  const boxY = chipY + 94;
  ctx.fillStyle = tint;
  ctx.beginPath();
  ctx.roundRect(84, boxY, 912, 130, 28);
  ctx.fill();
  ctx.fillStyle = google.blue;
  ctx.font = `600 22px ${family}`;
  ctx.fillText("MY MISSION", 540, boxY + 36);
  ctx.fillStyle = ink;
  ctx.font = `500 34px ${family}`;
  const rows = wrap(ctx, badge.mission, 840, 2);
  rows.forEach((row, index) => {
    ctx.fillText(row, 540, boxY + 80 + index * 42 - (rows.length > 1 ? 8 : 0), 840);
  });

  // Footer.
  ctx.fillStyle = muted;
  ctx.font = `500 26px ${family}`;
  ctx.fillText(`${badge.eventName} · Powered by GDG Indore`, 540, 1288, 900);
  ctx.restore();
}
