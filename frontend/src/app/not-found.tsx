import Link from "next/link";
import { ArrowLeft, ArrowRight, Clapperboard } from "lucide-react";
import { PublicLayout } from "@/components/site-shell";

export default function NotFound(){
 return <PublicLayout><main className="flex min-h-[65vh] items-center justify-center px-5 py-16 text-center"><div className="max-w-lg"><span className="mx-auto flex size-14 items-center justify-center rounded-full border border-[#f2b866]/25 bg-[#f2b866]/[.07] text-[#f2b866]"><Clapperboard size={23}/></span><p className="mt-6 text-[9px] uppercase tracking-[.25em] text-[#f2b866]">Wrong turn between scenes</p><h1 className="mt-3 text-3xl font-medium md:text-4xl">We couldn’t find that page.</h1><p className="mt-3 text-sm leading-6 text-white/50">Nothing is broken in your demo session. Head back to the lobby or browse the current sample opportunities.</p><div className="mt-6 flex justify-center gap-3"><Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-xs"><ArrowLeft size={13}/>Home</Link><Link href="/auditions" className="inline-flex items-center gap-2 rounded-full bg-[#f2b866] px-5 py-3 text-xs font-bold text-black">Auditions <ArrowRight size={13}/></Link></div></div></main></PublicLayout>;
}
