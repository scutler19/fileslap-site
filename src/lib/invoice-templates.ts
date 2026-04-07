import type { InvoiceData, LineItem } from "@/lib/invoice-types";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Human-readable date for invoices (expects YYYY-MM-DD from forms). */
function formatDisplayDate(value: string): string {
  const v = value.trim();
  if (!v) return "—";
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) {
    const d = new Date(`${v}T12:00:00`);
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
    }
  }
  return v;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function lineAmount(item: LineItem): number {
  const q = Number.isFinite(item.quantity) ? item.quantity : 0;
  const r = Number.isFinite(item.rate) ? item.rate : 0;
  return q * r;
}

function grandTotal(items: LineItem[]): number {
  return items.reduce((sum, it) => sum + lineAmount(it), 0);
}

export function invoiceGrandTotal(items: LineItem[]): number {
  return grandTotal(items);
}

function rowsHtml(
  items: LineItem[],
  rowRender: (desc: string, qty: string, rate: string, amt: string) => string
): string {
  return items
    .map((it) => {
      const desc = escapeHtml(it.description);
      const qty = escapeHtml(String(it.quantity));
      const rate = formatCurrency(Number.isFinite(it.rate) ? it.rate : 0);
      const amt = formatCurrency(lineAmount(it));
      return rowRender(desc, qty, rate, amt);
    })
    .join("");
}

function metaRowsHtml(
  invoiceNumber: string,
  issueDate: string,
  dueDate: string
): string {
  const inv = escapeHtml(invoiceNumber || "—");
  const iss = escapeHtml(formatDisplayDate(issueDate));
  const due = escapeHtml(formatDisplayDate(dueDate));
  return `
    <div class="meta-line"><span class="meta-lbl">Invoice #</span><span class="meta-val">${inv}</span></div>
    <div class="meta-line"><span class="meta-lbl">Issue date</span><span class="meta-val">${iss}</span></div>
    <div class="meta-line"><span class="meta-lbl">Due date</span><span class="meta-val">${due}</span></div>`;
}

export function renderModernInvoice(data: InvoiceData): string {
  const c = {
    companyName: escapeHtml(data.companyName),
    companyEmail: escapeHtml(data.companyEmail),
    companyAddress: escapeHtml(data.companyAddress).replace(/\n/g, "<br/>"),
    clientName: escapeHtml(data.clientName),
    clientEmail: escapeHtml(data.clientEmail),
    clientAddress: escapeHtml(data.clientAddress).replace(/\n/g, "<br/>"),
    invoiceNumber: data.invoiceNumber,
    invoiceDate: data.invoiceDate,
    dueDate: data.dueDate,
    notes: escapeHtml(data.notes).replace(/\n/g, "<br/>"),
  };
  const total = formatCurrency(grandTotal(data.items));
  const totalVal = escapeHtml(total);
  const bodyRows = rowsHtml(
    data.items,
    (desc, qty, rate, amt) =>
      `<tr><td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;vertical-align:top;">${desc || "—"}</td><td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;text-align:right;white-space:nowrap;">${qty}</td><td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;text-align:right;white-space:nowrap;">${rate}</td><td style="padding:14px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;white-space:nowrap;">${amt}</td></tr>`
  );
  const metaBlock = metaRowsHtml(
    c.invoiceNumber,
    c.invoiceDate,
    c.dueDate
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Invoice ${escapeHtml(c.invoiceNumber || "")}</title>
<style>
  * { box-sizing: border-box; }
  body { margin:0; padding:48px 44px 56px; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#0f172a; background:#fff; font-size:14px; line-height:1.55; }
  .top { display:flex; justify-content:space-between; align-items:flex-start; gap:32px; margin-bottom:40px; padding-bottom:28px; border-bottom:1px solid #e2e8f0; }
  .co { font-size:28px; font-weight:700; letter-spacing:-0.03em; color:#0D0D11; line-height:1.2; max-width:55%; }
  .co-sub { margin-top:8px; font-size:13px; font-weight:500; color:#64748b; }
  .invoice-head { text-align:right; flex-shrink:0; }
  .badge { display:inline-block; background:#1DEE7F; color:#0D0D11; font-weight:800; font-size:11px; letter-spacing:0.14em; padding:9px 16px; border-radius:6px; }
  .meta-stack { margin-top:16px; font-size:13px; }
  .meta-line { display:flex; justify-content:flex-end; align-items:baseline; gap:14px; margin-top:6px; }
  .meta-lbl { color:#64748b; min-width:88px; text-align:right; }
  .meta-val { font-weight:600; color:#0f172a; min-width:140px; text-align:right; }
  .grid2 { display:grid; grid-template-columns:1fr 1fr; gap:32px; margin-bottom:36px; }
  .lbl { font-size:10px; font-weight:700; letter-spacing:0.1em; color:#1DEE7F; margin-bottom:10px; }
  .box { border:1px solid rgba(29,238,127,0.4); border-radius:12px; padding:18px 20px; background:linear-gradient(180deg,#fafafa 0%,#fff 100%); min-height:120px; }
  .box strong { font-size:15px; color:#0f172a; }
  .box .muted { color:#64748b; margin-top:8px; font-size:13px; line-height:1.5; }
  .section-title { font-size:11px; font-weight:700; letter-spacing:0.08em; color:#64748b; text-transform:uppercase; margin-bottom:12px; }
  table.inv { width:100%; border-collapse:collapse; margin-top:4px; }
  table.inv th { text-align:left; background:#0f172a; color:#fff; font-size:10px; letter-spacing:0.07em; text-transform:uppercase; padding:14px 12px; font-weight:600; }
  table.inv th:nth-child(n+2) { text-align:right; }
  table.inv tbody tr:last-child td { border-bottom:none; }
  .totals { margin-top:28px; display:flex; flex-direction:column; align-items:flex-end; }
  .due { background:#1DEE7F; color:#0D0D11; font-weight:800; font-size:17px; padding:16px 24px; border-radius:10px; min-width:280px; text-align:right; }
  .notes { margin-top:32px; padding-top:24px; border-top:1px solid #e2e8f0; color:#475569; font-size:13px; line-height:1.6; }
  .foot { margin-top:40px; padding-top:20px; border-top:1px solid #e2e8f0; font-size:12px; color:#94a3b8; text-align:center; }
</style>
</head>
<body>
  <div class="top">
    <div>
      <div class="co">${c.companyName || "Your company name"}</div>
      ${data.companyEmail ? `<div class="co-sub">${c.companyEmail}</div>` : ""}
    </div>
    <div class="invoice-head">
      <span class="badge">INVOICE</span>
      <div class="meta-stack">${metaBlock}</div>
    </div>
  </div>

  <div class="section-title">Parties</div>
  <div class="grid2">
    <div>
      <div class="lbl">FROM</div>
      <div class="box">
        <strong>${c.companyName || "—"}</strong>
        ${c.companyEmail ? `<div class="muted">${c.companyEmail}</div>` : ""}
        ${c.companyAddress ? `<div class="muted">${c.companyAddress}</div>` : ""}
      </div>
    </div>
    <div>
      <div class="lbl">BILL TO</div>
      <div class="box">
        <strong>${c.clientName || "Client name"}</strong>
        ${c.clientEmail ? `<div class="muted">${c.clientEmail}</div>` : ""}
        ${c.clientAddress ? `<div class="muted">${c.clientAddress}</div>` : ""}
      </div>
    </div>
  </div>

  <div class="section-title">Line items</div>
  <table class="inv">
    <thead><tr><th>Description</th><th style="text-align:right;">Qty</th><th style="text-align:right;">Rate</th><th style="text-align:right;">Amount</th></tr></thead>
    <tbody>${bodyRows}</tbody>
  </table>

  <div class="totals">
    <div class="due">Amount due &nbsp; ${totalVal}</div>
  </div>

  ${data.notes.trim() ? `<div class="notes"><div class="lbl" style="margin-bottom:8px;">Notes &amp; terms</div>${c.notes}</div>` : ""}

  <div class="foot">Thank you for your business.${data.companyEmail ? ` Questions? Contact us at ${c.companyEmail}.` : ""}</div>
</body>
</html>`;
}

export function renderMinimalInvoice(data: InvoiceData): string {
  const c = {
    companyName: escapeHtml(data.companyName),
    companyEmail: escapeHtml(data.companyEmail),
    companyAddress: escapeHtml(data.companyAddress).replace(/\n/g, "<br/>"),
    clientName: escapeHtml(data.clientName),
    clientEmail: escapeHtml(data.clientEmail),
    clientAddress: escapeHtml(data.clientAddress).replace(/\n/g, "<br/>"),
    invoiceNumber: data.invoiceNumber,
    invoiceDate: data.invoiceDate,
    dueDate: data.dueDate,
    notes: escapeHtml(data.notes).replace(/\n/g, "<br/>"),
  };
  const total = formatCurrency(grandTotal(data.items));
  const totalVal = escapeHtml(total);
  const metaBlock = metaRowsHtml(
    c.invoiceNumber,
    c.invoiceDate,
    c.dueDate
  );
  const bodyRows = rowsHtml(
    data.items,
    (desc, qty, rate, amt) =>
      `<tr><td style="padding:16px 0;border-bottom:1px solid #e5e5e5;vertical-align:top;font-family:Georgia,'Times New Roman',serif;">${desc || "—"}</td><td style="padding:16px 0;border-bottom:1px solid #e5e5e5;text-align:right;font-family:Georgia,serif;white-space:nowrap;">${qty}</td><td style="padding:16px 0;border-bottom:1px solid #e5e5e5;text-align:right;font-family:Georgia,serif;white-space:nowrap;">${rate}</td><td style="padding:16px 0;border-bottom:1px solid #e5e5e5;text-align:right;font-weight:600;font-family:Georgia,serif;white-space:nowrap;">${amt}</td></tr>`
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Invoice ${escapeHtml(c.invoiceNumber || "")}</title>
<style>
  * { box-sizing: border-box; }
  body { margin:0; padding:52px 48px 60px; font-family: Georgia, 'Times New Roman', serif; color:#1c1917; background:#fff; font-size:15px; line-height:1.65; }
  .letterhead { display:flex; justify-content:space-between; align-items:flex-start; gap:40px; margin-bottom:40px; padding-bottom:32px; border-bottom:1px solid #d6d3d1; }
  .brand { max-width:50%; }
  .brand-name { font-size:22px; font-weight:600; letter-spacing:-0.02em; color:#1c1917; }
  .brand-contact { margin-top:10px; font-size:13px; color:#78716c; line-height:1.5; }
  .invoice-head { text-align:right; flex-shrink:0; }
  .inv-title { margin:0; font-size:36px; font-weight:400; letter-spacing:0.06em; color:#1c1917; }
  .meta-stack { margin-top:18px; font-size:13px; font-family: ui-sans-serif, system-ui, sans-serif; }
  .meta-line { display:flex; justify-content:flex-end; gap:16px; margin-top:7px; }
  .meta-lbl { color:#a8a29e; min-width:72px; text-align:right; }
  .meta-val { font-weight:600; color:#44403c; min-width:130px; text-align:right; }
  hr.rule { border:none; border-top:1px solid #d6d3d1; margin:32px 0; }
  .pair { display:grid; grid-template-columns:1fr 1fr; gap:48px; }
  .h { font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:#a8a29e; margin-bottom:12px; font-family: ui-sans-serif, system-ui, sans-serif; }
  .party-name { font-weight:600; font-size:16px; color:#1c1917; }
  .muted { color:#57534e; margin-top:10px; font-size:14px; line-height:1.55; }
  .items-label { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:#a8a29e; margin-bottom:4px; font-family: ui-sans-serif, system-ui, sans-serif; }
  table { width:100%; border-collapse:collapse; }
  th { text-align:left; font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:#78716c; font-weight:500; padding:12px 0 14px 0; border-bottom:2px solid #1c1917; font-family: ui-sans-serif, system-ui, sans-serif; }
  th:nth-child(n+2) { text-align:right; }
  .sum-wrap { margin-top:36px; text-align:right; padding-top:24px; border-top:1px solid #d6d3d1; }
  .sum-label { font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#a8a29e; font-family: ui-sans-serif, system-ui, sans-serif; }
  .sum-amt { font-size:26px; font-weight:600; color:#1c1917; margin-top:8px; }
  .notes { margin-top:40px; padding-top:28px; border-top:1px solid #e7e5e4; color:#57534e; font-size:14px; line-height:1.65; }
  .foot { margin-top:44px; text-align:center; font-size:12px; color:#a8a29e; font-style:italic; font-family: Georgia, serif; }
</style>
</head>
<body>
  <div class="letterhead">
    <div class="brand">
      <div class="brand-name">${c.companyName || "Your company"}</div>
      ${c.companyEmail || c.companyAddress ? `<div class="brand-contact">${[c.companyEmail, c.companyAddress].filter(Boolean).join("<br/>")}</div>` : ""}
    </div>
    <div class="invoice-head">
      <h1 class="inv-title">INVOICE</h1>
      <div class="meta-stack">${metaBlock}</div>
    </div>
  </div>

  <div class="pair">
    <div>
      <div class="h">Bill from</div>
      <div class="party-name">${c.companyName || "—"}</div>
      <div class="muted">${[c.companyEmail, c.companyAddress].filter(Boolean).join("<br/>") || "—"}</div>
    </div>
    <div>
      <div class="h">Bill to</div>
      <div class="party-name">${c.clientName || "—"}</div>
      <div class="muted">${[c.clientEmail, c.clientAddress].filter(Boolean).join("<br/>") || "—"}</div>
    </div>
  </div>

  <hr class="rule"/>

  <div class="items-label">Services</div>
  <table>
    <thead><tr><th>Description</th><th style="text-align:right;">Qty</th><th style="text-align:right;">Rate</th><th style="text-align:right;">Amount</th></tr></thead>
    <tbody>${bodyRows}</tbody>
  </table>

  <div class="sum-wrap">
    <div class="sum-label">Amount due</div>
    <div class="sum-amt">${totalVal}</div>
  </div>

  ${data.notes.trim() ? `<div class="notes"><div class="h">Notes</div>${c.notes}</div>` : ""}

  <div class="foot">Thank you for your business.</div>
</body>
</html>`;
}

export function renderCorporateInvoice(data: InvoiceData): string {
  const c = {
    companyName: escapeHtml(data.companyName),
    companyEmail: escapeHtml(data.companyEmail),
    companyAddress: escapeHtml(data.companyAddress).replace(/\n/g, "<br/>"),
    clientName: escapeHtml(data.clientName),
    clientEmail: escapeHtml(data.clientEmail),
    clientAddress: escapeHtml(data.clientAddress).replace(/\n/g, "<br/>"),
    invoiceNumber: data.invoiceNumber,
    invoiceDate: data.invoiceDate,
    dueDate: data.dueDate,
    notes: escapeHtml(data.notes).replace(/\n/g, "<br/>"),
  };
  const total = formatCurrency(grandTotal(data.items));
  const totalVal = escapeHtml(total);
  const metaBlock = metaRowsHtml(
    c.invoiceNumber,
    c.invoiceDate,
    c.dueDate
  );
  const bodyRows = data.items
    .map((it, i) => {
      const desc = escapeHtml(it.description);
      const qty = escapeHtml(String(it.quantity));
      const rate = formatCurrency(Number.isFinite(it.rate) ? it.rate : 0);
      const amt = formatCurrency(lineAmount(it));
      const bg = i % 2 === 0 ? "#f8fafc" : "#ffffff";
      return `<tr style="background:${bg};"><td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;vertical-align:top;">${desc || "—"}</td><td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:right;white-space:nowrap;">${qty}</td><td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:right;white-space:nowrap;">${rate}</td><td style="padding:14px 16px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:600;white-space:nowrap;">${amt}</td></tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Invoice ${escapeHtml(c.invoiceNumber || "")}</title>
<style>
  * { box-sizing: border-box; }
  body { margin:0; padding:0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#1e293b; background:#fff; font-size:13px; line-height:1.55; }
  .bar { background:linear-gradient(180deg,#1e3a5f 0%,#172554 100%); color:#fff; padding:28px 36px 32px; display:flex; justify-content:space-between; align-items:flex-start; gap:32px; }
  .bar-left { flex:1; min-width:0; max-width:50%; }
  .bar-co { font-size:18px; font-weight:700; letter-spacing:-0.02em; line-height:1.3; }
  .bar-co-sub { margin-top:8px; font-size:12px; opacity:0.85; line-height:1.5; }
  .bar-right { text-align:right; flex-shrink:0; }
  .bar-inv { font-size:20px; font-weight:800; letter-spacing:0.12em; }
  .meta-stack { margin-top:14px; font-size:12px; line-height:1.65; opacity:0.95; }
  .meta-line { display:flex; justify-content:flex-end; gap:12px; margin-top:5px; }
  .meta-lbl { opacity:0.7; min-width:72px; text-align:right; }
  .meta-val { font-weight:600; min-width:130px; text-align:right; }
  .wrap { padding:32px 36px 36px; }
  .section-h { font-size:10px; font-weight:700; letter-spacing:0.14em; color:#1e3a5f; text-transform:uppercase; margin-bottom:14px; }
  .cols2 { display:grid; grid-template-columns:1fr 1fr; gap:28px; margin-bottom:32px; }
  .colb { border:1px solid #e2e8f0; border-radius:10px; padding:18px 20px; min-height:112px; background:#fafafa; }
  .colb .name { font-weight:700; font-size:14px; color:#0f172a; }
  .colb .det { margin-top:8px; color:#64748b; font-size:12px; line-height:1.55; }
  table { width:100%; border-collapse:collapse; border-radius:8px; overflow:hidden; border:1px solid #e2e8f0; }
  th { text-align:left; background:#1e3a5f; color:#fff; font-size:10px; letter-spacing:0.1em; text-transform:uppercase; padding:13px 16px; font-weight:600; }
  th:nth-child(n+2) { text-align:right; }
  .foot { background:#1e3a5f; color:#fff; padding:18px 36px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
  .foot-lbl { font-size:11px; letter-spacing:0.12em; text-transform:uppercase; opacity:0.85; }
  .foot-amt { font-size:20px; font-weight:800; }
  .notes { margin-top:24px; padding:18px 20px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; color:#475569; font-size:13px; line-height:1.6; }
  .doc-foot { padding:16px 36px 28px; text-align:center; font-size:11px; color:#94a3b8; }
</style>
</head>
<body>
  <div class="bar">
    <div class="bar-left">
      <div class="bar-co">${c.companyName || "Company name"}</div>
      ${c.companyEmail ? `<div class="bar-co-sub">${c.companyEmail}</div>` : ""}
    </div>
    <div class="bar-right">
      <div class="bar-inv">INVOICE</div>
      <div class="meta-stack">${metaBlock}</div>
    </div>
  </div>

  <div class="wrap">
    <div class="section-h">Billing details</div>
    <div class="cols2">
      <div>
        <div class="section-h" style="margin-bottom:10px;">From</div>
        <div class="colb">
          <div class="name">${c.companyName || "—"}</div>
          <div class="det">${[c.companyEmail, c.companyAddress].filter(Boolean).join("<br/>") || "—"}</div>
        </div>
      </div>
      <div>
        <div class="section-h" style="margin-bottom:10px;">Bill to</div>
        <div class="colb">
          <div class="name">${c.clientName || "—"}</div>
          <div class="det">${[c.clientEmail, c.clientAddress].filter(Boolean).join("<br/>") || "—"}</div>
        </div>
      </div>
    </div>

    <div class="section-h" style="margin-bottom:12px;">Line items</div>
    <table>
      <thead><tr><th>Description</th><th style="text-align:right;">Qty</th><th style="text-align:right;">Rate</th><th style="text-align:right;">Amount</th></tr></thead>
      <tbody>${bodyRows}</tbody>
    </table>

    ${data.notes.trim() ? `<div class="notes"><strong style="color:#1e3a5f;">Notes</strong><br/><br/>${c.notes}</div>` : ""}
  </div>

  <div class="foot">
    <span class="foot-lbl">Amount due</span>
    <span class="foot-amt">${totalVal}</span>
  </div>
  <div class="doc-foot">Thank you for your business. Please remit payment by the due date above.</div>
</body>
</html>`;
}

export function renderInvoiceHtml(
  template: "modern" | "minimal" | "corporate",
  data: InvoiceData
): string {
  switch (template) {
    case "minimal":
      return renderMinimalInvoice(data);
    case "corporate":
      return renderCorporateInvoice(data);
    default:
      return renderModernInvoice(data);
  }
}
