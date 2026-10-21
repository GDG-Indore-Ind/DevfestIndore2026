"use client";

import Image from "next/image";
import { useState } from "react";

export default function CommunityPhoto({ src, alt, portrait = false, sizes = "(max-width: 620px) 90vw, (max-width: 980px) 45vw, 350px" }: { src?: string; alt: string; portrait?: boolean; sizes?: string }) {
  const [failed, setFailed] = useState(false);
  const canOptimize = src?.startsWith("/") || src?.startsWith("https://res.cloudinary.com/");
  return <div className={`community-photo ${portrait ? "community-portrait" : ""}`}>{src && !failed ? <Image src={src} alt={alt} fill sizes={sizes} unoptimized={!canOptimize} onError={() => setFailed(true)} /> : <span className="community-initials" aria-label={alt}>{alt.split(" ").filter(Boolean).slice(0, 2).map(word => word[0]).join("")}</span>}</div>;
}
