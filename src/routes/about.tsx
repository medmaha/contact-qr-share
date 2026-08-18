import { createFileRoute } from "@tanstack/react-router";
import AboutPage from "@/components/pages/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About Contact QR",
      },
      {
        name: "description",
        content:
          "Learn more about Contact QR, a simple and privacy-friendly contact QR code generator.",
      },
      {
        property: "og:title",
        content: "About Contact QR",
      },
      {
        property: "og:description",
        content: "Contact QR turns your contact details into one scannable QR code.",
      },
    ],
  }),
  component: AboutPage,
});
