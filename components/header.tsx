"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";

import { useContact } from "./contact-provider";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/products", label: "Каталог" },
  { href: "/compare", label: "Сравнение" },
  { href: "/contact", label: "Контакты" },
];

export function Header() {
  const pathname = usePathname();
  const { openContact } = useContact();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#222] bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="container-wide flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-black uppercase tracking-tight text-white">
          Troy<span className="text-[#666]">Makina</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors"
                style={{
                  backgroundColor: isActive ? "#ffffff" : "transparent",
                  color: isActive ? "#000000" : "#888888",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => openContact()}
            className="hidden border border-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black md:flex"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Связаться
          </motion.button>
          
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center text-white md:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-[#222] bg-[#0a0a0a] md:hidden"
        >
          <nav className="container-wide flex flex-col py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm font-bold uppercase tracking-widest transition-colors px-4 -mx-4"
                  style={{
                    backgroundColor: isActive ? "#ffffff" : "transparent",
                    color: isActive ? "#000000" : "#888888",
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={() => { openContact(); setMobileOpen(false); }}
              className="mt-4 border border-white py-3 text-sm font-bold uppercase tracking-widest text-white"
            >
              Связаться
            </button>
          </nav>
        </motion.div>
      )}
    </header>
  );
}

export function FloatingContactButton() {
  const { openContact } = useContact();
  return (
    <motion.button
      onClick={() => openContact()}
      className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center border border-white bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:scale-110"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <MessageCircle className="h-6 w-6" />
    </motion.button>
  );
}
