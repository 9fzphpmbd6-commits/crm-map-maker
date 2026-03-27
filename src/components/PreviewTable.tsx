"use client";

type Props = {
  headers: string[];
  rows: Record<string, string>[];
};

export default function PreviewTable({ headers, rows }: Props) {
  const preview = rows.slice(0, 10);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
        Preview{" "}
        <span className="font-normal text-gray-500 normal-case">
          (first {preview.length} of {rows.length} rows)
        </span>
      </h3>
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full text-xs" data-testid="preview-table">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {headers.map((h) => (
                <th
                  key={h}
                  className="whitespace-nowrap px-3 py-2 text-left font-semibold text-gray-600"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.map((row, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}
              >
                {headers.map((h) => (
                  <td
                    key={h}
                    className="whitespace-nowrap px-3 py-1.5 text-gray-700 max-w-[200px] truncate"
                    title={row[h] ?? ""}
                  >
                    {row[h] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
