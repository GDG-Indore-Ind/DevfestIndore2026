"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { WorkshopPhoto } from "@/content/model";
import { WORKSHOPS_PAGE } from "@/content/pages";

export default function WorkshopPhotoViewer({
  photo,
  onClose,
}: {
  photo: WorkshopPhoto | null;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (photo && !dialog.current?.open) dialog.current?.showModal();
  }, [photo]);
  return (
    <dialog
      ref={dialog}
      className="community-dialog workshop-photo-dialog"
      aria-label={photo?.caption ?? WORKSHOPS_PAGE.photoLabel}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialog.current?.close();
      }}
    >
      <button
        autoFocus
        className="community-dialog-close"
        type="button"
        onClick={() => dialog.current?.close()}
        aria-label={WORKSHOPS_PAGE.photoCloseLabel}
      >
        <X aria-hidden="true" />
        {WORKSHOPS_PAGE.photoCloseLabel}
      </button>
      {photo && (
        <figure>
          <Image
            src={photo.imageUrl}
            alt={photo.caption}
            width={photo.width}
            height={photo.height}
            sizes="(max-width: 760px) 92vw, 1100px"
          />
          <figcaption>{photo.caption}</figcaption>
        </figure>
      )}
    </dialog>
  );
}
