"use client";

import { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
  images: string[];
  name: string;
};

export function ProductGallery({ images, name }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#1c2633]">
        <Image
          src={images[active]}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f14]/70 via-transparent to-transparent" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, idx) => (
          <button
            key={img}
            onClick={() => setActive(idx)}
            className={cn(
              "relative aspect-video overflow-hidden rounded-lg border border-[#1c2633] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1f2f5]/50",
              active === idx && "border-[#f1f2f5]/70",
            )}
            aria-label={`View ${name} image ${idx + 1}`}
          >
            <Image src={img} alt={`${name} thumbnail`} fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

