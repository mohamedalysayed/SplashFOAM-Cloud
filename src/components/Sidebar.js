import React, { useState } from "react";

function Sidebar({
  fileInputRef,
  setBackground,
  setAxesVisible,
  handleFileUpload,
  handleResetCamera,
  handleDownloadManual,
}) {
  const [profileMenuVisible, setProfileMenuVisible] = useState(false); // Toggles Profile dropdown

  return (
    <div style={{ width: "200px", padding: "10px", background: "#f0f0f0", boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)" }}>
      {/* Import Geometry */}
      <button
        onClick={() => fileInputRef.current.click()}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Import Geometry
      </button>

      {/* Profile Dropdown */}
      <div style={{ marginBottom: "10px" }}>
        <button
          onClick={() => setProfileMenuVisible((prev) => !prev)}
          style={{
            width: "100%",
            padding: "10px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Profile
        </button>

        {profileMenuVisible && (
          <div style={{ marginTop: "5px", paddingLeft: "10px" }}>
            {/* Background Color Selection */}
            <label style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "5px", display: "block" }}>
              Background Color:
            </label>
            <select
              onChange={(e) => setBackground(e.target.value)}
              style={{
                width: "90%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              <option value="lightcyan">Light Cyan</option>
              <option value="linear-gradient(black, grey)">Grey to Black</option>
              <option value="linear-gradient(black, white)">Black to White</option>
              <option value="black">Black</option> {/* New Black Option */}
              <option value="white">Plain White</option>
            </select>

            {/* Toggle Axes */}
            <button
              onClick={() => setAxesVisible((prev) => !prev)}
              style={{
                width: "90%",
                padding: "8px",
                marginBottom: "10px",
                background: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Toggle Axes
            </button>

            {/* Reset Camera */}
            <button
              onClick={handleResetCamera}
              style={{
                width: "90%",
                padding: "8px",
                marginBottom: "10px",
                background: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Reset Camera
            </button>
          </div>
        )}
      </div>

      {/* Physical Models (placeholder for future functionality) */}
      <button
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          background: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Physical Models
      </button>

      {/* Download Help Manual */}
      <button
        onClick={handleDownloadManual}
        style={{
          width: "100%",
          padding: "10px",
          background: "#17a2b8",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Download Manual
      </button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".stl"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
    </div>
  );
}

export default Sidebar;
