import React from "react";

const About = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4fffb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
          maxWidth: "700px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Title */}
        <h1
          style={{
            color: "#16a085",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          About StudyBuddy
        </h1>

        {/* Description */}
        <p
          style={{
            color: "#555",
            fontSize: "18px",
            lineHeight: "1.8",
          }}
        >
          StudyBuddy is a skill-sharing platform developed to help students
          connect, collaborate, and learn from each other. Students can add
          skills, send requests, manage learning sessions, and communicate
          easily through the platform.
        </p>

        {/* Features */}
        <div
          style={{
            marginTop: "30px",
            textAlign: "left",
          }}
        >
          <h3
            style={{
              color: "#16a085",
              marginBottom: "15px",
            }}
          >
            Main Features
          </h3>

          <ul
            style={{
              color: "#555",
              fontSize: "17px",
              lineHeight: "2",
            }}
          >
            <li>User Authentication</li>

            <li>Add, Update, and Delete Skills</li>

            <li>Send and Manage Skill Requests</li>

            <li>Search Skills by Name or City</li>

            <li>Location-Based Service</li>

            <li>Voice Call Availability</li>
          </ul>
        </div>

        {/* Developer */}
        <div
          style={{
            marginTop: "30px",
          }}
        >
          <h3
            style={{
              color: "#16a085",
            }}
          >
            Developer
          </h3>

          <p
            style={{
              color: "#555",
              fontSize: "17px",
            }}
          >
            Developed by: Mona
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
