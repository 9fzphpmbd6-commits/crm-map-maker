"use client";

import { useState } from "react";
import { validateMapping, type MappingConfig } from "@/lib/mapping";

type Props = {
  rows: Record<string, string>[];
  mapping: MappingConfig;
};

export default function GenerateButton({ rows, mapping }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleGenerate = async () => {
    setError(null);
    setSuccess(false);

    const validationError = validateMapping(mapping);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rows, mapping }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setError(json?.error ?? `Server error (${res.status}).`);
        setLoading(false);
        return;
      }

      const blob = await res.blob();
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white
                   shadow-sm transition-all duration-200
                   hover:bg-brand-700 hover:shadow-md
                   focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2
                   disabled:opacity-50 disabled:cursor-not-allowed"
        data-testid="generate-button"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="h-4 w-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Generating…
          </span>
        ) : (
          "Generate My Maps File"
        )}
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
