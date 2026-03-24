import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'King Street Farms - Eco-Friendly Living in Denver',
  description: 'King Street Farms: EcoLawns Denver electric lawn care, workshop and garden. Sustainable living in Denver.',
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
