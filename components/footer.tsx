export default function Footer() {
  return (
    <footer className="bg-[var(--ksf-green)] text-[var(--ksf-cream)]/80 py-3 text-center text-xs sm:text-sm">
      &copy; {new Date().getFullYear()} King Street Farms
    </footer>
  );
}
