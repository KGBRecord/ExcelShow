import * as React from "react";

export interface IMakerStyleProps {
  textColor: string;
  bgColor: string;
  iconColor: string;
  hoverTextColor: string;
  hoverBgColor: string;
  borderColor: string;
  borderHoverColor: string;
  borderWidth: number;
  borderRadius: number;
  buttonWidth: number;
  buttonHeight: number;
}

export interface IDatasetToExcelProps {
  makerStyleProps: IMakerStyleProps;
  excelRows: ComponentFramework.PropertyTypes.StringProperty;
  fillColumns?: ComponentFramework.PropertyTypes.StringProperty;
  isLoading: boolean;
}

type FillRule = {
  column: string;
  operator: string;
  value: string;
  color: string;
};

const parseFillRules = (raw: string): FillRule[] => {
  if (!raw) return [];
  return raw
    .split(",")
    .map((ruleStr) => {
      const parts = ruleStr.trim().split("|").map((s) => s.trim());
      if (parts.length !== 4) return null;
      const [column, operator, value, color] = parts;
      return { column, operator, value, color };
    })
    .filter(Boolean) as FillRule[];
};

const getRowBgColor = (row: any, rules: FillRule[]): string | undefined => {
  for (const rule of rules) {
    const cell = row[rule.column];
    if (cell == null) continue;

    const cellStr = String(cell).toLowerCase();
    const expected = rule.value.toLowerCase();

    switch (rule.operator) {
      case "=":
        if (cellStr === expected) return rule.color;
        break;
      case "!=":
        if (cellStr !== expected) return rule.color;
        break;
      case ">":
        if (!isNaN(+cellStr) && +cellStr > +expected) return rule.color;
        break;
      case "<":
        if (!isNaN(+cellStr) && +cellStr < +expected) return rule.color;
        break;
      case ">=":
        if (!isNaN(+cellStr) && +cellStr >= +expected) return rule.color;
        break;
      case "<=":
        if (!isNaN(+cellStr) && +cellStr <= +expected) return rule.color;
        break;
      case "~":
        if (cellStr.includes(expected)) return rule.color;
        break;
      case "^":
        if (cellStr.startsWith(expected)) return rule.color;
        break;
      case "$":
        if (cellStr.endsWith(expected)) return rule.color;
        break;
    }
  }
  return undefined;
};

export const ComponentRenderer = (props: IDatasetToExcelProps) => {
  const { excelRows, isLoading, fillColumns } = props;
  const [data, setData] = React.useState<any[]>([]);
  const rules = React.useMemo(() => parseFillRules(fillColumns?.raw || ""), [fillColumns?.raw]);

  React.useEffect(() => {
    if (typeof excelRows.raw === "string" && excelRows.raw.trim() !== "") {
      try {
        const parsed = JSON.parse(excelRows.raw);
        setData(Array.isArray(parsed) ? parsed : []);
      } catch (err) {
        console.error("❌ Failed to parse ExcelRows JSON:", err);
        setData([]);
      }
    } else {
      setData([]);
    }
  }, [excelRows?.raw]);

  if (isLoading) return <div>Loading...</div>;
  if (!data || data.length === 0) return <div>No data to display.</div>;

  const rawColumns = Object.keys(data[0] || {}).filter(
    (col) => !["@odata.etag", "ItemInternalId"].includes(col)
  );

  const priorityCols = ["tt","stt", "id", "mã", "code"];
  const fixedCols = rawColumns.filter((col) =>
    priorityCols.includes(col.trim().toLowerCase())
  );

  const noteCols = rawColumns.filter((col) => {
    const lower = col.toLowerCase();
    return lower.includes("ghi chú") || lower.includes("note");
  });

  const dynamicCols = rawColumns.filter(
    (col) => !fixedCols.includes(col) && !noteCols.includes(col)
  );

  const sortedDynamicCols = dynamicCols.sort((a, b) => {
    const aMax = Math.max(...data.map((row) => String(row[a] ?? "").length));
    const bMax = Math.max(...data.map((row) => String(row[b] ?? "").length));
    return bMax - aMax;
  });

  const finalColumns = [...fixedCols, ...sortedDynamicCols, ...noteCols];

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {finalColumns.map((col) => (
              <th
                key={col}
                title={col}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  background: "#f3f3f3",
                }}
              >
                {col.length > 20 ? col.slice(0, 20) + "…" : col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ backgroundColor: getRowBgColor(row, rules) }}>
              {finalColumns.map((col) => (
                <td key={col} style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {row[col]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};