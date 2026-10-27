import { pageMetadata } from "@/lib/pageMetadata";
import type { ReactNode } from "react";
import { HOME_PAGE } from "@/content/pages";

export const metadata = pageMetadata("/gallery", "Community Photos", HOME_PAGE.galleryDescription);

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
