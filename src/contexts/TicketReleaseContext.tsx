"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getVisiblePasses } from "@/content/ticketRelease";
import type { PublicPass } from "@/content/tickets";

const TicketReleaseContext = createContext<readonly PublicPass[]>([]);

export function TicketReleaseProvider({ initialNow, children }: { initialNow: number; children: React.ReactNode }) {
  const [now, setNow] = useState(initialNow);
  useEffect(() => {
    const refresh = () => setNow(Date.now());
    const frame = window.requestAnimationFrame(refresh);
    const timer = window.setInterval(refresh, 30_000);
    return () => { window.cancelAnimationFrame(frame); window.clearInterval(timer); };
  }, []);
  return <TicketReleaseContext.Provider value={getVisiblePasses(now)}>{children}</TicketReleaseContext.Provider>;
}

export function useTicketRelease() {
  return useContext(TicketReleaseContext);
}
