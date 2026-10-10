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
import { QUESTION_TOPICS } from "@/lib/questions/topics";

type AskQuestionFormProps = {
  locale: string;
  onSuccess?: () => void;
};

export function AskQuestionForm({ locale, onSuccess }: AskQuestionFormProps) {
  const t = useTranslations("questions");
  const [topic, setTopic] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const question = formData.get("question") as string;

    if (!topic || !question?.trim()) {
      toast.error(t("askRequired"));
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          email: formData.get("email"),
          topic,
          question,
          language: locale === "ur" ? "ur" : "en",
          website: formData.get("website"),
        }),
      });

      if (!res.ok) {
        toast.error(t("askError"));
        return;
      }

      toast.success(t("askSuccess"));
      onSuccess?.();
      form.reset();
      setTopic(null);
    } catch {
      toast.error(t("askError"));
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
        <Label htmlFor="ask-topic">{t("askTopic")}</Label>
        <Select value={topic} onValueChange={setTopic}>
          <SelectTrigger id="ask-topic" className="min-h-12 w-full text-base">
            <SelectValue placeholder={t("askTopic")} />
          </SelectTrigger>
          <SelectContent>
            {QUESTION_TOPICS.map((value) => (
              <SelectItem key={value} value={value}>
                {t(`topics.${value}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="ask-question">{t("askQuestion")}</Label>
        <Textarea id="ask-question" name="question" required rows={4} className="min-h-24 text-base" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ask-name">{t("askName")}</Label>
        <Input id="ask-name" name="name" className="min-h-12 text-base" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ask-phone">{t("askPhone")}</Label>
        <Input id="ask-phone" name="phone" type="tel" className="min-h-12 text-base" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ask-email">{t("askEmail")}</Label>
        <Input id="ask-email" name="email" type="email" className="min-h-12 text-base" />
      </div>
      <Button
        type="submit"
        disabled={sending}
        className="tap-target w-full bg-brand text-brand-foreground hover:bg-brand/90"
      >
        {sending ? t("askSending") : t("askSubmit")}
      </Button>
    </form>
  );
}
