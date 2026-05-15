import { contactEmail } from '@/lib/site';

export default function HomePage() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--ksf-green)] font-serif mb-5">
          King Street Farms
        </h1>
        <p className="text-base sm:text-lg text-[var(--ksf-dark)] leading-relaxed mb-8">
          We operate businesses across{' '}
          <span className="font-semibold text-[var(--ksf-green)]">web design</span>,{' '}
          <span className="font-semibold text-[var(--ksf-green)]">woodworking</span>,{' '}
          <span className="font-semibold text-[var(--ksf-green)]">landscaping</span>, and{' '}
          <span className="font-semibold text-[var(--ksf-green)]">hospitality</span>.
          We&apos;re always looking for new connections — partners, collaborators, and good people to work with.
        </p>
        <div className="inline-block rounded-xl bg-white/80 border border-[var(--ksf-green)]/15 shadow-sm px-6 py-5">
          <p className="text-sm uppercase tracking-wide text-[var(--ksf-brown)] font-semibold mb-2">
            Get in touch
          </p>
          <a
            href={`mailto:${contactEmail}`}
            className="text-lg sm:text-xl font-bold text-[var(--ksf-green)] hover:text-[var(--ksf-brown)] transition-colors"
          >
            {contactEmail}
          </a>
        </div>
        <p className="mt-10 text-xs text-[var(--ksf-dark)]/45">
          Current focus:{' '}
          <a
            href="https://kingstreetsites.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[var(--ksf-dark)]/70"
          >
            kingstreetsites.com
          </a>
          {' · '}
          <a
            href="https://www.ecolawnsdenver.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[var(--ksf-dark)]/70"
          >
            ecolawnsdenver.com
          </a>
        </p>
      </div>
    </main>
  );
}
