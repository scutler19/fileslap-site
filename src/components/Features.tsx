"use client";

const features = [
  {
    icon: "⚡️",
    title: "Fast",
    blurb: "Render full webpages to PDF in seconds.",
  },
  {
    icon: "🛡️",
    title: "Secure",
    blurb: "TLS-only endpoints and zero HTML retained.",
  },
  {
    icon: "💸",
    title: "Pay-as-you-go",
    blurb: "Usage-based pricing from $0.002 per page.",
  },
];

export default function Features() {
  return (
    <section className="w-full max-w-5xl mx-auto mt-32 px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Why developers choose FileSlap
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Built for developers who need reliable, fast, and secure PDF generation.
        </p>
      </div>

      <div className="grid gap-8 md:gap-12 md:grid-cols-3">
        {features.map(({ icon, title, blurb }) => (
          <div
            key={title}
            className="flex flex-col items-center rounded-2xl bg-[#111217] p-8 md:p-10 text-center border border-[#1DEE7F]/10 hover:border-[#1DEE7F]/30 transition-all duration-300 hover:shadow-xl"
          >
            <div className="mb-6 text-6xl drop-shadow-lg">{icon}</div>
            <h3 className="mb-4 text-xl font-semibold text-[#1DEE7F]">{title}</h3>
            <p className="text-base text-white/80 leading-relaxed">{blurb}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 