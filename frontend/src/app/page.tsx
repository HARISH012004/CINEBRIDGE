"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clapperboard, MapPin, Search, Sparkles, Star, Users, Volume2, VolumeX } from "lucide-react";

const cards = [
  { tag:"FEATURED AUDITION", title:"Lead Artist — Period Drama", meta:"Chennai • 18–30 • Paid", date:"DEC 08", accent:"from-amber-200/10" },
  { tag:"CASTING CALL", title:"Music Video Ensemble", meta:"Coimbatore • All genders", date:"DEC 12", accent:"from-red-800/20" },
  { tag:"WEB SERIES", title:"Character Artists Needed", meta:"Madurai • 25–45 • Free", date:"DEC 16", accent:"from-blue-900/30" },
];

export default function Home() {
  const [intro, setIntro] = useState(true);
  const [muted, setMuted] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("cinebridge_intro_seen") === "1") setIntro(false);
  }, []);

  const enter = () => {
    localStorage.setItem("cinebridge_intro_seen", "1");
    setIntro(false);
  };

  return (
    <>
      <AnimatePresence>
        {intro && (
          <motion.section
            initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050506]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,179,106,.16),transparent_42%)]" />
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay:.15,duration:1.2,ease:"easeOut" }}
              className="absolute left-0 top-0 h-full w-1/2 origin-left border-r border-[#d6b36a]/20 bg-[linear-gradient(90deg,#090909,#21090d)]" />
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay:.15,duration:1.2,ease:"easeOut" }}
              className="absolute right-0 top-0 h-full w-1/2 origin-right border-l border-[#d6b36a]/20 bg-[linear-gradient(-90deg,#090909,#21090d)]" />
            <button onClick={() => setMuted(!muted)} className="absolute right-5 top-5 z-20 rounded-full border border-white/10 p-3 text-white/70">
              {muted ? <VolumeX size={18}/> : <Volume2 size={18}/>}
            </button>
            <button onClick={enter} className="absolute right-5 top-16 z-20 text-xs uppercase tracking-[.25em] text-white/50">Skip intro</button>
            <motion.div initial={{ opacity:0, y:24, filter:"blur(12px)" }} animate={{ opacity:1,y:0,filter:"blur(0)" }} transition={{ delay:1.1,duration:.8 }}
              className="relative z-10 max-w-xl px-6 text-center">
              <motion.div animate={{ rotate:360 }} transition={{ duration:18,repeat:Infinity,ease:"linear" }}
                className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-[#d6b36a]/40 text-[#d6b36a]">
                <Clapperboard size={38}/>
              </motion.div>
              <p className="mb-3 text-[10px] uppercase tracking-[.55em] text-[#d6b36a]">The cinema of opportunity</p>
              <h1 className="text-5xl font-semibold tracking-[.12em] md:text-7xl">CINEBRIDGE</h1>
              <p className="mt-5 text-lg text-white/65">Every Dream Has a Screen.</p>
              <button onClick={enter} className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#d6b36a]/50 bg-[#d6b36a]/10 px-7 py-4 text-xs font-bold uppercase tracking-[.22em] text-[#f1d99a] transition hover:bg-[#d6b36a] hover:text-black">
                Enter CINEBRIDGE <ArrowRight size={16}/>
              </button>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      <div className={intro ? "invisible" : "visible"}>
        <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[.07] bg-[#08090d]/85 backdrop-blur-xl">
          <nav className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 lg:px-10">
            <a href="#" className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d6b36a]/50 text-[#d6b36a]"><Clapperboard size={18}/></span>
              <span className="text-sm font-bold tracking-[.22em]">CINEBRIDGE</span>
            </a>
            <div className="hidden items-center gap-7 text-[12px] font-medium text-white/72 lg:flex">
              <a className="text-[#d6b36a]" href="#">Home</a><a href="#auditions">Auditions</a><a href="/artists">Artists</a><a href="/venues">Venues</a><a href="#opportunities">Opportunities</a><a href="#about">About</a>
            </div>
            <div className="hidden items-center gap-3 lg:flex">
              <a href="/login" className="px-4 py-3 text-xs">Login</a>
              <a href="/register" className="rounded-full bg-[#d6b36a] px-5 py-3 text-xs font-bold text-[#15110a]">Join CINEBRIDGE</a>
            </div>
            <button onClick={() => setMenu(!menu)} className="text-xs uppercase tracking-widest lg:hidden">Menu</button>
          </nav>
          {menu && <div className="grid border-t border-white/10 bg-[#08090d] p-5 text-sm lg:hidden">
            <a href="#auditions" className="border-b border-white/10 py-4">Discover Auditions</a><a href="/artists" className="border-b border-white/10 py-4">Explore Artists</a><a href="/venues" className="border-b border-white/10 py-4">Find Venues</a><a href="/login" className="border-b border-white/10 py-4">Login</a><a href="/register" className="py-4 text-[#d6b36a]">Join CINEBRIDGE</a>
          </div>}
        </header>

        <main>
          <section className="cinema-grain relative flex min-h-[780px] items-end overflow-hidden pt-24 md:min-h-[720px]">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1800&q=85')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,10,.96)_0%,rgba(7,8,12,.72)_48%,rgba(7,8,12,.22)_100%),linear-gradient(0deg,#08090d_0%,transparent_35%)]" />
            <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-24 md:px-10 md:pb-28">
              <motion.div initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:.2,duration:.8}} className="max-w-3xl">
                <div className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.38em] text-[#d6b36a]"><span className="h-px w-12 bg-[#d6b36a]"/>India&apos;s Cinema Network</div>
                <h1 className="max-w-3xl text-5xl leading-[.98] tracking-tight sm:text-6xl md:text-8xl">THE NEXT BIG <span className="gold-text italic">STAR</span><br/>COULD BE YOU.</h1>
                <p className="mt-7 max-w-xl text-base leading-7 text-white/68 md:text-lg">Discover auditions, connect with filmmakers, showcase your talent and find the perfect production spaces — all in one cinematic ecosystem.</p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a href="#auditions" className="flex items-center justify-center gap-3 rounded-full bg-[#d6b36a] px-7 py-4 text-xs font-bold uppercase tracking-[.16em] text-[#171109]">Explore Auditions <ArrowRight size={16}/></a>
                  <a href="/artists" className="flex items-center justify-center gap-3 rounded-full border border-white/25 px-7 py-4 text-xs font-bold uppercase tracking-[.16em]">Find Talent</a>
                  <a href="/venues" className="flex items-center justify-center gap-3 rounded-full border border-white/25 px-7 py-4 text-xs font-bold uppercase tracking-[.16em]">List Your Venue</a>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="auditions" className="relative bg-[#08090d] py-20">
            <div className="mx-auto max-w-[1440px] px-5 md:px-10">
              <div className="mb-9 flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-[.35em] text-[#d6b36a]">Now Casting</p><h2 className="mt-3 text-3xl font-semibold md:text-5xl">Featured Auditions</h2></div><a href="/auditions" className="hidden items-center gap-2 text-xs text-white/60 md:flex">View all <ArrowRight size={14}/></a></div>
              <div className="grid gap-5 md:grid-cols-3">
                {cards.map((card,i) => (
                  <motion.article key={card.title} whileHover={{y:-6}} className="group overflow-hidden rounded-2xl border border-white/[.09] bg-[#11131a]">
                    <div className={`relative h-56 bg-[linear-gradient(145deg,rgba(20,25,35,.2),rgba(94,22,32,.45)),url('https://images.unsplash.com/photo-${i===0?"1485846234645-a62644f84728":i===1?"1492691527719-9d1e07e534b4":"1481627834876-b7833e8f5570"}?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center`}>
                      <span className="absolute left-5 top-5 rounded-full bg-black/55 px-3 py-2 text-[9px] tracking-[.2em] backdrop-blur-md">{card.tag}</span>
                      <span className="absolute bottom-4 right-4 rounded-lg border border-white/15 bg-black/55 px-3 py-2 text-[10px] backdrop-blur-md">{card.date}</span>
                    </div>
                    <div className="p-6"><h3 className="text-xl font-semibold">{card.title}</h3><p className="mt-3 flex items-center gap-2 text-sm text-white/55"><MapPin size={14}/>{card.meta}</p><a href="/auditions" className="mt-6 flex items-center justify-between border-t border-white/[.08] pt-5 text-xs font-bold uppercase tracking-[.15em] text-[#d6b36a]">View call <ArrowRight size={15}/></a></div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section id="opportunities" className="border-y border-white/[.06] bg-[#0d0f15] py-20">
            <div className="mx-auto grid max-w-[1440px] gap-10 px-5 md:px-10 lg:grid-cols-[1fr_1.25fr]">
              <div className="relative min-h-[430px] overflow-hidden rounded-3xl bg-[url('https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1100&q=85')] bg-cover bg-center"><div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"/></div>
              <div className="flex flex-col justify-center"><p className="text-[10px] uppercase tracking-[.35em] text-[#d6b36a]">Built for the Industry</p><h2 className="mt-4 max-w-xl text-4xl leading-tight md:text-6xl">One stage.<br/>Every possibility.</h2><p className="mt-6 max-w-lg leading-7 text-white/58">CINEBRIDGE connects every side of production with clear workflows, verified profiles and transparent booking tools.</p>
                <div className="mt-9 grid grid-cols-3 gap-3"><div className="rounded-xl border border-white/[.08] p-4"><Users className="text-[#d6b36a]" size={20}/><strong className="mt-4 block text-2xl">3</strong><span className="text-xs text-white/45">Portal types</span></div><div className="rounded-xl border border-white/[.08] p-4"><Search className="text-[#d6b36a]" size={20}/><strong className="mt-4 block text-2xl">11</strong><span className="text-xs text-white/45">Tamil Nadu cities</span></div><div className="rounded-xl border border-white/[.08] p-4"><Sparkles className="text-[#d6b36a]" size={20}/><strong className="mt-4 block text-2xl">1</strong><span className="text-xs text-white/45">Creative network</span></div></div>
              </div>
            </div>
          </section>

          <section id="about" className="bg-[#08090d] py-20">
            <div className="mx-auto max-w-[1440px] px-5 text-center md:px-10"><p className="text-[10px] uppercase tracking-[.35em] text-[#d6b36a]">The CINEBRIDGE Standard</p><h2 className="mx-auto mt-4 max-w-3xl text-3xl md:text-5xl">Discover talent. Build productions.<br/>Create the next unforgettable frame.</h2><div className="mt-10 flex justify-center gap-1 text-[#d6b36a]">{[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor"/>)}</div></div>
          </section>
        </main>

        <footer className="border-t border-white/[.08] bg-[#06070a] py-10">
          <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-5 text-sm text-white/45 md:flex-row md:items-center md:justify-between md:px-10"><a href="#" className="font-bold tracking-[.2em] text-white">CINEBRIDGE</a><div className="flex flex-wrap gap-x-6 gap-y-3"><a href="#">Privacy</a><a href="#">Terms</a><a href="#">Safety Guidelines</a><a href="#">Contact</a></div><span>© 2026 CINEBRIDGE</span></div>
        </footer>
      </div>
    </>
  );
}
