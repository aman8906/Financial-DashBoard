import chokidar from "chokidar";
import XLSX from "xlsx";
import Portfolio from "../models/Portfolio.js";

const EXCEL_PATH = "C:/Users/AMAN/Downloads/dd.xlsx";

export const watchExcelFile = (io) => {

  console.log("Watching Excel:", EXCEL_PATH);

  const watcher = chokidar.watch(EXCEL_PATH, {
    ignoreInitial: false,
    awaitWriteFinish: {
      stabilityThreshold: 1500,
      pollInterval: 200
    }
  });

  const parseDate = (val) => {
    if (!val) return null;

    if (val instanceof Date) return val;

    // handle excel number date
    if (typeof val === "number") {
      const date = XLSX.SSF.parse_date_code(val);
      return new Date(date.y, date.m - 1, date.d);
    }

    // handle dd-mm-yyyy
    const parts = String(val).split("-");
    if (parts.length === 3) {
      const [dd, mm, yyyy] = parts;
      return new Date(`${yyyy}-${mm}-${dd}`);
    }

    return new Date(val);
  };

  const syncExcel = async () => {

    try {

      console.log("Excel syncing...");

      const workbook = XLSX.readFile(EXCEL_PATH);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      if (!sheet) return;

      const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

      // 🔥 Get unique users
      const users = [...new Set(
        rows.map(r => String(r["Users-id"]).trim()).filter(Boolean)
      )];

      // 🔥 Delete old records for these users only ONCE
      await Portfolio.deleteMany({ userId: { $in: users } });

      // 🔥 Prepare bulk insert
      const bulkData = rows
        .filter(r => r["Users-id"] && r["SCRIPT"])
        .map(r => ({

          userId: String(r["Users-id"]).trim(),

          buyDate: parseDate(r["BUY DATE"]),
          script: String(r["SCRIPT"]).trim(),

          buyPrice: Number(r["BUY PRICE"]) || 0,
          qty: Number(r["QTY"]) || 0,
          total: Number(r["TOTAL"]) || 0,
          buyBrokerage: Number(r["BUY BROK"]) || 0,

          sellDate: parseDate(r["SELL DATE"]),
          sellPrice: Number(r["SELL PRICE"]) || 0,
          sellQty: Number(r["QTY.1"]) || 0,
          sellTotal: Number(r["TOTAL.1"]) || 0,
          sellBrokerage: Number(r["SELL BROK"]) || 0,

          grossPNL: Number(r["GROSS PNL"]) || 0,
          netPNL: Number(r["NET PNL"]) || 0
        }));

      if (bulkData.length) {
        await Portfolio.insertMany(bulkData);
      }

      // 🚀 Emit realtime per user (sorted newest first)
      for (const uid of users) {

        const userData = await Portfolio.find({ userId: uid })
          .sort({ buyDate: -1 })
          .lean();

        io.to(uid).emit("excelUpdated", userData);
      }

      console.log("Synced rows:", bulkData.length);

    } catch (err) {
      console.error("Excel sync error:", err);
    }
  };

  watcher.on("ready", syncExcel);
  watcher.on("change", syncExcel);
};
