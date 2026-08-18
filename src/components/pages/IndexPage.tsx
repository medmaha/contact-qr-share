import { Toaster } from "@/components/ui/sonner";
import AppHeader from "@/components/AppHeader";
import QRCodeCard from "@/components/QRCodeCard";
import ContactForm from "@/components/ContactForm";
import GlobalContextProvider from "@/context/GlobalContext";

export default function IndexPage() {
  return (
    <GlobalContextProvider>
      <main className="min-h-screen bg-background pb-16">
        <Toaster position="top-center" />
        <AppHeader link="/about" title="About"/>
        <div className="mx-auto max-w-5xl gap-2 grid md:grid-cols-3 space-y-6 px-3 sm:px-5 py-6">
          <section className="md:sticky top-0">
            <QRCodeCard />
             <p className="text-center text-xs text-muted-foreground mt-2">
              Everything stays on this device.
            </p>
          </section>
          <section className="md:col-span-2 bg-card px-2 py-2 sm:p-5 text-center rounded-3xl border border-border shadow-(--shadow-card)">
            <ContactForm />
          </section>
           
        </div>
      </main>
    </GlobalContextProvider>
  );
}
