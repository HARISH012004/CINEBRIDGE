"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Bell, BriefcaseBusiness, CalendarDays, Camera, ChevronDown, CircleHelp, Clapperboard, Compass, LayoutDashboard, LogOut, MessageSquare, Settings, ShieldCheck, Users, WalletCards } from "lucide-react";
import { clearStoredSession, dashboardForRole, PortalRole } from "@/lib/demo-data";
import { useDemoSession } from "@/lib/demo-session";

const menu: { href: string; title: string; icon: typeof LayoutDashboard; roles: PortalRole[] }[] = [
  { href: "overview", title: "Overview", icon: LayoutDashboard, roles: ["FILMMAKER","ARTIST","VENUE_OWNER"] },
  { href: "auditions", title: "Auditions", icon: Clapperboard, roles: ["FILMMAKER","ARTIST"] },
  { href: "discover", title: "Discover talent", icon: Users, roles: ["FILMMAKER"] },
  { href: "portfolio", title: "My portfolio", icon: Camera, roles: ["ARTIST"] },
  { href: "applications", title: "My applications", icon: BriefcaseBusiness, roles: ["ARTIST"] },
  { href: "venues", title: "Venue marketplace", icon: Compass, roles: ["FILMMAKER","VENUE_OWNER"] },
  { href: "bookings", title: "Bookings", icon: CalendarDays, roles: ["FILMMAKER","VENUE_OWNER"] },
  { href: "messages", title: "Messages", icon: MessageSquare, roles: ["FILMMAKER","ARTIST","VENUE_OWNER"] },
  { href: "notifications", title: "Notifications", icon: Bell, roles: ["FILMMAKER","ARTIST","VENUE_OWNER"] },
  { href: "earnings", title: "Earnings", icon: WalletCards, roles: ["VENUE_OWNER"] },
  { href: "settings", title: "Account settings", icon: Settings, roles: ["FILMMAKER","ARTIST","VENUE_OWNER"] },
];

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { session, ready } = useDemoSession();

  useEffect(() => {
    if (ready && !session) router.replace("/login");
  }, [ready, router, session]);

  if (!ready || !session) return <div className="flex min-h-screen items-center justify-center bg-[#090a0d] text-sm text-white/55">Opening your CINEBRIDGE workspace…</div>;
  const base = dashboardForRole(session.role);
  const roleLinks = menu.filter(item => item.roles.includes(session.role));
  const activeSection = pathname.split("/").pop();
  const logout = () => {
    clearStoredSession();
    router.push("/login");
  };
  return <div className="min-h-screen bg-[#090a0d] text-[#f6f1e7] lg:flex">
    <aside className="hidden w-[260px] shrink-0 border-r border-white/[.08] bg-[#0c0d12] p-5 lg:flex lg:flex-col">
      <Link href="/" className="flex items-center gap-3 px-2 py-3"><span className="flex size-9 items-center justify-center rounded-full border border-[#d6b36a]/40 text-[#d6b36a]"><Clapperboard size={17}/></span><strong className="text-xs tracking-[.18em]">CINEBRIDGE</strong></Link>
      <div className="mt-8 rounded-xl border border-[#d6b36a]/15 bg-[#d6b36a]/[.05] p-4"><span className="text-[9px] uppercase tracking-[.2em] text-[#d6b36a]">Demo workspace</span><p className="mt-2 text-sm font-medium">{session.name}</p><p className="mt-1 text-[10px] text-white/40">{session.role === "FILMMAKER" ? "Filmmaker portal" : session.role === "ARTIST" ? "Artist portal" : "Venue partner portal"}</p></div>
      <nav className="mt-7 flex-1 space-y-1">
        {roleLinks.map(item => { const Icon = item.icon; const active = activeSection === item.href || (activeSection === "filmmaker" || activeSection === "artist" || activeSection === "venue-owner") && item.href === "overview"; return <Link key={item.href} href={`${base}/${item.href}`} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-xs transition ${active ? "bg-[#d6b36a]/10 text-[#e2c47a]" : "text-white/55 hover:bg-white/[.04] hover:text-white"}`}><Icon size={16}/>{item.title}</Link>; })}
      </nav>
      <Link href="/safety" className="flex items-center gap-3 rounded-xl px-3 py-3 text-xs text-white/50 hover:bg-white/[.04]"><ShieldCheck size={16}/>Trust & safety</Link>
      <button onClick={logout} className="mt-2 flex items-center gap-3 rounded-xl px-3 py-3 text-xs text-white/50 hover:bg-white/[.04]"><LogOut size={16}/>Sign out</button>
    </aside>
    <main className="min-w-0 flex-1">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[.08] bg-[#090a0d]/90 px-5 backdrop-blur lg:px-9">
        <Link href="/" className="text-[10px] font-bold tracking-[.2em] lg:hidden">CINEBRIDGE</Link>
        <div className="hidden text-[10px] uppercase tracking-[.18em] text-white/35 lg:block">Tamil cinema · Demo mode</div>
        <div className="flex items-center gap-4"><Link href={`${base}/notifications`} className="relative rounded-full border border-white/10 p-2 text-white/65" aria-label="Notifications"><Bell size={16}/><span className="absolute -right-1 -top-1 size-2 rounded-full bg-[#d6b36a]"/></Link><span className="flex size-8 items-center justify-center rounded-full bg-[#531c27] text-[10px]">{session.name.split(" ").map(part => part[0]).slice(0,2).join("")}</span><span className="hidden text-xs text-white/65 sm:block">{session.name}</span><ChevronDown size={13} className="text-white/40"/></div>
      </header>
      <nav className="flex gap-1 overflow-x-auto border-b border-white/[.06] px-3 py-2 lg:hidden">
        {roleLinks.map(item => <Link key={item.href} href={`${base}/${item.href}`} className={`shrink-0 rounded-full px-3 py-2 text-[10px] ${activeSection === item.href ? "bg-[#d6b36a]/10 text-[#e2c47a]" : "text-white/50"}`}>{item.title}</Link>)}
        <Link href="/safety" className="shrink-0 rounded-full px-3 py-2 text-[10px] text-white/50"><CircleHelp size={13}/></Link>
      </nav>
      <div className="mx-auto max-w-6xl px-5 py-7 lg:px-9 lg:py-9">{children}</div>
    </main>
  </div>;
}
