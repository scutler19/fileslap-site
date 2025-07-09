import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 text-center">
      <Image
        src="/assets/fileslap-logo.png"
        alt="FileSlap Logo"
        width={180}
        height={45}
        className="mb-8 drop-shadow-lg"
        unoptimized
      />
      <h1 className="text-5xl font-bold text-[#1DEE7F] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-white mb-6">Page Not Found</h2>
      <p className="text-white/70 mb-10 max-w-md">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been moved.<br />
        Try going back to the homepage or check out our documentation.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="rounded-full bg-[#1DEE7F] px-8 py-3 font-semibold text-[#0D0D11] hover:brightness-110 transition">
          Back to Home
        </Link>
        <Link href="/docs" className="rounded-full border-2 border-[#1DEE7F] px-8 py-3 font-semibold text-white hover:bg-[#1DEE7F]/10 transition">
          Read Docs
        </Link>
      </div>
    </main>
  );
} 