// ComponentRenderer.tsx
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
    excelRows: any;
    isLoading: boolean;
  }

  export const ComponentRenderer = (props: IDatasetToExcelProps) => {
    let { excelRows, isLoading } = props;

    if ( isLoading) {
        return <div>Loading...</div>;
    }   
    excelRows = JSON.parse(excelRows as string);
    console.log(excelRows);
    

    if (!excelRows || excelRows.length === 0) {
        return <div>No data to display.</div>;
    }

    const columns = Object.keys(excelRows[0]); // lấy key từ dòng đầu

    return (
        <div style={{ overflowX: "auto" }}>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th key={col} style={{ border: "1px solid #ccc", padding: "8px", background: "#f3f3f3" }}>
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {excelRows.map((row: any, rowIndex: number) => (
                        <tr key={rowIndex}>
                            {columns.map(col => (
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