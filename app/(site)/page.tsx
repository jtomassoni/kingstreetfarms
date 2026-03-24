import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--ksf-cream)]">
      {/* Hero */}
      <section id="hero" className="relative bg-[var(--ksf-green)] text-[var(--ksf-cream)] min-h-[70vh] flex flex-col items-center justify-center pt-8 pb-16 px-4 scroll-mt-24">
        <div className="absolute inset-0">
          <img src="/hero.png" alt="King Street Farms" className="w-full h-full object-cover object-center opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--ksf-green)]/95 to-[var(--ksf-green)]/80" />
        </div>
        <div className="relative z-10 text-center max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif drop-shadow-lg mb-4">
            King Street Farms
          </h1>
          <p className="text-lg sm:text-xl opacity-95 mb-2">
            <span className="text-[var(--ksf-brown)]">Eco-friendly living</span> in Denver
          </p>
          <p className="text-base sm:text-lg opacity-90 max-w-xl mx-auto">
            From electric lawn care to workshop and garden — building a more sustainable home, one step at a time.
          </p>
        </div>
      </section>

      {/* EcoLawns Denver */}
      <section id="ecolawns" className="scroll-mt-24 py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--ksf-green)] font-serif mb-6 text-center">
            EcoLawns Denver
          </h2>
          <p className="text-lg text-[var(--ksf-dark)] text-center mb-10 max-w-2xl mx-auto">
            Professional electric lawn care in Denver — battery-powered mowers, zero emissions, quiet operation. 
            Clean air for your neighborhood, no gas fumes, no early-morning noise.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--ksf-green)]/20">
              <h3 className="font-bold text-[var(--ksf-green)] mb-2 font-serif">Zero Emissions</h3>
              <p className="text-[var(--ksf-dark)] text-sm">Battery-powered equipment means cleaner air for Denver.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-[var(--ksf-green)]/20">
              <h3 className="font-bold text-[var(--ksf-green)] mb-2 font-serif">Quiet Operation</h3>
              <p className="text-[var(--ksf-dark)] text-sm">Work from home, nap, or enjoy your yard — without the racket.</p>
            </div>
          </div>
          <div className="text-center">
            <a
              href="https://www.ecolawnsdenver.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 font-bold bg-[var(--ksf-green)] text-white rounded-lg hover:bg-[var(--ksf-brown)] transition-colors"
            >
              Learn more at ecolawnsdenver.com
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Workshop & Garden */}
      <section id="workshop" className="bg-white/60 py-16 px-4 sm:px-6 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--ksf-green)] font-serif mb-6 text-center">
            Workshop & Garden
          </h2>
          <p className="text-lg text-[var(--ksf-dark)] text-center max-w-2xl mx-auto">
            We&apos;re deepening our roots — literally. Right now we&apos;re focused on improving our 
            workshop and garden space, building the foundation for what comes next.
          </p>
          <p className="text-[var(--ksf-dark)] text-center mt-6 max-w-xl mx-auto">
            Custom woodworking is on pause while we grow. Check back or follow along for updates 
            on our journey to a more sustainable, hands-on way of living in Denver.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-[var(--ksf-green)] text-[var(--ksf-cream)] py-16 px-4 scroll-mt-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif mb-4">Get in Touch</h2>
          <a href="mailto:kingstreetfarms@gmail.com" className="text-xl font-bold underline hover:text-white transition-colors">
            kingstreetfarms@gmail.com
          </a>
          <p className="mt-6 max-w-md mx-auto opacity-90">
            Questions about EcoLawns Denver, our workshop, or just want to say hi? We&apos;d love to hear from you.
          </p>
        </div>
      </section>
    </div>
  );
}
