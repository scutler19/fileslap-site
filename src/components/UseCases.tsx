export default function UseCases() {
  const useCases = [
    {
      title: "E-commerce & Retail",
      description: "Generate invoices, receipts, and order confirmations automatically from your web application.",
      examples: ["Order confirmations", "Shipping labels", "Product catalogs", "Customer invoices"],
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
      )
    },
    {
      title: "Business & Finance",
      description: "Create professional reports, statements, and financial documents with consistent formatting.",
      examples: ["Financial reports", "Bank statements", "Tax documents", "Business proposals"],
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
        </svg>
      )
    },
    {
      title: "Education & Training",
      description: "Convert course materials, certificates, and educational content into shareable PDFs.",
      examples: ["Course certificates", "Training materials", "Student reports", "Educational handouts"],
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14l9-4-9-4-9 4 9 4z"/>
          <path d="M12 14l6.16-2.74c.34-.15.34-.56 0-.71L12 10l-6.16 2.74c-.34.15-.34.56 0 .71L12 14z"/>
          <path d="M12 16l6.16-2.74c.34-.15.34-.56 0-.71L12 12l-6.16 2.74c-.34.15-.34.56 0 .71L12 16z"/>
        </svg>
      )
    },
    {
      title: "Healthcare & Legal",
      description: "Generate patient records, legal documents, and compliance reports with perfect formatting.",
      examples: ["Medical reports", "Legal contracts", "Patient records", "Compliance documents"],
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      title: "Real Estate & Property",
      description: "Create property listings, contracts, and documentation for real estate transactions.",
      examples: ["Property listings", "Rental agreements", "Inspection reports", "Closing documents"],
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      )
    },
    {
      title: "Marketing & Sales",
      description: "Convert web content into professional marketing materials and sales collateral.",
      examples: ["Sales proposals", "Marketing brochures", "Case studies", "Product sheets"],
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
        </svg>
      )
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