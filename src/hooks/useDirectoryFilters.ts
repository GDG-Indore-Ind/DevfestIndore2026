"use client";
import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener("devfest-directory-filter", onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener("devfest-directory-filter", onChange);
  };
}
const getSearch = () => window.location.search;
const getServerSearch = () => "";
export function useDirectoryFilters<T extends Record<string, string>>(defaults: T) {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const params = new URLSearchParams(search);
  const values = Object.fromEntries(
    Object.entries(defaults).map(([key, fallback]) => [key, params.get(key) ?? fallback]),
  ) as T;
  function setFilter(key: keyof T & string, value: string) {
    const url = new URL(window.location.href);
    if (value === defaults[key]) url.searchParams.delete(key);
    else url.searchParams.set(key, value);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new Event("devfest-directory-filter"));
  }
  function clear() {
    const url = new URL(window.location.href);
    for (const key of Object.keys(defaults)) url.searchParams.delete(key);
    window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    window.dispatchEvent(new Event("devfest-directory-filter"));
  }
  return { values, setFilter, clear };
}
