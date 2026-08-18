export default function AppHeader() {
  return (
    <header className="border-b border-border bg-card/70 px-3 py-3 sm:px-5 sm:py-6 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center">
          <img src={"/logo.png"} alt="Logo" className="w-11 h-11" />
        </div>
        <div className="w-full">
          <div className="flex items-center gap-2 justify-between w-full">
            <h1 className="text-xl font-bold text-foreground">Contact-<span className="text-primary font-extrabold">QR</span></h1>
            <a
              href="https://github.com/medmaha/contact-qr-share"
              className="underline underline-offset-2 text-sm"
              target="_blank"
            >
              Github
            </a>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground max-sm:mt-0.5">
            Your contact details as one scannable code
          </p>
        </div>
      </div>
    </header>
  );
}
