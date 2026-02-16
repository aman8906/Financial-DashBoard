import React, { useMemo } from "react";
import "../styles/PL.css";

const PL = ({ data = [] }) => {

  // ================= TOTAL CALCULATIONS =================

  const totalProfit = useMemo(() => {
    return data.reduce(
      (sum, row) => sum + (Number(row.netPNL) || 0),
      0
    );
  }, [data]);

  const profitTrades = useMemo(
    () => data.filter(d => Number(d.netPNL) > 0).length,
    [data]
  );

  const lossTrades = useMemo(
    () => data.filter(d => Number(d.netPNL) < 0).length,
    [data]
  );

  // ================= UI =================

  return (
    <div className="pl-container">

      {/* ================= SUMMARY ================= */}

      <div className="pl-summary">

        <div className="pl-card glow-green">
          <p>Total P&amp;L</p>
          <h2>₹{totalProfit.toLocaleString()}</h2>
        </div>

        <div className="pl-card glow-cyan">
          <p>Profitable Trades</p>
          <h2>{profitTrades}</h2>
        </div>

        <div className="pl-card glow-purple">
          <p>Loss Trades</p>
          <h2>{lossTrades}</h2>
        </div>

      </div>

      {/* ================= TABLE ================= */}

      <div className="pl-table-card">

        <table className="pl-table">
          <thead>
            <tr>
              <th>Script</th>
              <th>Qty</th>
              <th>Buy</th>
              <th>Sell</th>
              <th>Net P&amp;L</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  No P&amp;L data available
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={row._id || i}>
                  <td>{row.script}</td>
                  <td>{row.qty}</td>
                  <td>₹{row.buyPrice}</td>
                  <td>{row.sellPrice ? `₹${row.sellPrice}` : "-"}</td>
                  <td
                    className={Number(row.netPNL) >= 0 ? "profit" : "loss"}
                  >
                    ₹{Number(row.netPNL).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

      </div>

    </div>
  );
};

export default PL;
