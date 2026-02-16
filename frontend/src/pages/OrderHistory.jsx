import React, { useEffect, useState } from "react";
import "../styles/OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
  if (!userId) return;

  fetch(`http://localhost:5000/api/orders/${userId}`)
    .then(res => res.json())
    .then(data => {
      console.log("Orders:", data);
      setOrders(Array.isArray(data) ? data : []);
    })
    .catch(err => console.error(err));
}, [userId]);
  return (
    <div className="order-container">

      <h2>Order History</h2>

      <div className="order-table-wrapper">
        <table className="order-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Script</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Date</th>
              <th>P&L</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((o, i) => (
                <tr key={i} className={o.type === "BUY" ? "buy" : "sell"}>
                  <td>{o.type}</td>
                  <td>{o.stock}</td>
                  <td>{o.qty}</td>
                  <td>₹{o.price}</td>
                  <td>₹{o.total}</td>
                  <td>{new Date(o.date).toLocaleDateString()}</td>
                  <td
                    className={
                      o.pnl > 0 ? "profit" : o.pnl < 0 ? "loss" : ""
                    }
                  >
                    {o.pnl ? `₹${o.pnl}` : "-"}
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

export default OrderHistory;
