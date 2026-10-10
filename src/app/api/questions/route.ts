import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSiteSettings } from "@/lib/sanity/queries";
import { getSanityWriteClient, isSanityWriteConfigured } from "@/lib/sanity/write-client";
import { QUESTION_TOPICS } from "@/lib/questions/topics";

type QuestionPayload = {
  name?: string;
  phone?: string;
  email?: string;
  topic?: string;
  question?: string;
  language?: "ur" | "en" | "both";
  website?: string;
};

export async function POST(request: Request) {
  if (!isSanityWriteConfigured()) {
    return NextResponse.json(
      { error: "Q&A is not configured." },
      { status: 503 }
    );
  }

  let body: QuestionPayload;
  try {
    body = (await request.json()) as QuestionPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, phone, email, topic, question, language } = body;

  if (!topic || !QUESTION_TOPICS.includes(topic as (typeof QUESTION_TOPICS)[number]) || !question?.trim()) {
    return NextResponse.json(
      { error: "Topic and question are required." },
      { status: 400 }
    );
  }

  const resolvedLanguage = language === "en" || language === "both" ? language : "ur";
  const client = getSanityWriteClient()!;

  try {
    await client.create({
      _type: "faqEntry",
      questionEn: resolvedLanguage === "en" || resolvedLanguage === "both" ? question.trim() : undefined,
      questionUr: resolvedLanguage === "ur" || resolvedLanguage === "both" ? question.trim() : undefined,
      topic,
      status: "pending",
      submitterName: name?.trim() || undefined,
      submitterPhone: phone?.trim() || undefined,
      submitterEmail: email?.trim() || undefined,
      language: resolvedLanguage,
    });
  } catch (err) {
    console.error("Sanity create faqEntry error:", err);
    return NextResponse.json(
      { error: "Could not save your question." },
      { status: 502 }
    );
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const settings = await getSiteSettings();
      const to = settings?.email;
      if (to) {
        const from = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
        const resend = new Resend(process.env.RESEND_API_KEY);
        const text = [
          "New question submitted — drmianakram.pk",
          "",
          `Topic: ${topic}`,
          `Name: ${name?.trim() || "—"}`,
          `Phone: ${phone?.trim() || "—"}`,
          `Email: ${email?.trim() || "—"}`,
          "",
          "Question:",
          question.trim(),
        ].join("\n");

        const { error } = await resend.emails.send({
          from,
          to,
          subject: `New question: ${topic}`,
          text,
        });
        if (error) {
          console.error("Resend error (question notification):", error);
        }
      }
    } catch (err) {
      console.error("Question notification email failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
