import React, { useState } from "react";
import MeshParameters from "../CaseGeneration/MeshParameters"; // Import MeshParameters
import PhysicalModels from "../CaseGeneration/PhysicalModels"; // Import PhysicalModels
import GenerateCase from "../CaseGeneration/GenerateCase"; // Import GenerateCase
import BlockMesh from "../CaseGeneration/BlockMesh"; // Import BlockMesh
import SimulationSetup from "../CaseGeneration/SimulationSetup"; // Setup simulation for run 

function Sidebar({
  fileInputRef,
  setBackground,
  setAxesVisible,
  handleFileUpload,
  handleResetCamera,
  handleDownloadManual,
  handleGenerateCase,
}) {
  const [profileMenuVisible, setProfileMenuVisible] = useState(false); // Toggles Profile dropdown
  const [meshParametersVisible, setMeshParametersVisible] = useState(false); // Toggles Mesh Parameters section
  const [physicalModelsVisible, setPhysicalModelsVisible] = useState(false); // Toggles Physical Models section
  const [blockMeshVisible, setBlockMeshVisible] = useState(false); // Toggles Generate Case section
  const [simulationSetupVisible, setSimulationSetupVisible] = useState(false); // Toggles Generate Case section


  return (
    <div
      style={{
        width: "350px", // Sidebar width
        padding: "15px",
        background: "#000000", // Fully black background
        boxShadow: "0 0 0 rgba(0, 0, 0, 0)", // Removed any visible shadow or edges
        borderRadius: "0px", // Removed rounding for seamless integration
        overflowY: "auto", // Enable vertical scrolling
        maxHeight: "100vh", // Restrict sidebar height to viewport height
      }}
    >
      {/* Import Geometry */}
      <button
        onClick={() => fileInputRef.current.click()}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          background: "cyan", // Unified button color
          color: "black",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Professional shadow
          transition: "background 0.3s, transform 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#00c9d9")} // Hover effect
        onMouseLeave={(e) => (e.target.style.background = "cyan")}
      >
        Import Geometry
      </button>
{/* BlockMesh Tester */}
<button
        onClick={() => setBlockMeshVisible((prev) => !prev)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          background: "cyan", // Unified button color
          color: "black",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#00c9d9")}
        onMouseLeave={(e) => (e.target.style.background = "cyan")}
      >
        BlockMesh (Testeing) {blockMeshVisible ? "▲" : "▼"}
      </button>
      {blockMeshVisible && (
        <div
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "15px", // Chamfered edges for smooth visuals
            background: "#f8f9fa",
            marginBottom: "15px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Slight shadow for definition
          }}
        >
          <BlockMesh />
        </div>
      )}

      {/* Mesh Parameters */}
      <button
        onClick={() => setMeshParametersVisible((prev) => !prev)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          background: "cyan", // Unified button color
          color: "black",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#00c9d9")}
        onMouseLeave={(e) => (e.target.style.background = "cyan")}
      >
        Mesh Parameters {meshParametersVisible ? "▲" : "▼"}
      </button>
      {meshParametersVisible && (
        <div
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "15px", // Chamfered edges for smooth visuals
            background: "#f8f9fa",
            marginBottom: "15px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Slight shadow for definition
          }}
        >
          <MeshParameters />
        </div>
      )}

      {/* Physical Models */}
      <button
        onClick={() => setPhysicalModelsVisible((prev) => !prev)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          background: "cyan", // Unified button color
          color: "black",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#00c9d9")}
        onMouseLeave={(e) => (e.target.style.background = "cyan")}
      >
        Physical Models {physicalModelsVisible ? "▲" : "▼"}
      </button>
      {physicalModelsVisible && (
        <div
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "15px", // Chamfered edges for smooth visuals
            background: "#f8f9fa",
            marginBottom: "15px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Slight shadow for definition
          }}
        >
          <PhysicalModels />
        </div>
      )}

{/* Configure Simulation Setup */}
<button
        onClick={() => setSimulationSetupVisible((prev) => !prev)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          background: "cyan", // Unified button color
          color: "black",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#00c9d9")}
        onMouseLeave={(e) => (e.target.style.background = "cyan")}
      >
        Simulation Setup {simulationSetupVisible ? "▲" : "▼"}
      </button>
      {simulationSetupVisible && (
        <div
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "15px", // Chamfered edges for smooth visuals
            background: "#f8f9fa",
            marginBottom: "15px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Slight shadow for definition
          }}
        >
          <SimulationSetup />
        </div>
      )}
      
      {/* Generate Case */}
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Center the button horizontally
          marginBottom: "15px", // Add spacing at the bottom
        }}
      >
        <button
          onClick={handleGenerateCase} // Trigger the Generate Case functionality
          style={{
            width: "90%",
            padding: "12px",
            background: "gray", // Default button color
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow
            transition: "background 0.3s, color 0.3s, transform 0.2s, box-shadow 0.2s", // Smooth transitions
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "lightcyan"; // Change background color
            e.target.style.color = "black"; // Change text color
            e.target.style.transform = "scale(1.1)"; // Slight zoom
            e.target.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2)"; // Add deeper shadow
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "gray"; // Reset background color
            e.target.style.color = "white"; // Reset text color
            e.target.style.transform = "scale(1)"; // Reset zoom
            e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"; // Reset shadow
          }}
          onMouseDown={(e) => {
            e.target.style.transform = "scale(0.95)"; // Button press effect
            e.target.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)"; // Reduce shadow on press
          }}
          onMouseUp={(e) => {
            e.target.style.transform = "scale(1.1)"; // Return to hover zoom
            e.target.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.2)"; // Return hover shadow
          }}
        >
          Generate Case
        </button>
      </div>

      {/* Divider */}
      <hr
        style={{
          width: "90%",
          margin: "15px auto",
          border: "1px solid #555555", // Subtle divider for black background
        }}
      />

      {/* Download Help Manual */}
      <button
        onClick={handleDownloadManual}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px", // Added margin for spacing
          background: "cyan", // Unified button color
          color: "black",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.background = "#00c9d9")}
        onMouseLeave={(e) => (e.target.style.background = "cyan")}
      >
        Download Manual
      </button>

      {/* Profile Dropdown */}
      <div>
        <button
          onClick={() => setProfileMenuVisible((prev) => !prev)}
          style={{
            width: "100%",
            padding: "12px",
            background: "cyan", // Unified button color
            color: "black",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Professional shadow
            transition: "background 0.3s, transform 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Center text and arrow
            position: "relative", // Required for arrow positioning
          }}
          onMouseEnter={(e) => (e.target.style.background = "#00c9d9")}
          onMouseLeave={(e) => (e.target.style.background = "cyan")}
        >
          Profile Theme
          <span
            style={{
              fontSize: "12px",
              position: "absolute", // Make arrow independent of text
              right: "10px", // Position arrow to the right
              transform: profileMenuVisible ? "rotate(180deg)" : "rotate(0deg)", // Rotate arrow
              transition: "transform 0.3s",
              background: "cyan", // Cyan background for the arrow
              padding: "2px 4px", // Add padding for visibility
              borderRadius: "4px", // Rounded for better appearance
            }}
          >
            ▼
          </span>
        </button>

        {profileMenuVisible && (
          <div style={{ marginTop: "10px", paddingLeft: "10px" }}>
            {/* Background Color Selection */}
            <label
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "white", // White label for visibility
                display: "block",
              }}
            >
              Background Color:
            </label>
            <select
              onChange={(e) => setBackground(e.target.value)}
              style={{
                width: "90%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "14px",
              }}
            >
              <option value="lightcyan">Light Cyan</option>
              <option value="linear-gradient(black, grey)">Grey to Black</option>
              <option value="linear-gradient(black, white)">Black to White</option>
              <option value="black">Black</option>
              <option value="white">Plain White</option>
            </select>

            {/* Toggle Axes */}
            <button
              onClick={() => setAxesVisible((prev) => !prev)}
              style={{
                width: "90%",
                padding: "8px",
                marginBottom: "10px",
                background: "cyan", // Unified button color
                color: "black",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#00c9d9")}
              onMouseLeave={(e) => (e.target.style.background = "cyan")}
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
                background: "cyan", // Unified button color
                color: "black",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#00c9d9")}
              onMouseLeave={(e) => (e.target.style.background = "cyan")}
            >
              Reset Camera
            </button>
          </div>
        )}
      </div>

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
