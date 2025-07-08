"use client";

import { useState } from "react";

const snippets = {
  curl: `curl -X POST https://api.fileslap.com/api/convert \\
  -H "Content-Type: application/json" \\
  -H "X-API-KEY: YOUR_API_KEY" \\
  -d '{"html": "<h1>Hello World</h1>"}' \\
  --output hello.pdf`,
  node: `import fetch from "node-fetch";
import fs from "fs";

const res = await fetch("https://api.fileslap.com/api/convert", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "YOUR_API_KEY"
  },
  body: JSON.stringify({ html: "<h1>Hello World</h1>" })
});

if (!res.ok) {
  throw new Error(\`HTTP \${res.status}\`);
}

const buffer = await res.arrayBuffer();
fs.writeFileSync("hello.pdf", Buffer.from(buffer));`,
  python: `import requests

response = requests.post(
    "https://api.fileslap.com/api/convert",
    headers={
        "Content-Type": "application/json",
        "X-API-KEY": "YOUR_API_KEY"
    },
    json={"html": "<h1>Hello World</h1>"}
)

if response.status_code == 200:
    with open("hello.pdf", "wb") as f:
        f.write(response.content)
else:
    print(f"Error: {response.status_code}")`,
};

export default function CodeSnippets() {
  const [lang, setLang] = useState<"curl" | "node" | "python">("curl");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      // Try the modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(snippets[lang]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }
      
      // Fallback for older browsers or non-secure contexts
      const textArea = document.createElement("textarea");
      textArea.value = snippets[lang];
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        alert("Failed to copy. Please select and copy the text manually.");
      }
    } catch (err) {
      console.error("Copy failed:", err);
      alert("Failed to copy. Please select and copy the text manually.");
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto mt-24 px-6">
      <h2 className="mb-6 text-3xl font-semibold text-white">
        Copy-paste examples
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {(["curl", "node", "python"] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-4 py-2 rounded-full text-sm ${
              lang === l
                ? "bg-[#1DEE7F] text-[#0D0D11]"
                : "border border-[#1DEE7F] text-white/80 hover:bg-[#1DEE7F]/10"
            } transition`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Code box */}
      <div className="relative">
        <pre className="rounded-lg bg-[#111217] p-8 text-left text-[#A5FFCB] text-sm overflow-x-auto">
{snippets[lang]}
        </pre>
        <button
          onClick={copy}
          className="absolute top-4 right-4 px-3 py-1.5 bg-[#1DEE7F] text-[#0D0D11] text-xs font-medium rounded-md hover:brightness-110 transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </section>
  );
} 