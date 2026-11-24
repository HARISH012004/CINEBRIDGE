"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { ArrowRight, Camera, Check, Clapperboard, Film, MapPin, ShieldCheck } from "lucide-react";
import { dashboardForRole, demoAccounts, PortalRole, setStoredSession } from "@/lib/demo-data";

const portalOptions: { role: PortalRole; icon: typeof Clapperboard; title: string; caption: string }[] = [
  { role: "FILMMAKER", icon: Clapperboard, title: "Director / Producer", caption: "Cast your next project" },
  { role: "ARTIST", icon: Camera, title: "Artist / Participant", caption: "Find your next role" },
  { role: "VENUE_OWNER", icon: MapPin, title: "Event / Venue Partner", caption: "Host the industry" },
];

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const initialRole = search.get("role")?.toUpperCase().replace("-", "_");
  const [role, setRole] = useState<PortalRole>(portalOptions.some(item => item.role === initialRole) ? initialRole as PortalRole : "ARTIST");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const demo = demoAccounts[role];

  function useDemo() {
    setEmail(demo.email);
    setPassword(demo.password);
    setError("");
    setSuccess("Demo credentials filled in. Select “Enter demo workspace” to continue.");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");

    if (email.trim().toLowerCase() === demo.email && password === demo.password) {
      setStoredSession(role, demo.name);
      router.push(dashboardForRole(role));
      return;
    }

    const savedAccounts = JSON.parse(localStorage.getItem("cinebridge_demo_accounts") || "[]") as { email: string; password: string; name: string; role: PortalRole }[];
    const saved = savedAccounts.find(account => account.email.toLowerCase() === email.trim().toLowerCase() && account.password === password && account.role === role);
    if (saved) {
      setStoredSession(role, saved.name);
      router.push(dashboardForRole(role));
      return;
    }

    try {
      const base = process.env.NEXT_PUBLIC_API_URL;
      if (!base) throw new Error("That account is not part of this demo. Use the sample account shown below, or create a demo account.");
      const response = await fetch(`${base}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "We couldn't sign you in.");
      setStoredSession(data.role, data.name);
      router.push(dashboardForRole(data.role));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Sign-in failed. Try the demo account below.");
    } finally {
      setBusy(false);
    }
  }

  return <main className="min-h-[calc(100vh-72px)] bg-[radial-gradient(ellipse_at_55%_0%,rgba(107,35,45,.28),transparent_44%)] px-4 py-9 md:py-14">
    <div className="mx-auto max-w-5xl">
      <div className="text-center"><p className="text-[10px] uppercase tracking-[.34em] text-[#d6b36a]">Your next scene starts here</p><h1 className="mt-3 text-4xl font-medium md:text-5xl">Sign in to CINEBRIDGE</h1><p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/50">Choose the portal that fits your role in the Tamil cinema community.</p></div>
      <div className="mt-9 grid gap-3 md:grid-cols-3">
        {portalOptions.map(item => { const Icon = item.icon; const selected = role === item.role; return <button key={item.role} type="button" onClick={() => { setRole(item.role); setError(""); setSuccess(""); }} className={`rounded-2xl border p-4 text-left transition md:p-5 ${selected ? "border-[#d6b36a]/65 bg-[#d6b36a]/[.08] shadow-[0_0_30px_rgba(214,179,106,.07)]" : "border-white/10 bg-[#111217] hover:border-white/25"}`}><div className="flex items-center justify-between"><Icon className={selected ? "text-[#d6b36a]" : "text-white/45"} size={22}/>{selected && <Check size={16} className="text-[#d6b36a]"/>}</div><strong className="mt-4 block text-sm">{item.title}</strong><span className="mt-1 block text-xs text-white/45">{item.caption}</span></button>; })}
      </div>
      <div className="mx-auto mt-5 grid max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#111217] shadow-2xl md:grid-cols-[1.1fr_.9fr]">
        <form onSubmit={submit} className="p-6 md:p-8">
          <div className="mb-6 flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full border border-[#d6b36a]/25 bg-[#d6b36a]/[.08] text-[#d6b36a]"><Film size={18}/></span><div><h2 className="text-lg font-medium">Welcome back</h2><p className="text-xs text-white/45">{portalOptions.find(item => item.role === role)?.title} portal</p></div></div>
          <label className="mb-2 block text-xs text-white/55" htmlFor="email">Email address</label><input id="email" autoComplete="username" type="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 text-sm outline-none transition focus:border-[#d6b36a]/60"/>
          <div className="mb-2 mt-4 flex justify-between"><label className="text-xs text-white/55" htmlFor="password">Password</label><Link href="/contact" className="text-[11px] text-[#d6b36a] hover:underline">Need help signing in?</Link></div><input id="password" autoComplete="current-password" type="password" required value={password} onChange={event => setPassword(event.target.value)} placeholder="Enter your password" className="w-full rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 text-sm outline-none transition focus:border-[#d6b36a]/60"/>
          {error && <p role="alert" className="mt-4 rounded-lg border border-rose-400/20 bg-rose-950/25 p-3 text-xs leading-5 text-rose-200">{error}</p>}
          {success && <p role="status" className="mt-4 rounded-lg border border-emerald-400/20 bg-emerald-950/25 p-3 text-xs leading-5 text-emerald-200">{success}</p>}
          <button disabled={busy} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#d6b36a] px-5 py-3.5 text-xs font-bold text-[#171109] transition hover:bg-[#efd48f] disabled:opacity-60">{busy ? "Signing you in…" : "Enter demo workspace"}<ArrowRight size={15}/></button>
          <p className="mt-5 text-center text-xs text-white/45">New to the network? <Link href="/register" className="font-medium text-[#d6b36a]">Create your account</Link></p>
        </form>
        <aside className="border-t border-white/[.07] bg-[linear-gradient(145deg,rgba(86,28,37,.26),rgba(17,18,23,.4))] p-6 md:border-l md:border-t-0 md:p-8">
          <div className="flex items-center gap-2 text-[#d6b36a]"><ShieldCheck size={16}/><span className="text-[10px] font-semibold uppercase tracking-[.2em]">Demo access</span></div>
          <h3 className="mt-4 text-xl">Explore the product</h3><p className="mt-2 text-xs leading-5 text-white/50">This is a live interactive demo. Use these sample credentials; no real payment or external booking is made.</p>
          <dl className="mt-5 space-y-3 rounded-xl border border-white/10 bg-black/20 p-4 text-xs"><div><dt className="text-white/40">Portal</dt><dd className="mt-1 font-medium">{demo.label}</dd></div><div><dt className="text-white/40">Demo email</dt><dd className="mt-1 select-all font-mono text-[#e2c47a]">{demo.email}</dd></div><div><dt className="text-white/40">Demo password</dt><dd className="mt-1 select-all font-mono text-[#e2c47a]">{demo.password}</dd></div></dl>
          <button type="button" onClick={useDemo} className="mt-4 w-full rounded-full border border-[#d6b36a]/35 px-4 py-3 text-xs font-semibold text-[#e2c47a] transition hover:bg-[#d6b36a]/10">Fill sample credentials</button>
          <p className="mt-4 text-[10px] leading-4 text-white/35">Demo data is illustrative and stored in this browser session. Verification, payments and messages are not represented as real.</p>
        </aside>
      </div>
    </div>
  </main>;
}

export default function LoginPage() {
  return <Suspense fallback={<div className="min-h-screen bg-[#090a0d]"/>}><LoginForm/></Suspense>;
}
