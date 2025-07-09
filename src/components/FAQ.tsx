const faqs = [
  {
    q: "What is FileSlap?",
    a: "FileSlap is a fast, secure API for converting HTML to PDF. It is designed for developers who need reliable, scalable PDF generation in their apps."
  },
  {
    q: "How many free conversions do I get?",
    a: "You get 50 free pages per month with the Free plan, with a limit of 5 conversions per day. No credit card required."
  },
  {
    q: "Is my HTML or PDF data stored?",
    a: "No. FileSlap processes all conversions in-memory and does not retain your HTML or generated PDFs."
  },
  {
    q: "How fast is the API?",
    a: "Most conversions complete in under 2 seconds. Performance may vary based on HTML complexity."
  },
  {
    q: "Can I use FileSlap for invoices, reports, or resumes?",
    a: "Yes! FileSlap is perfect for generating invoices, reports, resumes, and any other web-based documents as PDFs."
  }
];

export default function FAQ() {
  return (
    <section className="w-full max-w-4xl mx-auto mt-16 sm:mt-24 px-6" id="faq">
      <h2 className="mb-6 sm:mb-8 text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 sm:space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-xl bg-[#111217] border border-[#1DEE7F]/20 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-[#1DEE7F] mb-2">{faq.q}</h3>
            <p className="text-sm sm:text-base text-white/80">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 