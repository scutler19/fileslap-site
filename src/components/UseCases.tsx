export default function UseCases() {
  const useCases = [
    {
      title: "E-commerce & Retail",
      description: "Generate invoices, receipts, and order confirmations automatically from your web application.",
      examples: ["Order confirmations", "Shipping labels", "Product catalogs", "Customer invoices"],
      icon: "🛒"
    },
    {
      title: "Business & Finance",
      description: "Create professional reports, statements, and financial documents with consistent formatting.",
      examples: ["Financial reports", "Bank statements", "Tax documents", "Business proposals"],
      icon: "💼"
    },
    {
      title: "Education & Training",
      description: "Convert course materials, certificates, and educational content into shareable PDFs.",
      examples: ["Course certificates", "Training materials", "Student reports", "Educational handouts"],
      icon: "🎓"
    },
    {
      title: "Healthcare & Legal",
      description: "Generate patient records, legal documents, and compliance reports with perfect formatting.",
      examples: ["Medical reports", "Legal contracts", "Patient records", "Compliance documents"],
      icon: "⚖️"
    },
    {
      title: "Real Estate & Property",
      description: "Create property listings, contracts, and documentation for real estate transactions.",
      examples: ["Property listings", "Rental agreements", "Inspection reports", "Closing documents"],
      icon: "🏠"
    },
    {
      title: "Marketing & Sales",
      description: "Convert web content into professional marketing materials and sales collateral.",
      examples: ["Sales proposals", "Marketing brochures", "Case studies", "Product sheets"],
      icon: "📈"
    }
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-20">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
          Who Uses HTML-to-PDF Conversion?
        </h2>
        <p className="text-lg text-white/80 max-w-3xl mx-auto">
          From small businesses to enterprise applications, developers use FileSlap to automate document generation 
          and create professional PDFs from web content. Here&apos;s how different industries benefit:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
        {useCases.map((useCase, index) => (
          <div
            key={index}
            className="bg-[#111217] rounded-xl p-8 border border-[#1DEE7F]/20 hover:border-[#1DEE7F]/40 transition-all duration-200 hover:shadow-lg hover:shadow-[#1DEE7F]/10"
          >
            <div className="text-4xl mb-4">{useCase.icon}</div>
            <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
            <p className="text-white/70 mb-4 leading-relaxed">{useCase.description}</p>
            <div className="space-y-2">
              {useCase.examples.map((example, exampleIndex) => (
                <div key={exampleIndex} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#1DEE7F] rounded-full"></div>
                  <span className="text-sm text-white/60">{example}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>


    </section>
  );
} 