export function telHref(phone: string): string {
  const normalized = phone.replace(/\s/g, "");
  return normalized.startsWith("tel:") ? normalized : `tel:${normalized}`;
}

export function whatsappHref(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}
