import Nav from '@/components/nav';
import Footer from '@/components/footer';

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
