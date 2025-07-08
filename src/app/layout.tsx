/* src/app/layout.tsx */
import './globals.css';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
// import Image from 'next/image';
import Link from 'next/link';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});
const robotoMono = Roboto_Mono({ 
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fileslap.com'),
  title: {
    default: 'FileSlap · HTML-to-PDF API for Developers',
    template: '%s | FileSlap',
  },
  description: 'Instant HTML-to-PDF conversion API. Free 50 pages/month.',
  openGraph: {
    title: 'FileSlap · HTML-to-PDF API for Developers',
    description: 'Instant HTML-to-PDF conversion API. Free 50 pages/month.',
    url: 'https://www.fileslap.com/',
    siteName: 'FileSlap',
    images: [
      {
        url: '/og-cover.png',
        width: 1200,
        height: 630,
        alt: 'FileSlap HTML-to-PDF API',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FileSlap · HTML-to-PDF API for Developers',
    description: 'Instant HTML-to-PDF conversion API. Free 50 pages/month.',
    images: ['/og-cover.png'],
    site: '@fileslap',
  },
  alternates: {
    canonical: 'https://www.fileslap.com/',
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
        className={`${inter.variable} ${robotoMono.variable} min-h-screen flex flex-col bg-[#0D0D11] text-white antialiased leading-relaxed text-base`}
      >
        <header className="flex items-center justify-between px-6 py-4 bg-[#0D0D11]">
          <div></div>
          <nav className="flex gap-6 text-sm text-white/80">
            {/* TODO: add Docs | Pricing | GitHub later */}
          </nav>
        </header>
        
        <div className="flex-1">
          {children}
        </div>
        
        <footer className="border-t border-[#1DEE7F]/20 bg-[#0D0D11] px-6 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-white/60">
                <span>built by</span>
                <a
                  href="https://x.com/ExitCodeZer0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                >
                  <img
                    src="/exitcodezer0_logo_512x512.png"
                    alt="ExitCodeZer0 logo"
                    width={32}
                    height={32}
                    className="rounded-full shadow-sm bg-[#0D0D11]"
                    style={{ objectFit: 'cover' }}
                  />
                </a>
                <a
                  href="https://x.com/ExitCodeZer0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white hover:text-[#1DEE7F] transition-colors"
                >
                  @ExitCodeZer0
                </a>
              </div>
              
              <nav className="flex gap-6 text-sm">
                <Link href="/docs" className="text-white/60 hover:text-[#1DEE7F] transition-colors">
                  Documentation
                </Link>
                <Link href="/docs/security" className="text-white/60 hover:text-[#1DEE7F] transition-colors">
                  Security & Privacy
                </Link>
                <Link href="/contact" className="text-white/60 hover:text-[#1DEE7F] transition-colors">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
