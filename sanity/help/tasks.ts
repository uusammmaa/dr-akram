export type HelpTask = {
  id: string;
  title: string;
  where: string;
  steps: string[];
  support?: boolean;
};

export type HelpSection = {
  title: string;
  description: string;
};

export const helpTasks: HelpTask[] = [
  {
    id: "portrait",
    title: "Update my homepage photo",
    where: "Site Settings → Portrait",
    steps: [
      "Open Site Settings in the left menu.",
      "Tap Portrait and upload a JPEG or PNG photo.",
      "Press Publish — changes appear on the site in about a minute.",
    ],
  },
  {
    id: "bio",
    title: "Update my biography or career",
    where: "About Page",
    steps: [
      "Open Site Settings → About Page.",
      "Edit biography in English and Urdu.",
      "Add or reorder career milestones in the timeline.",
      "Save and Publish.",
    ],
  },
  {
    id: "contact",
    title: "Change phone or WhatsApp",
    where: "Site Settings → Contact fields",
    steps: [
      "Open Site Settings.",
      "Edit Phone and WhatsApp numbers.",
      "Publish — numbers update on Contact page and mobile bar.",
    ],
  },
  {
    id: "book",
    title: "Add a new book",
    where: "Books → My Books → Create",
    steps: [
      "Open Books → My Books.",
      "Tap Create, enter title, upload cover, description, level.",
      "Save and Publish.",
    ],
  },
  {
    id: "recommendation",
    title: "Suggest a book to read",
    where: "Books → Recommended Reading → Create",
    steps: [
      "Open Books → Recommended Reading.",
      "Add title, author, topic, and why you recommend it (English and Urdu).",
      "Upload cover and Publish.",
    ],
  },
  {
    id: "honor",
    title: "Add a shield or award photo",
    where: "Honors → Create",
    steps: [
      "Open Honors & Awards.",
      "Upload photo, set type, event, organization, year.",
      "Publish.",
    ],
  },
  {
    id: "lecture",
    title: "Add a lecture video",
    where: "Lectures → Create",
    steps: [
      "Open Lectures.",
      "Paste the YouTube URL only — thumbnail loads automatically.",
      "Add title and Publish.",
    ],
  },
  {
    id: "faq-answer",
    title: "Answer a visitor's question",
    where: "Q&A → Inbox → open pending",
    steps: [
      "Open Q&A → Inbox (pending questions).",
      "Open a pending question, write answer in English and Urdu.",
      "Set status to Published for the site, or Private if answered by phone.",
    ],
  },
  {
    id: "faq-manual",
    title: "Add a published FAQ manually",
    where: "Q&A → Published FAQ → Create",
    steps: [
      "Open Q&A → Published FAQ.",
      "Create new entry with question, answer, topic.",
      "Set status to Published.",
    ],
  },
  {
    id: "afkar",
    title: "Add Afkar-e-Muallim issue",
    where: "Afkar Issues → Create",
    steps: [
      "Open Afkar-e-Muallim.",
      "Upload cover, add PDF or external link, month/year.",
      "Publish.",
    ],
  },
  {
    id: "org",
    title: "Add organization logo",
    where: "Organizations → Create",
    steps: [
      "Open Organizations.",
      "Upload logo, name, role, current/former status.",
      "Publish.",
    ],
  },
  {
    id: "featured",
    title: "Feature item on homepage",
    where: "Any content → Featured toggle",
    steps: [
      "Open a book, honor, or lecture.",
      "Turn ON 'Featured on Homepage'.",
      "Publish — item appears on homepage grid.",
    ],
  },
  {
    id: "support",
    title: "Something went wrong",
    where: "Help → Contact support",
    steps: [
      "Describe what happened and which section you were using.",
      "Contact your son via WhatsApp for technical help.",
    ],
    support: true,
  },
];

export const helpSections: HelpSection[] = [
  {
    title: "Site Settings",
    description: "Photo, phone, WhatsApp, email, SEO descriptions",
  },
  {
    title: "About Page",
    description: "Biography and career timeline",
  },
  {
    title: "Books",
    description: "Your authored books and reading recommendations",
  },
  {
    title: "Q&A",
    description: "Visitor questions inbox and published FAQ",
  },
  {
    title: "Honors & Awards",
    description: "Shields, trophies, certificates gallery",
  },
  {
    title: "Lectures",
    description: "YouTube lecture links",
  },
  {
    title: "Afkar-e-Muallim",
    description: "Magazine issues and PDFs",
  },
  {
    title: "Organizations",
    description: "Affiliations and logos on About page",
  },
];

/** WhatsApp support — update number before handover */
export const SUPPORT_WHATSAPP = "923001234567";

export function supportWhatsAppUrl(): string {
  const text = encodeURIComponent(
    "Assalam o Alaikum — I need help with the website admin panel."
  );
  return `https://wa.me/${SUPPORT_WHATSAPP}?text=${text}`;
}
