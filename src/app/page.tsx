/* src/app/page.tsx */
import CodeSnippets from "@/components/CodeSnippets";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import HtmlToPdfDemo from "@/components/HtmlToPdfDemo";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <main className="flex min-h-[calc(100vh-120px)] flex-col items-center justify-center text-center px-6 py-16">
        {/* ── Hero ───────────────────────────────────────── */}
        <div className="mb-8">
          <Image
            src="/assets/fileslap-logo.png"
            alt="FileSlap"
            width={520}
            height={130}
            priority
            className="mx-auto drop-shadow-lg"
          />
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white mb-6">
          Convert&nbsp;
          <span className="text-[#1DEE7F]">HTML</span>
          &nbsp;directly&nbsp;to&nbsp;PDF.
        </h1>

        <p className="max-w-2xl text-lg sm:text-xl lg:text-2xl text-white/80 mb-10 leading-relaxed">
          One lightweight API that turns web pages&nbsp;→&nbsp;pixel-perfect PDFs&nbsp;
          in&nbsp;seconds. Your first&nbsp;50&nbsp;pages each month are&nbsp;free.
        </p>

        {/* ── Call-to-Action Buttons ───────────────────── */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <a
            href="/signup"
            className="rounded-full bg-[#1DEE7F] px-10 py-4 text-lg font-semibold text-[#0D0D11] hover:brightness-110 transition duration-200 shadow-lg hover:shadow-xl"
          >
            Get API Key
          </a>
          <a
            href="/docs"
            className="rounded-full border-2 border-[#1DEE7F] px-10 py-4 text-lg font-semibold text-white hover:bg-[#1DEE7F]/10 transition duration-200"
          >
            Read Docs
          </a>
        </div>
      </main>
      <HtmlToPdfDemo />
      <CodeSnippets />
      <Features />
      <Pricing />
    </>
  );
}
