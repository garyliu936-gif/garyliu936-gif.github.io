const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, HeadingLevel, BorderStyle, WidthType,
  ShadingType, VerticalAlign, PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const CONTENT_W = 9360;
const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function cell(text, opts = {}) {
  const {
    bold = false, shade = null, align = AlignmentType.LEFT,
    w = 2340, size = 18, color = "000000", vAlign = VerticalAlign.CENTER,
    italic = false, borderSet = borders
  } = opts;
  return new TableCell({
    borders: borderSet,
    width: { size: w, type: WidthType.DXA },
    shading: shade ? { fill: shade, type: ShadingType.CLEAR } : undefined,
    verticalAlign: vAlign,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({
      alignment: align,
      children: [new TextRun({ text, bold, size, color, font: "Arial", italic })]
    })]
  });
}

function hdrCell(text, w = 2340) {
  return cell(text, { bold: true, shade: "1F3864", w, size: 17, color: "FFFFFF", align: AlignmentType.RIGHT });
}
function hdrCellLeft(text, w = 2340) {
  return cell(text, { bold: true, shade: "1F3864", w, size: 17, color: "FFFFFF", align: AlignmentType.LEFT });
}

function dataRow(cols, shade = null) {
  const ws = [2760, 1650, 1650, 1650, 1650];
  return new TableRow({
    children: cols.map((t, i) => cell(t, {
      shade, w: ws[i], align: i === 0 ? AlignmentType.LEFT : AlignmentType.RIGHT, size: 17
    }))
  });
}
function subRow(cols) {
  const ws = [2760, 1650, 1650, 1650, 1650];
  return new TableRow({
    children: cols.map((t, i) => cell(t, {
      shade: "D9E1F2", bold: true, w: ws[i],
      align: i === 0 ? AlignmentType.LEFT : AlignmentType.RIGHT, size: 17
    }))
  });
}
function sectionRow(label) {
  return new TableRow({
    children: [new TableCell({
      borders,
      columnSpan: 5,
      shading: { fill: "2E5090", type: ShadingType.CLEAR },
      margins: { top: 60, bottom: 60, left: 120, right: 120 },
      children: [new Paragraph({
        children: [new TextRun({ text: label, bold: true, size: 17, color: "FFFFFF", font: "Arial" })]
      })]
    })]
  });
}

function sp(before = 0, after = 0) {
  return { before, after };
}

function heading(text, level = 1) {
  return new Paragraph({
    children: [new TextRun({
      text, bold: true, size: level === 1 ? 28 : 22,
      color: level === 1 ? "1F3864" : "2E5090", font: "Arial"
    })],
    spacing: sp(level === 1 ? 240 : 180, 120)
  });
}

function para(text, opts = {}) {
  const { size = 19, bold = false, color = "333333", spacing = sp(60, 60), align = AlignmentType.LEFT, italic = false } = opts;
  return new Paragraph({
    alignment: align,
    spacing,
    children: [new TextRun({ text, size, bold, color, font: "Arial", italic })]
  });
}

function metricTable() {
  const cw = Math.floor(CONTENT_W / 4);
  const makeMetric = (label, value, valueColor = "1F3864") => new TableCell({
    borders: { top: border, bottom: border, left: border, right: border },
    width: { size: cw, type: WidthType.DXA },
    shading: { fill: "EBF0FA", type: ShadingType.CLEAR },
    margins: { top: 160, bottom: 160, left: 140, right: 140 },
    children: [
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: label, size: 16, color: "555555", font: "Arial" })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: sp(60, 0), children: [new TextRun({ text: value, size: 28, bold: true, color: valueColor, font: "Arial" })] })
    ]
  });
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [cw, cw, cw, cw],
    rows: [new TableRow({ children: [
      makeMetric("Total Revenue", "$1,431,095"),
      makeMetric("Total Expenses", "$1,406,750", "8B0000"),
      makeMetric("Net Income", "+$5,942", "0F5E38"),
      makeMetric("Net Margin", "0.4%", "0F5E38"),
    ]})]
  });
}

function locationTable() {
  const cw = Math.floor(CONTENT_W / 3);
  const makeLoc = (name, rev, exp, net, netColor, note) => new TableCell({
    borders,
    width: { size: cw, type: WidthType.DXA },
    shading: { fill: "F5F8FF", type: ShadingType.CLEAR },
    margins: { top: 140, bottom: 140, left: 140, right: 140 },
    children: [
      new Paragraph({ children: [new TextRun({ text: name, size: 18, bold: true, color: "1F3864", font: "Arial" })] }),
      new Paragraph({ spacing: sp(80, 0), children: [new TextRun({ text: "Revenue: ", size: 17, font: "Arial", color: "444444" }), new TextRun({ text: rev, size: 17, bold: true, font: "Arial", color: "000000" })] }),
      new Paragraph({ spacing: sp(40, 0), children: [new TextRun({ text: "Expenses: ", size: 17, font: "Arial", color: "444444" }), new TextRun({ text: exp, size: 17, bold: true, font: "Arial", color: "000000" })] }),
      new Paragraph({ spacing: sp(40, 0), children: [new TextRun({ text: "Net Income: ", size: 17, font: "Arial", color: "444444" }), new TextRun({ text: net, size: 17, bold: true, font: "Arial", color: netColor })] }),
      new Paragraph({ spacing: sp(80, 0), children: [new TextRun({ text: note, size: 15, italic: true, font: "Arial", color: "666666" })] }),
    ]
  });
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [cw, cw, cw],
    rows: [new TableRow({ children: [
      makeLoc("PawsVIP INC (Main)", "$998,344", "$1,105,976", "−$126,035", "8B0000", "Carries corporate payroll & SBA loan"),
      makeLoc("West Seattle LLC", "$265,703", "$143,078", "+$122,625 (46% margin)", "0F5E38", "Top performer — strong growth"),
      makeLoc("Ballard LLC (opened Dec 2025)", "$167,048", "$157,696", "+$9,352", "0F5E38", "Turned profitable in March 2026"),
    ]})]
  });
}

function plTable() {
  const ws = [2760, 1650, 1650, 1650, 1650];
  const hdr = new TableRow({ children: [
    hdrCellLeft("Line Item", 2760),
    hdrCell("PawsVIP INC", 1650),
    hdrCell("West Seattle", 1650),
    hdrCell("Ballard", 1650),
    hdrCell("Combined Total", 1650),
  ]});

  const netRow = (cols) => {
    return new TableRow({ children: cols.map((t, i) => {
      const isNeg = t.startsWith("−") || t.startsWith("-");
      const isPos = t.startsWith("+");
      const color = isNeg ? "8B0000" : isPos ? "0F5E38" : "000000";
      return cell(t, { bold: true, shade: "1F3864", w: ws[i], align: i === 0 ? AlignmentType.LEFT : AlignmentType.RIGHT, size: 17, color: "FFFFFF" });
    })});
  };
  const finalRow = (cols) => {
    return new TableRow({ children: cols.map((t, i) => {
      const isNeg = t.startsWith("−") || t.startsWith("-");
      const isPos = t.startsWith("+");
      const color = isNeg ? "8B0000" : isPos ? "0F5E38" : "FFFFFF";
      return cell(t, { bold: true, shade: "2E5090", w: ws[i], align: i === 0 ? AlignmentType.LEFT : AlignmentType.RIGHT, size: 18, color: "FFFFFF" });
    })});
  };

  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: ws,
    rows: [
      hdr,
      sectionRow("INCOME"),
      dataRow(["Services Revenue", "$818,281", "$275,245", "$139,180", "$1,232,706"], "FAFCFF"),
      dataRow(["Airport / Other Revenue", "$144,736", "—", "—", "$144,736"]),
      dataRow(["Subscription Revenue", "$35,327", "—", "$28,087", "$63,414"], "FAFCFF"),
      dataRow(["Cost of Goods Sold", "$19,353", "—", "—", "$19,353"]),
      subRow(["Total Revenue", "$998,344", "$265,703", "$167,048", "$1,431,095"]),
      subRow(["Gross Profit", "$978,991", "$265,703", "$167,048", "$1,411,742"]),
      sectionRow("KEY EXPENSES"),
      dataRow(["Payroll & Taxes", "$782,717", "$1,778", "$52,053", "$836,548"], "FAFCFF"),
      dataRow(["Rent / Lease", "$60,548", "$67,558", "$85,880", "$213,986"]),
      dataRow(["SBA Loan Interest", "$60,172", "—", "—", "$60,172"], "FAFCFF"),
      dataRow(["Repairs & Maintenance", "$29,273", "$49,314", "$2,681", "$81,268"]),
      dataRow(["Supplies", "$43,010", "$1,429", "$2,665", "$47,104"], "FAFCFF"),
      dataRow(["Marketing", "$16,038", "$2,766", "$24,220", "$43,024"]),
      dataRow(["Utilities", "$7,552", "$5,264", "$9,519", "$22,335"], "FAFCFF"),
      dataRow(["Legal & Professional", "$3,920", "$17,330", "$478", "$21,728"]),
      dataRow(["Software & Tech", "$7,661", "$201", "$273", "$8,135"], "FAFCFF"),
      dataRow(["Bank Charges & Fees", "$468", "$5,448", "$3,476", "$9,392"]),
      subRow(["Total Expenses", "$1,105,976", "$143,078", "$157,696", "$1,406,750"]),
      netRow(["Net Operating Income", "−$126,985", "+$122,625", "+$9,352", "+$4,992"]),
      finalRow(["Net Income", "−$126,035", "+$122,625", "+$9,352", "+$5,942"]),
    ]
  });
}

function monthlyTable() {
  const ws = [2160, 1800, 1800, 1800, 1800];
  const hdr = new TableRow({ children: [
    hdrCellLeft("Month", 2160),
    hdrCell("PawsVIP INC", 1800),
    hdrCell("West Seattle", 1800),
    hdrCell("Ballard", 1800),
    hdrCell("Combined", 1800),
  ]});
  const mRow = (cols, shade = null) => new TableRow({ children: cols.map((t, i) => {
    const isNeg = t.startsWith("−") || t.startsWith("-");
    const isPos = t.startsWith("+");
    const color = isNeg ? "8B0000" : isPos ? "0F5E38" : "333333";
    return cell(t, { shade, w: ws[i], align: i === 0 ? AlignmentType.LEFT : AlignmentType.RIGHT, size: 17, color, bold: i > 0 });
  })});
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: ws,
    rows: [
      hdr,
      mRow(["January 2026", "−$55,321", "+$12,612", "−$22,200", "−$64,909"], "FAFCFF"),
      mRow(["February 2026", "+$294", "+$20,280", "−$1,627", "+$18,947"]),
      mRow(["March 2026", "−$187", "+$28,357", "+$9,764", "+$37,934"], "FAFCFF"),
      mRow(["April 2026", "−$66,406", "+$44,873", "+$6,154", "−$15,379"]),
      mRow(["May 2026", "−$4,415", "+$16,504", "+$17,262", "+$29,351"], "FAFCFF"),
    ]
  });
}

function bulletPara(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: sp(60, 60),
    children: [new TextRun({ text, size: 18, font: "Arial", color: "333333" })]
  });
}

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 440, hanging: 280 } } } }]
    }]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 }
      }
    },
    headers: {
      default: new Header({ children: [
        new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "1F3864", space: 1 } },
          spacing: sp(0, 120),
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "PawsVIP INC  —  Consolidated Profit & Loss Report  —  January–May 2026", size: 17, bold: true, color: "1F3864", font: "Arial" })
          ]
        })
      ]})
    },
    footers: {
      default: new Footer({ children: [
        new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: "1F3864", space: 1 } },
          spacing: sp(120, 0),
          tabStops: [{ type: "right", position: 9360 }],
          children: [
            new TextRun({ text: "Report generated June 13, 2026  |  PawsVIP INC  |  Confidential", size: 16, color: "777777", font: "Arial" }),
            new TextRun({ text: "\tPage ", size: 16, color: "777777", font: "Arial" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "777777", font: "Arial" }),
          ]
        })
      ]})
    },
    children: [
      // Title block
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp(240, 80),
        children: [new TextRun({ text: "PawsVIP", size: 48, bold: true, color: "1F3864", font: "Arial" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp(0, 60),
        children: [new TextRun({ text: "Consolidated Profit & Loss Report", size: 30, bold: true, color: "2E5090", font: "Arial" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp(0, 280),
        children: [new TextRun({ text: "January – May 2026  |  All Locations", size: 22, italic: true, color: "666666", font: "Arial" })]
      }),

      // Section 1: Executive Summary
      heading("1. Executive Summary"),
      metricTable(),
      new Paragraph({ spacing: sp(180, 0), children: [] }),

      // Section 2: Location Snapshots
      heading("2. Location Snapshots"),
      locationTable(),
      new Paragraph({ spacing: sp(180, 0), children: [] }),

      // Section 3: Consolidated P&L
      heading("3. Consolidated Profit & Loss"),
      plTable(),
      para("* West Seattle and Ballard Jan–May figures derived from monthly columns (Dec 2025 excluded).", { size: 15, italic: true, color: "888888", spacing: sp(80, 160) }),

      // Section 4: Monthly Net Income
      heading("4. Monthly Net Income by Location"),
      monthlyTable(),
      new Paragraph({ spacing: sp(180, 0), children: [] }),

      // Section 5: Key Observations
      heading("5. Key Observations"),
      bulletPara("West Seattle is the top performer with a 46% net margin — revenue nearly doubled from $36K in January to $73K in April."),
      bulletPara("Ballard turned profitable in March 2026 (its 4th month of operation) and reached +$17K net in May — strong growth trajectory."),
      bulletPara("PawsVIP INC carries the bulk of payroll ($782K) and the SBA loan ($60K interest). Allocating these costs across all locations would show a more accurate per-location picture."),
      bulletPara("Combined, all three locations achieved near-breakeven (+$5,942) in a period that included a new location ramp-up."),
      bulletPara("Largest expense across all entities: Payroll & Taxes at $836,548 (59% of combined expenses)."),
      bulletPara("Rent totals $213,986 across all locations — Ballard’s $85,880 is the highest relative to its current revenue stage."),
      new Paragraph({ spacing: sp(180, 0), children: [] }),

      // Section 6: 2025 Full Year Reference
      heading("6. 2025 Full Year Reference — PawsVIP INC"),
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: [3120, 3120, 3120],
        rows: [
          new TableRow({ children: [
            cell("Full Year 2025 Revenue", { shade: "EBF0FA", bold: true, w: 3120, size: 18 }),
            cell("Full Year 2025 Net Income", { shade: "EBF0FA", bold: true, w: 3120, size: 18 }),
            cell("Note", { shade: "EBF0FA", bold: true, w: 3120, size: 18 }),
          ]}),
          new TableRow({ children: [
            cell("$2,213,900", { w: 3120, size: 20, bold: true, color: "1F3864" }),
            cell("+$628,035", { w: 3120, size: 20, bold: true, color: "0F5E38" }),
            cell("2026 reflects Ballard startup costs & expanded payroll", { w: 3120, size: 17, italic: true, color: "555555" }),
          ]}),
        ]
      }),
      new Paragraph({ spacing: sp(240, 0), children: [] }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("C:\\Pet Website\\PawsVIP_PL_Report_Jan_May_2026.docx", buffer);
  console.log("Done: PawsVIP_PL_Report_Jan_May_2026.docx");
}).catch(err => { console.error(err); process.exit(1); });
