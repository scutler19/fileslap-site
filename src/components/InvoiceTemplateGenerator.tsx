"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import type { InvoiceData, InvoiceTemplateId, LineItem } from "@/lib/invoice-types";
import {
  invoiceGrandTotal,
  renderInvoiceHtml,
} from "@/lib/invoice-templates";
import Features from "@/components/Features";
import { getStoredFileSlapApiKey } from "@/lib/fs-api-key";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function dueDefaultISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
}

const emptyLine: LineItem = { description: "", quantity: 1, rate: 0 };

const defaultData: InvoiceData = {
  companyName: "",
  companyEmail: "",
  companyAddress: "",
  clientName: "",
  clientEmail: "",
  clientAddress: "",
  invoiceNumber: "INV-001",
  invoiceDate: todayISO(),
  dueDate: dueDefaultISO(),
  items: [{ ...emptyLine }],
  notes: "",
};

type FormSection =
  | "company"
  | "client"
  | "invoice"
  | "items"
  | "notes";

const sections: { id: FormSection; label: string }[] = [
  { id: "company", label: "Your Company" },
  { id: "client", label: "Client" },
  { id: "invoice", label: "Invoice Info" },
  { id: "items", label: "Line Items" },
  { id: "notes", label: "Notes" },
];

const templates: { id: InvoiceTemplateId; label: string }[] = [
  { id: "modern", label: "Modern" },
  { id: "minimal", label: "Minimal" },
  { id: "corporate", label: "Corporate" },
];

function formatUsd(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

export default function InvoiceTemplateGenerator() {
  const [template, setTemplate] = useState<InvoiceTemplateId>("modern");
  const [data, setData] = useState<InvoiceData>(defaultData);
  const [section, setSection] = useState<FormSection>("company");
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const previewHtml = useMemo(
    () => renderInvoiceHtml(template, data),
    [template, data]
  );

  const total = useMemo(() => invoiceGrandTotal(data.items), [data.items]);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 6000);
  }, []);

  const updateData = useCallback(<K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
  }, []);

  const updateItem = useCallback((index: number, patch: Partial<LineItem>) => {
    setData((d) => {
      const items = d.items.map((it, i) =>
        i === index ? { ...it, ...patch } : it
      );
      return { ...d, items };
    });
  }, []);

  const addItem = useCallback(() => {
    setData((d) => ({ ...d, items: [...d.items, { ...emptyLine }] }));
  }, []);

  const removeItem = useCallback((index: number) => {
    setData((d) => {
      if (d.items.length <= 1) return d;
      return { ...d, items: d.items.filter((_, i) => i !== index) };
    });
  }, []);

  const downloadPdf = useCallback(async () => {
    const html = renderInvoiceHtml(template, data);
    setDownloading(true);
    try {
      const apiKey = getStoredFileSlapApiKey();
      let res: Response;

      if (apiKey) {
        try {
          res = await fetch("https://api.fileslap.com/api/convert", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": apiKey,
            },
            body: JSON.stringify({ html }),
          });
        } catch {
          res = await fetch("/api/demo-convert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ html }),
          });
        }
      } else {
        res = await fetch("/api/demo-convert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ html }),
        });
      }

      if (!res.ok) {
        let msg =
          "Couldn’t generate your PDF. Get a free FileSlap API key for reliable, unlimited conversions in your own apps.";
        try {
          const j = (await res.json()) as { error?: string };
          if (j.error) msg = `${j.error} Get a free API key to keep generating PDFs without limits.`;
        } catch {
          /* use default */
        }
        showToast(msg);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const safe = (data.invoiceNumber || "invoice").replace(/[^\w.-]+/g, "-");
      a.download = `${safe}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      showToast(
        "Something went wrong while contacting the conversion service. Grab a free API key from FileSlap and try again—or use your key for direct API access."
      );
    } finally {
      setDownloading(false);
    }
  }, [data, showToast, template]);

  return (
    <div className="w-full">
      {toast && (
        <div
          className="fixed bottom-6 left-4 right-4 z-50 mx-auto max-w-lg rounded-xl border border-red-500/30 bg-[#1a0a0a] px-4 py-3 text-sm text-red-200 shadow-lg sm:left-auto sm:right-6 sm:mx-0"
          role="status"
        >
          {toast}
        </div>
      )}

      <div className="mx-auto max-w-6xl px-6">
        <section className="border-b border-[#1DEE7F]/10 pb-12 pt-12 text-center sm:pb-14 sm:pt-16">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
            Create professional invoices in seconds
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            Pick a template, fill in the details, and download a print-ready PDF—powered by{" "}
            <span className="text-[#1DEE7F]">FileSlap&apos;s HTML to PDF API</span>.
          </p>
        </section>

        <section className="py-12 sm:py-16">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-wider text-[#1DEE7F]/80">
            Template
          </p>
          <div className="mb-12 flex flex-wrap justify-center gap-2 sm:mb-14 sm:gap-3">
            {templates.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplate(t.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  template === t.id
                    ? "bg-[#1DEE7F] text-[#0D0D11] shadow-md shadow-[#1DEE7F]/20"
                    : "border border-[#1DEE7F]/35 bg-[#111217] text-white/85 hover:border-[#1DEE7F]/60 hover:bg-[#1DEE7F]/5"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div className="rounded-2xl border border-[#1DEE7F]/20 bg-[#111217] p-6 sm:p-8">
              <h2 className="mb-1 text-lg font-semibold text-white">Invoice details</h2>
              <p className="mb-6 text-sm text-white/50">
                Use the tabs to edit each section—only one is shown at a time to keep the form compact.
              </p>
              <div className="mb-6 flex flex-wrap gap-2 border-b border-[#1DEE7F]/10 pb-5">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSection(s.id)}
                    className={`rounded-full px-3.5 py-2 text-xs font-semibold transition sm:text-sm ${
                      section === s.id
                        ? "bg-[#1DEE7F]/15 text-[#1DEE7F] ring-1 ring-[#1DEE7F]/45"
                        : "bg-[#0D0D11] text-white/55 hover:text-white/90"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              <div className="space-y-5 text-left">
              {section === "company" && (
                <>
                  <Field
                    label="Company name"
                    value={data.companyName}
                    onChange={(v) => updateData("companyName", v)}
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={data.companyEmail}
                    onChange={(v) => updateData("companyEmail", v)}
                  />
                  <Area
                    label="Address"
                    value={data.companyAddress}
                    onChange={(v) => updateData("companyAddress", v)}
                    rows={3}
                  />
                </>
              )}

              {section === "client" && (
                <>
                  <Field
                    label="Client name"
                    value={data.clientName}
                    onChange={(v) => updateData("clientName", v)}
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={data.clientEmail}
                    onChange={(v) => updateData("clientEmail", v)}
                  />
                  <Area
                    label="Address"
                    value={data.clientAddress}
                    onChange={(v) => updateData("clientAddress", v)}
                    rows={3}
                  />
                </>
              )}

              {section === "invoice" && (
                <>
                  <Field
                    label="Invoice number"
                    value={data.invoiceNumber}
                    onChange={(v) => updateData("invoiceNumber", v)}
                  />
                  <Field
                    label="Invoice date"
                    type="date"
                    value={data.invoiceDate}
                    onChange={(v) => updateData("invoiceDate", v)}
                  />
                  <Field
                    label="Due date"
                    type="date"
                    value={data.dueDate}
                    onChange={(v) => updateData("dueDate", v)}
                  />
                </>
              )}

              {section === "items" && (
                <div className="space-y-5">
                  {data.items.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl border border-[#1DEE7F]/15 bg-[#0D0D11] p-5"
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wide text-[#1DEE7F]/90">
                          Item {index + 1}
                        </span>
                        {data.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-xs text-red-400 hover:underline"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <Field
                        label="Description"
                        value={item.description}
                        onChange={(v) => updateItem(index, { description: v })}
                      />
                      <div className="mt-3 grid grid-cols-2 gap-3">
                        <Field
                          label="Qty"
                          type="number"
                          min={0}
                          step="any"
                          value={String(item.quantity)}
                          onChange={(v) => {
                            const n = Number(v);
                            updateItem(index, {
                              quantity: v === "" || !Number.isFinite(n) ? 0 : n,
                            });
                          }}
                        />
                        <Field
                          label="Rate (USD)"
                          type="number"
                          min={0}
                          step="0.01"
                          value={String(item.rate)}
                          onChange={(v) => {
                            const n = Number(v);
                            updateItem(index, {
                              rate: v === "" || !Number.isFinite(n) ? 0 : n,
                            });
                          }}
                        />
                      </div>
                      <p className="mt-2 text-right text-sm text-white/60">
                        Line total:{" "}
                        <span className="font-semibold text-[#1DEE7F]">
                          {formatUsd(
                            (Number.isFinite(item.quantity) ? item.quantity : 0) *
                              (Number.isFinite(item.rate) ? item.rate : 0)
                          )}
                        </span>
                      </p>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addItem}
                    className="w-full rounded-full border border-dashed border-[#1DEE7F]/45 py-3 text-sm font-semibold text-[#1DEE7F] transition hover:bg-[#1DEE7F]/10"
                  >
                    + Add item
                  </button>
                  <div className="rounded-xl border border-[#1DEE7F]/30 bg-[#0e1912] px-5 py-4 text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
                      Invoice total
                    </p>
                    <p className="mt-1 text-2xl font-bold text-[#1DEE7F] sm:text-3xl">
                      {formatUsd(total)}
                    </p>
                  </div>
                </div>
              )}

              {section === "notes" && (
                <Area
                  label="Notes / terms (optional)"
                  value={data.notes}
                  onChange={(v) => updateData("notes", v)}
                  rows={5}
                />
              )}
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl border border-[#1DEE7F]/20 bg-[#111217] shadow-xl shadow-black/20">
                <div className="flex flex-col gap-4 border-b border-[#1DEE7F]/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
                  <div>
                    <p className="text-sm font-semibold text-white">Live preview</p>
                    <p className="mt-0.5 text-xs text-white/45">
                      Updates as you type. PDF output matches this view.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={downloadPdf}
                    disabled={downloading}
                    className="w-full shrink-0 rounded-full bg-[#1DEE7F] px-7 py-3 text-sm font-semibold text-[#0D0D11] shadow-md transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-3.5 sm:text-base"
                  >
                    {downloading ? "Generating PDF…" : "Download PDF"}
                  </button>
                </div>
                <div className="bg-[#e2e8f0] p-2 sm:p-3">
                  <iframe
                    title="Invoice preview"
                    srcDoc={previewHtml}
                    className="h-[min(640px,68vh)] w-full rounded-lg bg-white shadow-inner sm:h-[min(720px,72vh)]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#1DEE7F]/10 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl rounded-2xl border border-[#1DEE7F]/25 bg-[#111217] px-8 py-10 text-center sm:px-12 sm:py-12">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Need this in your app?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-white/75">
              FileSlap&apos;s API converts any HTML to a pixel-perfect PDF in under 2 seconds.
              Start free with 50 pages/month.
            </p>
            <Link
              href="/signup"
              className="mt-8 inline-flex rounded-full bg-[#1DEE7F] px-8 py-3.5 text-base font-semibold text-[#0D0D11] transition hover:brightness-110"
            >
              Get Free API Key
            </Link>
          </div>
        </section>
      </div>

      <div className="border-t border-[#1DEE7F]/10 pt-4">
        <Features />
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  min,
  step,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  min?: number;
  step?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-white/80">
        {label}
      </span>
      <input
        type={type}
        min={min}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[#1DEE7F]/30 bg-[#0D0D11] px-3 py-2.5 text-white placeholder-white/40 focus:border-[#1DEE7F] focus:outline-none"
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-white/80">
        {label}
      </span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded-lg border border-[#1DEE7F]/30 bg-[#0D0D11] px-3 py-2.5 text-white placeholder-white/40 focus:border-[#1DEE7F] focus:outline-none"
      />
    </label>
  );
}
