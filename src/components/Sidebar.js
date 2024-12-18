import React, { useState } from "react";
import MeshParameters from "../CaseGeneration/MeshParameters";
import PhysicalModels from "../CaseGeneration/PhysicalModels";
import SimulationSetup from "../CaseGeneration/SimulationSetup";

function Sidebar({
  fileInputRef,
  setBackground,
  setAxesVisible,
  handleFileUpload,
  handleResetCamera,
  handleDownloadManual,
  setMeshParams, // Update mesh parameters state in parent
  setPhysicalModels, // Update physical models state in parent
  setSimulationParams, // Update simulation parameters state in parent
}) {
  // Dropdown visibility states
  const [meshParametersVisible, setMeshParametersVisible] = useState(false);
  const [physicalModelsVisible, setPhysicalModelsVisible] = useState(false);
  const [simulationSetupVisible, setSimulationSetupVisible] = useState(false);

  return (
    <div
      style={{
        width: "350px",
        padding: "15px",
        background: "#000000",
        overflowY: "auto",
        maxHeight: "100vh",
      }}
    >
      {/* Import Geometry */}
      <button
        onClick={() => fileInputRef.current.click()}
        style={buttonStyle}
      >
        Import Geometry
      </button>

      {/* Mesh Parameters */}
      <button
        onClick={() => setMeshParametersVisible((prev) => !prev)}
        style={buttonStyle}
      >
        Mesh Parameters {meshParametersVisible ? "▲" : "▼"}
      </button>
      {meshParametersVisible && (
        <div style={dropdownStyle}>
          <MeshParameters setMeshParams={setMeshParams} />
        </div>
      )}

      {/* Physical Models */}
      <button
        onClick={() => setPhysicalModelsVisible((prev) => !prev)}
        style={buttonStyle}
      >
        Physical Models {physicalModelsVisible ? "▲" : "▼"}
      </button>
      {physicalModelsVisible && (
        <div style={dropdownStyle}>
          <PhysicalModels setPhysicalModels={setPhysicalModels} />
        </div>
      )}

      {/* Simulation Setup */}
      <button
        onClick={() => setSimulationSetupVisible((prev) => !prev)}
        style={buttonStyle}
      >
        Simulation Setup {simulationSetupVisible ? "▲" : "▼"}
      </button>
      {simulationSetupVisible && (
        <div style={dropdownStyle}>
          <SimulationSetup setSimulationParams={setSimulationParams} />
        </div>
      )}

      {/* Download Manual */}
      <button
        onClick={handleDownloadManual}
        style={buttonStyle}
      >
        Download Manual
      </button>

      {/* Toggle Axes */}
      <button
        onClick={() => setAxesVisible((prev) => !prev)}
        style={buttonStyle}
      >
        Toggle Axes
      </button>

      {/* Reset Camera */}
      <button
        onClick={handleResetCamera}
        style={buttonStyle}
      >
        Reset Camera
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

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  background: "cyan",
  color: "black",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "background 0.3s",
};

const dropdownStyle = {
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "15px",
  background: "#f8f9fa",
  marginBottom: "15px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

export default Sidebar;
