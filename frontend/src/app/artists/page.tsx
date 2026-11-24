"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Camera, MapPin, Search } from "lucide-react";
import { PublicLayout } from "@/components/site-shell";
import { artists, tamilNaduCities } from "@/lib/demo-data";

export default function ArtistsPage() {
  const [query,setQuery]=useState("");
  const [city,setCity]=useState("All cities");
  const results=useMemo(()=>artists.filter(person=>`${person.name} ${person.role} ${person.skills.join(" ")}`.toLowerCase().includes(query.toLowerCase())&&(city==="All cities"||person.city===city)),[query,city]);
  return <PublicLayout><main className="mx-auto min-h-[70vh] max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-[9px] uppercase tracking-[.28em] text-[#d6b36a]">Creative directory · Tamil Nadu</p><h1 className="mt-3 text-4xl font-medium md:text-5xl">Talent, with a story.</h1><p className="mt-3 max-w-xl text-sm leading-6 text-white/50">Explore demo profiles across acting, dance, music and production craft.</p></div><Link href="/login?role=filmmaker" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs hover:border-[#d6b36a]/45">Filmmaker sign in <ArrowRight size={14}/></Link></div>
    <div className="mt-8 grid gap-3 rounded-2xl border border-white/[.08] bg-[#111217] p-4 md:grid-cols-[1fr_220px]"><label className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4"><Search size={16} className="text-white/35"/><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Search by name, discipline or skill" className="min-w-0 flex-1 bg-transparent py-3 text-xs outline-none placeholder:text-white/30"/></label><select aria-label="Filter by city" value={city} onChange={event=>setCity(event.target.value)} className="rounded-xl border border-white/10 bg-[#15161b] px-4 py-3 text-xs text-white/70 outline-none"><option>All cities</option>{tamilNaduCities.slice(1).map(item=><option key={item}>{item}</option>)}</select></div>
    <div className="mt-5 text-[10px] text-white/40">{results.length} sample profiles · Contact details are intentionally not public</div>
    <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{results.map(person=><article key={person.id} className="rounded-2xl border border-white/[.09] bg-[#111217] p-5 transition hover:border-[#d6b36a]/35"><div className="flex items-center gap-4"><div className={`flex size-16 items-center justify-center rounded-full ${person.color} font-serif text-lg text-[#e2c47a]`}>{person.initials}</div><div><h2 className="text-base font-medium">{person.name}</h2><p className="mt-1 text-xs text-white/45">{person.role}</p><p className="mt-2 flex items-center gap-1 text-[10px] text-white/35"><MapPin size={11}/>{person.city}</p></div></div><p className="mt-5 text-[10px] text-white/35">LANGUAGES</p><p className="mt-1 text-xs text-white/60">{person.languages}</p><div className="mt-4 flex flex-wrap gap-2">{person.skills.map(skill=><span key={skill} className="rounded-full border border-white/[.08] px-2.5 py-1 text-[9px] text-white/50">{skill}</span>)}</div><Link href={`/artists/${person.id}`} className="mt-5 flex items-center justify-between border-t border-white/[.07] pt-4 text-[10px] font-semibold uppercase tracking-[.13em] text-[#dfc47f]">View portfolio <ArrowRight size={14}/></Link></article>)}</div>
    {results.length===0&&<div className="mt-8 rounded-2xl border border-dashed border-white/15 py-14 text-center"><Camera className="mx-auto text-white/25"/><p className="mt-3 text-sm">No profiles found. Try a different skill or city.</p><button onClick={()=>{setQuery("");setCity("All cities");}} className="mt-3 text-xs text-[#dfc47f]">Clear filters</button></div>}
  </main></PublicLayout>;
}
