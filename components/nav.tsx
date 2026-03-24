'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Nav() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <nav className="bg-[var(--ksf-green)] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex justify-between h-14 sm:h-16 items-center">
        <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group">
          <svg viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-10 sm:h-8 sm:w-12">
            <path d="M0 24L12 8L24 24L36 12L48 24" stroke="#fff8f1" strokeWidth="3" fill="none"/>
            <circle cx="36" cy="12" r="2" fill="#a47551"/>
          </svg>
          <span className="text-lg sm:text-2xl font-bold text-[var(--ksf-cream)] tracking-wide drop-shadow group-hover:underline">King Street Farms</span>
        </Link>
        <button onClick={() => setShowMobileNav(!showMobileNav)} className="sm:hidden flex items-center p-2 rounded-md text-[var(--ksf-cream)] hover:bg-[var(--ksf-brown)]">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <div className="hidden sm:flex items-center space-x-4 lg:space-x-6">
          <Link href="/#hero" className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 text-[var(--ksf-cream)] font-semibold hover:bg-[var(--ksf-brown)] text-sm sm:text-base">Home</Link>
          <Link href="/#ecolawns" className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 text-[var(--ksf-cream)] font-semibold hover:bg-[var(--ksf-brown)] text-sm sm:text-base">EcoLawns</Link>
          <Link href="/#workshop" className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 text-[var(--ksf-cream)] font-semibold hover:bg-[var(--ksf-brown)] text-sm sm:text-base">Workshop</Link>
          <Link href="/#contact" className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 text-[var(--ksf-cream)] font-semibold hover:bg-[var(--ksf-brown)] text-sm sm:text-base">Contact</Link>
        </div>
      </div>
      {showMobileNav && (
        <div className="sm:hidden bg-[var(--ksf-green)] border-t border-[var(--ksf-cream)]/20 px-4 py-2">
          <Link href="/#hero" onClick={() => setShowMobileNav(false)} className="block py-2.5 text-[var(--ksf-cream)] font-semibold hover:text-[var(--ksf-brown)]">Home</Link>
          <Link href="/#ecolawns" onClick={() => setShowMobileNav(false)} className="block py-2.5 text-[var(--ksf-cream)] font-semibold hover:text-[var(--ksf-brown)]">EcoLawns</Link>
          <Link href="/#workshop" onClick={() => setShowMobileNav(false)} className="block py-2.5 text-[var(--ksf-cream)] font-semibold hover:text-[var(--ksf-brown)]">Workshop</Link>
          <Link href="/#contact" onClick={() => setShowMobileNav(false)} className="block py-2.5 text-[var(--ksf-cream)] font-semibold hover:text-[var(--ksf-brown)]">Contact</Link>
        </div>
      )}
    </nav>
  );
}
