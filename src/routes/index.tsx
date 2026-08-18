import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { Plus, Trash2, Download, Share2, QrCode, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  buildVCard,
  contactFileName,
  emptyContact,
  type ContactData,
  type LabeledValue,
} from "@/lib/vcard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TapCard — Contact QR Code Generator" },
      {
        name: "description",
        content:
          "Create a scannable QR code for your contact details. Scan to save the contact instantly, then download or share the code.",
      },
      { property: "og:title", content: "TapCard — Contact QR Code Generator" },
      {
        property: "og:description",
        content: "Turn your phone numbers, emails, address and links into one scannable contact QR code.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const STORAGE_KEY = "tapcard.contact.v1";

function useContactStorage() {
  const [contact, setContact] = useState<ContactData>(emptyContact);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setContact({ ...emptyContact, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contact));
    } catch {
      /* ignore */
    }
  }, [contact, hydrated]);

  return { contact, setContact, hydrated };
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </Label>
      <Input className="h-11 rounded-xl bg-card" {...props} />
    </div>
  );
}

function RepeatableList({
  title,
  items,
  labels,
  placeholder,
  inputMode,
  onChange,
}: {
  title: string;
  items: LabeledValue[];
  labels: string[];
  placeholder: string;
  inputMode?: "tel" | "email" | "url";
  onChange: (items: LabeledValue[]) => void;
}) {
  const update = (i: number, patch: Partial<LabeledValue>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {title}
        </Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 gap-1 text-primary"
          onClick={() => onChange([...items, { label: (labels[0] ?? "OTHER"), value: "" }])}
        >
          <Plus /> Add
        </Button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <select
            aria-label={`${title} type`}
            className="h-11 w-24 shrink-0 rounded-xl border border-input bg-card px-2 text-sm text-foreground"
            value={item.label}
            onChange={(e) => update(i, { label: e.target.value })}
          >
            {labels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          <Input
            className="h-11 rounded-xl bg-card"
            inputMode={inputMode}
            placeholder={placeholder}
            value={item.value}
            onChange={(e) => update(i, { value: e.target.value })}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Remove"
            className="h-11 w-11 shrink-0 text-muted-foreground hover:text-destructive"
            onClick={() =>
              onChange(items.length > 1 ? items.filter((_, idx) => idx !== i) : [{ label: (labels[0] ?? "OTHER"), value: "" }])
            }
          >
            <Trash2 />
          </Button>
        </div>
      ))}
    </div>
  );
}

function Index() {
  const { contact, setContact, hydrated } = useContactStorage();
  const [dataUrl, setDataUrl] = useState<string>("");
  const qrRef = useRef<HTMLDivElement>(null);

  const vcard = useMemo(() => buildVCard(contact), [contact]);
  const hasName = Boolean(contact.firstName.trim() || contact.lastName.trim());

  useEffect(() => {
    if (!hydrated || !hasName) {
      setDataUrl("");
      return;
    }
    let cancelled = false;
    QRCode.toDataURL(vcard, {
      width: 1024,
      margin: 2,
      errorCorrectionLevel: "M",
      color: { dark: "#123c42", light: "#ffffff" },
    })
      .then((url) => !cancelled && setDataUrl(url))
      .catch(() => !cancelled && setDataUrl(""));
    return () => {
      cancelled = true;
    };
  }, [vcard, hydrated, hasName]);

  const set = <K extends keyof ContactData>(key: K, value: ContactData[K]) =>
    setContact((c) => ({ ...c, [key]: value }));

  const download = () => {
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `${contactFileName(contact)}-qr.png`;
    a.click();
    toast.success("QR code downloaded");
  };

  const share = async () => {
    if (!dataUrl) return;
    try {
      const blob = await (await fetch(dataUrl)).blob();
      const file = new File([blob], `${contactFileName(contact)}-qr.png`, { type: "image/png" });
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "My contact QR code" });
        return;
      }
      if (navigator.share) {
        await navigator.share({ title: "My contact QR code", text: vcard });
        return;
      }
      download();
      toast.info("Sharing isn't supported here — saved the image instead");
    } catch {
      /* user cancelled */
    }
  };

  const downloadVcf = () => {
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${contactFileName(contact)}.vcf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setContact(emptyContact);
    toast.success("Form cleared");
  };

  return (
    <main className="min-h-screen bg-background pb-16">
      <Toaster position="top-center" />
      <header className="border-b border-border bg-card/70 px-5 py-6 backdrop-blur">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <QrCode className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">TapCard</h1>
            <p className="text-sm text-muted-foreground">Your contact details as one scannable code</p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-xl space-y-6 px-5 py-6">
        <section
          ref={qrRef}
          className="rounded-3xl border border-border bg-card p-6 text-center shadow-[var(--shadow-card)]"
        >
          <h2 className="text-base font-semibold text-foreground">Your contact QR</h2>
          {dataUrl ? (
            <>
              <img
                src={dataUrl}
                alt="QR code containing your contact details"
                className="mx-auto mt-4 aspect-square w-full max-w-[260px] rounded-2xl border border-border"
              />
              <p className="mt-3 text-sm text-muted-foreground">
                Scan with a phone camera to save {contact.firstName || "this contact"} directly to contacts.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Button className="h-11 rounded-xl" onClick={download}>
                  <Download /> Download
                </Button>
                <Button variant="secondary" className="h-11 rounded-xl" onClick={share}>
                  <Share2 /> Share
                </Button>
              </div>
              <Button variant="link" className="mt-2 text-muted-foreground" onClick={downloadVcf}>
                Or download the .vcf contact file
              </Button>
            </>
          ) : (
            <div className="mx-auto mt-4 flex aspect-square w-full max-w-[260px] items-center justify-center rounded-2xl border border-dashed border-border bg-muted px-6 text-sm text-muted-foreground">
              Add a name below and your QR code appears here
            </div>
          )}
        </section>

        <section className="space-y-5 rounded-3xl border border-border bg-card/60 p-5">
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="First name"
              placeholder="Ada"
              value={contact.firstName}
              onChange={(e) => set("firstName", e.target.value)}
            />
            <Field
              label="Last name"
              placeholder="Lovelace"
              value={contact.lastName}
              onChange={(e) => set("lastName", e.target.value)}
            />
          </div>
          <Field
            label="Profession"
            placeholder="Software Engineer"
            value={contact.profession}
            onChange={(e) => set("profession", e.target.value)}
          />
          <Field
            label="Company"
            placeholder="Acme Inc."
            value={contact.organization}
            onChange={(e) => set("organization", e.target.value)}
          />

          <RepeatableList
            title="Phone numbers"
            items={contact.phones}
            labels={["CELL", "WORK", "HOME", "FAX"]}
            placeholder="+220 000 0000"
            inputMode="tel"
            onChange={(v) => set("phones", v)}
          />

          <RepeatableList
            title="Emails"
            items={contact.emails}
            labels={["WORK", "HOME", "OTHER"]}
            placeholder="you@example.com"
            inputMode="email"
            onChange={(v) => set("emails", v)}
          />

          <RepeatableList
            title="Links"
            items={contact.links}
            labels={["Website", "LinkedIn", "GitHub", "X", "Instagram"]}
            placeholder="example.com"
            inputMode="url"
            onChange={(v) => set("links", v)}
          />

          <div className="space-y-3">
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Address
            </Label>
            <Input
              className="h-11 rounded-xl bg-card"
              placeholder="Street"
              value={contact.street}
              onChange={(e) => set("street", e.target.value)}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                className="h-11 rounded-xl bg-card"
                placeholder="City"
                value={contact.city}
                onChange={(e) => set("city", e.target.value)}
              />
              <Input
                className="h-11 rounded-xl bg-card"
                placeholder="Region"
                value={contact.region}
                onChange={(e) => set("region", e.target.value)}
              />
              <Input
                className="h-11 rounded-xl bg-card"
                placeholder="Postal code"
                value={contact.postalCode}
                onChange={(e) => set("postalCode", e.target.value)}
              />
              <Input
                className="h-11 rounded-xl bg-card"
                placeholder="Country"
                value={contact.country}
                onChange={(e) => set("country", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Note
            </Label>
            <Textarea
              className="rounded-xl bg-card"
              rows={3}
              placeholder="Anything else worth saving"
              value={contact.note}
              onChange={(e) => set("note", e.target.value)}
            />
          </div>

          <Button variant="ghost" className="w-full text-muted-foreground" onClick={reset}>
            <RotateCcw /> Clear saved details
          </Button>
        </section>

        <p className="text-center text-xs text-muted-foreground">
          Everything stays on this device — your details are saved locally in your browser.
        </p>
      </div>
    </main>
  );
}
