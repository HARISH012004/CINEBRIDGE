"use client";

import { useMemo, useSyncExternalStore } from "react";
import { PortalRole } from "@/lib/demo-data";

function subscribeToSession(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("cinebridge-session-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cinebridge-session-change", callback);
  };
}

function getSessionSnapshot() {
  return localStorage.getItem("cinebridge_demo_session") || "";
}

export function useDemoSession() {
  const raw = useSyncExternalStore(subscribeToSession, getSessionSnapshot, () => "");
  return useMemo(() => {
    if (!raw) return null;
    try { return JSON.parse(raw) as { role: PortalRole; name: string }; } catch { return null; }
  }, [raw]);
}
