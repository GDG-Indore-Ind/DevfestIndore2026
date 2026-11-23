"use client";

import { useEffect } from "react";

function openSession(fragment: string) {
  if (!fragment) return;

  let id: string;
  try {
    id = decodeURIComponent(fragment);
  } catch {
    return;
  }

  const details = document
    .getElementById(id)
    ?.querySelector<HTMLDetailsElement>(":scope > details[data-agenda-session]");
  if (details) details.open = true;
}

/**
 * Leave scrolling to the browser and Next.js. The fragment identifies the row to open.
 *
 * Next.js `<Link>` updates a same-page fragment with `history.pushState`, which fires neither
 * `hashchange` nor `popstate`, so in-page link clicks are handled directly alongside the
 * initial load and browser history navigation.
 */
export default function AgendaDeepLink() {
  useEffect(() => {
    const openCurrentHash = () => openSession(window.location.hash.slice(1));

    function openClickedHash(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a[href]");
      if (!anchor) return;

      const url = new URL((anchor as HTMLAnchorElement).href, window.location.href);
      if (url.origin === window.location.origin && url.pathname === window.location.pathname) {
        openSession(url.hash.slice(1));
      }
    }

    openCurrentHash();
    window.addEventListener("hashchange", openCurrentHash);
    window.addEventListener("popstate", openCurrentHash);
    document.addEventListener("click", openClickedHash);
    return () => {
      window.removeEventListener("hashchange", openCurrentHash);
      window.removeEventListener("popstate", openCurrentHash);
      document.removeEventListener("click", openClickedHash);
    };
  }, []);

  return null;
}
