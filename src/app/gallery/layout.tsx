import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = { title: "Community Photos", description: "Photographs and community memories from previous DevFest Indore editions." };

export default function Layout({ children }: { children: ReactNode }) { return children; }
