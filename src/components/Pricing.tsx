"use client";

type Plan = {
  name: string;
  price: string;
  per: string;
  features: string[];
  highlighted?: boolean;
  action: {
    text: string;
    href: string;
  };
};

export default function Pricing() {
  // Removed unused apiKey state and useEffect

  const plans: Plan[] = [
    {
      name: "Free",
      price: "$0",
      per: "/month",
      features: [
        "50 pages / mo",
        "Up to 5 conversions per day",
        "No credit card required",
      ],
      action: {
        text: "Get Free API Key",
        href: "/signup"
      }
    },
    {
      name: "Starter",
      price: "$9",
      per: "/month",
      highlighted: true,
      features: [
        "2 000 pages / mo",
        "Overage $0.002 / page",
      ],
      action: {
        text: "Start Free Trial",
        href: "/subscribe?plan=starter"
      }
    },
    {
      name: "Pro",
      price: "$29",
      per: "/month",
      features: [
        "12 000 pages / mo",
        "Overage $0.002 / page",
      ],
      action: {
        text: "Start Free Trial",
        href: "/subscribe?plan=pro"
      }
    },
  ];

  return (
    <section id="pricing" className="w-full max-w-6xl mx-auto mt-24 px-6 pb-32">
      <div className="text-center mb-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Simple, predictable pricing
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Start free, scale as you grow. No hidden fees, no surprises.
        </p>
      </div>

      <div className="grid gap-8 md:gap-10 lg:gap-12 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`flex flex-col rounded-2xl p-8 md:p-10 lg:p-12 text-center border transition-all duration-300 hover:shadow-xl ${
              p.highlighted
                ? "border-[#1DEE7F] bg-[#0e1912] shadow-lg"
                : "border-[#1DEE7F]/30 bg-[#111217] hover:border-[#1DEE7F]/50"
            }`}
          >
            <h3 className="text-2xl font-semibold text-[#1DEE7F] mb-6">{p.name}</h3>

            <div className="my-6 flex items-end justify-center gap-1">
              <span className="text-5xl font-bold text-white">{p.price}</span>
              {p.per && (
                <span className="text-white/60 text-lg">{p.per}</span>
              )}
            </div>

            <ul className="flex-1 space-y-3 text-base text-white/80 mb-8">
              {p.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>

            <a
              href={p.action.href}
              className={`rounded-full px-8 py-4 text-lg font-semibold transition duration-200 ${
                p.highlighted
                  ? "bg-[#1DEE7F] text-[#0D0D11] hover:brightness-110 shadow-lg hover:shadow-xl"
                  : "border-2 border-[#1DEE7F] text-white hover:bg-[#1DEE7F]/10"
              }`}
            >
              {p.action.text}
            </a>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-sm text-white/60">
        Need higher volume? <a href="mailto:ghost.exitcodezer0@proton.me" className="underline hover:text-[#1DEE7F] transition-colors">Contact us</a>.
      </p>
    </section>
  );
} 