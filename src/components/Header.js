import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

function Header({ backToLanding }) {
  return (
    <header
      style={{
        textAlign: "center",
        fontSize: "32px", // Larger font size for better emphasis
        fontWeight: "900", // Bold and strong font weight
        //background: "#282c34", // Header background color
        background: "#000000", // Black background color
        color: "#ffffff", // Primary text color
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px", // Increased padding for a thicker bar
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
        fontFamily: "'Roboto', sans-serif", // Professional and clean font
      }}
    >
      {/* Logo text with cyan shadow */}
      <span
        style={{
          textShadow: "0px 2px 5px cyan", // Cyan glow effect
          fontSize: "36px", // Larger font size for the logo
        }}
      >
        SplashCloud
      </span>

      {/* Navigation link */}
      {backToLanding && (
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#61dafb", // React's signature blue for the Home link
            fontSize: "20px", // Slightly larger size for better visibility
            fontWeight: "bold",
            padding: "10px 20px", // Add padding for a button-like appearance
            borderRadius: "6px", // Rounded edges
            background: "rgba(97, 218, 251, 0.1)", // Subtle hover effect
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.background = "rgba(97, 218, 251, 0.2)")} // Highlight on hover
          onMouseLeave={(e) => (e.target.style.background = "rgba(97, 218, 251, 0.1)")}
        >
          Home
        </Link>
      )}
    </header>
  );
}

export default Header;
