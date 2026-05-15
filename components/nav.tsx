import Link from 'next/link';

export default function Nav() {
  return (
    <header className="bg-[var(--ksf-green)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-center">
        <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
          <svg viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-10 sm:h-8 sm:w-12">
            <path d="M0 24L12 8L24 24L36 12L48 24" stroke="#fff8f1" strokeWidth="3" fill="none"/>
            <circle cx="36" cy="12" r="2" fill="#a47551"/>
          </svg>
          <span className="text-lg sm:text-2xl font-bold text-[var(--ksf-cream)] tracking-wide">King Street Farms</span>
        </Link>
      </div>
    </header>
  );
}
