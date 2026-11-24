import { Clapperboard, Sparkles } from "lucide-react";

export function TheaterOpening() {
  return (
    <div aria-hidden="true" className="theater-opening">
      <div className="theater-curtain theater-curtain-left" />
      <div className="theater-curtain theater-curtain-right" />
      <div className="theater-valance" />
      <div className="theater-opening-title">
        <span className="flex size-14 items-center justify-center rounded-full border border-[#ffd48c]/45 bg-[#2b101d]/70 text-[#ffd48c] shadow-[0_0_48px_rgba(242,184,102,.2)]">
          <Clapperboard size={24} />
        </span>
        <span className="mt-5 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.38em] text-[#ffd48c]">
          <Sparkles size={12} /> CINEBRIDGE PICTURES PRESENTS
        </span>
        <span className="mt-2 font-serif text-2xl italic tracking-wide text-[#fff1df] sm:text-3xl">The next story is yours.</span>
      </div>
    </div>
  );
}
