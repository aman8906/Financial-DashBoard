import React, { useMemo } from "react";
import "../styles/Assets.css";

const Assets = ({ data = [] }) => {

  // ===== ASSET CALCULATION =====

  const totals = useMemo(() => {

    let equity = 0;
    let cash = 0;

    data.forEach(row => {
      const amount = Number(row.total) || 0;

      if (row.sellTotal && Number(row.sellTotal) > 0) {
        cash += Number(row.sellTotal);
      } else {
        equity += amount;
      }
    });

    const overall = equity + cash;

    return {
      equity,
      cash,
      total: overall,
      equityPercent: overall ? ((equity / overall) * 100).toFixed(1) : 0,
      cashPercent: overall ? ((cash / overall) * 100).toFixed(1) : 0,
    };

  }, [data]);

  return (
    <div className="assets-container">

      {/* ===== SUMMARY CARDS ===== */}

      <div className="assets-summary">

        <div className="asset-card glow-cyan">
          <p>Total Assets</p>
          <h2>₹{totals.total.toLocaleString()}</h2>
        </div>

        <div className="asset-card glow-purple">
          <p>Equity</p>
          <h2>₹{totals.equity.toLocaleString()}</h2>
          <span>{totals.equityPercent}%</span>
        </div>

        <div className="asset-card glow-green">
          <p>Cash</p>
          <h2>₹{totals.cash.toLocaleString()}</h2>
          <span>{totals.cashPercent}%</span>
        </div>

      </div>

      {/* ===== ASSET TABLE ===== */}

      <div className="assets-table-card">

        <table className="assets-table">

          <thead>
            <tr>
              <th>Script</th>
              <th>Qty</th>
              <th>Investment</th>
              <th>Current Value</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-data">
                  No asset data available
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i}>
                  <td>{row.script}</td>
                  <td>{row.qty}</td>
                  <td>{row.total}</td>
                  <td>{row.sellTotal || row.total}</td>
                  <td
                    className={
                      row.sellTotal ? "closed" : "open"
                    }
                  >
                    {row.sellTotal ? "Closed" : "Open"}
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

export default Assets;
