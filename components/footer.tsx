import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--ksf-green)] text-[var(--ksf-cream)] py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-2 sm:mb-0">
          <Link href="/#hero" className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white/10 text-[var(--ksf-cream)] font-semibold hover:bg-[var(--ksf-brown)] text-sm">Home</Link>
          <Link href="/#ecolawns" className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white/10 text-[var(--ksf-cream)] font-semibold hover:bg-[var(--ksf-brown)] text-sm">EcoLawns</Link>
          <Link href="/#workshop" className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white/10 text-[var(--ksf-cream)] font-semibold hover:bg-[var(--ksf-brown)] text-sm">Workshop</Link>
          <Link href="/#contact" className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white/10 text-[var(--ksf-cream)] font-semibold hover:bg-[var(--ksf-brown)] text-sm">Contact</Link>
        </div>
        <div className="text-xs sm:text-sm text-center sm:text-left">&copy; {new Date().getFullYear()} King Street Farms. All rights reserved.</div>
      </div>
    </footer>
  );
}
