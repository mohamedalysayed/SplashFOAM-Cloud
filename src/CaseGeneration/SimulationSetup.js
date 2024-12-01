import React, { useState } from "react";
import YAML from "yaml";

function SimulationSetup() {
  const [simulationParams, setSimulationParams] = useState({
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

  const handleInputChange = (field, value) => {
    setSimulationParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDownloadYaml = () => {
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
        maxHeight: "500px", // Scrollable area
        overflowY: "auto",
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "15px", // Chamfered edges for smooth visuals
        background: "#f8f9fa",
      }}
    >
      {/* Title */}
      <h2
        style={{
          textAlign: "center",
          color: "black",
          marginBottom: "20px",
        }}
      >
        Simulation Setup
      </h2>

      {/* Dynamic Fields */}
      {Object.keys(simulationParams).map((field) => (
        <div key={field} style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              fontWeight: "bold",
              marginBottom: "5px",
            }}
          >
            {field}:
          </label>
          {Array.isArray(simulationParams[field]) ? (
            <textarea
              value={simulationParams[field].join("\n")}
              onChange={(e) =>
                handleInputChange(
                  field,
                  e.target.value.split("\n").filter((line) => line.trim() !== "")
                )
              }
              style={{
                width: "100%",
                height: "80px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
                resize: "vertical",
              }}
              placeholder={`Enter each value on a new line for ${field}`}
            />
          ) : (
            <input
              type={
                typeof simulationParams[field] === "number"
                  ? "number"
                  : "text"
              }
              value={simulationParams[field]}
              onChange={(e) =>
                handleInputChange(
                  field,
                  typeof simulationParams[field] === "number"
                    ? parseFloat(e.target.value) || 0
                    : e.target.value
                )
              }
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd",
              }}
            />
          )}
        </div>
      ))}

      {/* Centered Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={handleDownloadYaml}
          style={{
            padding: "10px 20px",
            background: "cyan",
            color: "black",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.6)", // Black shadow
            transition: "transform 0.3s", // Smooth scaling effect on hover
          }}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")} // Slight zoom on hover
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")} // Reset scale
        >
          Download Simulation Settings (.yaml)
        </button>
      </div>
    </div>
  );
}

export default SimulationSetup;
