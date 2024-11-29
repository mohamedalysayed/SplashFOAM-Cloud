import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import cfdToolImage from "./assets/images/racing-car.jpg"; // Importing the CFD visualization image

function MainLandingPage() {
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode toggle
  const navigate = useNavigate(); // For navigation

  // Toggle between light and dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Theme styles based on dark mode state
  const theme = {
    backgroundColor: isDarkMode ? "#000000" : "#f8f9fa",
    textColor: isDarkMode ? "cyan" : "#000000",
    buttonColor: isDarkMode ? "#222222" : "gray",
    buttonTextColor: isDarkMode ? "cyan" : "#ffffff",
    headerBackgroundColor: isDarkMode ? "#111111" : "#ffffff",
    navLinkColor: isDarkMode ? "cyan" : "#000000",
  };

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
        <h1 style={{ margin: 0, fontWeight: "bold", color: theme.textColor }}>
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
        {/* Title and Description */}
        <div style={{ marginBottom: "30px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "10px" }}>
            A Dynamic Framework for OpenFOAM Users
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "1.6", maxWidth: "800px", margin: "0 auto" }}>
            SplashCloud makes it easy to prepare, visualize, and analyze CFD
            cases directly in your browser with an intuitive and modern user
            interface.
          </p>
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
              boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>

        {/* Get Started Button */}
        <button
            onClick={() => {
                console.log("Navigating to /splashcloud"); // Debugging log
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
