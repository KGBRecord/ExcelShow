# 📊 ExcelShow PCF Component

**ExcelShow** is a Power Apps PCF (PowerApps Component Framework) component that displays Excel-like tabular data dynamically inside Canvas Apps.

It accepts a JSON array of rows (typically parsed from Excel files) and renders them in a scrollable, styled HTML table. The component also supports advanced row coloring rules and intelligent column ordering to enhance readability.

---

## ✅ Features

### 🔢 Smart Column Ordering

- **Priority columns** (e.g., `STT`, `ID`, `Mã`, `Code`) are always shown first.
- **Note columns** (`Ghi chú`, `Note`, etc.) are pushed to the end.
- Remaining columns are sorted **by maximum data length**, descending — so columns with the longest content appear earlier for visibility.

### 🎨 Conditional Row Highlighting

Using the `FillColumns` property, you can define dynamic row background coloring rules based on cell values.

#### Format:
`[ColumnName]|[Operator]|[ComparisonValue]|[RowColor]`

#### Operators supported:
| Operator | Meaning            |
|----------|--------------------|
| `=`      | Equals             |
| `!=`     | Not equals         |
| `>`      | Greater than       |
| `<`      | Less than          |
| `>=`     | Greater or equal   |
| `<=`     | Less or equal      |
| `~`      | Contains (string)  |
| `^`      | Starts with        |
| `$`      | Ends with          |

#### Multiple rules (comma-separated):

`Số lượng|>|10|#ffe0e0, Đầu mục chuẩn hóa|=|Không xác định|#ffffcc`

---

## 🧩 Properties

| Property       | Type      | Description                                             |
|----------------|-----------|---------------------------------------------------------|
| `ExcelRows`    | `SingleLine.TextArea` | JSON string of array of rows (from Flow or API)         |
| `FillColumns`  | `SingleLine.TextArea` | String-based rules to color rows based on cell values   |
| `Loading`      | `TwoOptions`         | Set to `true` to show a loading state                    |
| Style props    | `Text`, `Color`, etc. | Controls for text color, border, hover effects, etc.     |

---

## 🛠 Usage Example

```powerfx
Set(
    parsedResult,
    ParseJSON(response.result)
);

Set(
    excelRows,
    Text(JSON(parsedResult.excelRows), PlainText)
);

Set(
    fillRule,
    "Số lượng|>|10|#ffe0e0, Đầu mục chuẩn hóa|=|Không xác định|#ffffcc"
);

// Pass `excelRows` and `fillRule` into the PCF component