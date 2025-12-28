import Link from "next/link";

import { HeroSection } from "@/components/hero-section";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

const showcase = products.filter(p => p.featured).slice(0, 6);

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="border-t border-[#222] bg-[#0a0a0a] py-24">
        <div className="container-wide">
          <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#555]">Производство</p>
              <h2 className="mt-2 text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
                Что мы делаем
              </h2>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#333] to-transparent md:mx-8" />
          </div>

          <div className="grid gap-px bg-[#222] md:grid-cols-3">
            {[
              { title: "Дозирование", desc: "Цемент, вода, добавки — точные дозаторы с пневмозаслонками и тензодатчиками." },
              { title: "Смеситель", desc: "Двухвальный TTM 4500/3000 с Ni-Hard футеровками и синхронизацией валов." },
              { title: "Автоматизация", desc: "PLC управление, визуализация, рецепты, журналы аварий, ручное управление." },
            ].map((item, i) => (
              <div key={item.title} className="bg-[#0a0a0a] p-8 transition-colors hover:bg-[#111]">
                <span className="text-5xl font-black text-[#222]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-xl font-bold uppercase tracking-tight text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#888]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#222] bg-[#0a0a0a] py-24">
        <div className="container-wide">
          <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#555]">Каталог</p>
              <h2 className="mt-2 text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
                Оборудование
              </h2>
            </div>
            <Link 
              href="/products" 
              className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-70"
            >
              Все продукты
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {showcase.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
