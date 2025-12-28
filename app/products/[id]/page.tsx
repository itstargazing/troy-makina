import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";

import { ProductActions } from "@/components/product-actions";
import { ProductGallery } from "@/components/product-gallery";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getProductById, products } from "@/lib/products";

export async function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const product = getProductById(params.id);
  if (!product) {
    return { title: "Продукт" };
  }

  return {
    title: `${product.name} | Технические характеристики`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Технические характеристики`,
      description: product.fullDescription,
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id);
  if (!product) notFound();

  return (
    <div className="container-wide space-y-8 py-10">
      <div className="text-sm text-[#9aa4ae]">
        <Link href="/products" className="hover:text-[#e9edf1]">
          Каталог
        </Link>
        <span className="mx-2">/</span>
        <span className="text-[#e9edf1]">{product.name}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <ProductGallery images={product.images} name={product.name} />

        <div className="space-y-5 rounded-2xl border border-[#1c2633] bg-[rgba(17,24,39,0.7)] p-6">
          <div className="space-y-2">
            <Badge variant="outline" className="border-[#1c2633]">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold text-[#e9edf1]">{product.name}</h1>
            <p className="text-sm text-[#9aa4ae]">{product.shortDescription}</p>
          </div>

          <ProductActions product={product} />

          <div className="grid gap-3 sm:grid-cols-2">
            {Object.entries(product.specs).map(([key, value]) => (
              <div
                key={key}
                className="rounded-lg border border-[#1c2633] bg-[rgba(255,255,255,0.02)] px-4 py-3"
              >
                <p className="text-[11px] uppercase tracking-wide text-[#ffb37a]">{key}</p>
                <p className="text-sm text-[#e9edf1]">{value}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {product.standards.map((std) => (
              <Badge key={std} variant="outline">
                {std}
              </Badge>
            ))}
          </div>

          <Button asChild variant="secondary" size="sm" className="border-[#1c2633]">
            <a href={product.datasheetUrl} target="_blank" rel="noreferrer">
              <Download className="h-4 w-4" /> Паспорт / Datasheet
            </a>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="description" className="space-y-4">
        <TabsList>
          <TabsTrigger value="description">Описание</TabsTrigger>
          <TabsTrigger value="specs">Характеристики</TabsTrigger>
          <TabsTrigger value="details">Детализация</TabsTrigger>
        </TabsList>

        <TabsContent value="description">
          <p className="text-sm leading-relaxed text-[#e9edf1]">{product.fullDescription}</p>
        </TabsContent>

        <TabsContent value="specs">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="rounded-lg border border-[#1c2633] bg-[rgba(255,255,255,0.02)] p-3">
                <p className="text-[11px] uppercase tracking-wide text-[#ffb37a]">{key}</p>
                <p className="text-sm text-[#e9edf1]">{value}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details">
          <div className="space-y-2 text-sm text-[#e9edf1]">
            {product.details.map((line) => (
              <div key={line} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#f1f2f5]" />
                <span>{line}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
