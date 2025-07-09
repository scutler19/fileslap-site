"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
        // If there&apos;s an error, assume 3 attempts remaining
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
    <section className="w-full max-w-5xl mx-auto mt-24 px-6">
      <div className="text-center mb-16">
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

      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Textarea */}
        <div className="flex-1 w-full">
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            rows={12}
            className="w-full rounded-xl bg-[#111217] p-6 text-sm text-white/90 outline-none focus:ring-2 focus:ring-[#1DEE7F] border border-[#1DEE7F]/20 transition-all duration-200"
            placeholder="Paste your HTML here..."
          />
        </div>
        {/* Example Tiles */}
        <div className="w-full md:w-72 flex flex-col gap-4 mt-6 md:mt-0">
          <div className="mb-2 text-white/70 text-sm font-medium text-center md:text-left">Need an example? Try one of these:</div>
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => setHtml(ex.html)}
              className="rounded-lg bg-[#111217] border border-[#1DEE7F]/30 hover:border-[#1DEE7F] shadow-sm px-4 py-3 text-left text-white transition-all duration-150 hover:bg-[#1DEE7F]/10 focus:outline-none focus:ring-2 focus:ring-[#1DEE7F]"
              aria-label={`Insert ${ex.label} HTML example`}
            >
              <span className="font-semibold text-[#1DEE7F]">{ex.label}</span>
            </button>
          ))}
        </div>
      </div>

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
              Get your own API key for more conversions
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
    </section>
  );
} 