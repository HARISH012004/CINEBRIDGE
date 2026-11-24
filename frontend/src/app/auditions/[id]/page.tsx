"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, CalendarDays, Clock3, MapPin, ShieldAlert, TicketCheck } from "lucide-react";
import { PublicLayout } from "@/components/site-shell";
import { FilmArtwork } from "@/components/film-artwork";
import { auditions, createDemoReference, getStoredSession } from "@/lib/demo-data";
import type { DemoApplicationReceipt } from "@/lib/demo-data";

function AuditionDetailContent() {
  const params = useParams<{id:string}>();
  const router = useRouter();
  const call = auditions.find(item=>item.id===params.id);
  const [receipt,setReceipt]=useState<DemoApplicationReceipt|null>(null);
  if (!call) return <PublicLayout><main className="mx-auto min-h-[65vh] max-w-3xl px-5 py-20 text-center"><h1 className="text-3xl">This casting call isn’t available</h1><p className="mt-3 text-sm text-white/50">It may have moved. Browse all currently listed demo calls instead.</p><Link className="mt-6 inline-flex items-center gap-2 text-sm text-[#ffd28c]" href="/auditions">Back to auditions <ArrowRight size={14}/></Link></main></PublicLayout>;

  function apply() {
    const session=getStoredSession();
    if(!session || session.role!=="ARTIST") { router.push("/login?role=artist"); return; }
    const items=JSON.parse(localStorage.getItem("cinebridge_demo_applications")||"[]") as string[];
    if(!items.includes(params.id)) items.push(params.id);
    localStorage.setItem("cinebridge_demo_applications",JSON.stringify(items));
    const applicationReceipt={reference:createDemoReference("APP"),submittedAt:new Date().toISOString()};
    const receipts=JSON.parse(localStorage.getItem("cinebridge_demo_application_receipts")||"{}") as Record<string,DemoApplicationReceipt>;
    receipts[params.id]=applicationReceipt;
    localStorage.setItem("cinebridge_demo_application_receipts",JSON.stringify(receipts));
    const refs=JSON.parse(localStorage.getItem("cinebridge_demo_application_refs")||"{}") as Record<string,string>;
    refs[params.id]=applicationReceipt.reference;
    localStorage.setItem("cinebridge_demo_application_refs",JSON.stringify(refs));
    setReceipt(applicationReceipt);
  }

  return <PublicLayout><main className="mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-12"><Link href="/auditions" className="inline-flex items-center gap-2 text-xs text-white/55 hover:text-white"><ArrowLeft size={14}/>All casting calls</Link>
    <FilmArtwork image={call.image} title={call.name} type={call.type} sizes="(max-width: 1024px) 100vw, 1200px" className="mt-5 min-h-[320px] rounded-3xl border border-[#f2b866]/20 md:min-h-[440px]">
      <p className="mb-2 text-[9px] font-semibold uppercase tracking-[.28em] text-[#ffd28c]">A CINEBRIDGE sample production</p>
      <h1 className="max-w-3xl font-serif text-3xl leading-tight text-white sm:text-4xl md:text-6xl">{call.name}</h1>
      <p className="mt-3 text-sm text-white/80">{call.role} <span className="px-2 text-white/40">·</span> {call.city}, Tamil Nadu</p>
    </FilmArtwork>
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]"><section className="space-y-5">
      <article className="rounded-2xl border border-white/[.08] bg-[#21131e] p-6"><h2 className="text-lg">About the project</h2><p className="mt-3 text-sm leading-7 text-white/55">{call.description}</p><div className="mt-5 flex flex-wrap gap-2">{call.skills.map(skill=><span key={skill} className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/65">{skill}</span>)}</div></article>
      <article className="rounded-2xl border border-white/[.08] bg-[#21131e] p-6"><h2 className="text-lg">Role at a glance</h2><dl className="mt-5 grid gap-5 sm:grid-cols-2"><div><dt className="text-[10px] text-white/35">Role</dt><dd className="mt-1 text-sm">{call.role}</dd></div><div><dt className="text-[10px] text-white/35">Age guidance</dt><dd className="mt-1 text-sm">{call.age}</dd></div><div><dt className="text-[10px] text-white/35">Language</dt><dd className="mt-1 text-sm">{call.language}</dd></div><div><dt className="text-[10px] text-white/35">Participation fee</dt><dd className="mt-1 text-sm">{call.fee}</dd></div></dl></article>
      <div className="flex gap-3 rounded-2xl border border-amber-300/15 bg-amber-950/15 p-4 text-amber-100/70"><ShieldAlert className="mt-0.5 shrink-0 text-[#f2b866]" size={17}/><p className="text-xs leading-5">CINEBRIDGE never asks you to pay to secure a role. Confirm the production, audition address and terms independently. This listing is sample demo content.</p></div>
    </section>
    <aside className="h-fit rounded-2xl border border-[#f2b866]/20 bg-[#21131e] p-5 shadow-[0_16px_50px_rgba(0,0,0,.2)]"><div className="flex items-center gap-2 text-[9px] uppercase tracking-[.18em] text-[#ffd28c]"><BadgeCheck size={14}/>Opportunity summary</div><div className="mt-5 space-y-4 text-xs"><p className="flex items-start gap-3 text-white/70"><MapPin size={15} className="mt-0.5 text-[#ffd28c]/70"/><span>{call.city}, Tamil Nadu<br/><small className="text-white/45">Venue details shared with shortlisted applicants</small></span></p><p className="flex items-center gap-3 text-white/70"><CalendarDays size={15} className="text-[#ffd28c]/70"/>Audition date · {call.date}</p><p className="flex items-center gap-3 text-white/70"><Clock3 size={15} className="text-[#ffd28c]/70"/>Applications close · {call.deadline}</p></div>
      {receipt?<div role="status" aria-live="polite" className="demo-receipt mt-6 rounded-2xl border border-emerald-300/25 bg-[#111c18] p-4"><p className="flex items-center gap-2 text-sm font-semibold text-emerald-200"><TicketCheck size={17}/>Application acknowledgement</p><p className="mt-1 text-[9px] uppercase tracking-[.16em] text-emerald-100/55">Demo receipt · not sent to production</p><div className="my-4 border-t border-dashed border-emerald-100/25"/><p className="text-[9px] uppercase tracking-[.16em] text-white/40">Reference number</p><p className="mt-1 break-all font-mono text-lg font-bold tracking-[.12em] text-[#ffe0a6]">{receipt.reference}</p><p className="mt-3 text-[10px] leading-5 text-white/55">Your sample application is saved in this browser. No real production has received it.</p><Link href="/dashboard/artist/applications" className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold text-[#ffd28c]">View application tracker <ArrowRight size={12}/></Link></div>:<button onClick={apply} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#f2b866] px-4 py-3.5 text-xs font-bold text-[#24100e] hover:bg-[#ffd28c]">Submit demo application <ArrowRight size={14}/></button>}
      <p className="mt-3 text-center text-[9px] leading-4 text-white/40">No fee is charged and no application is transmitted outside this browser.</p>
      <Link href="/contact" className="mt-4 block text-center text-[10px] text-white/45 hover:text-[#ffd28c]">Report a concern</Link>
    </aside></div>
  </main></PublicLayout>;
}

export default function AuditionDetailPage() {
  return <Suspense fallback={<div className="min-h-screen bg-[#130a12]"/>}><AuditionDetailContent/></Suspense>;
}
