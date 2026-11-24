"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, MapPin, ShieldAlert, Star, TicketCheck } from "lucide-react";
import { PublicLayout } from "@/components/site-shell";
import { createDemoReference, getStoredSession, venues } from "@/lib/demo-data";

type BookingAcknowledgement = { reference: string; venue: string; date: string; time: string; createdAt: string };

function VenueDetailContent(){
 const params=useParams<{id:string}>();
 const router=useRouter();
 const place=venues.find(item=>item.id===params.id);
 const [acknowledgement,setAcknowledgement]=useState<BookingAcknowledgement|null>(null);
 if(!place)return <PublicLayout><main className="mx-auto min-h-[65vh] max-w-3xl px-5 py-20 text-center"><h1 className="text-3xl">Space not found</h1><p className="mt-3 text-sm text-white/50">Browse the sample venue marketplace for other spaces.</p><Link className="mt-6 inline-flex items-center gap-2 text-sm text-[#ffd28c]" href="/venues">Explore spaces <ArrowRight size={14}/></Link></main></PublicLayout>;
 function request(event:FormEvent<HTMLFormElement>){
   event.preventDefault();
   const session=getStoredSession();
   if(!session||session.role!=="FILMMAKER"){router.push("/login?role=filmmaker");return;}
   const form=new FormData(event.currentTarget);
   const booking={reference:createDemoReference("BKG"),venue:params.id,date:String(form.get("date")),time:String(form.get("time")),createdAt:new Date().toISOString()};
   const requests=JSON.parse(localStorage.getItem("cinebridge_demo_bookings")||"[]") as BookingAcknowledgement[];
   requests.push(booking);
   localStorage.setItem("cinebridge_demo_bookings",JSON.stringify(requests));
   setAcknowledgement(booking);
 }

 return <PublicLayout><main className="mx-auto max-w-6xl px-5 py-9 lg:px-8 lg:py-12"><Link href="/venues" className="inline-flex items-center gap-2 text-xs text-white/45"><ArrowLeft size={14}/>Venue marketplace</Link><section className={`relative mt-6 flex min-h-60 items-end overflow-hidden rounded-3xl bg-gradient-to-br ${place.color} p-7 md:min-h-80 md:p-10`}><div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_12%,rgba(226,196,122,.18),transparent_45%)]"/><div className="relative"><span className="rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[9px] uppercase tracking-[.16em]">{place.category}</span><h1 className="mt-5 text-3xl font-medium md:text-5xl">{place.name}</h1><p className="mt-3 flex items-center gap-2 text-sm text-white/65"><MapPin size={15}/>{place.city}, Tamil Nadu · Up to {place.capacity} guests</p></div></section>
  <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_350px]"><section className="space-y-5"><article className="rounded-2xl border border-white/[.08] bg-[#21131e] p-6"><div className="flex items-center justify-between"><h2 className="text-lg">Space overview</h2><span className="flex items-center gap-1 text-xs text-[#ffe0a6]"><Star size={13} className="fill-[#f2b866]"/> {place.rating} <small className="text-white/35">demo rating</small></span></div><p className="mt-3 text-sm leading-7 text-white/55">{place.name} is a sample {place.category.toLowerCase()} in {place.city}, presented to demonstrate how production teams can compare spaces and send a booking enquiry. Pricing and availability are illustrative.</p><h3 className="mt-6 text-[10px] uppercase tracking-[.18em] text-white/40">Facilities</h3><div className="mt-3 flex flex-wrap gap-2">{place.features.map(feature=><span key={feature} className="rounded-full border border-white/10 px-3 py-2 text-[10px] text-white/65">{feature}</span>)}</div></article><div className="flex gap-3 rounded-2xl border border-amber-300/15 bg-amber-950/15 p-4 text-amber-100/70"><ShieldAlert className="mt-0.5 shrink-0 text-[#f2b866]" size={17}/><p className="text-xs leading-5">This is a demo listing, not a confirmed rental offer. A demo booking request does not reserve the venue or collect money.</p></div></section>
  <aside className="h-fit rounded-2xl border border-[#f2b866]/20 bg-[#21131e] p-5 shadow-[0_16px_50px_rgba(0,0,0,.2)]"><p className="text-[9px] uppercase tracking-[.18em] text-[#ffd28c]">Indicative rental</p><p className="mt-2 text-2xl">₹{place.rate.toLocaleString("en-IN")}<small className="text-xs font-normal text-white/50"> / hour</small></p><div className="my-5 border-t border-white/[.1]"/>{acknowledgement?<div role="status" aria-live="polite" className="demo-receipt rounded-2xl border border-emerald-300/25 bg-[#111c18] p-4"><p className="flex items-center gap-2 text-sm font-semibold text-emerald-200"><TicketCheck size={17}/>Booking enquiry acknowledgement</p><p className="mt-1 text-[9px] uppercase tracking-[.16em] text-emerald-100/55">Demo receipt · not a confirmed reservation</p><div className="my-4 border-t border-dashed border-emerald-100/25"/><p className="text-[9px] uppercase tracking-[.16em] text-white/40">Reference number</p><p className="mt-1 break-all font-mono text-lg font-bold tracking-[.12em] text-[#ffe0a6]">{acknowledgement.reference}</p><dl className="mt-4 space-y-3 border-t border-white/10 pt-3 text-[10px]"><div className="flex justify-between gap-3"><dt className="text-white/45">Venue</dt><dd className="text-right">{place.name}</dd></div><div className="flex justify-between gap-3"><dt className="text-white/45">Requested date</dt><dd>{acknowledgement.date}</dd></div><div className="flex justify-between gap-3"><dt className="text-white/45">Time slot</dt><dd>{acknowledgement.time}</dd></div></dl><p className="mt-4 text-[10px] leading-5 text-white/55">Saved in this browser only. The venue partner has not been notified, no slot is held, and no payment was taken.</p><Link href="/dashboard/filmmaker/bookings" className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold text-[#ffd28c]">View demo booking tracker <ArrowRight size={12}/></Link></div>:<form onSubmit={request} className="grid gap-3"><label className="grid gap-2 text-[10px] text-white/55">Preferred date<input name="date" type="date" required min={new Date().toISOString().slice(0,10)} className="rounded-lg border border-[#f2b866]/20 bg-[#140b13] px-3 py-3 text-xs text-white"/></label><label className="grid gap-2 text-[10px] text-white/55">Preferred time<select name="time" className="rounded-lg border border-[#f2b866]/20 bg-[#140b13] px-3 py-3 text-xs text-white"><option>09:00–13:00</option><option>13:00–17:00</option><option>17:00–21:00</option></select></label><button className="mt-2 flex items-center justify-center gap-2 rounded-full bg-[#f2b866] px-4 py-3.5 text-xs font-bold text-[#24100e]"><CalendarDays size={14}/>Request a demo booking</button><p className="text-center text-[9px] text-white/40">Enquiry only · No payment required</p></form>}</aside></div>
 </main></PublicLayout>;
}

export default function VenueDetailPage(){
 return <Suspense fallback={<div className="min-h-screen bg-[#130a12]"/>}><VenueDetailContent/></Suspense>;
}
