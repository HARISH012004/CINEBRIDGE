"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ArrowRight, Camera, Check, Clapperboard, MapPin, ShieldCheck } from "lucide-react";
import { dashboardForRole, PortalRole, setStoredSession } from "@/lib/demo-data";
import { PublicLayout } from "@/components/site-shell";

const roles: { role: PortalRole; title: string; text: string; icon: typeof Clapperboard }[] = [
  { role: "FILMMAKER", title: "Director / Producer", text: "Build a cast, publish a call and move a production forward.", icon: Clapperboard },
  { role: "ARTIST", title: "Artist / Participant", text: "Show your work, discover opportunities and apply.", icon: Camera },
  { role: "VENUE_OWNER", title: "Event / Venue Partner", text: "Showcase a space and manage booking enquiries.", icon: MapPin },
];

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<PortalRole>("ARTIST");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name")).trim();
    const email = String(form.get("email")).trim().toLowerCase();
    const password = String(form.get("password"));
    if (password.length < 8) { setError("Use a password with at least 8 characters."); return; }
    const accounts = JSON.parse(localStorage.getItem("cinebridge_demo_accounts") || "[]") as { email: string; password: string; name: string; role: PortalRole }[];
    if (accounts.some(account => account.email === email)) { setError("This email already has a demo account. Sign in instead."); return; }
    accounts.push({ name, email, password, role });
    localStorage.setItem("cinebridge_demo_accounts", JSON.stringify(accounts));
    setStoredSession(role, name);
    router.push(dashboardForRole(role));
  }

  return <PublicLayout><main className="min-h-[calc(100vh-170px)] bg-[radial-gradient(ellipse_at_50%_0%,rgba(107,35,45,.24),transparent_45%)] px-4 py-9 md:py-14">
    <div className="mx-auto max-w-5xl">
      <div className="text-center"><p className="text-[10px] uppercase tracking-[.34em] text-[#f2b866]">Make your entrance</p><h1 className="mt-3 text-4xl font-medium md:text-5xl">Find your place in the picture</h1><p className="mt-3 text-sm text-white/50">Choose your portal and create an interactive demo account.</p></div>
      <div className="mt-8 grid gap-3 md:grid-cols-3">{roles.map(item => { const Icon = item.icon; const active = role === item.role; return <button key={item.role} type="button" onClick={() => setRole(item.role)} className={`rounded-2xl border p-5 text-left transition ${active ? "border-[#f2b866]/60 bg-[#f2b866]/[.08]" : "border-white/10 bg-[#21131e] hover:border-white/25"}`}><div className="flex items-center justify-between"><Icon size={24} className={active ? "text-[#f2b866]" : "text-white/45"}/>{active && <Check size={16} className="text-[#f2b866]"/>}</div><strong className="mt-5 block text-sm">{item.title}</strong><span className="mt-2 block text-xs leading-5 text-white/45">{item.text}</span></button>; })}</div>
      <div className="mx-auto mt-5 grid max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#21131e] md:grid-cols-[1fr_.8fr]">
        <form onSubmit={submit} className="grid gap-4 p-6 md:p-8"><h2 className="text-xl">Create your demo profile</h2>
          <label className="grid gap-2 text-xs text-white/55">Full name<input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Your professional name" className="rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 text-sm text-white outline-none focus:border-[#f2b866]/60"/></label>
          <label className="grid gap-2 text-xs text-white/55">Email address<input name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 text-sm text-white outline-none focus:border-[#f2b866]/60"/></label>
          <label className="grid gap-2 text-xs text-white/55">Password<input name="password" type="password" required minLength={8} autoComplete="new-password" placeholder="At least 8 characters" className="rounded-xl border border-white/10 bg-black/25 px-4 py-3.5 text-sm text-white outline-none focus:border-[#f2b866]/60"/></label>
          {error && <p role="alert" className="rounded-lg border border-rose-400/20 bg-rose-950/25 p-3 text-xs text-rose-200">{error}</p>}
          <button className="mt-1 flex items-center justify-center gap-2 rounded-full bg-[#f2b866] px-5 py-3.5 text-xs font-bold text-[#24100e] transition hover:bg-[#efd48f]">Create profile <ArrowRight size={15}/></button>
          <p className="text-center text-xs text-white/45">Already have an account? <Link href="/login" className="text-[#f2b866]">Sign in</Link></p>
        </form>
        <aside className="border-t border-white/[.07] bg-[linear-gradient(145deg,rgba(86,28,37,.24),rgba(17,18,23,.45))] p-6 md:border-l md:border-t-0 md:p-8"><ShieldCheck className="text-[#f2b866]" size={20}/><h3 className="mt-4 text-lg">A safe demo space</h3><p className="mt-2 text-xs leading-5 text-white/50">This signup creates a browser-only demo profile so you can explore the role dashboard. It does not create a verified production account.</p><div className="mt-5 rounded-xl border border-white/10 bg-black/20 p-4"><span className="text-[9px] uppercase tracking-[.18em] text-white/40">Selected portal</span><strong className="mt-1 block text-sm">{roles.find(item => item.role === role)?.title}</strong></div><p className="mt-5 text-[10px] leading-4 text-white/35">Your local demo account can be used again in this browser. Never enter payment details in this demo.</p></aside>
      </div>
    </div>
  </main></PublicLayout>;
}
