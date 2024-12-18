import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import cfdToolImageLight from "./assets/images/Splash-transparent.png"; // Import light mode image
import cfdToolImageDark from "./assets/images/CFD-Dose-i.png"; // Import dark mode image

function MainLandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode toggle
  const navigate = useNavigate(); // For navigation

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Theme styles based on dark mode state
  const theme = {
    backgroundColor: isDarkMode ? "#000000" : "#f8f9fa", // Background color of the page
    textColor: isDarkMode ? "cyan" : "#000000", // Text color based on mode
    buttonColor: isDarkMode ? "#222222" : "gray", // Button background color
    buttonTextColor: isDarkMode ? "cyan" : "#ffffff", // Button text color
    headerBackgroundColor: isDarkMode ? "#111111" : "#ffffff", // Header background color
    navLinkColor: isDarkMode ? "cyan" : "#000000", // Navigation link color
  };

  // Select the appropriate image based on dark mode
  const cfdToolImage = isDarkMode ? cfdToolImageDark : cfdToolImageLight;

  console.log("Current CFD Tool Image Path:", cfdToolImage); // Debugging

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: 0,
        padding: 0,
        backgroundColor: theme.backgroundColor,
        color: theme.textColor,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: theme.headerBackgroundColor,
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontWeight: "bold",
            color: theme.textColor,
            textShadow: isDarkMode
              ? "2px 2px 4px rgba(255, 255, 255, 0.3)"
              : "2px 2px 4px rgba(0, 0, 0, 0.3)", // Shadow for logo
          }}
        >
          SplashCloud
        </h1>
        <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <a
            href="https://www.cfddose.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: theme.navLinkColor,
              fontWeight: "bold",
            }}
          >
            Home
          </a>
          <a
            href="https://www.cfddose.com/splashfoam-v1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: theme.navLinkColor,
              fontWeight: "bold",
            }}
          >
            About
          </a>
          <a
            href="https://www.cfddose.com/sign-up"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: theme.navLinkColor,
              fontWeight: "bold",
            }}
          >
            Login
          </a>
          <a
            href="https://www.cfddose.com/sign-up"
            style={{
              textDecoration: "none",
              color: theme.buttonTextColor,
              backgroundColor: theme.buttonColor,
              padding: "5px 10px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </a>
          {/* Dark Mode Toggle */}
          <div style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}>
            <label style={{ fontSize: "14px", color: theme.navLinkColor, marginRight: "8px" }}>
              Dark Mode
            </label>
            <div
              style={{
                position: "relative",
                width: "40px",
                height: "20px",
                backgroundColor: theme.buttonColor,
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={toggleTheme}
            >
              <div
                style={{
                  position: "absolute",
                  top: "2px",
                  left: isDarkMode ? "20px" : "2px",
                  width: "16px",
                  height: "16px",
                  backgroundColor: theme.buttonTextColor,
                  borderRadius: "50%",
                  transition: "left 0.3s",
                }}
              ></div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          flex: 1,
          padding: "20px",
        }}
      >
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>
            An Online Case Generator for OpenFOAM Users
          </h1>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.6",
              maxWidth: "800px",
              margin: "0 auto",
              marginBottom: "20px", // Adjust spacing
            }}
          >
            SplashCloud makes it easy to prepare, visualize, and analyze CFD
            cases directly in your browser with an intuitive and modern user
            interface.
          </p>
          <hr
            style={{
              width: "80%",
              border: isDarkMode
                ? "1px solid rgba(255, 255, 255, 0.2)"
                : "1px solid rgba(0, 0, 0, 0.1)", // Subtle divider line
              margin: "20px auto", // Spacing for divider
            }}
          />
        </div>

        {/* Image */}
        <div style={{ marginBottom: "20px" }}>
          <img
            src={cfdToolImage}
            alt="CFD Visualization"
            style={{
              maxWidth: "90%",
              maxHeight: "450px",
              borderRadius: "10px",
              boxShadow: isDarkMode ? "0px 6px 8px rgba(0, 0, 0, 0.2)" : "none",
              backgroundColor: isDarkMode ? "transparent" : "#f8f9fa",
              opacity: isDarkMode ? 1 : 0.98, // Subtle blending effect
              border: isDarkMode ? "none" : "1px solid #f8f9fa",
            }}
            onError={(e) => {
              console.error("Image failed to load:", e.target.src);
              e.target.style.display = "none"; // Hide image if it fails to load
            }}
          />
        </div>

        {/* Get Started Button */}
        <button
          onClick={() => {
            console.log("Navigating to /splashcloud");
            navigate("/splashcloud");
          }}
          style={{
            padding: "12px 24px",
            backgroundColor: theme.textColor,
            color: theme.backgroundColor,
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </main>
    </div>
  );
}

export default MainLandingPage;
