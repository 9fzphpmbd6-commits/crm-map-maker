export type MappingConfig = {
  name: string | null;
  address: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  type: string | null;
  rep: string | null;
};

export const TARGET_FIELDS = [
  "name",
  "address",
  "street",
  "city",
  "state",
  "zip",
  "country",
  "type",
  "rep",
] as const;

export type TargetField = (typeof TARGET_FIELDS)[number];

export const FIELD_LABELS: Record<TargetField, string> = {
  name: "Name",
  address: "Address (single column)",
  street: "Street",
  city: "City",
  state: "State",
  zip: "ZIP",
  country: "Country",
  type: "Type",
  rep: "Rep",
};

export const FIELD_REQUIRED: Record<TargetField, boolean> = {
  name: true,
  address: false,
  street: false,
  city: false,
  state: false,
  zip: false,
  country: false,
  type: false,
  rep: false,
};

const GUESS_RULES: { field: TargetField; keywords: string[] }[] = [
  { field: "name", keywords: ["name", "company", "account"] },
  { field: "address", keywords: ["address", "addr"] },
  { field: "street", keywords: ["street"] },
  { field: "city", keywords: ["city", "town"] },
  { field: "state", keywords: ["state", "province"] },
  { field: "zip", keywords: ["zip", "postal"] },
  { field: "country", keywords: ["country"] },
  { field: "type", keywords: ["type", "segment", "category"] },
  { field: "rep", keywords: ["owner", "rep", "salesperson", "agent"] },
];

/**
 * Auto-detect column mappings from CSV headers.
 * Returns a MappingConfig with best guesses filled in.
 */
export function autoDetectMapping(headers: string[]): MappingConfig {
  const mapping: MappingConfig = {
    name: null,
    address: null,
    street: null,
    city: null,
    state: null,
    zip: null,
    country: null,
    type: null,
    rep: null,
  };

  const usedHeaders = new Set<string>();

  // For each rule, find the first header that matches any of the keywords
  for (const rule of GUESS_RULES) {
    for (const header of headers) {
      if (usedHeaders.has(header)) continue;
      const lower = header.toLowerCase().trim();
      const match = rule.keywords.some(
        (kw) => lower === kw || lower.includes(kw)
      );
      if (match) {
        mapping[rule.field] = header;
        usedHeaders.add(header);
        break;
      }
    }
  }

  return mapping;
}

/**
 * Validate that a mapping has at least Name and some address info.
 */
export function validateMapping(mapping: MappingConfig): string | null {
  if (!mapping.name) {
    return "Please map a column to the Name field.";
  }

  const hasAddress = !!mapping.address;
  const hasAddressParts =
    !!mapping.street ||
    !!mapping.city ||
    !!mapping.state ||
    !!mapping.zip ||
    !!mapping.country;

  if (!hasAddress && !hasAddressParts) {
    return "Please map a column to Address, or map at least one of Street, City, State, ZIP, or Country.";
  }

  return null;
}
