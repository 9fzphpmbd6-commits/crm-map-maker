"use client";

import { useCallback, useRef, useState } from "react";
import Papa from "papaparse";

type Props = {
  onParsed: (headers: string[], rows: Record<string, string>[]) => void;
};

export default function FileUpload({ onParsed }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const parseFile = useCallback(
    (file: File) => {
      setError(null);

      if (!file.name.toLowerCase().endsWith(".csv")) {
        setError("Please upload a .csv file.");
        return;
      }

      setFileName(file.name);

      Papa.parse<Record<string, string>>(file, {
        header: true,
        skipEmptyLines: true,
        complete(results) {
          const headers = results.meta.fields ?? [];
          if (headers.length === 0) {
            setError("Could not detect any column headers in the CSV.");
            return;
          }
          if (results.data.length === 0) {
            setError("The CSV file has no data rows.");
            return;
          }
          onParsed(headers, results.data);
        },
        error() {
          setError("Failed to parse the CSV file. Ensure it is valid UTF-8.");
        },
      });
    },
    [onParsed]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) parseFile(file);
    },
    [parseFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) parseFile(file);
    },
    [parseFile]
  );

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative cursor-pointer rounded-xl border-2 border-dashed px-6 py-12
          text-center transition-all duration-200
          ${
            dragging
              ? "border-brand-500 bg-brand-50"
              : "border-gray-300 bg-white hover:border-brand-400 hover:bg-gray-50"
          }
        `}
        data-testid="drop-zone"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          onChange={handleChange}
          className="hidden"
          data-testid="file-input"
        />

        <div className="pointer-events-none space-y-2">
          {/* Upload icon */}
          <svg
            className="mx-auto h-10 w-10 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="text-sm font-medium text-gray-700">
            Drag & drop your CSV here, or{" "}
            <span className="text-brand-600 underline">browse</span>
          </p>
          <p className="text-xs text-gray-400">Accepts .csv files only</p>
        </div>

        {fileName && (
          <p className="mt-3 text-xs font-medium text-brand-700">
            Loaded: {fileName}
          </p>
        )}
      </div>

      {error && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700"
          data-testid="upload-error"
        >
          {error}
        </div>
      )}
    </div>
  );
}
