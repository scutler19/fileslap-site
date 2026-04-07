export interface LineItem {
  description: string;
  quantity: number;
  rate: number;
}

export interface InvoiceData {
  companyName: string;
  companyEmail: string;
  companyAddress: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: LineItem[];
  notes: string;
}

export type InvoiceTemplateId = "modern" | "minimal" | "corporate";
