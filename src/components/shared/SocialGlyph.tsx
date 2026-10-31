/** Brand marks for the profile links on person cards. Colour follows the surrounding text. */
export default function SocialGlyph({ platform }: { platform: "linkedin" | "instagram" }) {
  if (platform === "instagram")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9C2 21.31 2.69 22 3.55 22h16.9c.86 0 1.55-.69 1.55-1.55V3.55C22 2.69 21.31 2 20.45 2ZM8.1 19H5.14V9.45H8.1V19ZM6.62 8.14a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44ZM19 19h-2.95v-4.65c0-1.1-.02-2.52-1.54-2.52-1.54 0-1.77 1.2-1.77 2.44V19H9.79V9.45h2.83v1.31h.04c.39-.74 1.36-1.53 2.8-1.53 3 0 3.54 1.97 3.54 4.54V19Z" />
    </svg>
  );
}
