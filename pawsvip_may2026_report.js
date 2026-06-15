const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, PageNumber, LevelFormat
} = require('docx');
const fs = require('fs');

const CW = 9360;
const b = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: b, bottom: b, left: b, right: b };
const nb = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: nb, bottom: nb, left: nb, right: nb };

function cell(text, { bold=false, shade=null, align=AlignmentType.RIGHT, w=2340, size=18, color="222222", italic=false, vAlign=VerticalAlign.CENTER, bdr=borders }={}) {
  return new TableCell({
    borders: bdr, width: { size: w, type: WidthType.DXA },
    shading: shade ? { fill: shade, type: ShadingType.CLEAR } : undefined,
    verticalAlign: vAlign,
    margins: { top: 80, bottom: 80, left: 130, right: 130 },
    children: [new Paragraph({ alignment: align, children: [new TextRun({ text, bold, size, color, font: "Arial", italic })] })]
  });
}

function hdr(text, w=2340, leftAlign=false) {
  return cell(text, { bold: true, shade: "1F3864", w, size: 17, color: "FFFFFF", align: leftAlign ? AlignmentType.LEFT : AlignmentType.RIGHT });
}

function sp(before=0, after=0) { return { before, after }; }

function txt(text, { size=19, bold=false, color="333333", italic=false }={}) {
  return new TextRun({ text, size, bold, color, font: "Arial", italic });
}

function para(children, { align=AlignmentType.LEFT, before=60, after=60 }={}) {
  return new Paragraph({ alignment: align, spacing: sp(before, after), children: Array.isArray(children) ? children : [children] });
}

function heading(text, level=1) {
  return new Paragraph({
    spacing: sp(level===1?280:200, 120),
    children: [new TextRun({ text, bold: true, size: level===1?30:22, color: level===1?"1F3864":"2E5090", font: "Arial" })]
  });
}

function divider() {
  return new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "1F3864", space: 1 } },
    spacing: sp(0, 160), children: []
  });
}

// ── Section: May 2026 location breakdown ──────────────────────────────────────
function locationBreakdown() {
  const cw = Math.floor(CW / 3);
  const makeCard = (name, rev, net, netColor) => new TableCell({
    borders, width: { size: cw, type: WidthType.DXA },
    shading: { fill: "F0F4FB", type: ShadingType.CLEAR },
    margins: { top: 140, bottom: 140, left: 140, right: 140 },
    children: [
      para(txt(name, { size: 17, bold: true, color: "1F3864" }), { before: 0, after: 60 }),
      para([txt("Revenue:  ", { size: 16, color: "555555" }), txt(rev, { size: 16, bold: true, color: "222222" })], { before: 0, after: 40 }),
      para([txt("Net income:  ", { size: 16, color: "555555" }), txt(net, { size: 16, bold: true, color: netColor })], { before: 0, after: 0 }),
    ]
  });
  return new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: [cw, cw, cw],
    rows: [new TableRow({ children: [
      makeCard("PawsVIP INC", "$190,076", "−$4,415", "8B0000"),
      makeCard("West Seattle LLC", "$62,300", "+$16,504", "0F5E38"),
      makeCard("Ballard LLC", "$52,992", "+$17,262", "0F5E38"),
    ]})]
  });
}

// ── Section: Summary comparison metrics ────────────────────────────────────────
function summaryMetrics() {
  const cw = Math.floor(CW / 3);
  const makeMetric = (label, val2025, val2026, change, changeColor, valColor="1F3864") => new TableCell({
    borders, width: { size: cw, type: WidthType.DXA },
    shading: { fill: "EBF0FA", type: ShadingType.CLEAR },
    margins: { top: 160, bottom: 160, left: 140, right: 140 },
    children: [
      para(txt(label, { size: 15, color: "555555" }), { align: AlignmentType.CENTER, before: 0, after: 40 }),
      para(txt(val2026, { size: 26, bold: true, color: valColor }), { align: AlignmentType.CENTER, before: 0, after: 40 }),
      para([txt("vs ", { size: 15, color: "888888" }), txt(val2025, { size: 15, color: "888888" }), txt("  2025 monthly avg", { size: 14, color: "AAAAAA", italic: true })], { align: AlignmentType.CENTER, before: 0, after: 40 }),
      para(txt(change, { size: 16, bold: true, color: changeColor }), { align: AlignmentType.CENTER, before: 0, after: 0 }),
    ]
  });
  return new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: [cw, cw, cw],
    rows: [new TableRow({ children: [
      makeMetric("Revenue", "$184,492", "$305,368", "+65.5%", "0F5E38"),
      makeMetric("Expenses", "$129,218", "$276,018", "+113.6%", "8B0000", "8B0000"),
      makeMetric("Net Income", "$52,336", "+$29,351", "−$22,985 vs avg", "8B0000", "854F0B"),
    ]})]
  });
}

// ── Section: Revenue vs Expense gap callout ────────────────────────────────────
function gapCallout() {
  return new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: [CW],
    rows: [new TableRow({ children: [new TableCell({
      borders,
      shading: { fill: "FFF4E5", type: ShadingType.CLEAR },
      margins: { top: 140, bottom: 140, left: 180, right: 180 },
      children: [
        para(txt("Why net income is still lower than last year's average", { size: 18, bold: true, color: "854F0B" }), { before: 0, after: 80 }),
        para([
          txt("Revenue grew  ", { size: 17, color: "444444" }),
          txt("+$120,876", { size: 17, bold: true, color: "0F5E38" }),
          txt("   but expenses grew  ", { size: 17, color: "444444" }),
          txt("+$146,800", { size: 17, bold: true, color: "8B0000" }),
          txt("   — expenses outpaced revenue by  ", { size: 17, color: "444444" }),
          txt("$25,924", { size: 17, bold: true, color: "8B0000" }),
          txt("  which reduced net income by  ", { size: 17, color: "444444" }),
          txt("$22,985", { size: 17, bold: true, color: "8B0000" }),
          txt("  compared to the 2025 monthly average.", { size: 17, color: "444444" }),
        ], { before: 0, after: 0 }),
      ]
    })]})],
  });
}

// ── Section: Expense breakdown table ─────────────────────────────────────────
function expenseTable() {
  const ws = [3200, 1790, 1790, 1790, 790];
  const dRow = (cols, shade=null, boldRow=false) => new TableRow({ children: cols.map((t, i) => {
    const isNeg = typeof t === 'string' && (t.startsWith("+") || t.includes("+"));
    const isPos = typeof t === 'string' && (t.startsWith("−") || t.startsWith("-"));
    const color = i >= 3 ? (isPos ? "8B0000" : isNeg ? "0F5E38" : "333333") : "333333";
    return cell(t, { shade, bold: boldRow, w: ws[i], align: i===0 ? AlignmentType.LEFT : AlignmentType.RIGHT, size: 17, color });
  })});
  const sRow = (label) => new TableRow({ children: [new TableCell({
    borders, columnSpan: 5,
    shading: { fill: "2E5090", type: ShadingType.CLEAR },
    margins: { top: 60, bottom: 60, left: 130, right: 130 },
    children: [para(txt(label, { size: 16, bold: true, color: "FFFFFF" }), { before: 0, after: 0 })]
  })]});

  return new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: ws,
    rows: [
      new TableRow({ children: [
        hdr("Expense Category", 3200, true),
        hdr("2025 monthly avg", 1790),
        hdr("May 2026 combined", 1790),
        hdr("$ Change", 1790),
        hdr("% Chg", 790),
      ]}),
      sRow("LARGEST INCREASES"),
      dRow(["Payroll & Taxes", "$82,116", "$149,842", "+$67,726", "+83%"], "FFF0F0", true),
      dRow(["Rent / Lease", "$9,128", "$31,441", "+$22,313", "+244%"], "FAFCFF"),
      dRow(["Utilities", "$1,704", "$13,908", "+$12,204", "+716%"]),
      dRow(["Repairs & Maintenance", "$1,939", "$17,890", "+$15,951", "+822%"], "FAFCFF"),
      dRow(["Marketing", "$3,687", "$5,910", "+$2,223", "+60%"]),
      dRow(["Bank Charges & Fees", "$364", "$2,559", "+$2,195", "+603%"], "FAFCFF"),
      sRow("STABLE / IMPROVING"),
      dRow(["SBA Loan Interest", "$11,469", "$10,823", "−$646", "−5.6%"], "F0FFF4"),
      dRow(["Software & Tech", "$896", "$1,858", "+$962", "+107%"], "FAFCFF"),
      sRow("TOTALS"),
      dRow(["Total Expenses", "$129,218", "$276,018", "+$146,800", "+114%"], "D9E1F2", true),
      dRow(["Revenue (reference)", "$184,492", "$305,368", "+$120,876", "+65%"], "D9EAD3", true),
      dRow(["Net Income", "+$52,336", "+$29,351", "−$22,985", "−44%"], "FFF4E5", true),
    ]
  });
}

// ── Section: Monthly net income trend ─────────────────────────────────────────
function monthlyTrendTable() {
  const ws = [2160, 1500, 1500, 1500, 1500, 1200];
  const hdrRow = new TableRow({ children: [
    hdr("Month", 2160, true),
    hdr("PawsVIP INC", 1500),
    hdr("West Seattle", 1500),
    hdr("Ballard", 1500),
    hdr("Combined", 1500),
    hdr("vs 2025 avg", 1200),
  ]});
  const mRow = (month, inc, ws2, bal, comb, diff, shade=null) => {
    const vals = [month, inc, ws2, bal, comb, diff];
    return new TableRow({ children: vals.map((t, i) => {
      const isNeg = t.startsWith("−") || t.startsWith("-");
      const isPos = t.startsWith("+");
      const color = i===0 ? "444444" : isNeg ? "8B0000" : isPos ? "0F5E38" : "333333";
      return cell(t, { shade, w: ws[i], align: i===0 ? AlignmentType.LEFT : AlignmentType.RIGHT, size: 17, color, bold: i===4||i===5 });
    })});
  };
  return new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: ws,
    rows: [
      hdrRow,
      mRow("January 2026",  "−$55,321", "+$12,612", "−$22,200", "−$64,909", "−$117,245", "FAFCFF"),
      mRow("February 2026", "+$294",    "+$20,280", "−$1,627",  "+$18,947",  "−$33,389"),
      mRow("March 2026",    "−$187",    "+$28,357", "+$9,764",  "+$37,934",  "−$14,402", "FAFCFF"),
      mRow("April 2026",    "−$66,406", "+$44,873", "+$6,154",  "−$15,379",  "−$67,715"),
      mRow("May 2026",      "−$4,415",  "+$16,504", "+$17,262", "+$29,351",  "−$22,985", "FFF4E5"),
    ]
  });
}

// ── Section: Key observations ──────────────────────────────────────────────────
function bulletPara(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: sp(60, 60),
    children: [new TextRun({ text, size: 18, font: "Arial", color: "333333" })]
  });
}

// ── Section: 2025 reference ────────────────────────────────────────────────────
function ref2025Table() {
  const ws = [2340, 2340, 2340, 2340];
  return new Table({
    width: { size: CW, type: WidthType.DXA }, columnWidths: ws,
    rows: [
      new TableRow({ children: [
        hdr("Full Year 2025 Revenue", 2340, true),
        hdr("2025 Monthly Avg Revenue", 2340, true),
        hdr("2025 Monthly Avg Expenses", 2340, true),
        hdr("2025 Monthly Avg Net", 2340, true),
      ]}),
      new TableRow({ children: [
        cell("$2,213,900", { w: 2340, size: 19, bold: true, color: "1F3864", align: AlignmentType.CENTER }),
        cell("$184,492", { w: 2340, size: 19, bold: true, color: "1F3864", align: AlignmentType.CENTER }),
        cell("$129,218", { w: 2340, size: 19, bold: true, color: "1F3864", align: AlignmentType.CENTER }),
        cell("+$52,336", { w: 2340, size: 19, bold: true, color: "0F5E38", align: AlignmentType.CENTER }),
      ]}),
    ]
  });
}

const doc = new Document({
  numbering: {
    config: [{ reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 440, hanging: 280 } } } }] }]
  },
  sections: [{
    properties: {
      page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } }
    },
    headers: {
      default: new Header({ children: [new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "1F3864", space: 1 } },
        spacing: sp(0, 120), alignment: AlignmentType.CENTER,
        children: [txt("PawsVIP INC  —  May 2026 Combined vs 2025 Monthly Average", { size: 17, bold: true, color: "1F3864" })]
      })] })
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        border: { top: { style: BorderStyle.SINGLE, size: 6, color: "1F3864", space: 1 } },
        spacing: sp(120, 0),
        tabStops: [{ type: "right", position: 9360 }],
        children: [
          txt("Report generated June 14, 2026  |  PawsVIP INC  |  Confidential", { size: 16, color: "888888" }),
          new TextRun({ text: "\tPage ", size: 16, color: "888888", font: "Arial" }),
          new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "888888", font: "Arial" }),
        ]
      })] })
    },
    children: [
      // Title
      para(txt("PawsVIP", { size: 48, bold: true, color: "1F3864" }), { align: AlignmentType.CENTER, before: 200, after: 60 }),
      para(txt("May 2026 Combined (3 Locations) vs 2025 Monthly Average", { size: 26, bold: true, color: "2E5090" }), { align: AlignmentType.CENTER, before: 0, after: 60 }),
      para(txt("Year-over-Year Performance Analysis  |  All Entities", { size: 20, italic: true, color: "777777" }), { align: AlignmentType.CENTER, before: 0, after: 280 }),

      // Section 1
      heading("1. May 2026 — Individual Location Results"),
      locationBreakdown(),
      para([], { before: 160, after: 0 }),

      // Section 2
      heading("2. Combined May 2026 vs 2025 Monthly Average"),
      summaryMetrics(),
      para([], { before: 140, after: 0 }),
      gapCallout(),
      para([], { before: 160, after: 0 }),

      // Section 3
      heading("3. Expense Breakdown — Where Costs Increased"),
      expenseTable(),
      para([], { before: 160, after: 0 }),

      // Section 4
      heading("4. Monthly Net Income Trend — All Locations Combined"),
      monthlyTrendTable(),
      para(txt("* 'vs 2025 avg' compares combined 2026 net income to the 2025 PawsVIP INC monthly average of +$52,336.", { size: 14, italic: true, color: "999999" }), { before: 80, after: 160 }),

      // Section 5
      heading("5. Key Observations"),
      bulletPara("Revenue grew +65.5% year-over-year in May 2026 ($305K combined vs $184K avg), driven by two additional locations now generating meaningful income."),
      bulletPara("Expenses grew +113.6% — nearly double the rate of revenue growth. The gap of $25,924 explains why net income declined vs 2025 average."),
      bulletPara("Payroll & Taxes is the #1 driver: up $67,726 per month (+83%). The company is now staffing three locations, but much of that cost sits in PawsVIP INC rather than the LLCs."),
      bulletPara("Rent more than tripled (+244%) because Ballard ($86K/5mo) and West Seattle ($68K/5mo) now add significant fixed costs that didn't exist in 2025."),
      bulletPara("Ballard LLC turned profitable in March 2026 (month 4 of operation) and generated +$17,262 net in May — strong growth trajectory for a new location."),
      bulletPara("West Seattle LLC continues to outperform with a 46% net margin in the Jan–May period. Its May net of +$16,504 partially offset the INC loss."),
      bulletPara("As Ballard and West Seattle revenues continue to grow, the fixed costs (rent, payroll, utilities) spread across a larger revenue base — profitability is expected to recover and exceed 2025 levels within 2026."),
      para([], { before: 160, after: 0 }),

      // Section 6
      heading("6. 2025 Full Year Reference (PawsVIP INC)"),
      ref2025Table(),
      para(txt("Note: 2025 data is PawsVIP INC only. West Seattle and Ballard LLCs were not operating as separate reporting entities for the full 2025 period.", { size: 15, italic: true, color: "999999" }), { before: 80, after: 0 }),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("C:\\Pet Website\\PawsVIP_May2026_vs_2025Avg.docx", buf);
  console.log("Done: PawsVIP_May2026_vs_2025Avg.docx");
}).catch(e => { console.error(e); process.exit(1); });
