"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import { Drawer } from "vaul";
import { ContactForm } from "@/components/ContactForm";

type ContactDrawerContextValue = {
  open: () => void;
};

const ContactDrawerContext = createContext<ContactDrawerContextValue | null>(
  null
);

export function useContactDrawer() {
  const context = useContext(ContactDrawerContext);
  if (!context) {
    throw new Error("useContactDrawer must be used within ContactDrawerProvider");
  }
  return context;
}

export function ContactDrawerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("contact");

  const openDrawer = useCallback(() => setOpen(true), []);

  return (
    <ContactDrawerContext.Provider value={{ open: openDrawer }}>
      {children}
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
          <Drawer.Content
            data-lenis-prevent
            className="fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[85vh] flex-col rounded-t-2xl bg-background px-4 pb-8 outline-none"
          >
            <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-border" />
            <Drawer.Title className="mt-4 text-lg font-semibold text-brand">
              {t("formTitle")}
            </Drawer.Title>
            <div className="mt-4 overflow-y-auto">
              <ContactForm onSuccess={() => setOpen(false)} />
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </ContactDrawerContext.Provider>
  );
}
