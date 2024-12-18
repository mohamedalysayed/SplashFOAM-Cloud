import React, { useState, useEffect } from "react";
import YAML from "yaml";

function SimulationSetup({ setSimulationParams }) {
  // State for Simulation Parameters
  const [simulationParams, setLocalSimulationParams] = useState({
    application: "simpleFoam",
    startTime: 0,
    endTime: 1,
    deltaT: 0.001,
    startFrom: "startTime",
    stopAt: "endTime",
    writeControl: "timeStep",
    writeInterval: 100,
    purgeWrite: 0,
    writeFormat: "binary",
    writePrecision: 6,
    writeCompression: "off",
    timeFormat: "general",
    timePrecision: 6,
    runTimeModifiable: "true",
    adjustTimeStep: "yes",
    maxCo: 0.5,
    functions: [],
    libs: [],
    allowSystemOperations: "true",
    runTimeControl: "adjustableRunTime",
  });

  // Synchronize local state with parent state
  useEffect(() => {
    setSimulationParams(simulationParams); // Push updates to parent
  }, [simulationParams, setSimulationParams]);

  // Handle input changes dynamically
  const handleInputChange = (field, value) => {
    setLocalSimulationParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Add item to dynamic arrays (functions/libs)
  const addItemToArray = (field) => {
    setLocalSimulationParams((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  // Remove item from dynamic arrays
  const removeItemFromArray = (field, index) => {
    setLocalSimulationParams((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Generate and download YAML file
  const downloadYAMLFile = () => {
    const yamlStr = YAML.stringify({ simulationSettings: simulationParams });
    const blob = new Blob([yamlStr], { type: "text/yaml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "simulationSettings.yaml";
    link.click();
  };

  return (
    <div
      style={{
        maxHeight: "500px",
        overflowY: "auto",
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "15px",
        background: "#f8f9fa",
      }}
    >
      <h2 style={{ textAlign: "center", color: "black", marginBottom: "20px" }}>
        Simulation Setup
      </h2>

      {/* General Parameters */}
      <h3>General Settings</h3>
      {["application", "startTime", "endTime", "deltaT"].map((field) => (
        <div key={field} style={{ marginBottom: "15px" }}>
          <label>{field}:</label>
          <input
            type={typeof simulationParams[field] === "number" ? "number" : "text"}
            value={simulationParams[field]}
            onChange={(e) =>
              handleInputChange(
                field,
                typeof simulationParams[field] === "number"
                  ? parseFloat(e.target.value) || 0
                  : e.target.value
              )
            }
            style={inputStyle}
          />
        </div>
      ))}

      {/* Dynamic Arrays for Functions and Libs */}
      <h3>Functions</h3>
      {simulationParams.functions.map((func, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            value={func}
            onChange={(e) => {
              const updatedFunctions = [...simulationParams.functions];
              updatedFunctions[index] = e.target.value;
              handleInputChange("functions", updatedFunctions);
            }}
            style={inputStyle}
          />
          <button
            onClick={() => removeItemFromArray("functions", index)}
            style={removeButtonStyle}
          >
            Remove
          </button>
        </div>
      ))}
      <button onClick={() => addItemToArray("functions")} style={addButtonStyle}>
        Add Function
      </button>

      <h3>Libraries</h3>
      {simulationParams.libs.map((lib, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            value={lib}
            onChange={(e) => {
              const updatedLibs = [...simulationParams.libs];
              updatedLibs[index] = e.target.value;
              handleInputChange("libs", updatedLibs);
            }}
            style={inputStyle}
          />
          <button
            onClick={() => removeItemFromArray("libs", index)}
            style={removeButtonStyle}
          >
            Remove
          </button>
        </div>
      ))}
      <button onClick={() => addItemToArray("libs")} style={addButtonStyle}>
        Add Library
      </button>

      {/* Download Button */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <button onClick={downloadYAMLFile} style={downloadButtonStyle}>
          Download Simulation Settings (.yaml)
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  marginBottom: "10px",
};

const addButtonStyle = {
  padding: "8px",
  background: "green",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "10px",
};

const removeButtonStyle = {
  marginLeft: "10px",
  padding: "5px",
  background: "red",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const downloadButtonStyle = {
  padding: "10px 20px",
  background: "cyan",
  color: "black",
  fontWeight: "bold",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.6)",
  transition: "transform 0.3s",
};

export default SimulationSetup;
