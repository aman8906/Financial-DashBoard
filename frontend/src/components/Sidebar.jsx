import React from "react";
import {
  LayoutDashboard,
  TrendingUp,
  Wallet,
  History,
} from "lucide-react";

const pages = ["Portfolio", "P&L", "Assets", "Order History"];

const icons = {
  Portfolio: <LayoutDashboard size={20} />,
  "P&L": <TrendingUp size={20} />,
  Assets: <Wallet size={20} />,
  "Order History": <History size={20} />,
};

const Sidebar = ({ activePage, setActivePage, sidebarOpen }) => {
  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>

      {/* LOGO */}
      <div
        className="brand"
        onClick={() => setActivePage("Dashboard")}
        style={{ cursor: "pointer" }}
      >
        <div className="logo-icon">F</div>
        <span>FINANCIALLY</span>
      </div>

      {/* NAV LINKS */}
      <nav className="nav-menu">
        {pages.map((page) => (
          <div
            key={page}
            className={`nav-item ${activePage === page ? "active" : ""}`}
            onClick={() => setActivePage(page)}
          >
            {icons[page]} {page}
          </div>
        ))}
      </nav>

    </aside>
  );
};

export default Sidebar;
