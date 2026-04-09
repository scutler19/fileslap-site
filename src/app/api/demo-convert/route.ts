import { NextRequest, NextResponse } from "next/server";

const DAILY_LIMIT = 3;
const hits = new Map<string, { count: number; date: string }>();

const DEMO_API_KEY = process.env.DEMO_API_KEY || "demo-unlimited-key-2024";

/** Matches html2pdf-service `DELAY_MS_MAX`. */
const DELAY_MS_MAX = 10_000;

function getCurrentDate(): string {
  return new Date().toISOString().split("T")[0];
}

function getRemainingAttempts(ip: string): number {
  const record = hits.get(ip);
  if (!record) return DAILY_LIMIT;

  const currentDate = getCurrentDate();
  if (record.date !== currentDate) {
    return DAILY_LIMIT;
  }

  return Math.max(0, DAILY_LIMIT - record.count);
}

function coerceMargin(value: unknown): string | number | undefined {
  if (value === undefined || value === null) return undefined;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value !== "string") return undefined;
  const t = value.trim();
  if (!t) return undefined;
  const n = Number(t);
  if (Number.isFinite(n) && String(n) === t) return n;
  return t;
}

function coerceDelayMs(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  let n: number;
  if (typeof value === "number") {
    n = value;
  } else if (typeof value === "string") {
    const t = value.trim();
    if (!t) return undefined;
    n = Number(t);
  } else {
    throw new Error("delayMs");
  }
  if (!Number.isFinite(n) || n < 0) throw new Error("delayMs");
  return Math.min(Math.floor(n), DELAY_MS_MAX);
}

function buildForwardBody(raw: Record<string, unknown>): { ok: true; body: Record<string, unknown> } | { ok: false; error: string } {
  const html = raw.html;
  if (typeof html !== "string" || html.length === 0) {
    return { ok: false, error: "html is required" };
  }

  if (html === "check") {
    return { ok: true, body: { html: "check" } };
  }

  const body: Record<string, unknown> = { html };

  if (raw.format !== undefined && raw.format !== null && raw.format !== "") {
    if (typeof raw.format !== "string") {
      return { ok: false, error: "format must be a string" };
    }
    const f = raw.format.trim();
    if (f.length > 64) {
      return { ok: false, error: "format is too long" };
    }
    if (f) body.format = f;
  }

  if (raw.landscape === true || raw.landscape === "true") {
    body.landscape = true;
  } else if (raw.landscape !== undefined && raw.landscape !== null && raw.landscape !== false && raw.landscape !== "false") {
    return { ok: false, error: "landscape must be a boolean" };
  }

  for (const key of ["marginTop", "marginRight", "marginBottom", "marginLeft"] as const) {
    if (raw[key] === undefined || raw[key] === null || raw[key] === "") continue;
    const m = coerceMargin(raw[key]);
    if (m === undefined) {
      return { ok: false, error: `Invalid ${key}` };
    }
    body[key] = m;
  }

  try {
    const delay = coerceDelayMs(raw.delayMs);
    if (delay !== undefined) body.delayMs = delay;
  } catch {
    return { ok: false, error: "delayMs must be a non-negative number (milliseconds, capped at 10000)" };
  }

  if (raw.filename !== undefined && raw.filename !== null && String(raw.filename).trim() !== "") {
    if (typeof raw.filename !== "string") {
      return { ok: false, error: "filename must be a string" };
    }
    body.filename = raw.filename.trim().slice(0, 200);
  }

  return { ok: true, body };
}

function attachmentFilename(filenameField: unknown): string {
  if (typeof filenameField !== "string" || !filenameField.trim()) {
    return "fileslap-demo.pdf";
  }
  const base = filenameField
    .replace(/\.pdf$/i, "")
    .replace(/[^a-zA-Z0-9-_]/g, "")
    .slice(0, 120);
  return base ? `${base}.pdf` : "fileslap-demo.pdf";
}

export async function POST(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "unknown";
  const currentDate = getCurrentDate();

  const record = hits.get(ip) ?? { count: 0, date: currentDate };

  if (record.date !== currentDate) {
    record.count = 0;
    record.date = currentDate;
  }

  const remainingAttempts = getRemainingAttempts(ip);

  let rawJson: unknown;
  try {
    rawJson = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (rawJson === null || typeof rawJson !== "object" || Array.isArray(rawJson)) {
    return NextResponse.json({ error: "Request body must be a JSON object" }, { status: 400 });
  }

  const built = buildForwardBody(rawJson as Record<string, unknown>);
  if (!built.ok) {
    return NextResponse.json({ error: built.error }, { status: 400 });
  }

  const { body } = built;

  if (body.html === "check") {
    return NextResponse.json(
      { remainingAttempts },
      {
        status: 200,
        headers: {
          "X-Remaining-Attempts": remainingAttempts.toString(),
        },
      }
    );
  }

  if (remainingAttempts <= 0) {
    return NextResponse.json(
      {
        error:
          "Daily demo limit reached. You've used all 3 free attempts for today. Get your own API key to continue converting PDFs!",
        remainingAttempts: 0,
      },
      { status: 429 }
    );
  }

  const downloadName = attachmentFilename(body.filename);

  try {
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Request timeout")), 15_000)
    );

    const apiPromise = fetch("https://api.fileslap.com/api/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": DEMO_API_KEY,
      },
      body: JSON.stringify(body),
    });

    const apiRes = await Promise.race([apiPromise, timeoutPromise]);

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      return NextResponse.json(
        { error: `API error: ${apiRes.status} - ${errorText}` },
        { status: 502 }
      );
    }

    record.count += 1;
    hits.set(ip, record);

    const pdf = await apiRes.arrayBuffer();

    return new NextResponse(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${downloadName}"`,
        "X-Remaining-Attempts": (remainingAttempts - 1).toString(),
      },
    });
  } catch (error) {
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
