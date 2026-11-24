import Link from "next/link";
import { ArrowDown, ArrowRight, CalendarDays, Camera, Clapperboard, MapPin, Sparkles, Users } from "lucide-react";
import { PublicLayout } from "@/components/site-shell";
import { FilmArtwork } from "@/components/film-artwork";
import { TheaterOpening } from "@/components/theater-opening";
import { auditions, artists, venues } from "@/lib/demo-data";

export default function Home() {
  const featured = auditions[0];
  return <PublicLayout>
    <main>
      <section className="relative overflow-hidden border-b border-[#f2b866]/20">
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(19,8,17,.98)_0%,rgba(31,11,22,.86)_45%,rgba(29,9,20,.43)_100%),linear-gradient(0deg,#130a12_0%,transparent_48%),url('/posters/marudham.jpg')] bg-cover bg-center"/>
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_38%,rgba(229,135,81,.24),transparent_40%)]"/>
        <div className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-7xl items-center gap-10 px-5 py-12 sm:py-16 lg:grid-cols-[1.05fr_.72fr] lg:gap-16 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f2b866]/30 bg-[#2a101c]/65 px-4 py-2 text-[9px] font-semibold uppercase tracking-[.24em] text-[#ffd28c] backdrop-blur-sm"><Clapperboard size={13}/> The Tamil cinema creative network</div>
            <h1 className="text-[clamp(3rem,8vw,7.2rem)] font-medium leading-[.9] tracking-[-.07em]">OUR STORIES.<br/><span className="font-serif italic text-[#ffc878]">One big screen.</span></h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#fff1df]/75 md:text-base">A new stage for the filmmakers, artists and event partners who bring Tamil stories to life. Find your people. Make your next frame.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/auditions" className="flex items-center justify-center gap-2 rounded-full bg-[#f2b866] px-6 py-4 text-[11px] font-bold uppercase tracking-[.13em] text-[#24100e] shadow-[0_8px_35px_rgba(242,184,102,.2)] transition hover:bg-[#ffd28c]">Explore the call sheet <ArrowRight size={15}/></Link>
              <Link href="/register" className="flex items-center justify-center gap-2 rounded-full border border-[#ffe3bf]/35 bg-[#1b0c16]/35 px-6 py-4 text-[11px] font-semibold uppercase tracking-[.13em] transition hover:border-[#ffd28c]/70 hover:text-[#ffd28c]"><Users size={15}/> Choose your portal</Link>
            </div>
            <Link href="#discover" className="mt-9 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.22em] text-[#fff1df]/55 transition hover:text-white">Take your seat <ArrowDown size={13}/></Link>
            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#fff1df]/15 pt-5 text-[8px] font-semibold uppercase tracking-[.2em] text-[#fff1df]/55 sm:text-[9px]"><span>06 sample stories</span><span>03 creative portals</span><span>01 shared screen</span></div>
          </div>
          <Link href={`/auditions/${featured.id}`} className="group relative mx-auto block w-full max-w-[360px] rotate-1 rounded-[1.8rem] border border-[#ffd28c]/35 bg-[#1b0c16] p-2 shadow-[0_30px_90px_rgba(0,0,0,.58)] transition duration-500 hover:rotate-0 hover:scale-[1.015] lg:mr-5">
            <FilmArtwork image={featured.image} title={featured.name} type={featured.type} priority sizes="(max-width: 1024px) 85vw, 34vw" className="aspect-[4/5] rounded-[1.35rem]">
              <p className="text-[8px] font-semibold uppercase tracking-[.3em] text-[#ffd28c]">CINEBRIDGE · FIRST LOOK</p>
              <h2 className="mt-2 font-serif text-3xl leading-tight text-white sm:text-4xl">Marudham</h2>
              <p className="mt-2 text-[10px] text-white/75">A story of roots, return and a new beginning.</p>
            </FilmArtwork>
            <span className="absolute -left-3 top-1/4 flex size-12 -rotate-12 items-center justify-center rounded-full border border-[#ffd28c]/50 bg-[#741d35] text-center text-[7px] font-bold uppercase leading-3 tracking-wider text-[#ffe3bf] shadow-lg">Now<br/>casting</span>
          </Link>
        </div>
        <TheaterOpening/>
      </section>

      <section id="discover" className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-[9px] uppercase tracking-[.28em] text-[#f2b866]">The CINEBRIDGE network</p><h2 className="mt-3 text-3xl font-medium tracking-tight md:text-4xl">One creative community.<br className="hidden sm:block"/> Three ways in.</h2></div><p className="max-w-md text-sm leading-6 text-white/45">Whether you cast the story, bring it to life, or give it a place to happen — there’s a home for you here.</p></div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[{ title:"Filmmakers", icon:Clapperboard, href:"/login?role=filmmaker", text:"Publish casting calls, discover talent and build your next production." },{ title:"Artists", icon:Camera, href:"/login?role=artist", text:"Create a portfolio, find real opportunities and track every application." },{ title:"Event & venue partners", icon:MapPin, href:"/login?role=venue-owner", text:"Showcase your location and manage transparent booking enquiries." }].map(item => {const Icon=item.icon;return <Link key={item.title} href={item.href} className="group rounded-2xl border border-white/[.09] bg-[#21131e] p-6 transition hover:-translate-y-1 hover:border-[#f2b866]/35"><span className="flex size-11 items-center justify-center rounded-xl border border-[#f2b866]/20 bg-[#f2b866]/[.06] text-[#f2b866]"><Icon size={20}/></span><h3 className="mt-5 text-lg">{item.title}</h3><p className="mt-2 min-h-12 text-xs leading-5 text-white/45">{item.text}</p><span className="mt-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.15em] text-[#ffd28c]">Enter this portal <ArrowRight size={13}/></span></Link>;})}
        </div>
      </section>

      <section className="border-y border-[#f2b866]/10 bg-[#1a0e18] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-end justify-between"><div><p className="text-[9px] uppercase tracking-[.28em] text-[#f2b866]">Now on the call sheet</p><h2 className="mt-3 text-3xl font-medium md:text-4xl">Featured opportunities</h2></div><Link href="/auditions" className="hidden items-center gap-2 text-xs text-white/55 hover:text-[#ffe0a6] sm:flex">All casting calls <ArrowRight size={14}/></Link></div>
          <div className="mt-7 grid gap-4 md:grid-cols-3">{auditions.slice(0,3).map((call,index)=><Link key={call.id} href={`/auditions/${call.id}`} className="group overflow-hidden rounded-2xl border border-[#f2b866]/15 bg-[#21131e] transition hover:-translate-y-1 hover:border-[#f2b866]/45"><FilmArtwork image={call.image} title={call.name} type={call.type} className="h-52" sizes="(max-width: 768px) 100vw, 33vw"><span className="font-serif text-2xl text-white">{String(index+1).padStart(2,"0")} <span className="text-[#ffd28c]">/ FEATURED</span></span></FilmArtwork><div className="p-5"><h3 className="text-base font-medium">{call.name}</h3><p className="mt-2 text-xs text-white/55">{call.role}</p><div className="mt-4 flex items-center justify-between border-t border-white/[.09] pt-4 text-[10px] text-white/55"><span className="flex items-center gap-1"><MapPin size={12}/>{call.city}</span><span>{call.date}</span></div><span className="mt-4 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[.14em] text-[#ffd28c]">See the full brief <ArrowRight size={13}/></span></div></Link>)}</div>
          <Link href="/auditions" className="mt-5 flex items-center justify-center gap-2 rounded-full border border-white/15 py-3.5 text-xs text-white/65 sm:hidden">View all casting calls <ArrowRight size={14}/></Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><p className="text-[9px] uppercase tracking-[.28em] text-[#f2b866]">A better way to make</p><h2 className="mt-3 text-3xl font-medium md:text-4xl">From first hello<br/>to final frame.</h2><p className="mt-4 max-w-md text-sm leading-6 text-white/45">CINEBRIDGE brings clarity to creative work — with useful profiles, direct workflows and no mystery about what happens next.</p><Link href="/about" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-[#ffd28c]">How it works <ArrowRight size={14}/></Link></div>
          <div className="grid gap-3 sm:grid-cols-3">{[{n:"01",title:"Find your people",desc:"Search casting calls, artists and production-ready spaces.",icon:Users},{n:"02",title:"Make a clear move",desc:"Apply, shortlist or send a booking request with the right details.",icon:CalendarDays},{n:"03",title:"Keep the work moving",desc:"Follow each update in a single role-based workspace.",icon:Sparkles}].map(item=>{const Icon=item.icon;return <article key={item.n} className="rounded-2xl border border-white/[.08] bg-[#21131e] p-5"><span className="flex size-9 items-center justify-center rounded-lg border border-[#f2b866]/20 text-[#f2b866]"><Icon size={17}/></span><p className="mt-5 text-[9px] tracking-[.2em] text-white/35">{item.n}</p><h3 className="mt-1 text-sm font-medium">{item.title}</h3><p className="mt-2 text-xs leading-5 text-white/45">{item.desc}</p></article>;})}</div>
        </div>
      </section>

      <section className="border-y border-[#f2b866]/10 bg-[#1a0e18] py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-end justify-between"><div><p className="text-[9px] uppercase tracking-[.28em] text-[#f2b866]">Places for the next take</p><h2 className="mt-3 text-3xl font-medium md:text-4xl">Made for the making.</h2></div><Link href="/venues" className="hidden items-center gap-2 text-xs text-white/55 sm:flex">Explore venues <ArrowRight size={14}/></Link></div>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{venues.slice(0,3).map(venue=><Link key={venue.id} href={`/venues/${venue.id}`} className="flex gap-4 rounded-2xl border border-white/[.08] bg-[#21131e] p-4 transition hover:border-[#f2b866]/35"><div className={`flex size-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${venue.color} font-serif text-lg text-[#ffe0a6]`}>{venue.initials}</div><div className="min-w-0 flex-1"><h3 className="truncate text-sm font-medium">{venue.name}</h3><p className="mt-1 text-[10px] text-white/45">{venue.category} · {venue.city}</p><p className="mt-3 text-[10px] text-[#ffd28c]">From ₹{venue.rate.toLocaleString("en-IN")} / hour</p></div></Link>)}</div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20"><div className="flex items-end justify-between"><div><p className="text-[9px] uppercase tracking-[.28em] text-[#f2b866]">The talent behind the frame</p><h2 className="mt-3 text-3xl font-medium md:text-4xl">Meet the community.</h2></div><Link href="/artists" className="hidden items-center gap-2 text-xs text-white/55 sm:flex">Discover artists <ArrowRight size={14}/></Link></div><div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{artists.slice(0,3).map(artist=><Link key={artist.id} href={`/artists/${artist.id}`} className="flex items-center gap-4 rounded-2xl border border-white/[.08] bg-[#21131e] p-4 transition hover:border-[#f2b866]/35"><span className={`flex size-12 items-center justify-center rounded-full ${artist.color} text-xs text-[#ecd79e]`}>{artist.initials}</span><span><strong className="block text-sm font-medium">{artist.name}</strong><small className="mt-1 block text-[10px] text-white/45">{artist.role} · {artist.city}</small></span><ArrowRight className="ml-auto text-white/30" size={15}/></Link>)}</div></section>
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8 lg:pb-20"><div className="flex flex-col justify-between gap-5 rounded-3xl border border-[#f2b866]/20 bg-[radial-gradient(ellipse_at_90%_50%,rgba(135,38,51,.24),transparent_42%),#21131e] p-7 md:flex-row md:items-center md:p-10"><div><p className="text-[9px] uppercase tracking-[.25em] text-[#f2b866]">Your next chapter</p><h2 className="mt-3 text-2xl font-medium md:text-3xl">The industry is better when we meet.</h2><p className="mt-2 text-sm text-white/45">Choose a portal and take a look around — the demo is ready.</p></div><Link href="/register" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#f2b866] px-6 py-4 text-xs font-bold text-[#24100e] hover:bg-[#efd48f]">Join the network <ArrowRight size={15}/></Link></div></section>
    </main>
  </PublicLayout>;
}
