"use client";
import { useState } from "react";
import { Clapperboard, Camera, MapPin, ArrowRight } from "lucide-react";

export default function Register() {
  const [role,setRole]=useState("ARTIST");
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setMessage("");
    const form=new FormData(e.currentTarget);
    try {
      const res=await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({name:form.get("name"),email:form.get("email"),password:form.get("password"),role})});
      const data=await res.json();
      if(!res.ok) throw new Error(data.error || "Registration failed");
      setMessage("Account created. Welcome to CINEBRIDGE.");
    } catch(err:any){ setMessage(err.message); } finally { setBusy(false); }
  }
  const roles=[
    {value:"FILMMAKER",title:"Filmmaker",text:"Cast talent and manage productions",icon:Clapperboard},
    {value:"ARTIST",title:"Artist",text:"Build your portfolio and audition",icon:Camera},
    {value:"VENUE_OWNER",title:"Venue Partner",text:"List spaces and manage bookings",icon:MapPin},
  ];
  return <main className="min-h-screen bg-[#08090d] px-5 py-10">
    <a href="/" className="mx-auto flex w-fit items-center gap-3 text-sm font-bold tracking-[.2em]"><Clapperboard className="text-[#d6b36a]" size={24}/>CINEBRIDGE</a>
    <div className="mx-auto mt-10 max-w-5xl">
      <p className="text-center text-[10px] uppercase tracking-[.35em] text-[#d6b36a]">Choose your portal</p><h1 className="mt-3 text-center text-4xl md:text-5xl">Join CINEBRIDGE</h1>
      <div className="mt-8 grid gap-3 md:grid-cols-3">{roles.map(r=>{const Icon=r.icon;return <button key={r.value} onClick={()=>setRole(r.value)} className={`rounded-2xl border p-5 text-left transition ${role===r.value?"border-[#d6b36a] bg-[#d6b36a]/10":"border-white/10 bg-[#11131a]"}`}><Icon className={role===r.value?"text-[#d6b36a]":"text-white/50"} size={28}/><strong className="mt-5 block">{r.title}</strong><span className="mt-1 block text-sm text-white/45">{r.text}</span></button>})}</div>
      <form onSubmit={submit} className="mx-auto mt-6 grid max-w-xl gap-4 rounded-2xl border border-white/10 bg-[#11131a] p-5 md:p-7">
        <input name="name" required placeholder="Full name" className="rounded-xl border border-white/10 bg-black/20 px-4 py-4 outline-none focus:border-[#d6b36a]"/>
        <input name="email" type="email" required placeholder="Email address" className="rounded-xl border border-white/10 bg-black/20 px-4 py-4 outline-none focus:border-[#d6b36a]"/>
        <input name="password" type="password" required minLength={8} placeholder="Password (minimum 8 characters)" className="rounded-xl border border-white/10 bg-black/20 px-4 py-4 outline-none focus:border-[#d6b36a]"/>
        {message&&<p className="rounded-lg bg-white/5 px-4 py-3 text-sm">{message}</p>}
        <button disabled={busy} className="flex items-center justify-center gap-2 rounded-full bg-[#d6b36a] py-4 text-sm font-bold text-black">{busy?"Creating account...":"Create account"}<ArrowRight size={16}/></button>
        <p className="text-center text-sm text-white/45">Already registered? <a href="/login" className="text-[#d6b36a]">Log in</a></p>
      </form>
    </div>
  </main>
}
