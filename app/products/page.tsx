"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

type FilterState = {
  search: string;
  category: string;
  availability: string;
};

const availabilityOrder: Record<string, number> = {
  "В наличии": 0,
  "Низкий запас": 1,
  "Под заказ": 2,
};

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    availability: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => Array.from(new Set(products.map((p) => p.category))), []);

  const filteredProducts = useMemo(() => {
    let items = [...products];
    if (filters.search) {
      const query = filters.search.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query)
      );
    }
    if (filters.category) {
      items = items.filter((p) => p.category === filters.category);
    }
    if (filters.availability) {
      items = items.filter((p) => p.availability === filters.availability);
    }
    items.sort((a, b) => (availabilityOrder[a.availability] ?? 99) - (availabilityOrder[b.availability] ?? 99));
    return items;
  }, [filters]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">
      <section className="border-b border-[#222] py-24">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#555]">Продукция</p>
            <h1 className="mt-2 text-5xl font-black uppercase tracking-tight text-white md:text-6xl">
              Каталог
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#888]">
              Все модули бетонного завода с полными техническими характеристиками
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-wide">
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#555]" />
              <input
                type="text"
                placeholder="Поиск..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full border border-[#222] bg-[#111] py-3 pl-12 pr-4 text-sm text-white placeholder-[#555] transition-colors focus:border-[#444] focus:outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border border-[#222] px-4 py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#111]"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Фильтры
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-8 border border-[#222] bg-[#111] p-6"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[#555]">Категория</label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="mt-2 w-full border border-[#222] bg-[#0a0a0a] px-4 py-3 text-sm text-white focus:outline-none"
                  >
                    <option value="">Все</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[#555]">Наличие</label>
                  <select
                    value={filters.availability}
                    onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                    className="mt-2 w-full border border-[#222] bg-[#0a0a0a] px-4 py-3 text-sm text-white focus:outline-none"
                  >
                    <option value="">Все</option>
                    <option value="В наличии">В наличии</option>
                    <option value="Низкий запас">Низкий запас</option>
                    <option value="Под заказ">Под заказ</option>
                  </select>
                </div>
              </div>
              <button
                onClick={() => setFilters({ search: "", category: "", availability: "" })}
                className="mt-4 flex items-center gap-2 text-xs text-[#888] transition-colors hover:text-white"
              >
                <X className="h-3 w-3" />
                Сбросить фильтры
              </button>
            </motion.div>
          )}

          <p className="mb-6 text-sm text-[#555]">
            Найдено: <span className="text-white">{filteredProducts.length}</span> позиций
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
