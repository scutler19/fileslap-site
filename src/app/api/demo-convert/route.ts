import { NextRequest, NextResponse } from "next/server";

const DAILY_LIMIT = 3;             // requests per day
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const hits = new Map<string, { count: number; date: string }>();

// Use environment variable for API key, fallback to hardcoded for demo
const DEMO_API_KEY = process.env.DEMO_API_KEY || "demo-unlimited-key-2024";

function getCurrentDate(): string {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
}

function getRemainingAttempts(ip: string): number {
  const record = hits.get(ip);
  if (!record) return DAILY_LIMIT;
  
  const currentDate = getCurrentDate();
  if (record.date !== currentDate) {
    // New day, reset count
    return DAILY_LIMIT;
  }
  
  return Math.max(0, DAILY_LIMIT - record.count);
}

export async function POST(req: NextRequest) {
  // --- Daily usage tracking ---
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "unknown";
  const currentDate = getCurrentDate();
  
  const record = hits.get(ip) ?? { count: 0, date: currentDate };
  
  // Reset count if it's a new day
  if (record.date !== currentDate) {
    record.count = 0;
    record.date = currentDate;
  }
  
  const remainingAttempts = getRemainingAttempts(ip);

  // --- Forward HTML to FileSlap API ---
  const { html } = await req.json();
  if (!html) {
    return NextResponse.json({ error: "html is required" }, { status: 400 });
  }

  // Handle check request (for getting remaining attempts)
  if (html === "check") {
    return NextResponse.json(
      { remainingAttempts },
      { 
        status: 200,
        headers: {
          "X-Remaining-Attempts": remainingAttempts.toString(),
        }
      }
    );
  }

  if (remainingAttempts <= 0) {
    return NextResponse.json(
      { 
        error: "Daily demo limit reached. You've used all 3 free attempts for today. Get your own API key to continue converting PDFs!",
        remainingAttempts: 0
      },
      { status: 429 }
    );
  }

  try {
    console.log(`Attempting to call FileSlap API for IP ${ip} (${remainingAttempts} attempts remaining)...`);
    
    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Request timeout")), 15000)
    );

    // Use the provided API key for the demo
    const apiPromise = fetch("https://api.fileslap.com/api/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": DEMO_API_KEY,
      },
      body: JSON.stringify({ html }),
    });

    // Race between the API call and timeout
    const apiRes = await Promise.race([apiPromise, timeoutPromise]) as Response;

    console.log("API response status:", apiRes.status);

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      console.error("API error response:", errorText);
      return NextResponse.json(
        { error: `API error: ${apiRes.status} - ${errorText}` },
        { status: 502 }
      );
    }

    // Increment usage count after successful conversion
    record.count += 1;
    hits.set(ip, record);

    // The API returns the PDF directly
    const pdf = await apiRes.arrayBuffer();
    console.log(`PDF downloaded successfully, size: ${pdf.byteLength} bytes`);
    
    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="fileslap-demo.pdf"',
        "X-Remaining-Attempts": (remainingAttempts - 1).toString(),
      },
    });
  } catch (error) {
    console.error("Demo conversion error:", error);
    
    if (error instanceof Error && error.message === "Request timeout") {
      return NextResponse.json(
        { error: "Conversion service is taking too long. Please try again." },
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { error: "Conversion service unavailable. Please try again later." },
      { status: 503 }
    );
  }
} 