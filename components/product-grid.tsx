"use client";

import { useEffect, useState } from "react";

import { Product } from "@/lib/products";
import { ProductCard } from "./product-card";

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHydrated(true), 150);
    return () => clearTimeout(timer);
  }, []);

  if (!hydrated) {
    return (
      <div className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="flex flex-col border border-[#222] bg-[#0a0a0a]">
            <div className="aspect-[16/10] animate-pulse bg-[#151515]" />
            <div className="flex flex-1 flex-col p-5">
              <div className="mb-4 min-h-[72px] space-y-2">
                <div className="h-4 w-3/4 animate-pulse bg-[#1a1a1a]" />
                <div className="h-3 w-full animate-pulse bg-[#151515]" />
                <div className="h-3 w-2/3 animate-pulse bg-[#151515]" />
              </div>
              <div className="mb-4 grid grid-cols-3 gap-1.5">
                <div className="h-10 animate-pulse bg-[#151515]" />
                <div className="h-10 animate-pulse bg-[#151515]" />
                <div className="h-10 animate-pulse bg-[#151515]" />
              </div>
              <div className="mt-auto flex gap-2">
                <div className="h-9 flex-1 animate-pulse bg-[#1a1a1a]" />
                <div className="h-9 flex-1 animate-pulse bg-[#222]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  );
}
