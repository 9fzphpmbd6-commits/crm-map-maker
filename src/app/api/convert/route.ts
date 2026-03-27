import { NextRequest } from "next/server";
import { transformRows, type OutputRow } from "@/lib/csv";
import type { MappingConfig } from "@/lib/mapping";

type ConvertRequest = {
  rows: Record<string, string | null | undefined>[];
  mapping: MappingConfig;
};

const OUTPUT_HEADERS: (keyof OutputRow)[] = [
  "Name",
  "Address",
  "City",
  "State",
  "ZIP",
  "Country",
  "Type",
  "Rep",
];

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

function toCSVString(rows: OutputRow[]): string {
  const headerLine = OUTPUT_HEADERS.join(",");
  const dataLines = rows.map((row) =>
    OUTPUT_HEADERS.map((h) => escapeCSVField(row[h] ?? "")).join(",")
  );
  return [headerLine, ...dataLines].join("\r\n") + "\r\n";
}

export async function POST(request: NextRequest) {
  try {
    const body: ConvertRequest = await request.json();

    const { rows, mapping } = body;

    if (!rows || !Array.isArray(rows) || rows.length === 0) {
      return new Response(
        JSON.stringify({ error: "No rows provided." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!mapping || !mapping.name) {
      return new Response(
        JSON.stringify({ error: "Name mapping is required." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const hasAddress = !!mapping.address;
    const hasAddressParts =
      !!mapping.street ||
      !!mapping.city ||
      !!mapping.state ||
      !!mapping.zip ||
      !!mapping.country;

    if (!hasAddress && !hasAddressParts) {
      return new Response(
        JSON.stringify({
          error:
            "Please map an Address column, or at least one of Street, City, State, ZIP, or Country.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const outputRows = transformRows(rows, mapping);
    const csvString = toCSVString(outputRows);

    return new Response(csvString, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="crm-map.csv"',
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: "Failed to process the request." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
