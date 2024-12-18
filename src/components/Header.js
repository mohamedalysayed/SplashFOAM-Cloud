import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

function Header({ backToLanding }) {
  return (
    <header
      style={{
        background: "#000000", // Black background color
        color: "#ffffff", // White text
        display: "flex",
        justifyContent: "center", // Center-align content
        alignItems: "center", // Vertically center align
        padding: "20px", // Thick padding for a prominent header
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)", // Stronger shadow for depth
        fontFamily: "'Roboto', sans-serif", // Clean font style
        position: "relative", // Required for absolute positioning of logo
      }}
    >
      {/* Logo Text */}
      <span
        style={{
          position: "absolute", // Absolute position for the logo
          left: "20px", // Offset from the left edge
          fontSize: "36px", // Large size for the logo
          fontWeight: "bold", // Bold font
          color: "cyan", // Cyan text for visibility
          textShadow: "0px 4px 8px cyan", // Glow effect
        }}
      >
        SplashCloud
      </span>

      {/* Home Button */}
      {backToLanding && (
        <Link
          to="/"
          style={{
            textDecoration: "none", // Remove underline
            color: "#61dafb", // React's signature blue
            fontSize: "22px", // Slightly larger font size for emphasis
            fontWeight: "bold", // Bold font for visibility
            padding: "10px 30px", // Button-like padding
            borderRadius: "8px", // Rounded corners
            background: "rgba(97, 218, 251, 0.1)", // Subtle blue background
            boxShadow: "0px 2px 5px rgba(97, 218, 251, 0.5)", // Soft glow
            transition: "transform 0.2s ease, background 0.3s ease", // Smooth transitions
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(97, 218, 251, 0.3)";
            e.target.style.transform = "scale(1.1)"; // Slight zoom on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(97, 218, 251, 0.1)";
            e.target.style.transform = "scale(1)";
          }}
        >
          Home
        </Link>
      )}
    </header>
  );
}

export default Header;
