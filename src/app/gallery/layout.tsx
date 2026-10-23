import type { Metadata } from "next";
import type { ReactNode } from "react";
import { HOME_PAGE } from "@/content/pages";

export const metadata: Metadata = {
  title: "Community Photos",
  description: HOME_PAGE.galleryDescription,
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
