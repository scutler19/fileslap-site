const items = [
  {
    title: "Standard page sizes",
    text: "Paper formats such as A4 and Letter (Playwright-supported names).",
  },
  {
    title: "Portrait & landscape",
    text: "Flip orientation when your layout needs a wider canvas.",
  },
  {
    title: "Margin control",
    text: "Optional per-side margins as numbers or CSS lengths (e.g. 12 or \"0.5in\").",
  },
  {
    title: "Backgrounds & print CSS",
    text: "Background colors and images are included using print-style rendering.",
  },
  {
    title: "JS & delayed capture",
    text: "Optional delay after load so client-rendered content can settle before PDF.",
  },
];

export default function Capabilities() {
  return (
    <section
      className="w-full max-w-5xl mx-auto mt-16 sm:mt-24 px-6"
      aria-labelledby="capabilities-heading"
    >
      <div className="text-center mb-10 sm:mb-12">
        <h2
          id="capabilities-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4"
        >
          More control when you need it
        </h2>
        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto">
          Sensible defaults for a single-field call—optional knobs when your template is picky.
        </p>
      </div>

      <ul className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
        {items.map(({ title, text }) => (
          <li
            key={title}
            className="rounded-xl bg-[#111217] border border-[#1DEE7F]/15 p-5 sm:p-6 text-left hover:border-[#1DEE7F]/35 transition-colors"
          >
            <h3 className="text-sm sm:text-base font-semibold text-[#1DEE7F] mb-2">
              {title}
            </h3>
            <p className="text-sm text-white/75 leading-relaxed">{text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
