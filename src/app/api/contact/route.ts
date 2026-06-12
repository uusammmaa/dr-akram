import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSiteSettings } from "@/lib/sanity/queries";

const INQUIRY_LABELS: Record<string, string> = {
  dars: "Dars-e-Quran",
  lecture: "Lecture invitation",
  finance: "Islamic economics advice",
  other: "Other",
};

type ContactPayload = {
  name?: string;
  phone?: string;
  city?: string;
  type?: string;
  message?: string;
  preferredDate?: string;
  website?: string;
};

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 503 }
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, phone, city, type, message, preferredDate } = body;

  if (!type || !message?.trim()) {
    return NextResponse.json(
      { error: "Type and message are required." },
      { status: 400 }
    );
  }

  const settings = await getSiteSettings();
  const to = settings?.email;

  if (!to) {
    return NextResponse.json(
      { error: "Recipient email is not configured in Site Settings." },
      { status: 503 }
    );
  }

  const from =
    process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
  const resend = new Resend(process.env.RESEND_API_KEY);
  const inquiryLabel = INQUIRY_LABELS[type] ?? type;

  const text = [
    "New contact form submission — drmianakram.pk",
    "",
    `Type: ${inquiryLabel}`,
    `Name: ${name?.trim() || "—"}`,
    `Phone: ${phone?.trim() || "—"}`,
    `City: ${city?.trim() || "—"}`,
    `Preferred date: ${preferredDate?.trim() || "—"}`,
    "",
    "Message:",
    message.trim(),
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to,
    subject: `Website inquiry: ${inquiryLabel}`,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send email." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
