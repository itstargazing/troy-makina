"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, AlertTriangle, MessageCircle } from "lucide-react";

import { useCompareStore } from "@/store/compare-store";
import { useContact } from "@/components/contact-provider";

export default function ComparePage() {
  const compareItems = useCompareStore((state) => state.items);
  const removeProduct = useCompareStore((state) => state.remove);
  const { openContact } = useContact();

  const allSpecs = useMemo(() => {
    const specs = new Set<string>();
    compareItems.forEach((item) => {
      Object.keys(item.specs).forEach((key) => specs.add(key));
    });
    return Array.from(specs);
  }, [compareItems]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">
      <section className="border-b border-[#222] py-24">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#555]">Сравнение</p>
            <h1 className="mt-2 text-5xl font-black uppercase tracking-tight text-white md:text-6xl">
              Сравнить
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#888]">
              Сравните до 3 продуктов бок о бок
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-wide">
          {compareItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-[#222] bg-[#111] py-24 text-center">
              <AlertTriangle className="h-12 w-12 text-[#555]" />
              <p className="mt-4 text-xl font-bold text-white">Список пуст</p>
              <p className="mt-2 text-sm text-[#666]">
                Добавьте продукты для сравнения из каталога
              </p>
              <Link
                href="/products"
                className="mt-6 border border-white px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
              >
                Каталог
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {compareItems.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative border border-[#222] bg-[#0a0a0a]"
                >
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center border border-[#333] bg-black/50 text-white transition-colors hover:bg-white hover:text-black"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold uppercase text-white">{product.name}</h3>
                    <p className="mt-2 text-sm text-[#888]">{product.shortDescription}</p>

                    <div className="mt-6 space-y-3">
                      {allSpecs.map((specKey) => (
                        <div key={specKey} className="flex justify-between border-b border-[#222] pb-2 text-sm">
                          <span className="text-[#666]">{specKey}</span>
                          <span className="font-medium text-white">
                            {product.specs[specKey] || "—"}
                          </span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => openContact(product)}
                      className="mt-6 flex w-full items-center justify-center gap-2 bg-white py-3 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-[#ddd]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Заказать
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
