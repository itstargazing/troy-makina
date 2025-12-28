"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, MessageCircle } from "lucide-react";

import { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { useCompareStore } from "@/store/compare-store";
import { useContact } from "./contact-provider";

type Props = {
  product: Product;
  index?: number;
};

export function ProductCard({ product, index = 0 }: Props) {
  const { openContact } = useContact();
  const compareItems = useCompareStore((state) => state.items);
  const toggleCompare = useCompareStore((state) => state.toggle);
  const isCompared = compareItems.some((p) => p.id === product.id);
  const [expanded, setExpanded] = useState(false);

  const specEntries = Object.entries(product.specs);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group relative flex h-full flex-col border border-[#222] bg-[#0a0a0a] transition-all duration-300 hover:border-[#444]"
    >
      {/* Image - Fixed aspect ratio */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="bg-white px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-black">
            {product.category}
          </span>
        </div>

        {/* Compare button */}
        <motion.button
          onClick={() => toggleCompare(product)}
          className={cn(
            "absolute right-3 top-3 flex h-9 w-9 items-center justify-center border border-white/30 bg-black/60 text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black",
            isCompared && "bg-white text-black"
          )}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className={cn("h-4 w-4 transition-transform", isCompared && "rotate-45")} />
        </motion.button>
      </div>

      {/* Content - Fixed height sections */}
      <div className="flex flex-1 flex-col p-5">
        {/* Title section - Fixed height */}
        <div className="mb-4 min-h-[72px]">
          <h3 className="line-clamp-2 text-base font-bold uppercase leading-tight tracking-tight text-white">
            {product.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#777]">
            {product.shortDescription}
          </p>
        </div>

        {/* Specs grid - Fixed 3 items */}
        {specEntries.length > 0 && (
          <div className="mb-4 grid grid-cols-3 gap-1.5">
            {specEntries.slice(0, 3).map(([key, value]) => (
              <div key={key} className="border border-[#1a1a1a] bg-[#0d0d0d] p-2">
                <p className="truncate text-[8px] uppercase tracking-wider text-[#555]">{key}</p>
                <p className="mt-0.5 truncate text-[11px] font-medium text-white">{value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Buttons - Always at bottom */}
        <div className="mt-auto flex gap-2">
          <motion.button
            onClick={() => setExpanded((v) => !v)}
            className="flex flex-1 items-center justify-center gap-1.5 border border-[#333] py-2.5 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
            whileTap={{ scale: 0.98 }}
          >
            <ChevronDown className={cn("h-3 w-3 transition-transform", expanded && "rotate-180")} />
            Детали
          </motion.button>
          <motion.button
            onClick={() => openContact(product)}
            className="flex flex-1 items-center justify-center gap-1.5 bg-white py-2.5 text-[10px] font-bold uppercase tracking-widest text-black transition-all hover:bg-[#ddd]"
            whileTap={{ scale: 0.98 }}
          >
            <MessageCircle className="h-3 w-3" />
            Заказ
          </motion.button>
        </div>
      </div>

      {/* Expandable details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-[#222]"
          >
            <div className="max-h-[400px] space-y-4 overflow-y-auto bg-[#0d0d0d] p-5">
              {/* All specs */}
              {specEntries.length > 0 && (
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {specEntries.map(([key, value]) => (
                    <div key={key} className="border-l-2 border-[#333] bg-[#111] py-1.5 pl-3 pr-2">
                      <p className="text-[9px] uppercase tracking-wider text-[#555]">{key}</p>
                      <p className="text-xs text-white">{value}</p>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Full details list */}
              <div className="space-y-1.5 border-t border-[#222] pt-4">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-widest text-[#555]">
                  Полные характеристики
                </p>
                {product.details.map((line, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#999]">
                    <span className="mt-1.5 h-1 w-1 shrink-0 bg-white" />
                    <span className="leading-relaxed">{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
