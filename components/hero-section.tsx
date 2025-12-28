"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { useContact } from "@/components/contact-provider";

export function HeroSection() {
  const { openContact } = useContact();
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  
  const bgX = useTransform(springX, [0, 1], [-15, 15]);
  const bgY = useTransform(springY, [0, 1], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 scale-110"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "grayscale(100%) contrast(1.1)",
          x: bgX,
          y: bgY,
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      
      <div className="scanlines absolute inset-0" />
      
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ 
          background: [
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 50%)",
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-wide relative z-10 flex flex-col gap-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            className="text-[12vw] font-black uppercase leading-[0.85] tracking-tighter text-white sm:text-[10vw] lg:text-[8vw]"
            style={{ textShadow: "0 0 80px rgba(255,255,255,0.15)" }}
          >
            <motion.span 
              className="block"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Troy
            </motion.span>
            <motion.span 
              className="block text-[#888]"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Makina
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
          <span className="text-sm uppercase tracking-[0.3em] text-white/60">Kazakhstan</span>
          <div className="h-px flex-1 bg-gradient-to-l from-white/40 to-transparent" />
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link href="/products">
            <motion.button
              className="group relative overflow-hidden border border-white bg-white px-8 py-4 text-sm font-bold uppercase tracking-widest text-black transition-all hover:bg-transparent hover:text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Каталог</span>
              <motion.div
                className="absolute inset-0 bg-black"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </Link>
          <motion.button
            onClick={() => openContact()}
            className="border border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:border-white hover:bg-white/10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Связаться
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
