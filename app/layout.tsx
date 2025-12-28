import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

import { FloatingContactButton, Header } from "@/components/header";
import { ContactProvider } from "@/components/contact-provider";
import { Footer } from "@/components/footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Troy Makina Kazakhstan | Бетонный завод",
  description:
    "Промышленное оборудование для бетонных заводов. Дозаторы, смесители, транспортеры, автоматизация.",
  keywords: [
    "бетонный завод",
    "дозатор цемента",
    "двухвальный смеситель",
    "Troy Makina",
    "Kazakhstan",
  ],
  openGraph: {
    title: "Troy Makina Kazakhstan",
    description: "Промышленное оборудование для бетонных заводов",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${spaceGrotesk.variable} bg-[#0a0a0a] antialiased`}>
        <ContactProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingContactButton />
        </ContactProvider>
      </body>
    </html>
  );
}
