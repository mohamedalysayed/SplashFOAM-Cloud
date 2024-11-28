import React from "react";
import generateHelpManual from "../utils/generateHelpManual";

function Sidebar({
  fileInputRef,
  setBackground,
  setAxesVisible,
  handleFileUpload,
  handleResetCamera,
}) {
  return (
    <div style={{ width: "200px", padding: "10px", background: "#f0f0f0" }}>
      <button
        onClick={() => fileInputRef.current.click()}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      >
        Load Geometry
      </button>
      <select
        onChange={(e) => setBackground(e.target.value)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      >
        <option value="linear-gradient(black, white)">Black to White</option>
        <option value="lightcyan">Light Cyan</option>
        <option value="white">Plain White</option>
      </select>
      <button
        onClick={() => setAxesVisible((prev) => !prev)}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      >
        Toggle Axes
      </button>
      <button
        onClick={handleResetCamera}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      >
        Reset Camera
      </button>
      <button
        onClick={generateHelpManual}
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      >
        Download Help Manual
      </button>
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