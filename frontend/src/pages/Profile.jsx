import React from "react";
import "../styles/Profile.css";

export default function Profile({ userInfo, onLogout }) {
  return (
    <div className="profile-sidebar">
      {/* User Info */}
      <div className="user-info">
        <p>{userInfo.id} - {userInfo.ref} </p>
        <span>{userInfo.name}</span>
      </div>

      {/* Options */}
      <div className="profile-options">
        <button className="option-btn">Rules</button>
        
        <button className="option-btn logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
