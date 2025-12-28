"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Product } from "@/lib/products";
import ContactSheet from "./contact-sheet";

type ContactContextValue = {
  openContact: (product?: Product) => void;
  closeContact: () => void;
  setOpen: (open: boolean) => void;
  selectedProduct?: Product;
  isOpen: boolean;
};

const ContactContext = createContext<ContactContextValue | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const openContact = useCallback((product?: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  }, []);

  const closeContact = useCallback(() => setIsOpen(false), []);
  const setOpen = useCallback((open: boolean) => setIsOpen(open), []);

  const value = useMemo(
    () => ({
      openContact,
      closeContact,
      setOpen,
      selectedProduct,
      isOpen,
    }),
    [openContact, closeContact, setOpen, selectedProduct, isOpen],
  );

  return (
    <ContactContext.Provider value={value}>
      {children}
      <ContactSheet />
    </ContactContext.Provider>
  );
}

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used within ContactProvider");
  return ctx;
}

