import { Github, ShieldCheck, Smartphone, QrCode } from "lucide-react";
import { Link } from "@tanstack/react-router";
import AppHeader from "../AppHeader";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background pb-16">
      <AppHeader link="/" title="Home"/>

      <div className="mx-auto max-w-5xl space-y-6 px-3 py-8 sm:px-5">
        <section className="rounded-3xl border border-border bg-card p-5 shadow-(--shadow-card) sm:p-8">
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <QrCode />
          </div>

          <h2 className="text-2xl font-bold text-foreground">About Contact QR</h2>

          <p className="mt-3 leading-7 text-muted-foreground">
            Contact QR is a simple, privacy-friendly way to turn your contact details into a single
            scannable QR code.
          </p>

          <p className="mt-4 leading-7 text-muted-foreground">
            Add your name, phone numbers, email addresses, social profiles, company, address, and
            other information. Contact QR packages those details into a vCard and generates a QR
            code that can be scanned with a phone camera.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-(--shadow-card)">
            <ShieldCheck className="text-primary" />

            <h3 className="mt-4 font-semibold text-foreground">Privacy first</h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Your contact details stay in your browser. No account or backend is required.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5 shadow-(--shadow-card)">
            <Smartphone className="text-primary" />

            <h3 className="mt-4 font-semibold text-foreground">Made for phones</h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Scan the generated QR code with a compatible phone to save the contact quickly.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5 shadow-(--shadow-card)">
            <QrCode className="text-primary" />

            <h3 className="mt-4 font-semibold text-foreground">Simple sharing</h3>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Download, share, or export your contact as a QR image or vCard.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-5 shadow-(--shadow-card) sm:p-8">
          <h2 className="text-xl font-bold text-foreground">Open source</h2>

          <p className="mt-3 leading-7 text-muted-foreground">
            Contact QR is open source and built with React, TypeScript, TanStack Router, Tailwind
            CSS, and modern browser APIs.
          </p>

          <a
            href="https://github.com/medmaha/contact-qr-share"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Github className="size-4" />
            View on GitHub
          </a>
        </section>

        <div className="text-center">
          <Link to="/" className="text-sm font-medium text-primary underline underline-offset-4">
            Back to Contact QR
          </Link>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Your contact details are saved locally in your browser.
        </p>
      </div>
    </main>
  );
}
