"use client";

import { useState, useCallback } from "react";
import FileUpload from "@/components/FileUpload";
import ColumnMapper from "@/components/ColumnMapper";
import PreviewTable from "@/components/PreviewTable";
import GenerateButton from "@/components/GenerateButton";
import { autoDetectMapping, type MappingConfig, type TargetField } from "@/lib/mapping";

export default function Home() {
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [mapping, setMapping] = useState<MappingConfig>({
    name: null,
    address: null,
    street: null,
    city: null,
    state: null,
    zip: null,
    country: null,
    type: null,
    rep: null,
  });
  const [uploaded, setUploaded] = useState(false);

  const handleParsed = useCallback(
    (parsedHeaders: string[], parsedRows: Record<string, string>[]) => {
      setHeaders(parsedHeaders);
      setRows(parsedRows);
      setMapping(autoDetectMapping(parsedHeaders));
      setUploaded(true);
    },
    []
  );

  const handleMappingChange = useCallback(
    (field: TargetField, value: string | null) => {
      setMapping((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleReset = useCallback(() => {
    setHeaders([]);
    setRows([]);
    setMapping({
      name: null,
      address: null,
      street: null,
      city: null,
      state: null,
      zip: null,
      country: null,
      type: null,
      rep: null,
    });
    setUploaded(false);
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:py-16">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
          </svg>
          CRM Map Maker
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Turn CRM Exports into Google Maps in 30 Seconds
        </h1>
        <p className="mt-3 text-sm text-gray-500 max-w-xl mx-auto leading-relaxed">
          Upload a CSV, map your columns, download a Google My Maps-ready file.
          No login, no setup.
        </p>
      </div>

      {/* Steps indicator */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
        {[
          { step: 1, label: "Export contacts from your CRM as CSV" },
          { step: 2, label: "Upload and map your columns here" },
          { step: 3, label: "Download & import at mymaps.google.com" },
        ].map(({ step, label }) => (
          <div
            key={step}
            className="flex items-start gap-2.5 rounded-lg border border-gray-200 bg-white px-3 py-3 text-left"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
              {step}
            </span>
            <p className="text-xs text-gray-600 leading-snug">{label}</p>
          </div>
        ))}
      </div>

      {/* Main card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
        {/* Upload section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-800">
              {uploaded ? "CSV Loaded" : "Upload Your CSV"}
            </h2>
            {uploaded && (
              <button
                onClick={handleReset}
                className="text-xs text-brand-600 hover:text-brand-800 font-medium transition-colors"
                data-testid="reset-button"
              >
                Upload a different file
              </button>
            )}
          </div>
          {!uploaded && <FileUpload onParsed={handleParsed} />}
        </div>

        {/* After upload: preview, mapper, generate */}
        {uploaded && (
          <>
            <hr className="border-gray-100" />
            <PreviewTable headers={headers} rows={rows} />
            <hr className="border-gray-100" />
            <ColumnMapper
              headers={headers}
              mapping={mapping}
              onChange={handleMappingChange}
            />
            <hr className="border-gray-100" />
            <GenerateButton rows={rows} mapping={mapping} />
          </>
        )}
      </div>
    </main>
  );
}
