"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ContactFormProps = {
  onSuccess?: () => void;
};

export function ContactForm({ onSuccess }: ContactFormProps) {
  const t = useTranslations("contact");
  const [inquiryType, setInquiryType] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const message = formData.get("message") as string;

    if (!inquiryType || !message?.trim()) {
      toast.error(t("required"));
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          city: formData.get("city"),
          type: inquiryType,
          message,
          preferredDate: formData.get("preferredDate"),
          website: formData.get("website"),
        }),
      });

      if (!res.ok) {
        toast.error(t("submitError"));
        return;
      }

      toast.success(t("submitSuccess"));
      onSuccess?.();
      form.reset();
      setInquiryType(null);
    } catch {
      toast.error(t("submitError"));
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />
      <div className="space-y-2">
        <Label htmlFor="name">{t("name")}</Label>
        <Input id="name" name="name" className="min-h-12 text-base" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">{t("phoneField")}</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          className="min-h-12 text-base"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="city">{t("city")}</Label>
        <Input id="city" name="city" className="min-h-12 text-base" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">{t("type")}</Label>
        <Select value={inquiryType} onValueChange={setInquiryType}>
          <SelectTrigger className="min-h-12 w-full text-base">
            <SelectValue placeholder={t("type")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dars">{t("typeDars")}</SelectItem>
            <SelectItem value="lecture">{t("typeLecture")}</SelectItem>
            <SelectItem value="finance">{t("typeFinance")}</SelectItem>
            <SelectItem value="other">{t("typeOther")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={4}
          className="min-h-24 text-base"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="preferredDate">{t("preferredDate")}</Label>
        <Input
          id="preferredDate"
          name="preferredDate"
          type="date"
          className="min-h-12 text-base"
        />
      </div>
      <Button
        type="submit"
        disabled={sending}
        className="tap-target w-full bg-brand text-brand-foreground hover:bg-brand/90"
      >
        {sending ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
