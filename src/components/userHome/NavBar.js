// NavBar.js
import React from "react";
import "../../assets/NavBar.css";

export const NavBar = ({ handleLogout, handleNavClick }) => {
  return (
    <div className="container-navbar">
      <div className="navbar">
        <h2 onClick={() => handleNavClick("account")}>Account</h2>
        <h2 onClick={() => handleNavClick("jobs")}>Jobs</h2>
        <h2 onClick={() => handleNavClick("history")}>History</h2>
        <h2 onClick={() => handleNavClick("profit")}>Profit</h2>
      </div>
      <div className="container-logout">
        <button className="btn-job logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavBar;
