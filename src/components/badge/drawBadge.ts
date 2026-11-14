// One 4:5 image: it fits Instagram, LinkedIn and WhatsApp without cropping the name.
export const BADGE_SIZE = { width: 1080, height: 1350 } as const;

export type BadgeColor = "blue" | "red" | "yellow" | "green";

const palettes = {
  blue: { paper: "#e8f0fe", accent: "#4285f4", ink: "#174ea6" },
  red: { paper: "#fce8e6", accent: "#ea4335", ink: "#a50e0e" },
  yellow: { paper: "#fef7e0", accent: "#fbbc04", ink: "#714c00" },
  green: { paper: "#e6f4ea", accent: "#34a853", ink: "#0d652d" },
};

export type BadgeDrawing = {
  name: string;
  affiliation: string;
  color: BadgeColor;
  theme: string;
  photo: HTMLCanvasElement | null;
  /** The GDG mark from `public/gdg-logo.png`; the lockup falls back to text without it. */
  logo: HTMLImageElement | null;
  fontFamily: string;
  eventName: string;
  date: string;
  city: string;
  venue: string;
  organizer: string;
  chapter: string;
  website: string;
  attending: string;
};

export function cleanBadgeText(text: string) {
  return text
    .normalize("NFKC")
    .replace(/[\u0000-\u001f\u007f-\u009f\u202a-\u202e\u2066-\u2069]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// A name is a drawing seed, never an identifier or proof of registration.
function randomFromName(name: string) {
  let seed = 2166136261;
  for (const character of cleanBadgeText(name).toLocaleLowerCase("en")) {
    seed = Math.imul(seed ^ character.codePointAt(0)!, 16777619);
  }
  return () => {
    seed += 0x6d2b79f5;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value ^= value + Math.imul(value ^ (value >>> 7), 61 | value);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function fitText(ctx: CanvasRenderingContext2D, text: string, width: number) {
  if (ctx.measureText(text).width <= width) return text;
  const characters = Array.from(text);
  while (characters.length && ctx.measureText(`${characters.join("")}…`).width > width)
    characters.pop();
  return `${characters.join("")}…`;
}

function nameLines(ctx: CanvasRenderingContext2D, text: string, width: number) {
  const words = text.split(" ");
  let first = "";
  while (words.length && ctx.measureText(`${first} ${words[0]}`.trim()).width <= width) {
    first = `${first} ${words.shift()}`.trim();
  }
  if (!first) return [fitText(ctx, text, width)];
  return words.length ? [first, fitText(ctx, words.join(" "), width)] : [first];
}

export function drawBadge(canvas: HTMLCanvasElement, options: BadgeDrawing) {
  const { width, height } = BADGE_SIZE;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable");
  const palette = palettes[options.color];
  const margin = 76;
  const font = (size: number, weight = 400) => {
    ctx.font = `${weight} ${size}px ${options.fontFamily}`;
  };
  const label = (
    text: string,
    x: number,
    y: number,
    size: number,
    color = "#202124",
    weight = 400,
    maxWidth = width - margin * 2,
  ) => {
    font(size, weight);
    ctx.fillStyle = color;
    ctx.fillText(fitText(ctx, text, maxWidth), x, y);
  };
  ctx.fillStyle = palette.paper;
  ctx.fillRect(0, 0, width, height);
  ctx.textBaseline = "top";

  // The orbit and planet positions come from the name, so a person always gets the same badge.
  const random = randomFromName(options.name);
  const art = { x: 540, y: 690, radius: 340 };
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 420, width, 560);
  ctx.clip();
  ctx.translate(art.x, art.y);
  ctx.scale(art.radius, art.radius);
  const tilt = -0.7 + random() * 0.45;
  const colors = [palette.accent, "#4285f4", "#ea4335", "#fbbc04", "#34a853"];
  for (let i = 0; i < 5; i++) {
    const radius = 0.5 + i * 0.22;
    const flatten = 0.46 + random() * 0.2;
    const angle = random() * Math.PI * 2;
    const rotation = tilt + i * 0.14;
    ctx.save();
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.ellipse(0, 0, radius, radius * flatten, 0, 0, Math.PI * 2);
    ctx.strokeStyle = "#202124";
    ctx.globalAlpha = 0.32;
    ctx.lineWidth = 1.8 / art.radius;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * flatten,
      0.035 + random() * 0.035,
      0,
      Math.PI * 2,
    );
    ctx.fillStyle = colors[i];
    ctx.fill();
    ctx.restore();
  }
  for (let i = 0; i < 14; i++) {
    const x = (random() - 0.5) * 2.5;
    const y = (random() - 0.5) * 1.8;
    ctx.fillStyle = palette.ink;
    ctx.globalAlpha = 0.45;
    ctx.fillRect(x, y, 0.006, 0.006);
  }
  ctx.globalAlpha = 1;
  ctx.beginPath();
  ctx.arc(0, 0, 0.3, 0, Math.PI * 2);
  ctx.fillStyle = palette.accent;
  ctx.fill();
  if (options.photo) {
    ctx.save();
    ctx.clip();
    ctx.drawImage(options.photo, -0.3, -0.3, 0.6, 0.6);
    ctx.restore();
  } else {
    // A small four-point star at the centre, rather than an empty photo slot.
    ctx.beginPath();
    ctx.moveTo(0, -0.13);
    ctx.quadraticCurveTo(0, 0, 0.13, 0);
    ctx.quadraticCurveTo(0, 0, 0, 0.13);
    ctx.quadraticCurveTo(0, 0, -0.13, 0);
    ctx.quadraticCurveTo(0, 0, 0, -0.13);
    ctx.fillStyle = "#202124";
    ctx.fill();
  }
  ctx.restore();

  // Chapter lockup, as in the site header: the GDG mark, then the organiser and chapter names.
  let lockupX = margin;
  if (options.logo) {
    // The mark sits inside transparent padding in the 500px source file.
    ctx.drawImage(options.logo, 85, 150, 330, 200, margin, 62, 99, 60);
    lockupX += 99 + 18;
  }
  label(options.organizer, lockupX, 62, 30, "#202124", 500, width - margin - lockupX);
  label(options.chapter, lockupX, 100, 24, "#3c4043", 400, width - margin - lockupX);

  label(options.attending, margin, 178, 32, palette.ink, 500);
  label(options.eventName, margin, 226, 76, "#202124", 700);
  label(`${options.date}  ·  ${options.venue}, ${options.city}`, margin, 326, 30);

  const identityY = 1000;
  const identityWidth = width - margin * 2;
  let nameSize = 72;
  font(nameSize, 600);
  if (ctx.measureText(options.name).width > identityWidth * 1.8) nameSize = 56;
  font(nameSize, 600);
  const lines = nameLines(ctx, options.name, identityWidth);
  lines.forEach((line, index) =>
    label(
      line,
      margin,
      identityY + index * nameSize * 1.16,
      nameSize,
      "#202124",
      600,
      identityWidth,
    ),
  );
  const affiliationY = identityY + lines.length * nameSize * 1.16 + 12;
  if (options.affiliation)
    label(options.affiliation, margin, affiliationY, 30, "#3c4043", 400, identityWidth);

  const themeY = 1220;
  font(26, 500);
  const themeWidth = Math.min(ctx.measureText(options.theme).width + 44, width - margin * 2);
  ctx.fillStyle = palette.ink;
  ctx.beginPath();
  ctx.roundRect(margin, themeY, themeWidth, 50, 25);
  ctx.fill();
  label(options.theme, margin + 22, themeY + 10, 26, "#ffffff", 500, themeWidth - 44);

  const footerY = 1300;
  const stripeWidth = 28;
  ctx.strokeStyle = "#202124";
  ctx.globalAlpha = 0.2;
  ctx.beginPath();
  ctx.moveTo(margin, footerY - 22);
  ctx.lineTo(width - margin, footerY - 22);
  ctx.stroke();
  ctx.globalAlpha = 1;
  label(
    options.website,
    margin,
    footerY - 2,
    26,
    "#202124",
    500,
    width - margin * 2 - stripeWidth * 4 - 24,
  );
  ["#4285f4", "#ea4335", "#fbbc04", "#34a853"].forEach((color, index) => {
    ctx.fillStyle = color;
    ctx.fillRect(width - margin - (4 - index) * stripeWidth, footerY + 4, stripeWidth, 12);
  });
}
