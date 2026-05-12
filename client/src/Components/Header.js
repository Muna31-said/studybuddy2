import { Navbar, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";

function Header() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [showMenu, setShowMenu] = useState(false);

  return (
    <Navbar style={navStyle}>
      {/* Logo */}
      <h3 style={{ margin: 0, fontWeight: "600" }}>
        <span style={{ color: "white" }}>Study</span>
        <span style={{ color: "#ffd54f" }}>Buddy</span>
      </h3>

      {/* Center Links */}
      <div style={centerLinks}>
        <Link
          to="/home"
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.color = "#ffd54f")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          Home
        </Link>

        <Link
          to="/add"
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.color = "#ffd54f")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          Add Skill
        </Link>

        <Link
          to="/request"
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.color = "#ffd54f")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          Request
        </Link>

        <Link
          to="/skills"
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.color = "#ffd54f")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          Skills
        </Link>

        <Link
          to="/about"
          style={linkStyle}
          onMouseEnter={(e) => (e.target.style.color = "#ffd54f")}
          onMouseLeave={(e) => (e.target.style.color = "white")}
        >
          About
        </Link>
      </div>

      {/* Right Side */}
      <div style={rightSection}>
        {/* User Menu */}
        <div style={{ position: "relative" }}>
          <div style={userSection} onClick={() => setShowMenu(!showMenu)}>
            <FaUserCircle size={35} />
            <span>{currentUser?.name}</span>
          </div>

          {showMenu && (
            <div style={dropdownStyle}>
              <p style={menuText}>
                <b>Name:</b> {currentUser?.name}
              </p>

              <p style={menuText}>
                <b>Email:</b> {currentUser?.email}
              </p>

              <button
                style={logoutButton}
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </Navbar>
  );
}

/* Styles */

const navStyle = {
  background: "#136756",
  padding: "15px 50px",
  display: "flex",
  alignItems: "center",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
};

const centerLinks = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "35px",
};

const rightSection = {
  marginLeft: "auto",
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

const userSection = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#ddeeea",
  fontWeight: "600",
  cursor: "pointer",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "500",
  fontSize: "15px",
  transition: "0.3s",
};

const searchStyle = {
  width: "220px",
  borderRadius: "20px",
  padding: "6px 12px",
  border: "none",
};

const dropdownStyle = {
  position: "absolute",
  top: "50px",
  right: 0,
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "15px",
  width: "220px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
  zIndex: 2000,
};

const menuText = {
  marginBottom: "10px",
  color: "#333",
  fontSize: "14px",
};

const logoutButton = {
  width: "100%",
  border: "none",
  padding: "10px",
  borderRadius: "8px",
  backgroundColor: "#e74c3c",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

export default Header;
