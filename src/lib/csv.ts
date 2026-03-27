import type { MappingConfig } from "./mapping";

export type OutputRow = {
  Name: string;
  Address: string;
  City: string;
  State: string;
  ZIP: string;
  Country: string;
  Type: string;
  Rep: string;
};

/**
 * Build the Address string from parts, skipping empty values.
 * Format: "Street, City, State ZIP, Country"
 */
function buildAddress(parts: {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}): string {
  const { street, city, state, zip, country } = parts;
  const segments: string[] = [];

  if (street?.trim()) segments.push(street.trim());
  if (city?.trim()) segments.push(city.trim());

  // State and ZIP go together: "State ZIP"
  const stateZip = [state?.trim(), zip?.trim()].filter(Boolean).join(" ");
  if (stateZip) segments.push(stateZip);

  if (country?.trim()) segments.push(country.trim());

  return segments.join(", ");
}

/**
 * Transform input rows using the mapping config into output rows
 * matching Google My Maps format.
 */
export function transformRows(
  rows: Record<string, string | null | undefined>[],
  mapping: MappingConfig
): OutputRow[] {
  return rows.map((row) => {
    const getValue = (col: string | null): string => {
      if (!col) return "";
      const val = row[col];
      return val != null ? String(val).trim() : "";
    };

    const name = getValue(mapping.name);

    let address: string;
    if (mapping.address) {
      // User mapped a single address column
      address = getValue(mapping.address);
    } else {
      // Build from parts
      address = buildAddress({
        street: getValue(mapping.street),
        city: getValue(mapping.city),
        state: getValue(mapping.state),
        zip: getValue(mapping.zip),
        country: getValue(mapping.country),
      });
    }

    return {
      Name: name,
      Address: address,
      City: getValue(mapping.city),
      State: getValue(mapping.state),
      ZIP: getValue(mapping.zip),
      Country: getValue(mapping.country),
      Type: getValue(mapping.type),
      Rep: getValue(mapping.rep),
    };
  });
}
