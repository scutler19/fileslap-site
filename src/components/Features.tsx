"use client";

const features = [
  {
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.6 1.53c.56-1.24.9-2.62.9-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.05.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
      </svg>
    ),
    title: "Fast",
    blurb: "Render full webpages to PDF in seconds.",
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
      </svg>
    ),
    title: "Secure",
    blurb: "TLS-only endpoints and zero HTML retained.",
  },
  {
    icon: (
      <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
      </svg>
    ),
    title: "Pay-as-you-go",
    blurb: "Usage-based pricing from $0.002 per page.",
  },
];

export default function Features() {
  return (
    <section className="w-full max-w-5xl mx-auto mt-24 px-6">
      <div className="text-center mb-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Why developers choose FileSlap
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Built for developers who need reliable, fast, and secure PDF generation.
        </p>
      </div>

      <div className="grid gap-8 md:gap-12 lg:gap-16 md:grid-cols-3">
        {features.map(({ icon, title, blurb }) => (
          <div
            key={title}
            className="flex flex-col items-center rounded-2xl bg-[#111217] p-8 md:p-10 lg:p-12 text-center border border-[#1DEE7F]/10 hover:border-[#1DEE7F]/30 transition-all duration-300 hover:shadow-xl"
          >
            <div 
              className="mb-6 text-6xl drop-shadow-lg"
              aria-label={`${title} icon`}
              role="img"
            >
              {icon}
            </div>
            <h3 className="mb-4 text-xl font-semibold text-[#1DEE7F]">{title}</h3>
            <p className="text-base text-white/80 leading-relaxed">{blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 