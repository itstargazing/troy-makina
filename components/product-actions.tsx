"use client";

import { FormEvent, useState } from "react";
import { ClipboardPlus, Mail, MessageCircle } from "lucide-react";

import { Product } from "@/lib/products";
import { useContact } from "./contact-provider";
import { useCompareStore } from "@/store/compare-store";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export function ProductActions({ product }: { product: Product }) {
  const { openContact } = useContact();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const compareItems = useCompareStore((state) => state.items);
  const toggleCompare = useCompareStore((state) => state.toggle);
  const isCompared = compareItems.some((p) => p.id === product.id);

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuoteOpen(false);
  };

  return (
    <>
      <div className="flex items-center gap-2 text-sm text-[#9aa4ae]">
        <Badge variant="default">{product.availability}</Badge>
        <Badge variant="outline">{product.material}</Badge>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button size="lg" onClick={() => openContact(product)}>
          <MessageCircle className="h-5 w-5" />
          Связаться
        </Button>
        <Button variant="secondary" size="lg" onClick={() => setQuoteOpen(true)}>
          <Mail className="h-5 w-5" />
          Запросить предложение
        </Button>
        <Button
          variant={isCompared ? "primary" : "ghost"}
          size="lg"
          className="border border-[#1c2633]"
          onClick={() => toggleCompare(product)}
        >
          <ClipboardPlus className="h-5 w-5" />
          {isCompared ? "В сравнении" : "Добавить в сравнение"}
        </Button>
      </div>

      <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#e9edf1]">Запросить предложение</DialogTitle>
            <DialogDescription className="text-[#9aa4ae]">
              Укажите объём и условия для {product.name}.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4" onSubmit={submitQuote}>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" placeholder="Ваше имя" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@company.com" required />
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quantity">Количество</Label>
                <Input id="quantity" placeholder="например 1 комплект" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Площадка доставки</Label>
                <Input id="location" placeholder="Город / объект" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Требования</Label>
              <Textarea id="notes" placeholder="Особенности, сроки, стандарты" />
            </div>
            <Button type="submit" className="w-full">
              Отправить
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
