"use client";

import { useState } from "react";
import { validateMapping, type MappingConfig } from "@/lib/mapping";
import { transformRows } from "@/lib/csv";

type Props = {
  rows: Record<string, string>[];
  mapping: MappingConfig;
};

const OUTPUT_HEADERS = [
  "Name",
  "Address",
  "City",
  "State",
  "ZIP",
  "Country",
  "Type",
  "Rep",
] as const;

function escapeCSVField(value: string): string {
  if (
    value.includes(",") ||
    value.includes('"') ||
    value.includes("\n") ||
    value.includes("\r")
  ) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export default function GenerateButton({ rows, mapping }: Props) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleGenerate = () => {
    setError(null);
    setSuccess(false);

    const validationError = validateMapping(mapping);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const outputRows = transformRows(rows, mapping);

      // Build CSV string
      const headerLine = OUTPUT_HEADERS.join(",");
      const dataLines = outputRows.map((row) =>
        OUTPUT_HEADERS.map((h) => escapeCSVField(row[h] ?? "")).join(",")
      );
      const csvString = [headerLine, ...dataLines].join("\r\n") + "\r\n";

      // Trigger download
      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "crm-map.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setSuccess(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleGenerate}
        className="w-full rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white
                   shadow-sm transition-all duration-200
                   hover:bg-brand-700 hover:shadow-md
                   focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2"
        data-testid="generate-button"
      >
        Generate My Maps File
      </button>

      {error && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700"
          data-testid="generate-error"
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700"
          data-testid="generate-success"
        >
          CSV generated! Your download should begin automatically.
        </div>
      )}
    </div>
  );
}
