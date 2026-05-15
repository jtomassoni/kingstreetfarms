import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'King Street Farms',
  description:
    'King Street Farms operates businesses in web design, woodworking, landscaping, and hospitality. Always open to new connections.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XTHFBSJDFW" strategy="afterInteractive" />
        <Script id="gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XTHFBSJDFW');`}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
