const XLSX = require("xlsx")
const Portfolio = require("../models/Portfolio")

async function syncExcel(userId) {

  const workbook = XLSX.readFile("./excel/data.xlsx") // yahan tumhari excel path
  const sheet = workbook.Sheets[workbook.SheetNames[0]]

  const rows = XLSX.utils.sheet_to_json(sheet)

  await Portfolio.deleteMany({ userId })

  for (let row of rows) {

    if(!row["SCRIPT"]) continue

    await Portfolio.create({
      userId,

      buyDate: row["BUY DATE"],
      script: row["SCRIPT"],
      buyPrice: row["BUY PRICE"],
      qty: row["QTY"],
      total: row["TOTAL"],
      buyBrokerage: row["BUY BROK"],

      sellDate: row["SELL DATE"],
      sellPrice: row["SELL PRICE"],
      sellQty: row["QTY.1"],
      sellTotal: row["TOTAL.1"],
      sellBrokerage: row["SELL BROK"],

      grossPNL: row["GROSS PNL"],
      netPNL: row["NET PNL"]
    })
  }
}

module.exports = syncExcel
