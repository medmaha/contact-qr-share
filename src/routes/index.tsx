import { createFileRoute } from "@tanstack/react-router";
import IndexPage from "@/components/pages/IndexPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Contact QR Code Generator" },
      {
        name: "description",
        content:
          "Create a scannable QR code for your contact details. Scan to save the contact instantly, then download or share the code.",
      },
      { property: "og:title", content: "Contact QR Code Generator" },
      {
        property: "og:description",
        content:
          "Turn your phone numbers, emails, address and links into one scannable contact QR code.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: IndexPage,
});
