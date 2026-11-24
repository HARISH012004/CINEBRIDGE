"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, CalendarDays, Check, Clock3, MapPin, ShieldAlert } from "lucide-react";
import { PublicLayout } from "@/components/site-shell";
import { auditions, getStoredSession } from "@/lib/demo-data";

function AuditionDetailContent() {
  const params = useParams<{id:string}>();
  const router = useRouter();
  const call = auditions.find(item=>item.id===params.id);
  const [applied,setApplied]=useState(false);
  if (!call) return <PublicLayout><main className="mx-auto min-h-[65vh] max-w-3xl px-5 py-20 text-center"><h1 className="text-3xl">This casting call isn’t available</h1><p className="mt-3 text-sm text-white/50">It may have moved. Browse all currently listed demo calls instead.</p><Link className="mt-6 inline-flex items-center gap-2 text-sm text-[#dfc47f]" href="/auditions">Back to auditions <ArrowRight size={14}/></Link></main></PublicLayout>;

  function apply() {
    const session=getStoredSession();
    if(!session || session.role!=="ARTIST") { router.push("/login?role=artist"); return; }
    const items=JSON.parse(localStorage.getItem("cinebridge_demo_applications")||"[]") as string[];
    if(!items.includes(params.id)) items.push(params.id);
    localStorage.setItem("cinebridge_demo_applications",JSON.stringify(items));
    setApplied(true);
  }

  return <PublicLayout><main className="mx-auto max-w-6xl px-5 py-9 lg:px-8 lg:py-12"><Link href="/auditions" className="inline-flex items-center gap-2 text-xs text-white/45 hover:text-white"><ArrowLeft size={14}/>All casting calls</Link>
    <div className={`relative mt-6 flex min-h-56 items-end overflow-hidden rounded-3xl bg-gradient-to-br ${call.color} p-7 md:min-h-72 md:p-10`}><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_10%,rgba(226,196,122,.19),transparent_46%)]"/><div className="relative"><span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[9px] uppercase tracking-[.15em]">{call.type}</span><h1 className="mt-5 max-w-3xl text-3xl font-medium md:text-5xl">{call.name}</h1><p className="mt-3 text-sm text-white/65">{call.role}</p></div></div>
    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]"><section className="space-y-5">
      <article className="rounded-2xl border border-white/[.08] bg-[#111217] p-6"><h2 className="text-lg">About the project</h2><p className="mt-3 text-sm leading-7 text-white/55">{call.description}</p><div className="mt-5 flex flex-wrap gap-2">{call.skills.map(skill=><span key={skill} className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-white/65">{skill}</span>)}</div></article>
      <article className="rounded-2xl border border-white/[.08] bg-[#111217] p-6"><h2 className="text-lg">Role at a glance</h2><dl className="mt-5 grid gap-5 sm:grid-cols-2"><div><dt className="text-[10px] text-white/35">Role</dt><dd className="mt-1 text-sm">{call.role}</dd></div><div><dt className="text-[10px] text-white/35">Age guidance</dt><dd className="mt-1 text-sm">{call.age}</dd></div><div><dt className="text-[10px] text-white/35">Language</dt><dd className="mt-1 text-sm">{call.language}</dd></div><div><dt className="text-[10px] text-white/35">Participation fee</dt><dd className="mt-1 text-sm">{call.fee}</dd></div></dl></article>
      <div className="flex gap-3 rounded-2xl border border-amber-300/15 bg-amber-950/15 p-4 text-amber-100/70"><ShieldAlert className="mt-0.5 shrink-0 text-[#d6b36a]" size={17}/><p className="text-xs leading-5">CINEBRIDGE never asks you to pay to secure a role. Confirm the production, audition address and terms independently. This listing is sample demo content.</p></div>
    </section>
    <aside className="h-fit rounded-2xl border border-white/[.09] bg-[#111217] p-5"><div className="flex items-center gap-2 text-[9px] uppercase tracking-[.18em] text-[#dfc47f]"><BadgeCheck size={14}/>Opportunity summary</div><div className="mt-5 space-y-4 text-xs"><p className="flex items-start gap-3 text-white/60"><MapPin size={15} className="mt-0.5 text-white/35"/><span>{call.city}, Tamil Nadu<br/><small className="text-white/35">Venue details shared with shortlisted applicants</small></span></p><p className="flex items-center gap-3 text-white/60"><CalendarDays size={15} className="text-white/35"/>Audition date · {call.date}</p><p className="flex items-center gap-3 text-white/60"><Clock3 size={15} className="text-white/35"/>Applications close · {call.deadline}</p></div>
      {applied?<div role="status" className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-950/20 px-4 py-3 text-xs text-emerald-200"><Check size={15}/>Demo application recorded</div>:<button onClick={apply} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#d6b36a] px-4 py-3.5 text-xs font-bold text-black hover:bg-[#efd48f]">Apply for this role <ArrowRight size={14}/></button>}
      <p className="mt-3 text-center text-[9px] leading-4 text-white/35">Applying stores a sample status in your browser. No real submission is sent.</p>
      <Link href="/contact" className="mt-4 block text-center text-[10px] text-white/45 hover:text-[#dfc47f]">Report a concern</Link>
    </aside></div>
  </main></PublicLayout>;
}

export default function AuditionDetailPage() {
  return <Suspense fallback={<div className="min-h-screen bg-[#090a0d]"/>}><AuditionDetailContent/></Suspense>;
}
