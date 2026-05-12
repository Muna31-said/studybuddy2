function Footer() {
  return (
    <div style={footerStyle}>
      {/* Logo */}
      <h4 style={{ margin: "0", fontWeight: "600" }}>
        <span style={{ color: "white" }}>Study</span>
        <span style={{ color: "#f3bf14" }}>Buddy</span>
      </h4>

      {/* Text */}
      <p style={textStyle}>
        Connecting students to share skills, learn, and grow together.
      </p>

      {/* Copyright */}
      <p style={copyStyle}>© 2026 StudyBuddy. All rights reserved.</p>
    </div>
  );
}

/* 🔥 Styles */

const footerStyle = {
  background: "#16a085",
  color: "white",
  textAlign: "center",
  padding: "30px 20px",
  marginTop: "50px",
};

const textStyle = {
  marginTop: "10px",
  color: "#e0f2f1",
  fontSize: "14px",
};

const copyStyle = {
  marginTop: "20px",
  fontSize: "12px",
  color: "#c8e6e5",
};

export default Footer;
