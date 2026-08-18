export type LabeledValue = { label: string; value: string };

export type ContactData = {
  firstName: string;
  lastName: string;
  profession: string;
  organization: string;
  phones: LabeledValue[];
  emails: LabeledValue[];
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  links: LabeledValue[];
  note: string;
};

export const emptyContact: ContactData = {
  firstName: "",
  lastName: "",
  profession: "",
  organization: "",
  phones: [{ label: "CELL", value: "" }],
  emails: [{ label: "WORK", value: "" }],
  street: "",
  city: "",
  region: "",
  postalCode: "",
  country: "",
  links: [{ label: "Website", value: "" }],
  note: "",
};

const esc = (v: string) => v.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

export function buildVCard(c: ContactData): string {
  const lines: string[] = ["BEGIN:VCARD", "VERSION:3.0"];
  lines.push(`N:${esc(c.lastName)};${esc(c.firstName)};;;`);
  const fn = [c.firstName, c.lastName].filter(Boolean).join(" ").trim();
  if (fn) lines.push(`FN:${esc(fn)}`);
  if (c.organization) lines.push(`ORG:${esc(c.organization)}`);
  if (c.profession) lines.push(`TITLE:${esc(c.profession)}`);

  c.phones.filter((p) => p.value.trim()).forEach((p) => {
    lines.push(`TEL;TYPE=${p.label || "CELL"}:${esc(p.value.trim())}`);
  });
  c.emails.filter((e) => e.value.trim()).forEach((e) => {
    lines.push(`EMAIL;TYPE=${e.label || "INTERNET"}:${esc(e.value.trim())}`);
  });

  if (c.street || c.city || c.region || c.postalCode || c.country) {
    lines.push(
      `ADR;TYPE=HOME:;;${esc(c.street)};${esc(c.city)};${esc(c.region)};${esc(c.postalCode)};${esc(c.country)}`,
    );
  }

  c.links.filter((l) => l.value.trim()).forEach((l) => {
    const url = l.value.trim();
    const withScheme = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    lines.push(`URL:${esc(withScheme)}`);
  });

  if (c.note) lines.push(`NOTE:${esc(c.note)}`);
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

export function contactFileName(c: ContactData) {
  const base = [c.firstName, c.lastName].filter(Boolean).join("-").toLowerCase() || "contact";
  return base.replace(/[^a-z0-9-]/g, "");
}
