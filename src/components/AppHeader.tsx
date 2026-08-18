import { Link } from "@tanstack/react-router";

export default function AppHeader({link, title}:{link:string, title:string}) {
  return (
    <header className="border-b border-border bg-card/70 px-3 py-3 sm:px-5 sm:py-6 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-3">
        <Link
          to="/"
          className="flex h-11 w-11 items-center justify-center"
        >
          <img src="/logo.png" alt="Contact QR" className="h-11 w-11" />
        </Link>

        <div className="w-full">
          <div className="flex w-full items-center justify-between gap-2">
            <Link to="/">
              <h1 className="text-xl font-bold text-foreground">
                Contact-
                <span className="font-extrabold text-primary">QR</span>
              </h1>
            </Link>

            <nav className="flex items-center gap-2 sm:gap-4 text-sm">
              <Link
                to={link}
                className="text-muted-foreground hover:text-foreground"
              >
                {title}
              </Link>

              <a
                href="https://github.com/medmaha/contact-qr-share"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
              >
                GitHub
              </a>
            </nav>
          </div>

          <p className="text-xs text-muted-foreground max-sm:mt-0.5 sm:text-sm">
            Your contact details as one scannable code
          </p>
        </div>
      </div>
    </header>
  );
}