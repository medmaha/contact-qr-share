import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import AppHeader from "@/components/AppHeader";
import QRCodeCard from "@/components/QRCodeCard";
import ContactForm from "@/components/ContactForm";
import GlobalContextProvider from "@/context/GlobalContext";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TapCard - Contact QR Code Generator" },
      {
        name: "description",
        content:
          "Create a scannable QR code for your contact details. Scan to save the contact instantly, then download or share the code.",
      },
      { property: "og:title", content: "TapCard - Contact QR Code Generator" },
      {
        property: "og:description",
        content:
          "Turn your phone numbers, emails, address and links into one scannable contact QR code.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <GlobalContextProvider>
      <main className="min-h-screen bg-background pb-16">
        <Toaster position="top-center" />
        <AppHeader />
        <div className="mx-auto max-w-5xl gap-2 grid md:grid-cols-3 space-y-6 px-3 sm:px-5 py-6">
          <section className="md:sticky top-0">
            <QRCodeCard />
          </section>
          <section className="md:col-span-2 bg-card px-2 py-2 sm:p-5 text-center rounded-3xl border border-border shadow-(--shadow-card)">
            <ContactForm />
          </section>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          Everything stays on this device - your details are saved locally in your browser.
        </p>
      </main>
    </GlobalContextProvider>
  );
}
