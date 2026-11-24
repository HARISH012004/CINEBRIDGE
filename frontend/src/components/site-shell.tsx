"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Clapperboard, Menu, X } from "lucide-react";

const links = [
  { href: "/auditions", label: "Auditions" },
  { href: "/artists", label: "Artists" },
  { href: "/venues", label: "Venues" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/about", label: "Our story" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-white/[.08] bg-[#090a0d]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="CINEBRIDGE home">
          <span className="flex size-10 items-center justify-center rounded-full border border-[#d6b36a]/45 bg-[#d6b36a]/[.07] text-[#d6b36a]"><Clapperboard size={19}/></span>
          <span><strong className="block text-xs tracking-[.22em]">CINEBRIDGE</strong><small className="text-[9px] tracking-[.18em] text-white/40">TAMIL CINEMA NETWORK</small></span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {links.map(link => <Link key={link.href} href={link.href} className={`text-xs transition hover:text-[#e5c779] ${pathname === link.href ? "text-[#e5c779]" : "text-white/65"}`}>{link.label}</Link>)}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="px-4 py-3 text-xs text-white/70 hover:text-white">Sign in</Link>
          <Link href="/register" className="flex items-center gap-2 rounded-full bg-[#d6b36a] px-5 py-3 text-xs font-bold text-[#171109] transition hover:bg-[#efd48f]">Join the network <ArrowRight size={14}/></Link>
        </div>
        <button onClick={() => setOpen(v => !v)} className="rounded-lg border border-white/10 p-2 text-white md:hidden" aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </nav>
      {open && <div className="border-t border-white/10 bg-[#0d0e13] px-5 py-3 md:hidden">
        {links.map(link => <Link key={link.href} onClick={() => setOpen(false)} href={link.href} className="block border-b border-white/[.06] py-4 text-sm text-white/75">{link.label}</Link>)}
        <div className="flex gap-3 py-4"><Link className="rounded-full border border-white/20 px-5 py-3 text-xs" href="/login">Sign in</Link><Link className="rounded-full bg-[#d6b36a] px-5 py-3 text-xs font-semibold text-black" href="/register">Create account</Link></div>
      </div>}
    </header>
  );
}

export function SiteFooter() {
  return <footer className="border-t border-white/[.08] bg-[#07080b]">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
      <div><Link href="/" className="text-sm font-bold tracking-[.22em] text-white">CINEBRIDGE</Link><p className="mt-3 max-w-xs text-sm leading-6 text-white/45">A better-connected stage for Tamil cinema and the people who make it.</p><span className="mt-5 inline-flex rounded-full border border-[#d6b36a]/25 bg-[#d6b36a]/[.06] px-3 py-1.5 text-[9px] uppercase tracking-[.18em] text-[#dfc47f]">Interactive product demo</span></div>
      <div><h3 className="text-[10px] uppercase tracking-[.2em] text-white/40">Explore</h3><div className="mt-4 grid gap-3 text-sm text-white/60"><Link href="/auditions">Casting calls</Link><Link href="/artists">Creative directory</Link><Link href="/venues">Production venues</Link></div></div>
      <div><h3 className="text-[10px] uppercase tracking-[.2em] text-white/40">Trust & support</h3><div className="mt-4 grid gap-3 text-sm text-white/60"><Link href="/safety">Safety guidelines</Link><Link href="/about">About CINEBRIDGE</Link><Link href="/contact">Contact the team</Link></div></div>
    </div>
    <div className="border-t border-white/[.06] px-5 py-4 text-center text-[10px] text-white/35">© 2026 CINEBRIDGE · Built for every dream with a screen.</div>
  </footer>;
}

export function PublicLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#090a0d] text-[#f6f1e7]"><SiteHeader/>{children}<SiteFooter/></div>;
}
