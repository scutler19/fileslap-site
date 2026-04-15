"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getStoredFileSlapApiKey,
  setStoredFileSlapApiKey,
} from "@/lib/fs-api-key";

const FILESLAP_CONVERT_URL = "https://api.fileslap.com/api/convert";

async function readApiErrorMessage(res: Response): Promise<string> {
  const text = await res.text();
  try {
    const j = JSON.parse(text) as { error?: unknown };
    if (typeof j.error === "string") return j.error;
  } catch {
    /* plain text or HTML */
  }
  const trimmed = text.trim();
  if (trimmed) return trimmed;
  return `HTTP ${res.status}`;
}

function parseHideSelectorsInput(raw: string): string[] | undefined {
  const parts = raw
    .split(/[\n,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : undefined;
}

function downloadBaseName(filenameField: string, pageUrl: string, sourceMode: "url" | "html"): string {
  const fn = filenameField.trim();
  if (fn) {
    return fn.replace(/\.pdf$/i, "").replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 120);
  }
  if (sourceMode === "url" && pageUrl.trim()) {
    try {
      return new URL(pageUrl.trim()).hostname.replace(/[^a-zA-Z0-9.-]+/g, "-").slice(0, 120);
    } catch {
      return "";
    }
  }
  return "";
}

function downloadFilename(filenameField: string, pageUrl: string, sourceMode: "url" | "html"): string {
  const base = downloadBaseName(filenameField, pageUrl, sourceMode);
  return base ? `${base}.pdf` : "fileslap-convert.pdf";
}

function triggerPdfDownload(blobUrl: string, filename: string): void {
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  a.rel = "noopener";
  a.click();
}

// Spinner component
function Spinner() {
  return (
    <div className="inline-flex items-center gap-2">
      <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#0D0D11] border-t-[#1DEE7F]"></div>
      <span>Converting…</span>
    </div>
  );
}

// Example HTMLs
const EXAMPLES = [
  {
    label: "Online Catalog",
    html: `<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { color: #2c3e50; margin-bottom: 10px; }
        .header p { color: #7f8c8d; font-size: 18px; }
        .products { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .product { border: 1px solid #ecf0f1; border-radius: 8px; padding: 20px; transition: transform 0.2s; }
        .product:hover { transform: translateY(-5px); box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
        .product img { width: 100%; height: 200px; object-fit: cover; border-radius: 5px; background: #ecf0f1; }
        .product h3 { color: #2c3e50; margin: 15px 0 10px 0; }
        .product .price { font-size: 24px; font-weight: bold; color: #e74c3c; margin: 10px 0; }
        .product .description { color: #7f8c8d; line-height: 1.6; margin-bottom: 15px; }
        .product .features { list-style: none; padding: 0; }
        .product .features li { padding: 5px 0; color: #34495e; }
        .product .features li:before { content: "✓ "; color: #27ae60; font-weight: bold; }
        .badge { display: inline-block; padding: 5px 10px; border-radius: 15px; font-size: 12px; font-weight: bold; margin: 5px 5px 5px 0; }
        .badge.new { background: #3498db; color: white; }
        .badge.sale { background: #e74c3c; color: white; }
        .badge.popular { background: #f39c12; color: white; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Premium Tech Products</h1>
            <p>Discover the latest in technology and innovation</p>
        </div>
        
        <div class="products">
            <div class="product">
                <Image src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWNmMGYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzJjM2U1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1hY0Jvb2sgUHJvPC90ZXh0Pjwvc3ZnPg=="
                  alt="MacBook Pro"
                  width={300}
                  height={200}
                  unoptimized
                />
                <span class="badge new">New</span>
                <span class="badge popular">Popular</span>
                <h3>MacBook Pro 16"</h3>
                <div class="price">$2,499</div>
                <p class="description">The most powerful MacBook Pro ever. Featuring the M2 Pro chip, stunning Liquid Retina XDR display, and up to 96GB of unified memory.</p>
                <ul class="features">
                    <li>M2 Pro chip with 12-core CPU</li>
                    <li>16-inch Liquid Retina XDR display</li>
                    <li>Up to 96GB unified memory</li>
                    <li>Up to 8TB SSD storage</li>
                    <li>Up to 22 hours battery life</li>
                </ul>
            </div>
            
            <div class="product">
                <Image src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWNmMGYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzJjM2U1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPmlQaG9uZSAxNSBQcm88L3RleHQ+PC9zdmc+"
                  alt="iPhone 15 Pro"
                  width={300}
                  height={200}
                  unoptimized
                />
                <span class="badge sale">Sale</span>
                <h3>iPhone 15 Pro</h3>
                <div class="price">$999</div>
                <p class="description">Titanium. So strong. So light. So Pro. The iPhone 15 Pro features the A17 Pro chip, pro camera system, and all-day battery life.</p>
                <ul class="features">
                    <li>A17 Pro chip with 6-core GPU</li>
                    <li>6.1-inch Super Retina XDR display</li>
                    <li>Pro camera system with 48MP main</li>
                    <li>Titanium design</li>
                    <li>USB-C connector</li>
                </ul>
            </div>
            
            <div class="product">
                <Image src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWNmMGYxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzJjM2U1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkFpcnBvZHMgUHJvPC90ZXh0Pjwvc3ZnPg=="
                  alt="AirPods Pro"
                  width={300}
                  height={200}
                  unoptimized
                />
                <span class="badge popular">Popular</span>
                <h3>AirPods Pro (2nd gen)</h3>
                <div class="price">$249</div>
                <p class="description">Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio, and sweat and water resistance.</p>
                <ul class="features">
                    <li>Active Noise Cancellation</li>
                    <li>Adaptive Transparency</li>
                    <li>Personalized Spatial Audio</li>
                    <li>Sweat and water resistant</li>
                    <li>Up to 6 hours listening time</li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>`
  },
  {
    label: "Resume",
    html: `<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Georgia', serif; margin: 0; padding: 40px; background: #f9f9f9; }
        .resume { max-width: 800px; margin: 0 auto; background: white; padding: 40px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { text-align: center; border-bottom: 3px solid #2c3e50; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #2c3e50; margin: 0 0 10px 0; font-size: 36px; }
        .header .title { color: #7f8c8d; font-size: 20px; margin-bottom: 15px; }
        .contact { display: flex; justify-content: center; gap: 30px; flex-wrap: wrap; }
        .contact div { color: #34495e; }
        .section { margin: 30px 0; }
        .section h2 { color: #2c3e50; border-bottom: 2px solid #ecf0f1; padding-bottom: 10px; margin-bottom: 20px; }
        .job { margin-bottom: 25px; }
        .job-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px; }
        .job-title { font-weight: bold; color: #2c3e50; font-size: 18px; }
        .job-company { color: #e74c3c; font-weight: bold; }
        .job-date { color: #7f8c8d; font-style: italic; }
        .job-description { color: #34495e; line-height: 1.6; }
        .skills { display: flex; flex-wrap: wrap; gap: 10px; }
        .skill { background: #ecf0f1; padding: 8px 15px; border-radius: 20px; color: #2c3e50; font-size: 14px; }
        .education { margin-bottom: 20px; }
        .education-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px; }
        .degree { font-weight: bold; color: #2c3e50; }
        .school { color: #e74c3c; }
        .year { color: #7f8c8d; }
    </style>
</head>
<body>
    <div class="resume">
        <div class="header">
            <h1>Sarah Johnson</h1>
            <div class="title">Senior Software Engineer</div>
            <div class="contact">
                <div>Email: sarah.johnson@email.com</div>
                <div>Phone: (555) 123-4567</div>
                <div>Location: San Francisco, CA</div>
                <div>LinkedIn: linkedin.com/in/sarahjohnson</div>
            </div>
        </div>
        
        <div class="section">
            <h2>Professional Summary</h2>
            <p>Experienced software engineer with 8+ years developing scalable web applications and cloud infrastructure. Passionate about clean code, system design, and mentoring junior developers. Proven track record of leading technical projects and delivering high-impact solutions.</p>
        </div>
        
        <div class="section">
            <h2>Work Experience</h2>
            
            <div class="job">
                <div class="job-header">
                    <div>
                        <span class="job-title">Senior Software Engineer</span>
                        <span class="job-company">TechCorp Inc.</span>
                    </div>
                    <span class="job-date">2021 - Present</span>
                </div>
                <div class="job-description">
                    <ul>
                        <li>Led development of microservices architecture serving 2M+ daily users</li>
                        <li>Improved system performance by 40% through database optimization and caching strategies</li>
                        <li>Mentored 5 junior developers and established coding standards</li>
                        <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
                    </ul>
                </div>
            </div>
            
            <div class="job">
                <div class="job-header">
                    <div>
                        <span class="job-title">Software Engineer</span>
                        <span class="job-company">StartupXYZ</span>
                    </div>
                    <span class="job-date">2019 - 2021</span>
                </div>
                <div class="job-description">
                    <ul>
                        <li>Built RESTful APIs and React frontend for SaaS platform</li>
                        <li>Reduced bug reports by 30% through comprehensive testing</li>
                        <li>Collaborated with product team to define technical requirements</li>
                        <li>Participated in code reviews and technical architecture decisions</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="section">
            <h2>Technical Skills</h2>
            <div class="skills">
                <span class="skill">JavaScript/TypeScript</span>
                <span class="skill">React</span>
                <span class="skill">Node.js</span>
                <span class="skill">Python</span>
                <span class="skill">PostgreSQL</span>
                <span class="skill">MongoDB</span>
                <span class="skill">AWS</span>
                <span class="skill">Docker</span>
                <span class="skill">Kubernetes</span>
                <span class="skill">GraphQL</span>
                <span class="skill">Redis</span>
                <span class="skill">Git</span>
            </div>
        </div>
        
        <div class="section">
            <h2>Education</h2>
            <div class="education">
                <div class="education-header">
                    <div>
                        <span class="degree">Bachelor of Science in Computer Science</span>
                        <span class="school">Stanford University</span>
                    </div>
                    <span class="year">2015 - 2019</span>
                </div>
                <p>GPA: 3.8/4.0 | Relevant coursework: Data Structures, Algorithms, Database Systems, Software Engineering</p>
            </div>
        </div>
        
        <div class="section">
            <h2>Projects</h2>
            <div class="job">
                <div class="job-header">
                    <div>
                        <span class="job-title">Open Source Contributor</span>
                        <span class="job-company">Various Projects</span>
                    </div>
                    <span class="job-date">2018 - Present</span>
                </div>
                <div class="job-description">
                    <ul>
                        <li>Contributed to React Router, Express.js, and other popular open source projects</li>
                        <li>Maintained personal projects with 500+ GitHub stars</li>
                        <li>Regular speaker at local tech meetups and conferences</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`
  },
  {
    label: "Business Report",
    html: `<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; text-align: center; }
        .section { margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #f2f2f2; }
        .highlight { background-color: #e8f4f8; padding: 10px; border-left: 4px solid #3498db; }
        .footer { margin-top: 30px; padding: 15px; background: #ecf0f1; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Quarterly Business Report</h1>
        <p>Q4 2024 - Financial Performance Analysis</p>
    </div>
    
    <div class="section">
        <h2>Executive Summary</h2>
        <p>This quarter demonstrated strong growth across all business segments, with revenue increasing by 23% compared to Q3. Our digital transformation initiatives continue to drive operational efficiency and customer satisfaction.</p>
        
        <div class="highlight">
            <strong>Key Highlights:</strong>
            <ul>
                <li>Revenue growth: +23% YoY</li>
                <li>Customer acquisition: +15%</li>
                <li>Operational efficiency: +8% improvement</li>
            </ul>
        </div>
    </div>
    
    <div class="section">
        <h2>Financial Performance</h2>
        <table>
            <thead>
                <tr>
                    <th>Metric</th>
                    <th>Q3 2024</th>
                    <th>Q4 2024</th>
                    <th>Change</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Total Revenue</td>
                    <td>$2.4M</td>
                    <td>$2.95M</td>
                    <td style="color: green;">+23%</td>
                </tr>
                <tr>
                    <td>Operating Expenses</td>
                    <td>$1.8M</td>
                    <td>$2.1M</td>
                    <td style="color: red;">+17%</td>
                </tr>
                <tr>
                    <td>Net Profit</td>
                    <td>$600K</td>
                    <td>$850K</td>
                    <td style="color: green;">+42%</td>
                </tr>
                <tr>
                    <td>Customer Count</td>
                    <td>1,250</td>
                    <td>1,438</td>
                    <td style="color: green;">+15%</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div class="section">
        <h2>Department Performance</h2>
        <table>
            <thead>
                <tr>
                    <th>Department</th>
                    <th>Budget</th>
                    <th>Actual</th>
                    <th>Variance</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Sales</td>
                    <td>$500K</td>
                    <td>$520K</td>
                    <td style="color: red;">-$20K</td>
                    <td>⚠ Over Budget</td>
                </tr>
                <tr>
                    <td>Marketing</td>
                    <td>$300K</td>
                    <td>$285K</td>
                    <td style="color: green;">+$15K</td>
                    <td>✓ Under Budget</td>
                </tr>
                <tr>
                    <td>Engineering</td>
                    <td>$400K</td>
                    <td>$395K</td>
                    <td style="color: green;">+$5K</td>
                    <td>✓ Under Budget</td>
                </tr>
                <tr>
                    <td>Operations</td>
                    <td>$250K</td>
                    <td>$260K</td>
                    <td style="color: red;">-$10K</td>
                    <td>⚠ Over Budget</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div class="footer">
        <p>Report generated on December 31, 2024 | Confidential Business Information</p>
    </div>
</body>
</html>`
  }
];

type ViewportPreset = "default" | "desktop" | "mobile" | "custom";

function buildConvertPayload(
  sourceMode: "url" | "html",
  pageUrl: string,
  html: string,
  captureMode: "pdf" | "screenshot_pdf",
  opts: {
    viewportPreset: ViewportPreset;
    viewportWidth: string;
    viewportHeight: string;
    delayMs: string;
    mediaType: "" | "print" | "screen";
    hideSelectors: string;
    waitForSelector: string;
    timeout: string;
    scale: string;
    printBackground: boolean | null;
    preferCSSPageSize: boolean | null;
    filename: string;
    format: string;
    landscape: boolean;
    marginTop: string;
    marginRight: string;
    marginBottom: string;
    marginLeft: string;
  }
): Record<string, unknown> {
  const body: Record<string, unknown> = { captureMode };
  if (sourceMode === "url") {
    body.url = pageUrl.trim();
  } else {
    body.html = html;
  }

  if (opts.viewportPreset === "desktop") {
    body.viewportWidth = 1280;
    body.viewportHeight = 720;
  } else if (opts.viewportPreset === "mobile") {
    body.viewportWidth = 390;
    body.viewportHeight = 844;
  } else if (opts.viewportPreset === "custom") {
    const w = opts.viewportWidth.trim();
    const h = opts.viewportHeight.trim();
    if (w && h) {
      const nw = Math.floor(Number(w));
      const nh = Math.floor(Number(h));
      if (Number.isFinite(nw) && Number.isFinite(nh)) {
        body.viewportWidth = nw;
        body.viewportHeight = nh;
      }
    }
  }

  const d = opts.delayMs.trim();
  if (d) {
    const n = Math.floor(Number(d));
    if (Number.isFinite(n) && n >= 0) {
      body.delayMs = Math.min(10_000, n);
    }
  }

  if (opts.mediaType === "print" || opts.mediaType === "screen") {
    body.mediaType = opts.mediaType;
  }

  const hs = parseHideSelectorsInput(opts.hideSelectors);
  if (hs) body.hideSelectors = hs;

  const wfs = opts.waitForSelector.trim();
  if (wfs) body.waitForSelector = wfs;

  const to = opts.timeout.trim();
  if (to) {
    const n = Math.floor(Number(to));
    if (Number.isFinite(n)) body.timeout = n;
  }

  const sc = opts.scale.trim();
  if (sc) {
    const n = Number(sc);
    if (Number.isFinite(n)) body.scale = n;
  }

  if (opts.printBackground !== null) body.printBackground = opts.printBackground;
  if (opts.preferCSSPageSize !== null) body.preferCSSPageSize = opts.preferCSSPageSize;

  if (opts.format.trim()) body.format = opts.format.trim();
  if (opts.landscape) body.landscape = true;
  const mt = opts.marginTop.trim();
  const mr = opts.marginRight.trim();
  const mb = opts.marginBottom.trim();
  const ml = opts.marginLeft.trim();
  if (mt) body.marginTop = /^\d+(\.\d+)?$/.test(mt) ? Number(mt) : mt;
  if (mr) body.marginRight = /^\d+(\.\d+)?$/.test(mr) ? Number(mr) : mr;
  if (mb) body.marginBottom = /^\d+(\.\d+)?$/.test(mb) ? Number(mb) : mb;
  if (ml) body.marginLeft = /^\d+(\.\d+)?$/.test(ml) ? Number(ml) : ml;

  const fn = opts.filename.trim();
  if (fn) body.filename = fn.slice(0, 200);

  return body;
}

export default function HtmlToPdfDemo() {
  const [sourceMode, setSourceMode] = useState<"url" | "html">("url");
  const [pageUrl, setPageUrl] = useState("https://example.com");
  const [html, setHtml] = useState("<h1>Hello FileSlap</h1>");
  const [captureMode, setCaptureMode] = useState<"pdf" | "screenshot_pdf">("pdf");
  const [apiKeyInput, setApiKeyInput] = useState("");

  const [viewportPreset, setViewportPreset] = useState<ViewportPreset>("desktop");
  const [viewportWidth, setViewportWidth] = useState("1280");
  const [viewportHeight, setViewportHeight] = useState("720");
  const [delayMs, setDelayMs] = useState("");
  const [mediaType, setMediaType] = useState<"" | "print" | "screen">("");
  const [hideSelectors, setHideSelectors] = useState("");
  const [waitForSelector, setWaitForSelector] = useState("");
  const [timeoutMs, setTimeoutMs] = useState("");
  const [scale, setScale] = useState("");
  const [printBackground, setPrintBackground] = useState<boolean | null>(null);
  const [preferCSSPageSize, setPreferCSSPageSize] = useState<boolean | null>(null);

  const [format, setFormat] = useState("A4");
  const [landscape, setLandscape] = useState(false);
  const [marginTop, setMarginTop] = useState("");
  const [marginRight, setMarginRight] = useState("");
  const [marginBottom, setMarginBottom] = useState("");
  const [marginLeft, setMarginLeft] = useState("");
  const [filename, setFilename] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [suggestScreenshot, setSuggestScreenshot] = useState(false);

  const usingOwnKey = apiKeyInput.trim().length > 0;

  const checkRemainingAttempts = useCallback(async () => {
    try {
      const res = await fetch("/api/demo-convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: "check" }),
      });

      if (res.ok) {
        const data = (await res.json()) as { remainingAttempts?: number };
        if (typeof data.remainingAttempts === "number") {
          setRemainingAttempts(data.remainingAttempts);
        }
      } else {
        setRemainingAttempts(3);
      }
    } catch {
      setRemainingAttempts(3);
    }
  }, []);

  useEffect(() => {
    setApiKeyInput(getStoredFileSlapApiKey() ?? "");
  }, []);

  useEffect(() => {
    if (usingOwnKey) return;
    void checkRemainingAttempts();
  }, [usingOwnKey, checkRemainingAttempts]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        window.URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const convert = async () => {
    setLoading(true);
    setError(null);
    setSuggestScreenshot(false);

    if (sourceMode === "url" && !pageUrl.trim()) {
      setError("Enter a URL (https://…).");
      setLoading(false);
      return;
    }
    if (sourceMode === "html" && !html.trim()) {
      setError("Paste HTML, or switch to URL mode.");
      setLoading(false);
      return;
    }

    const payload = buildConvertPayload(sourceMode, pageUrl, html, captureMode, {
      viewportPreset,
      viewportWidth,
      viewportHeight,
      delayMs,
      mediaType,
      hideSelectors,
      waitForSelector,
      timeout: timeoutMs,
      scale,
      printBackground,
      preferCSSPageSize,
      filename,
      format,
      landscape,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
    });

    const key = apiKeyInput.trim();
    const url = key ? FILESLAP_CONVERT_URL : "/api/demo-convert";
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (key) headers["X-API-KEY"] = key;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const remaining = res.headers.get("X-Remaining-Attempts");
      if (remaining !== null && !key) {
        setRemainingAttempts(parseInt(remaining, 10));
      }

      if (!res.ok) {
        const msg = await readApiErrorMessage(res);
        if (res.status === 401) {
          setError(`Unauthorized: ${msg}`);
        } else if (res.status === 403) {
          setError(`Forbidden: ${msg}`);
        } else if (res.status === 402) {
          setError(msg);
        } else if (res.status === 429) {
          setError(msg);
          if (msg.includes("Daily demo") || msg.includes("demo limit")) {
            setRemainingAttempts(0);
          }
        } else {
          setError(msg);
        }
        if (
          captureMode === "pdf" &&
          res.status !== 401 &&
          res.status !== 402 &&
          res.status !== 403
        ) {
          const demoCap =
            res.status === 429 &&
            (msg.toLowerCase().includes("daily demo") ||
              msg.toLowerCase().includes("demo limit"));
          if (!demoCap) setSuggestScreenshot(true);
        }
        return;
      }

      const blob = await res.blob();
      const dlName = downloadFilename(filename, pageUrl, sourceMode);
      const nextUrl = window.URL.createObjectURL(blob);
      setPreviewUrl((prev) => {
        if (prev) window.URL.revokeObjectURL(prev);
        return nextUrl;
      });
      triggerPdfDownload(nextUrl, dlName);
      if (key) setStoredFileSlapApiKey(key);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Conversion failed. Please try again.");
      if (captureMode === "pdf") setSuggestScreenshot(true);
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const demoBlocked = !usingOwnKey && remainingAttempts === 0;

  return (
    <section className="w-full max-w-5xl mx-auto mt-16 sm:mt-24 px-6">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
          Try It Now
        </h2>
        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-4 sm:mb-6">
          Convert a public web page or raw HTML to PDF using the same{" "}
          <code className="text-[#1DEE7F]/90">POST /api/convert</code> contract as production: JSON
          in, PDF bytes out, with <code className="text-[#1DEE7F]/90">X-API-KEY</code> on direct calls.
        </p>

        {!usingOwnKey && (
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#111217] border border-[#1DEE7F]/30">
            <span className="text-xs sm:text-sm text-white/60">Daily demo (no key):</span>
            <span className="text-xs sm:text-sm font-semibold text-[#1DEE7F]">
              {remainingAttempts !== null ? `${remainingAttempts}/3` : "…/3"} left
            </span>
          </div>
        )}
        {usingOwnKey && (
          <p className="text-xs sm:text-sm text-white/55 max-w-xl mx-auto">
            Using your API key — requests go straight to{" "}
            <span className="text-white/80">api.fileslap.com</span> (not the 3/day demo proxy).
          </p>
        )}
      </div>

      <div className="rounded-xl border border-[#1DEE7F]/20 bg-[#111217]/80 p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSourceMode("url")}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              sourceMode === "url"
                ? "bg-[#1DEE7F] text-[#0D0D11]"
                : "bg-[#0D0D11] text-white/80 border border-[#1DEE7F]/25"
            }`}
          >
            From URL
          </button>
          <button
            type="button"
            onClick={() => setSourceMode("html")}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              sourceMode === "html"
                ? "bg-[#1DEE7F] text-[#0D0D11]"
                : "bg-[#0D0D11] text-white/80 border border-[#1DEE7F]/25"
            }`}
          >
            Paste HTML
          </button>
        </div>

        {sourceMode === "url" ? (
          <label className="block text-sm text-white/80">
            <span className="block mb-1 text-white/90 font-medium">Page URL</span>
            <input
              type="url"
              value={pageUrl}
              onChange={(e) => setPageUrl(e.target.value)}
              className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2.5 text-sm text-white placeholder:text-white/35"
              placeholder="https://example.com"
              autoComplete="url"
            />
          </label>
        ) : (
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
            <div className="flex-1 w-full">
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                rows={10}
                className="w-full rounded-xl bg-[#0D0D11] p-4 sm:p-6 text-sm text-white/90 outline-none focus:ring-2 focus:ring-[#1DEE7F] border border-[#1DEE7F]/20 transition-all duration-200"
                placeholder="Paste your HTML here..."
              />
            </div>
            <div className="w-full md:w-72 flex flex-col gap-3 sm:gap-4 mt-0">
              <div className="mb-1 text-white/70 text-xs sm:text-sm font-medium text-center md:text-left">
                Examples:
              </div>
              {EXAMPLES.map((ex) => (
                <button
                  key={ex.label}
                  type="button"
                  onClick={() => {
                    setSourceMode("html");
                    setHtml(ex.html);
                  }}
                  className="rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/30 hover:border-[#1DEE7F] shadow-sm px-3 sm:px-4 py-2 sm:py-3 text-left text-white transition-all duration-150 hover:bg-[#1DEE7F]/10 focus:outline-none focus:ring-2 focus:ring-[#1DEE7F]"
                  aria-label={`Insert ${ex.label} HTML example`}
                >
                  <span className="font-semibold text-[#1DEE7F] text-sm sm:text-base">{ex.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-white/90 mb-2">Capture mode</legend>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="captureMode"
              checked={captureMode === "pdf"}
              onChange={() => setCaptureMode("pdf")}
              className="mt-1 h-4 w-4 border-[#1DEE7F]/40 text-[#1DEE7F]"
            />
            <span>
              <span className="text-white font-medium">Standard PDF (fast)</span>
              <span className="block text-xs text-white/55">Maps to captureMode pdf (Playwright print PDF).</span>
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="radio"
              name="captureMode"
              checked={captureMode === "screenshot_pdf"}
              onChange={() => setCaptureMode("screenshot_pdf")}
              className="mt-1 h-4 w-4 border-[#1DEE7F]/40 text-[#1DEE7F]"
            />
            <span>
              <span className="text-white font-medium">Visual Capture</span>
              <span className="block text-xs text-white/55">
                Recommended for complex or JS-heavy sites — maps to captureMode screenshot_pdf.
              </span>
            </span>
          </label>
        </fieldset>

        <label className="block text-sm text-white/80">
          <span className="block mb-1 text-white/90 font-medium">API key (optional)</span>
          <input
            type="password"
            autoComplete="off"
            value={apiKeyInput}
            onChange={(e) => setApiKeyInput(e.target.value)}
            className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white placeholder:text-white/35"
            placeholder="Paste key to call api.fileslap.com directly (stored in this browser)"
          />
        </label>
      </div>

      <details className="mt-6 sm:mt-8 rounded-xl border border-[#1DEE7F]/20 bg-[#111217]/80 px-4 py-3 sm:px-5 sm:py-4 text-left max-w-5xl mx-auto">
        <summary className="cursor-pointer text-sm sm:text-base font-medium text-[#1DEE7F] select-none">
          Advanced options
        </summary>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block text-xs sm:text-sm text-white/70 sm:col-span-2 lg:col-span-3">
            <span className="block mb-1 text-white/90">Viewport</span>
            <select
              value={viewportPreset}
              onChange={(e) => setViewportPreset(e.target.value as ViewportPreset)}
              className="w-full max-w-md rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white"
            >
              <option value="default">Default (omit viewport — server defaults)</option>
              <option value="desktop">Desktop preset (1280×720)</option>
              <option value="mobile">Mobile preset (390×844)</option>
              <option value="custom">Custom width × height (px)</option>
            </select>
          </label>
          {viewportPreset === "custom" && (
            <>
              <label className="block text-xs sm:text-sm text-white/70">
                <span className="block mb-1 text-white/90">viewportWidth</span>
                <input
                  type="number"
                  min={320}
                  max={3840}
                  value={viewportWidth}
                  onChange={(e) => setViewportWidth(e.target.value)}
                  className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white"
                />
              </label>
              <label className="block text-xs sm:text-sm text-white/70">
                <span className="block mb-1 text-white/90">viewportHeight</span>
                <input
                  type="number"
                  min={320}
                  max={3840}
                  value={viewportHeight}
                  onChange={(e) => setViewportHeight(e.target.value)}
                  className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white"
                />
              </label>
            </>
          )}
          <label className="block text-xs sm:text-sm text-white/70">
            <span className="block mb-1 text-white/90">delayMs (0–10000)</span>
            <input
              type="number"
              min={0}
              max={10_000}
              value={delayMs}
              onChange={(e) => setDelayMs(e.target.value)}
              placeholder="ms before capture"
              className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white placeholder:text-white/35"
            />
          </label>
          <label className="block text-xs sm:text-sm text-white/70">
            <span className="block mb-1 text-white/90">mediaType</span>
            <select
              value={mediaType}
              onChange={(e) => setMediaType(e.target.value as "" | "print" | "screen")}
              className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white"
            >
              <option value="">Default (print)</option>
              <option value="print">print</option>
              <option value="screen">screen</option>
            </select>
          </label>
          <label className="block text-xs sm:text-sm text-white/70 sm:col-span-2 lg:col-span-3">
            <span className="block mb-1 text-white/90">hideSelectors (comma or newline separated)</span>
            <textarea
              value={hideSelectors}
              onChange={(e) => setHideSelectors(e.target.value)}
              rows={2}
              placeholder="#cookie-banner, .ads"
              className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white placeholder:text-white/35"
            />
          </label>
          <label className="block text-xs sm:text-sm text-white/70">
            <span className="block mb-1 text-white/90">waitForSelector</span>
            <input
              type="text"
              value={waitForSelector}
              onChange={(e) => setWaitForSelector(e.target.value)}
              className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white"
            />
          </label>
          <label className="block text-xs sm:text-sm text-white/70">
            <span className="block mb-1 text-white/90">timeout (ms, 1–30000)</span>
            <input
              type="number"
              min={1}
              max={30_000}
              value={timeoutMs}
              onChange={(e) => setTimeoutMs(e.target.value)}
              className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white"
            />
          </label>
          <label className="block text-xs sm:text-sm text-white/70">
            <span className="block mb-1 text-white/90">scale (0.1–2)</span>
            <input
              type="text"
              value={scale}
              onChange={(e) => setScale(e.target.value)}
              placeholder="optional"
              className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white placeholder:text-white/35"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-white/90">
            <input
              type="checkbox"
              checked={printBackground === true}
              onChange={(e) =>
                setPrintBackground(e.target.checked ? true : null)
              }
              className="h-4 w-4 rounded border-[#1DEE7F]/40 text-[#1DEE7F]"
            />
            Force printBackground true (omit when unchecked — server default true)
          </label>
          <label className="flex items-center gap-2 text-sm text-white/90 sm:col-span-2">
            <input
              type="checkbox"
              checked={preferCSSPageSize === true}
              onChange={(e) =>
                setPreferCSSPageSize(e.target.checked ? true : null)
              }
              className="h-4 w-4 rounded border-[#1DEE7F]/40 text-[#1DEE7F]"
            />
            preferCSSPageSize
          </label>
          <p className="text-xs text-white/45 sm:col-span-2 lg:col-span-3">
            Page layout (optional): same fields as the hosted API (format, margins, filename).
          </p>
          <label className="block text-xs sm:text-sm text-white/70">
            <span className="block mb-1 text-white/90">format</span>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white"
            >
              <option value="A4">A4</option>
              <option value="Letter">Letter</option>
            </select>
          </label>
          <label className="flex items-center gap-3 sm:col-span-2 lg:col-span-1 text-sm text-white/90 pt-2">
            <input
              type="checkbox"
              checked={landscape}
              onChange={(e) => setLandscape(e.target.checked)}
              className="h-4 w-4 rounded border-[#1DEE7F]/40 text-[#1DEE7F] focus:ring-[#1DEE7F]"
            />
            landscape
          </label>
          <label className="block text-xs sm:text-sm text-white/70">
            <span className="block mb-1 text-white/90">marginTop</span>
            <input
              type="text"
              value={marginTop}
              onChange={(e) => setMarginTop(e.target.value)}
              placeholder="e.g. 20 or 0.5in"
              className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white placeholder:text-white/35"
            />
          </label>
          <label className="block text-xs sm:text-sm text-white/70">
            <span className="block mb-1 text-white/90">marginRight</span>
            <input
              type="text"
              value={marginRight}
              onChange={(e) => setMarginRight(e.target.value)}
              className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white"
            />
          </label>
          <label className="block text-xs sm:text-sm text-white/70">
            <span className="block mb-1 text-white/90">marginBottom</span>
            <input
              type="text"
              value={marginBottom}
              onChange={(e) => setMarginBottom(e.target.value)}
              className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white"
            />
          </label>
          <label className="block text-xs sm:text-sm text-white/70">
            <span className="block mb-1 text-white/90">marginLeft</span>
            <input
              type="text"
              value={marginLeft}
              onChange={(e) => setMarginLeft(e.target.value)}
              className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white"
            />
          </label>
          <label className="block text-xs sm:text-sm text-white/70 sm:col-span-2">
            <span className="block mb-1 text-white/90">filename (optional)</span>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="my-export"
              className="w-full rounded-lg bg-[#0D0D11] border border-[#1DEE7F]/25 px-3 py-2 text-sm text-white placeholder:text-white/35"
            />
          </label>
        </div>
      </details>

      {error && (
        <div className="p-3 sm:p-4 rounded-lg bg-red-500/10 border border-red-500/20 mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm text-red-400 whitespace-pre-wrap">{error}</p>
          {suggestScreenshot && captureMode === "pdf" && (
            <p className="mt-2 text-xs sm:text-sm text-white/70">
              If layout looked wrong or the page is very dynamic, try{" "}
              <button
                type="button"
                className="text-[#1DEE7F] underline"
                onClick={() => {
                  setCaptureMode("screenshot_pdf");
                  setSuggestScreenshot(false);
                }}
              >
                Visual Capture (screenshot_pdf)
              </button>
              .
            </p>
          )}
          {(error.includes("Daily demo limit") || error.includes("demo limit")) && (
            <div className="mt-2 sm:mt-3">
              <a
                href="/signup"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#1DEE7F] hover:underline"
              >
                Get your free API key →
              </a>
            </div>
          )}
        </div>
      )}

      <div className="text-center mt-6 sm:mt-8">
        <button
          type="button"
          onClick={convert}
          disabled={loading || demoBlocked}
          className="rounded-full bg-[#1DEE7F] px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg font-semibold text-[#0D0D11] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition duration-200 shadow-lg hover:shadow-xl"
        >
          {loading ? <Spinner /> : demoBlocked ? "Daily demo limit" : "Convert to PDF"}
        </button>
        {demoBlocked && (
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-white/60">
            Add your API key above or come back tomorrow for three more demo conversions.
          </p>
        )}
      </div>

      {previewUrl && (
        <div className="mt-6 sm:mt-8">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 text-center">PDF ready</h3>
          <p className="text-center text-xs text-white/55 mb-3">
            Your browser should have started a download; preview below is optional.
          </p>
          <div className="w-full max-w-2xl mx-auto bg-[#111217] rounded-xl p-4 sm:p-6 border border-[#1DEE7F]/20">
            <div className="mb-3 sm:mb-4 text-center">
              <div className="relative">
                <iframe
                  src={previewUrl}
                  className="w-full h-48 sm:h-64 rounded-lg border border-[#1DEE7F]/10 hidden sm:block"
                  title="PDF Preview"
                />
                <div className="sm:hidden bg-[#0D0D11] rounded-lg border border-[#1DEE7F]/10 p-6 text-center">
                  <p className="text-sm text-white/80">Check your downloads folder for the PDF.</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() =>
                  triggerPdfDownload(
                    previewUrl,
                    downloadFilename(filename, pageUrl, sourceMode)
                  )
                }
                className="rounded-full bg-[#1DEE7F] px-4 sm:px-6 py-2 sm:py-3 font-medium text-[#0D0D11] hover:brightness-110 transition text-sm sm:text-base"
              >
                Download again
              </button>
              <button
                type="button"
                onClick={() => {
                  setPreviewUrl((prev) => {
                    if (prev) window.URL.revokeObjectURL(prev);
                    return null;
                  });
                }}
                className="ml-2 sm:ml-3 rounded-full border border-[#1DEE7F] px-4 sm:px-6 py-2 sm:py-3 font-medium text-white hover:bg-[#1DEE7F]/10 transition text-sm sm:text-base"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}