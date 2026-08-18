import { useEffect, useMemo, useState } from "react";
import * as QRCode from "qrcode";
import { Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { buildVCard, contactFileName } from "@/lib/vcard";
import { useContactStorage } from "@/hooks/useContactStorage";

export default function QRCodeCard() {
  const { contact, hydrated } = useContactStorage();
  const [dataUrl, setDataUrl] = useState<string>("");

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
      toast.info("Sharing isn't supported here - saved the image instead");
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

  return (
      <div className="bg-card px-2 py-2 sm:p-5 text-center rounded-3xl border border-border shadow-(--shadow-card)">
        <h2 className="text-base font-semibold text-foreground">Your contact QR</h2>
        {dataUrl ? (
          <>
            <img
              src={dataUrl}
              alt="QR code containing your contact details"
              className="mx-auto mt-4 aspect-square w-full max-w-65 rounded-2xl border border-border"
            />
            <p className="mt-3 text-sm text-muted-foreground">
              Scan with a phone camera to save {contact.firstName || "this contact"} directly to
              contacts.
            </p>
            <div className="mt-5 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-3">
              <Button className="h-9 rounded-xl" onClick={download}>
                <Download /> Download
              </Button>
              <Button variant="secondary" className="h-9 rounded-xl" onClick={share}>
                <Share2 /> Share
              </Button>
            </div>
            <Button
              variant="link"
              size={"sm"}
              className="mt-2 text-muted-foreground underline underline-offset-3"
              onClick={downloadVcf}
            >
              Or download the .vcf contact file
            </Button>
          </>
        ) : (
          <div className="mx-auto my-4 flex aspect-square w-full max-w-65 items-center justify-center rounded-2xl border border-dashed border-border bg-muted px-6 text-sm text-muted-foreground">
            Add a name and your QR code appears here
          </div>
        )}
      </div>
  );
}
