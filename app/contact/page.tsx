"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, PhoneCall, MapPin, Loader2, CheckCircle, AlertCircle } from "lucide-react";

import { contactConfig } from "@/lib/contact";
import { useContact } from "@/components/contact-provider";

export default function ContactPage() {
  const { openContact } = useContact();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Ошибка отправки");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Ошибка отправки");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-16">
      <section className="border-b border-[#222] py-24">
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#555]">Контакты</p>
            <h1 className="mt-2 text-5xl font-black uppercase tracking-tight text-white md:text-6xl">
              Связь
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#888]">
              Ответим на технические вопросы и подготовим коммерческое предложение
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-[#222] bg-[#111] p-8"
            >
              <h2 className="text-xl font-bold uppercase text-white">Прямые контакты</h2>
              <p className="mt-2 text-sm text-[#666]">
                Свяжитесь с отделом продаж напрямую
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#333]">
                    <PhoneCall className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#555]">Телефоны</p>
                    <p className="mt-1 text-white">{contactConfig.phoneDisplay}</p>
                    <p className="text-white">{contactConfig.phoneDisplay2}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#333]">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#555]">Email</p>
                    <p className="mt-1 text-white">{contactConfig.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#333]">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#555]">WhatsApp</p>
                    <p className="mt-1 text-white">{contactConfig.whatsappNumber}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#333]">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#555]">Адрес</p>
                    <p className="mt-1 text-white">Казахстан</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openContact()}
                className="mt-8 w-full bg-white py-4 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-[#ddd]"
              >
                Открыть контакты
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="border border-[#222] bg-[#111] p-8"
            >
              <h2 className="text-xl font-bold uppercase text-white">Отправить сообщение</h2>
              <p className="mt-2 text-sm text-[#666]">
                Заполните форму и мы свяжемся с вами
              </p>

              {status === "success" && (
                <div className="mt-4 flex items-center gap-2 rounded border border-green-500/30 bg-green-500/10 p-4 text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm">Сообщение отправлено! Мы свяжемся с вами в ближайшее время.</span>
                </div>
              )}

              {status === "error" && (
                <div className="mt-4 flex items-center gap-2 rounded border border-red-500/30 bg-red-500/10 p-4 text-red-400">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[#555]">Имя</label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={status === "loading"}
                    className="mt-2 w-full border border-[#222] bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-[#555] focus:border-[#444] focus:outline-none disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[#555]">Email</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={status === "loading"}
                    className="mt-2 w-full border border-[#222] bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-[#555] focus:border-[#444] focus:outline-none disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-[#555]">Сообщение</label>
                  <textarea
                    rows={5}
                    placeholder="Ваше сообщение..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={status === "loading"}
                    className="mt-2 w-full resize-none border border-[#222] bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-[#555] focus:border-[#444] focus:outline-none disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 border border-white py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    "Отправить"
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
