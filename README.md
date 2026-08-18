# Contact QR

**Contact QR** is a privacy-friendly, browser-based contact QR code generator. Enter your contact details and instantly generate a scannable QR code that can be used to save your information to a phone's contacts.

Your contact details stay in your browser and are saved locally using `localStorage`.

## ✨ Features

* 📇 Create a digital contact card from your personal details
* 🔳 Generate a QR code containing your contact information
* 📱 Scan the QR code with a phone camera to save the contact
* 💾 Automatically save contact details locally in the browser
* 🖼️ Download the generated QR code as a PNG image
* 📤 Share the QR code using the Web Share API when supported
* 📄 Download the contact as a `.vcf` / vCard file
* ☎️ Add multiple phone numbers with labels
* 📧 Add multiple email addresses
* 🔗 Add multiple links, including websites and social profiles
* 🏢 Include profession and company information
* 📍 Include a physical address
* 📝 Add an optional note
* 📱 Responsive interface for desktop and mobile
* 🔒 No account or backend required

## 🔐 Privacy

Contact QR is designed to work entirely in the browser.

The application stores the contact information in the browser's `localStorage` so that it can be restored when you return to the page. QR codes and downloadable contact files are generated on the client.

There is no need to create an account or submit your contact information to a server.

> **Note:** Browser `localStorage` is not encrypted. Avoid using this application on a shared or untrusted device if the stored information is sensitive.

## 📖 About Page

Contact QR includes an `/about` page that explains the purpose of the application, its privacy-focused approach, and the technologies used to build it.

The page also provides a link to the project's GitHub repository and a way to return to the main contact QR generator.

The About page is implemented as a reusable `AboutPage` component and exposed through the TanStack Router file-based route:

```text
/about

## 🛠️ Tech Stack

* **React** + **TypeScript**
* **TanStack Router** for routing
* **Tailwind CSS** for styling
* **shadcn/ui** components
* **Lucide React** for icons
* **Sonner** for toast notifications
* **QRCode** for QR code generation
* **vCard** generation for contact exports
* Browser **Local Storage** for persistence
* Web **Share API** for supported devices and browsers

## 📁 Project Structure

The project is organized around isolated, reusable components:

```text
src/
├── components/
│   ├── AppHeader.tsx
│   ├── ContactForm.tsx
│   ├── InfoField.tsx
│   ├── QRCodeCard.tsx
│   ├── RepeatableList.tsx
│   ├── pages/
│       └── IndexPage.tsx
│       └── AboutPage.tsx
│   └── ui/
│       └── ...
├── context/
│   └── GlobalContext.tsx
├── hooks/
│   └── useContactStorage.ts
├── lib/
│   └── vcard.ts
└── routes/
    ├── index.tsx
    ├── about.tsx
    └── ...
```

### Main components

**`AppHeader`**

Provides the application branding and repository link.

**`ContactForm`**

Collects the user's contact information, including names, profession, company, phone numbers, emails, links, address, and notes.

**`QRCodeCard`**

Builds the vCard, generates the QR code, and provides download, share, and `.vcf` export actions.

**`RepeatableList`**

A reusable component for fields that can contain multiple labeled values, such as phone numbers, emails, and links.

**`InfoField`**

A small reusable wrapper around the application's input and label components.

**`GlobalContextProvider`**

Provides the current contact data and hydration state to the application.

**`useContactStorage`**

Synchronizes contact data with browser `localStorage`.

## 🚀 Getting Started

### Prerequisites

Make sure you have a recent version of:

* Node.js
* npm, pnpm, or another compatible package manager

### Installation

Clone the repository:

```bash
git clone https://github.com/medmaha/contact-qr-share.git
cd contact-qr-share
```

Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Then open the local URL printed by your development server.

### Production Build

Create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

> The exact available scripts depend on the project's `package.json`.

## 🧩 How It Works

1. Enter your contact details in the form.
2. Contact QR keeps the data in the application's React state.
3. The contact data is persisted locally in the browser.
4. The data is converted into a vCard representation.
5. The vCard is encoded into a QR code in the browser.
6. Scan the QR code with a compatible phone camera or QR scanner.
7. The contact can then be saved to the phone's address book.

The QR code is only generated once a name has been provided.

## 📲 Sharing & Exporting

Contact QR supports several ways to take your contact information with you:

### QR Code PNG

Download the generated QR code as a PNG image.

### Native Sharing

On supported browsers and devices, Contact QR uses the browser's Web Share API to share the QR code directly.

If file sharing is unavailable but regular Web Share is supported, the vCard data can be shared as text.

If sharing isn't supported, the application falls back to downloading the QR image.

### vCard

You can also download the contact directly as a `.vcf` file and import it into compatible contacts applications.

## 🎨 Component Isolation

The UI is split into focused components rather than keeping the entire application in a single page component.

This makes it easier to:

* Reuse form elements
* Test components independently
* Change individual parts of the UI
* Add additional contact fields
* Keep the main route component small
* Maintain consistent UI patterns

For example, `RepeatableList` handles the common behavior shared by phone numbers, emails, and links instead of duplicating that logic in `ContactForm`.

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature/my-feature
```

3. Make your changes.
4. Run the project's checks/build.
5. Commit your changes:

```bash
git commit -m "feat: add my feature"
```

6. Push your branch:

```bash
git push origin feature/my-feature
```

7. Open a pull request.

When contributing, try to keep components focused and reusable, and avoid introducing unnecessary application-wide state.

## 🐛 Issues & Feature Requests

If you find a bug or have an idea for improving Contact QR, please open an issue in the repository.

## 📄 License

This project is open source. See the repository for the applicable license and additional project information.

## 🔗 Repository

**GitHub:** https://github.com/medmaha/contact-qr-share

---

Made with ❤️ by Mahammed Touray.
