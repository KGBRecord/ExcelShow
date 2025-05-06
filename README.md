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
```
[ColumnName]|[Operator]|[ComparisonValue]|[RowColor]
```

#### Operators supported:
| Operator | Meaning            | Example                           |
|----------|--------------------|-----------------------------------|
| `=`      | Equals             | `Số lượng\|=\|5\|#ffffcc`             |
| `!=`     | Not equals         | `Mã\|!=\|A12\|#ffeeee`               |
| `>`      | Greater than       | `Số lượng\|>\|10\|#ffe0e0`           |
| `<`      | Less than          | `Giá trị\|<\|1000\|#e0ffe0`          |
| `>=`     | Greater or equal   | `Tuổi\|>=\|18\|#d0f0ff`              |
| `<=`     | Less or equal      | `Tuổi\|<=\|12\|#f0f8ff`              |
| `~`      | Contains (string)  | `Mô tả\|~\|cút\|#f5e0ff`             |
| `^`      | Starts with        | `Vật liệu\|^\|Inox\|#e0e0ff`         |
| `$`      | Ends with          | `Mã sản phẩm\|$\|.xlsx\|#ffffdd`     |

#### Multiple rules (comma-separated):

```
Số lượng|>|10|#ffe0e0, Đầu mục chuẩn hóa|=|Không xác định|#ffffcc
```

---

## 🧩 Properties

| Property       | Type      | Description                                             |
|----------------|-----------|---------------------------------------------------------|
| `ExcelRows`    | `Multiple` | JSON string of array of rows (from Flow or API)         |
| `FillColumns`  | `SingleLine.Text` | String-based rules to color rows based on cell values   |
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
    Text(
        JSON(
            parsedResult.excelRows,
            JSONFormat.IncludeBinaryData
        )
    )
)

Set(
    fillRule,
    "Số lượng|>|10|#ffe0e0, Đầu mục chuẩn hóa|=|Không xác định|#ffffcc"
);

// Pass `excelRows` and `fillRule` into the PCF component
```
**🎼 Powered By [@KGBRecord](https://github.com/KGBRecord)**  
*Where code meets melody, and ideas become anthems.*  