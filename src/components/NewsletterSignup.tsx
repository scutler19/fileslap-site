"use client";

export default function NewsletterSignup() {
  return (
    <section className="w-full max-w-4xl mx-auto mt-16 sm:mt-24 mb-16 sm:mb-24 px-6">
      <div className="rounded-2xl bg-[#111217] border border-[#1DEE7F]/20 p-6 sm:p-8 md:p-12 text-center">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4">
          Stay Updated
        </h2>
        <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
          Get the latest updates on FileSlap, API tips, and developer insights from the creator.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8">
          <a
            href="https://exitcodezer0.beehiiv.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#1DEE7F] px-6 sm:px-8 py-3 sm:py-4 font-semibold text-[#0D0D11] hover:brightness-110 transition shadow-lg hover:shadow-xl text-sm sm:text-base"
          >
            Subscribe to ExitCodeZer0&apos;s Newsletter
          </a>
          <a
            href="https://x.com/ExitCodeZer0"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-[#1DEE7F] px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white hover:bg-[#1DEE7F]/10 transition text-sm sm:text-base"
          >
            Follow @ExitCodeZer0
          </a>
        </div>
        
        <p className="text-xs sm:text-sm text-white/60">
          Developer insights, API updates, and tech tips from the creator of FileSlap
        </p>
      </div>
    </section>
  );
} 