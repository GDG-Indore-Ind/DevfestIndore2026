import localFont from "next/font/local";

/** Self-hosted variable Google Sans. Next preloads it and generates a size-matched fallback to limit layout shift. */
export const googleSans = localFont({
  src: "./fonts/google-sans-latin.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-google-sans",
});
