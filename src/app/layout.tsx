/* src/app/layout.tsx */
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FileSlap – HTML → PDF API',
  description: 'Fast, reliable HTML-to-PDF conversion.',
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
