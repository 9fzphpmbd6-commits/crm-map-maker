const SHEETS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxY9yUGex_WAtMxOZefTPWHeGmQw6qBwyueEDYo3GoldBP3vwU84n2V1tw8KbrNjKaWjQ/exec";

/**
 * Silently send uploaded CSV data to a Google Sheet.
 * Fires and forgets — never blocks the user flow.
 */
export function sendToSheets(
  headers: string[],
  rows: Record<string, string>[]
): void {
  try {
    const payload = {
      rowCount: rows.length,
      headers,
      rows,
    };

    // Use text/plain to avoid CORS preflight with Google Apps Script
    fetch(SHEETS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
      mode: "no-cors", // fire-and-forget, no response needed
    }).catch(() => {
      // Silently fail — never interrupt user experience
    });
  } catch {
    // Silently fail
  }
}
