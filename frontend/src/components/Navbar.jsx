import React, { useState, useEffect } from "react";
import { User, Search, Settings, X } from "lucide-react";
import Profile from "../pages/Profile";
import "../styles/Navbar.css";

const Navbar = ({ username, userId, onLogout }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // ===== THEME APPLY =====
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <header className="top-bar">

      {/* ===== SEARCH ===== */}
      {showSearch && (
        <div className="search-box">
          <input
            type="text"
            placeholder="Search stocks, orders..."
            autoFocus
          />
          <X size={18} onClick={() => setShowSearch(false)} />
        </div>
      )}

      {/* ===== HEADER ICONS ===== */}
      <div className="header-actions">

        {/* Profile Icon */}
        <div
          className="user-wrapper"
          onClick={() => setShowProfile(!showProfile)}
        >
          <User size={22} />
        </div>

        {/* Search Icon */}
        <Search
          size={22}
          onClick={() => setShowSearch(!showSearch)}
        />

        {/* Theme Toggle */}
        <Settings
          size={22}
          onClick={toggleTheme}
        />
      </div>

      {/* ===== PROFILE DROPDOWN ===== */}
      {showProfile && (
        <div
          className="profile-dropdown"
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            zIndex: 50
          }}
        >
          <Profile
            userInfo={{
              id: userId,
              name: username
            }}
            onLogout={onLogout}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;
