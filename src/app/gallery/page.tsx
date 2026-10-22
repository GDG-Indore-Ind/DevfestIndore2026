"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Expand, X } from "lucide-react";
import type { GalleryItem } from "@/content/model";
import { GALLERY_PHOTOS } from "@/content/gallery";
import { HOME_PAGE } from "@/content/pages";
import CommunityPage from "@/components/CommunityPage";
import CommunityPhoto from "@/components/CommunityPhoto";
import ArchiveNav from "@/components/ArchiveNav";

export default function GalleryPage() {
  const items: GalleryItem[] = GALLERY_PHOTOS;
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const categories = ["All", ...new Set(items.map(item => item.category))];
  const visible = items.filter(item => category === "All" || item.category === category);
  function openPhoto(item: GalleryItem) { setSelected(item); dialog.current?.showModal(); }
  return <CommunityPage motif="photos" title={HOME_PAGE.galleryTitle} lead={HOME_PAGE.galleryLead}>
    <ArchiveNav current="/gallery" />
    {categories.length > 2 && <div className="community-filters" role="group" aria-label="Filter photographs">{categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item === "All" ? "All photos" : item}</button>)}</div>}
    <div className="community-gallery">{visible.map(item => <figure key={item.id}><button className="community-photo-open" onClick={() => openPhoto(item)} aria-label={`Enlarge ${item.title}`}><CommunityPhoto src={item.imageUrl} alt={item.title} /><span className="community-enlarge"><Expand className="audience-icon" aria-hidden="true" />View photo</span></button><figcaption><h2>{item.title}</h2><p>{item.caption}</p></figcaption></figure>)}</div>
    {!visible.length && <p role="status">No photographs in this category yet.</p>}
    <dialog ref={dialog} className="community-dialog" aria-label={selected?.title ?? "Photo viewer"} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <button autoFocus className="community-dialog-close" onClick={() => dialog.current?.close()} aria-label="Close photograph"><X aria-hidden="true" />Close</button>
      {selected && <figure><Image src={selected.imageUrl} alt={selected.title} width={selected.width ?? 1600} height={selected.height ?? 1067} sizes="90vw" unoptimized={!selected.imageUrl.startsWith("/") && !selected.imageUrl.startsWith("https://res.cloudinary.com/")} /><figcaption>{selected.caption}</figcaption></figure>}
    </dialog>
  </CommunityPage>;
}
