"use client";

import Link from "next/link";
import Image from "next/image";

const guides = [
  {
    title: "Node.js Integration",
    description: "Convert HTML to PDF with Node.js - Complete guide with Express.js and Next.js integration",
    thumbnail: "/thumbnails/FileSlap + Node.js.png",
    category: "Backend",
    link: "https://exitcodezer0.beehiiv.com/p/convert-html-to-pdf-with-node-js-a-complete-guide-to-using-the-fileslap-api",
    features: ["Invoice generation", "Report creation", "Express.js integration", "Error handling"]
  },
  {
    title: "Python Integration",
    description: "Generate PDFs with Python - Flask, Django, and async processing examples",
    thumbnail: "/thumbnails/FileSlap + Python.png",
    category: "Backend",
    link: "https://exitcodezer0.beehiiv.com/p/convert-html-to-pdf-with-python-a-complete-guide-to-using-the-fileslap-api",
    features: ["Dynamic invoices", "Data visualization", "Flask/Django", "Async processing"]
  },
  {
    title: "React Integration",
    description: "Convert React components to PDFs - Browser-based generation with custom hooks",
    thumbnail: "/thumbnails/FileSlap + React.png",
    category: "Frontend",
    link: "https://exitcodezer0.beehiiv.com/p/convert-html-to-pdf-with-react-a-complete-guide-to-using-the-fileslap-api",
    features: ["Component conversion", "Custom hooks", "User downloads", "Performance optimization"]
  },
  {
    title: "Zapier Integration",
    description: "Automate PDF generation with Zapier - No-code workflows for business automation",
    thumbnail: "/thumbnails/FileSlap + Zapier.png",
    category: "No-Code",
    link: "https://exitcodezer0.beehiiv.com/p/automate-pdf-generation-with-zapier-and-fileslap-api",
    features: ["Webhook automation", "Invoice generation", "Form processing", "Email archiving"]
  },
  {
    title: "Make.com Integration",
    description: "Advanced automation with Make.com - Complex workflows and multi-source data",
    thumbnail: "/thumbnails/FileSlap + Make.png",
    category: "No-Code",
    link: "https://exitcodezer0.beehiiv.com/p/automate-pdf-generation-with-make-com-and-fileslap-api",
    features: ["Complex workflows", "Data aggregation", "Batch processing", "Error handling"]
  },
  {
    title: "n8n Integration",
    description: "Self-hosted automation with n8n - Developer-focused workflows with unlimited flexibility",
    thumbnail: "/thumbnails/FileSlap + n8n.png",
    category: "No-Code",
    link: "https://exitcodezer0.beehiiv.com/p/build-powerful-pdf-workflows-with-n8n-and-fileslap-api",
    features: ["Self-hosted", "Database integration", "Parallel processing", "Custom nodes"]
  },
  {
    title: "Google Apps Script",
    description: "Automate PDF generation in Google Workspace - Sheets, Forms, and Gmail integration",
    thumbnail: "/thumbnails/FileSlap + Google Apps Script.png",
    category: "Google Workspace",
    link: "https://exitcodezer0.beehiiv.com/p/convert-html-to-pdf-with-google-apps-script-and-fileslap-api",
    features: ["Sheets to PDF", "Form processing", "Gmail archiving", "Drive automation"]
  }
];

const categories = [
  { name: "All", value: "all" },
  { name: "Backend", value: "Backend" },
  { name: "Frontend", value: "Frontend" },
  { name: "No-Code", value: "No-Code" },
  { name: "Google Workspace", value: "Google Workspace" }
];

export default function IntegrationGuides() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Complete Integration Guides
          </h2>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-white/80 leading-relaxed">
            Step-by-step guides for every major platform. From Node.js to no-code tools, 
            we've got you covered with production-ready code examples.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.value}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition duration-200 text-sm font-medium"
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {guides.map((guide, index) => (
            <Link
              key={index}
              href={guide.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="h-full p-0 sm:p-0 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition duration-300 hover:shadow-xl hover:shadow-[#1DEE7F]/10 flex flex-col">
                {/* Banner Image */}
                <div className="w-full aspect-[1200/630] rounded-t-2xl overflow-hidden bg-white/10 flex-shrink-0">
                  <Image
                    src={guide.thumbnail}
                    alt={`${guide.title} thumbnail`}
                    width={1200}
                    height={630}
                    className="object-cover w-full h-full"
                    priority={index === 0}
                  />
                </div>
                {/* Content */}
                <div className="flex-1 flex flex-col p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#1DEE7F]/20 text-[#1DEE7F] text-xs font-medium">
                      {guide.category}
                    </span>
                  </div>
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#1DEE7F] transition duration-200">
                    {guide.title}
                  </h3>
                  {/* Description */}
                  <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
                    {guide.description}
                  </p>
                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {guide.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-white/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1DEE7F] mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  {/* CTA */}
                  <div className="mt-auto pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-[#1DEE7F] text-sm font-medium group-hover:underline">
                        Read Guide →
                      </span>
                      <div className="w-6 h-6 rounded-full bg-[#1DEE7F]/20 flex items-center justify-center group-hover:bg-[#1DEE7F]/30 transition duration-200">
                        <svg className="w-3 h-3 text-[#1DEE7F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Ultimate Guide CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-[#1DEE7F]/10 to-[#1DEE7F]/5 border border-[#1DEE7F]/20">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              The Ultimate Guide
            </h3>
            <p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">
              Get the complete overview of all integration options and choose the perfect platform for your needs.
            </p>
            <Link
              href="https://exitcodezer0.beehiiv.com/p/the-ultimate-guide-html-to-pdf-api-integration-with-fileslap"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#1DEE7F] text-[#0D0D11] font-semibold hover:brightness-110 transition duration-200"
            >
              Read Ultimate Guide
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 