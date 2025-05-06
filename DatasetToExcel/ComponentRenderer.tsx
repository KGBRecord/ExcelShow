// ComponentRenderer.tsx
import * as React from "react";
import { isArray } from "util";
import * as _ from "lodash";

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
  isLoading: boolean;
}

export const ComponentRenderer = (props: IDatasetToExcelProps) => {
  const { excelRows, isLoading } = props;
  const [data, setData] = React.useState<any[]>([]);

  React.useEffect(() => {
    console.log(excelRows.raw);
    if (typeof excelRows.raw === "string" && excelRows.raw.trim() !== "") {
      try {
        const parsed = JSON.parse(excelRows.raw);
        setData(_.isArray(parsed) ? parsed : []);
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

  const columns = Object.keys(data[0]).filter(
    (col) => !["@odata.etag", "ItemInternalId"].includes(col)
  );

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                style={{
                  border: "1px solid #ccc",
                  padding: "8px",
                  background: "#f3f3f3",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
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