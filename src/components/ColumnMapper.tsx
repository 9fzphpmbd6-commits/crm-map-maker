"use client";

import {
  TARGET_FIELDS,
  FIELD_LABELS,
  FIELD_REQUIRED,
  type MappingConfig,
  type TargetField,
} from "@/lib/mapping";

type Props = {
  headers: string[];
  mapping: MappingConfig;
  onChange: (field: TargetField, value: string | null) => void;
};

export default function ColumnMapper({ headers, mapping, onChange }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
        Map Your Columns
      </h3>
      <p className="text-xs text-gray-500">
        Map a single Address column, or map Street/City/State/ZIP/Country
        individually to build the address.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TARGET_FIELDS.map((field) => (
          <div key={field} className="space-y-1">
            <label
              htmlFor={`map-${field}`}
              className="flex items-center gap-1 text-xs font-medium text-gray-600"
            >
              {FIELD_LABELS[field]}
              {FIELD_REQUIRED[field] && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <select
              id={`map-${field}`}
              value={mapping[field] ?? ""}
              onChange={(e) =>
                onChange(field, e.target.value === "" ? null : e.target.value)
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm
                         text-gray-800 shadow-sm transition-colors
                         focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
              data-testid={`select-${field}`}
            >
              <option value="">— Not mapped —</option>
              {headers.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
