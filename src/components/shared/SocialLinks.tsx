import { EVENT } from "@/content/event";

type Platform = "instagram" | "linkedin" | "twitter" | "youtube" | "github";

function SocialIcon({ platform }: { platform: Platform }) {
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
  if (platform === "linkedin")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.45 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.3 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.4-.75 1.36-1.55 2.79-1.55 2.98 0 3.58 1.96 3.58 4.51v5.29Z" />
      </svg>
    );
  if (platform === "twitter")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.42L5.56 22H2.43l7.96-9.1L2 2h6.41l4.43 6.77L18.9 2Zm-1.1 18h1.73L7.47 3.89H5.62L17.8 20Z" />
      </svg>
    );
  if (platform === "youtube")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.58 7.19a2.76 2.76 0 0 0-1.94-1.95C17.92 4.78 12 4.78 12 4.78s-5.92 0-7.64.46a2.76 2.76 0 0 0-1.94 1.95A28.7 28.7 0 0 0 2 12a28.7 28.7 0 0 0 .42 4.81 2.76 2.76 0 0 0 1.94 1.95c1.72.46 7.64.46 7.64.46s5.92 0 7.64-.46a2.76 2.76 0 0 0 1.94-1.95A28.7 28.7 0 0 0 22 12a28.7 28.7 0 0 0-.42-4.81ZM10 15.13V8.87L15.4 12 10 15.13Z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.82c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

const platforms: { id: Platform; label: string }[] = [
  { id: "instagram", label: "Instagram" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "twitter", label: "X / Twitter" },
  { id: "youtube", label: "YouTube" },
  { id: "github", label: "GitHub" },
];

export default function SocialLinks({
  primaryOnly = false,
  className = "",
}: {
  primaryOnly?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`social-links ${className}`}
      role="group"
      aria-label="GDG Indore social channels"
    >
      {platforms
        .filter(
          (platform) => !primaryOnly || ["instagram", "linkedin", "twitter"].includes(platform.id),
        )
        .map((platform) => (
          <a
            key={platform.id}
            href={EVENT.links[platform.id]}
            target="_blank"
            rel="noopener noreferrer"
            title={platform.label}
            aria-label={`GDG Indore on ${platform.label} (opens in a new tab)`}
          >
            <SocialIcon platform={platform.id} />
          </a>
        ))}
    </div>
  );
}
