import Image from "next/image";
import type { venues } from "@/lib/demo-data";

type VenuePhotoProps = {
  place: (typeof venues)[number];
  className?: string;
  imageClassName?: string;
  sizes?: string;
};

export function VenuePhoto({
  place,
  className = "",
  imageClassName = "aspect-[16/10]",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: VenuePhotoProps) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden rounded-xl bg-[#21131e] ${imageClassName}`}>
        <Image
          src={place.image}
          alt={place.imageAlt}
          fill
          sizes={sizes}
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/65 px-2.5 py-1.5 text-[8px] font-semibold uppercase tracking-[.12em] text-white/90">
          Illustrative photo · not this venue
        </span>
      </div>
      <figcaption className="mt-2 text-[9px] leading-4 text-white/40">
        Photo (cropped to fit layout):{" "}
        <a
          href={place.imageSource}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-white/25 underline-offset-2 hover:text-[#ffd28c]"
        >
          {place.imageCredit}
        </a>
        {" · "}
        {place.imageLicenseUrl ? (
          <a
            href={place.imageLicenseUrl}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-white/25 underline-offset-2 hover:text-[#ffd28c]"
          >
            {place.imageLicense}
          </a>
        ) : (
          place.imageLicense
        )}
      </figcaption>
    </figure>
  );
}
