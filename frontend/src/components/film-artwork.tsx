import Image from "next/image";

type FilmArtworkProps = {
  image: string;
  title: string;
  type: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  children?: React.ReactNode;
};

export function FilmArtwork({
  image,
  title,
  type,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  children,
}: FilmArtworkProps) {
  return (
    <div className={`film-artwork relative isolate overflow-hidden bg-[#24121d] ${className}`}>
      <Image
        src={image}
        alt={`Illustrative sample artwork for ${title}`}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover transition duration-700 group-hover:scale-105"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,7,13,.4)_0%,transparent_32%,rgba(17,7,13,.2)_58%,rgba(17,7,13,.94)_100%)]" />
      <div aria-hidden="true" className="film-sprocket film-sprocket-left" />
      <div aria-hidden="true" className="film-sprocket film-sprocket-right" />
      <div className="absolute inset-x-7 top-6 z-10 flex items-center justify-between text-[8px] font-semibold uppercase tracking-[.2em] text-white/85">
        <span className="rounded-full border border-white/30 bg-black/35 px-3 py-1.5 backdrop-blur-sm">{type}</span>
        <span className="rounded-full border border-[#f1bf70]/40 bg-[#160b12]/50 px-3 py-1.5 text-[#ffe0a6] backdrop-blur-sm">Sample artwork</span>
      </div>
      {children && <div className="absolute inset-x-8 bottom-7 z-10">{children}</div>}
    </div>
  );
}
