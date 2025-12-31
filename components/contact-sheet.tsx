"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, PhoneCall, Send, Copy, Check, X } from "lucide-react";

import { contactConfig } from "@/lib/contact";
import { useContact } from "./contact-provider";

const formatMessage = (productName?: string, productId?: string) =>
  productName
    ? `Здравствуйте. Интересует: ${productName} (ID: ${productId}). Количество: __. Локация доставки: __.`
    : "Здравствуйте. Нужна консультация по модулям бетонного завода.";

export default function ContactSheet() {
  const { isOpen, setOpen, selectedProduct } = useContact();
  const [copiedField, setCopiedField] = useState<"phone" | "email" | null>(null);

  const message = formatMessage(selectedProduct?.name, selectedProduct?.id);
  const whatsappLink = `https://wa.me/${contactConfig.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  const telegramLink = contactConfig.telegramUsername
    ? `https://t.me/${contactConfig.telegramUsername}`
    : `https://t.me/${contactConfig.whatsappNumber.replace(/\D/g, "")}`;
  const mailtoLink = `mailto:${contactConfig.email}?subject=${encodeURIComponent("Запрос по оборудованию")}&body=${encodeURIComponent(message)}`;

  const copyValue = async (value: string, field: "phone" | "email") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1200);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-[#222] bg-[#0a0a0a] p-8"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center text-[#888] transition-colors hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-black uppercase tracking-tight text-white">
              Связаться
            </h2>
            <p className="mt-2 text-sm text-[#666]">
              Ответ в рабочее время в течение 1 часа
            </p>

              <div className="mt-8 space-y-6">
              <div className="border border-[#222] bg-[#111] p-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#555]">Контакт</p>
                <p className="mt-2 text-lg font-bold text-white">{contactConfig.salesName}</p>
                <p className="text-sm text-[#888]">{contactConfig.salesRole}</p>
                <div className="mt-3 space-y-1">
                  <p className="text-sm text-white">{contactConfig.phoneDisplay}</p>
                  <p className="text-sm text-white">{contactConfig.phoneDisplay2}</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => copyValue(contactConfig.phone1, "phone")}
                    className="flex items-center gap-2 border border-[#333] px-3 py-2 text-xs text-white transition-colors hover:bg-[#222]"
                  >
                    {copiedField === "phone" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    Копировать тел.
                  </button>
                  <button
                    onClick={() => copyValue(contactConfig.email, "email")}
                    className="flex items-center gap-2 border border-[#333] px-3 py-2 text-xs text-white transition-colors hover:bg-[#222]"
                  >
                    {copiedField === "email" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    Email
                  </button>
                </div>
              </div>

              {selectedProduct && (
                <div className="border border-[#222] bg-[#111] p-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#555]">Продукт</p>
                  <p className="mt-2 font-bold text-white">{selectedProduct.name}</p>
                  <p className="text-xs text-[#666]">ID: {selectedProduct.id}</p>
                </div>
              )}

              <div className="grid gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-white py-4 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-[#ddd]"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
                <a
                  href={telegramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 border border-white py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
                >
                  <Send className="h-5 w-5" />
                  Telegram
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${contactConfig.phone1}`}
                    className="flex items-center justify-center gap-2 border border-[#333] py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#222]"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Тел. 1
                  </a>
                  <a
                    href={`tel:${contactConfig.phone2}`}
                    className="flex items-center justify-center gap-2 border border-[#333] py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#222]"
                  >
                    <PhoneCall className="h-4 w-4" />
                    Тел. 2
                  </a>
                </div>
                <a
                  href={mailtoLink}
                  className="flex items-center justify-center gap-2 border border-[#333] py-3 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-[#222]"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
