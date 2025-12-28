import Link from "next/link";
import { contactConfig } from "@/lib/contact";

const links = [
  { label: "Каталог", href: "/products" },
  { label: "Сравнение", href: "/compare" },
  { label: "Контакты", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-[#222] bg-[#0a0a0a] py-16">
      <div className="container-wide">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">
              Troy<span className="text-[#555]">Makina</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[#666]">
              Промышленное оборудование для бетонных заводов. Технические модули, дозаторы, смесители, автоматизация.
            </p>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[#555]">Навигация</h4>
            <nav className="mt-4 flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#888] transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-[#555]">Контакты</h4>
            <div className="mt-4 space-y-3 text-sm text-[#888]">
              <p>{contactConfig.phoneDisplay}</p>
              <p>{contactConfig.email}</p>
              <p>WhatsApp: {contactConfig.whatsappNumber}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 flex flex-col gap-4 border-t border-[#222] pt-8 text-xs text-[#555] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {contactConfig.companyName}</p>
          <p>Промышленное оборудование</p>
        </div>
      </div>
    </footer>
  );
}
