export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-void-card py-20 px-[var(--section-padding-x)]">
      <div className="mx-auto max-w-[1280px] text-center">
        <a
          href="mailto:harshsahrawat@flowkart.io"
          className="block font-sans font-bold tracking-tight text-white transition-colors hover:text-accent"
          style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}
          data-cursor="true"
        >
          harshsahrawat@flowkart.io
        </a>

        <div className="mt-10 flex items-center justify-center gap-8">
          <a
            href="https://x.com/flowkart"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted transition-colors hover:text-white"
          >
            X
          </a>
          <a
            href="https://linkedin.com/company/flowkart"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted transition-colors hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/flowkart"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text-muted transition-colors hover:text-white"
          >
            GitHub
          </a>
        </div>

        <p className="mt-8 text-sm text-text-muted">
          Built for the AI-Native Era. &copy; 2026 Flowkart. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
