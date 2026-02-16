import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { socket } from "../services/socket";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import Portfolio from "../pages/Portfolio";
import PL from "../pages/PL";
import Assets from "../pages/Assets";
import OrderHistory from "../pages/OrderHistory";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [excelData, setExcelData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile toggle

  const username = localStorage.getItem("username") || "User";
  const userId = localStorage.getItem("userId");

  /* ================= SOCKET ================= */
  useEffect(() => {
    if (!userId) return;
    socket.emit("joinRoom", userId);
    socket.on("excelUpdated", (data) => {
      setExcelData(Array.isArray(data) ? data : []);
    });
    return () => socket.off("excelUpdated");
  }, [userId]);

  /* ================= CALCULATIONS ================= */
  const totalInvestment = excelData.reduce((sum, r) => sum + (Number(r.total) || 0), 0);
  const currentValue = excelData.reduce((sum, r) => {
    if (Number(r.sellTotal) > 0) return sum + Number(r.sellTotal);
    return sum + (Number(r.total) || 0);
  }, 0);
  const totalPNL = excelData.reduce((sum, r) => sum + (Number(r.netPNL) || 0), 0);
  const pnlPercent = totalInvestment ? ((totalPNL / totalInvestment) * 100).toFixed(2) : 0;

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  /* ================= PAGE RENDER ================= */
  const renderPage = () => {
    switch (activePage) {
      case "Portfolio": return <Portfolio data={excelData} />;
      case "P&L": return <PL data={excelData} />;
      case "Assets": return <Assets data={excelData} />;
      case "Order History": return <OrderHistory data={excelData} />;
      default: return null; // Dashboard stats only
    }
  };

  return (
    <div className="dashboard-container">

      {/* SIDEBAR */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        sidebarOpen={sidebarOpen}
      />

      {/* MAIN CONTENT */}
      <main className="main-content">

        {/* NAVBAR */}
        <Navbar
          username={username}
          userId={userId}
          onLogout={handleLogout}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen} // pass toggle
        />

        {/* DASHBOARD STATS */}
        {activePage === "Dashboard" && (
          <section className="stats-grid">
            <div className="stat-card blue-glow">
              <p>Total Investment</p>
              <h2>₹{totalInvestment.toLocaleString()}</h2>
            </div>
            <div className="stat-card purple-glow">
              <p>Current Value</p>
              <h2>₹{currentValue.toLocaleString()}</h2>
            </div>
            <div className="stat-card green-glow">
              <p>Total P&amp;L</p>
              <h2>₹{totalPNL.toLocaleString()}</h2>
              <span>{pnlPercent}%</span>
            </div>
          </section>
        )}

        {/* PAGE CONTENT */}
        <section className="page-view">{renderPage()}</section>
      </main>

    </div>
  );
};

export default Dashboard;
