/* src/app/layout.tsx */
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'FileSlap – HTML to PDF API | Convert Web Pages to PDF Instantly',
    template: '%s | FileSlap'
  },
  description: 'Convert HTML to PDF with our lightning-fast API. Turn web pages into pixel-perfect PDFs in seconds. Free tier includes 50 pages/month. Simple, reliable, and secure.',
  keywords: [
    'HTML to PDF',
    'PDF conversion',
    'web to PDF',
    'PDF API',
    'document conversion',
    'HTML PDF converter',
    'web page to PDF',
    'PDF generation',
    'document API',
    'FileSlap'
  ],
  authors: [{ name: 'FileSlap Team' }],
  creator: 'FileSlap',
  publisher: 'FileSlap',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fileslap.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fileslap.com',
    siteName: 'FileSlap',
    title: 'FileSlap – HTML to PDF API | Convert Web Pages to PDF Instantly',
    description: 'Convert HTML to PDF with our lightning-fast API. Turn web pages into pixel-perfect PDFs in seconds. Free tier includes 50 pages/month.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FileSlap - HTML to PDF Conversion API',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FileSlap – HTML to PDF API | Convert Web Pages to PDF Instantly',
    description: 'Convert HTML to PDF with our lightning-fast API. Turn web pages into pixel-perfect PDFs in seconds. Free tier includes 50 pages/month.',
    images: ['/og-image.png'],
    creator: '@fileslap',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Plausible analytics */}
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1DEE7F" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FileSlap" />
        <meta name="msapplication-TileColor" content="#1DEE7F" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        <script
          defer
          data-domain="fileslap.com"
          src="https://plausible.io/js/script.outbound-links.js"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.plausible = window.plausible || function () {
                (window.plausible.q = window.plausible.q || []).push(arguments);
              };
            `,
          }}
        />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "FileSlap",
              "description": "Convert HTML to PDF with our lightning-fast API. Turn web pages into pixel-perfect PDFs in seconds.",
              "url": "https://fileslap.com",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free tier includes 50 pages per month"
              },
              "provider": {
                "@type": "Organization",
                "name": "FileSlap",
                "url": "https://fileslap.com"
              },
              "featureList": [
                "HTML to PDF conversion",
                "REST API",
                "Free tier available",
                "Pay-as-you-go pricing",
                "Secure and reliable"
              ]
            })
          }}
        />
        
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "FileSlap",
              "url": "https://fileslap.com",
              "logo": "https://fileslap.com/assets/fileslap-logo.png",
              "description": "HTML to PDF conversion API service",
              "sameAs": [
                "https://twitter.com/fileslap",
                "https://github.com/fileslap"
              ]
            })
          }}
        />
      </head>

      <body
        className={`${inter.className} min-h-screen flex flex-col bg-[#0D0D11] text-white antialiased font-inter leading-relaxed text-base`}
      >
        <header className="flex items-center justify-between px-6 py-4 bg-[#0D0D11]">
          <div></div>
          <nav className="flex gap-6 text-sm text-white/80">
            {/* TODO: add Docs | Pricing | GitHub later */}
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
