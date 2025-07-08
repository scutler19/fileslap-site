"use client";

import { useState, useEffect } from "react";

// Spinner component
function Spinner() {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#0D0D11] border-t-[#1DEE7F]"></div>
      <span>Converting…</span>
    </div>
  );
}

export default function HtmlToPdfDemo() {
  const [html, setHtml] = useState("<h1>Hello FileSlap</h1>");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Check remaining attempts on component mount
  useEffect(() => {
    checkRemainingAttempts();
  }, []);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        window.URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const checkRemainingAttempts = async () => {
    try {
      const res = await fetch("/api/demo-convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: "check" }),
      });
      
      if (res.ok) {
        const data = await res.json();
        setRemainingAttempts(data.remainingAttempts);
      } else {
        // If there's an error, assume 3 attempts remaining
        setRemainingAttempts(3);
      }
    } catch {
      // Silently fail - this is just for checking attempts
      setRemainingAttempts(3);
    }
  };

  const convert = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/demo-convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      });
      
      // Update remaining attempts from response header
      const remaining = res.headers.get("X-Remaining-Attempts");
      if (remaining !== null) {
        setRemainingAttempts(parseInt(remaining));
      }
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage = errorData.error || `Status ${res.status}`;
        
        // Handle specific error cases
        if (errorMessage.includes("Daily demo limit reached")) {
          setError(errorMessage);
          setRemainingAttempts(0);
        } else if (errorMessage.includes("Rate limit exceeded")) {
          setError(errorMessage);
        } else if (errorMessage.includes("taking too long")) {
          setError("The conversion service is slow right now. Please try again in a moment.");
        } else if (errorMessage.includes("service unavailable")) {
          setError("The conversion service is temporarily down. Please try again later.");
        } else {
          setError("Conversion failed. Please try again or check your HTML.");
        }
        return;
      }
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setPreviewUrl(url);
    } catch (e: unknown) {
      setError("Conversion failed. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto mt-32 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Try It Now
        </h2>
        <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
          Test the API right now. Paste your HTML below and convert it to PDF instantly.
        </p>
        
        {/* Daily Usage Counter */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111217] border border-[#1DEE7F]/30">
          <span className="text-sm text-white/60">Daily Demo:</span>
          <span className="text-sm font-semibold text-[#1DEE7F]">
            {remainingAttempts !== null ? `${remainingAttempts}/3` : "3/3"} conversions remaining
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          rows={10}
          className="w-full rounded-xl bg-[#111217] p-6 text-sm text-white/90 outline-none focus:ring-2 focus:ring-[#1DEE7F] border border-[#1DEE7F]/20 transition-all duration-200"
          placeholder="Paste your HTML here..."
        />

        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-sm text-red-400">{error}</p>
            {error.includes("Daily demo limit reached") && (
              <div className="mt-3">
                <a
                  href="/signup"
                  className="inline-flex items-center gap-2 text-sm text-[#1DEE7F] hover:underline"
                >
                  Get your free API key →
                </a>
              </div>
            )}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={convert}
            disabled={loading || remainingAttempts === 0}
            className="rounded-full bg-[#1DEE7F] px-10 py-4 text-lg font-semibold text-[#0D0D11] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? <Spinner /> : remainingAttempts === 0 ? "Daily Limit Reached" : "Convert to PDF"}
          </button>
          
          {remainingAttempts === 0 && (
            <p className="mt-3 text-sm text-white/60">
              Get your own API key for unlimited conversions
            </p>
          )}
        </div>

        {previewUrl && (
          <div className="mt-6">
            <h3 className="text-xl font-bold text-white mb-4 text-center">PDF Generated Successfully!</h3>
            <div className="w-full max-w-2xl mx-auto bg-[#111217] rounded-xl p-6 border border-[#1DEE7F]/20">
              <div className="mb-4 text-center">
                <p className="text-sm text-white/60 mb-3">Preview your generated PDF:</p>
                <iframe
                  src={previewUrl}
                  className="w-full h-64 rounded-lg border border-[#1DEE7F]/10"
                  title="PDF Preview"
                />
              </div>
              <div className="text-center">
                <button
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = previewUrl;
                    a.download = "fileslap-demo.pdf";
                    a.click();
                  }}
                  className="rounded-full bg-[#1DEE7F] px-6 py-3 font-medium text-[#0D0D11] hover:brightness-110 transition"
                >
                  Download PDF
                </button>
                <button
                  onClick={() => {
                    setPreviewUrl(null);
                    if (previewUrl) {
                      window.URL.revokeObjectURL(previewUrl);
                    }
                  }}
                  className="ml-3 rounded-full border border-[#1DEE7F] px-6 py-3 font-medium text-white hover:bg-[#1DEE7F]/10 transition"
                >
                  Convert Another
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 