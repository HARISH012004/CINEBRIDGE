"use client";

import { useMemo, useSyncExternalStore } from "react";
import { PortalRole } from "@/lib/demo-data";

const SESSION_LOADING = "__cinebridge_demo_session_loading__";

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

function getServerSnapshot() {
  return SESSION_LOADING;
}

export function useDemoSession() {
  const raw = useSyncExternalStore(subscribeToSession, getSessionSnapshot, getServerSnapshot);
  const session = useMemo(() => {
    if (typeof raw !== "string" || !raw) return null;
    try { return JSON.parse(raw) as { role: PortalRole; name: string }; } catch { return null; }
  }, [raw]);
  return { session, ready: raw !== SESSION_LOADING };
}
