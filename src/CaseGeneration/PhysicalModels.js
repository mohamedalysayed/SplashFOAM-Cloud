import React, { useState } from "react";
import YAML from "yaml";

function PhysicalModels() {
  const [physicalModels, setPhysicalModels] = useState({
    name: "physicalProperties",
    rho: 1.0,
    nu: 1.0e-6,
    g: [0, 0, -9.81],
    pRef: 0,
    Cp: 1000,
    thermo: "hPolynomial",
    Pr: 0.7,
    TRef: 300,
    turbulenceModel: "kOmegaSST",
    numericalSettings: {
      ddtSchemes: { default: "Euler" },
      gradSchemes: {
        default: "Gauss linear",
        "grad(p)": "Gauss linear",
        "grad(U)": "faceMDLimited Gauss linear 0.5",
      },
      divSchemes: {
        default: "Gauss linear",
        "div(phi,U)": "Gauss linearUpwind grad(U)",
        "div(phi,k)": "Gauss upwind",
        "div(phi,omega)": "Gauss upwind",
      },
      laplacianSchemes: { default: "Gauss linear limited 0.5" },
      relaxationFactors: { U: 0.7, k: 0.7, omega: 0.7, epsilon: 0.7, p: 0.3 },
    },
    solverSettings: {
      U: { type: "PBiCGStab", preconditioner: "DILU", tolerance: 1.0e-5, relTol: 0.01 },
      p: { type: "PCG", preconditioner: "DIC", tolerance: 1.0e-5, relTol: 0.01 },
      k: { type: "PBiCGStab", preconditioner: "DILU", tolerance: 1.0e-5, relTol: 0.01 },
      omega: { type: "PBiCGStab", preconditioner: "DILU", tolerance: 1.0e-5, relTol: 0.01 },
    },
  });

  const [expandedSections, setExpandedSections] = useState({
    general: false, // All sections are now closed by default
    numericalSettings: false,
    solverSettings: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleInputChange = (field, value, subField, subSubField) => {
    setPhysicalModels((prev) => {
      if (subSubField) {
        return {
          ...prev,
          [field]: {
            ...prev[field],
            [subField]: { ...prev[field][subField], [subSubField]: value },
          },
        };
      }
      if (subField) {
        return {
          ...prev,
          [field]: { ...prev[field], [subField]: value },
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleDownloadYaml = () => {
    const yamlStr = YAML.stringify({ physicalProperties: physicalModels });
    const blob = new Blob([yamlStr], { type: "text/yaml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "physicalProperties.yaml";
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
      {/* Title */}
      <h2
        style={{
          textAlign: "center",
          color: "black",
          marginBottom: "20px",
        }}
      >
        Physical Models
      </h2>

      {/* General Parameters */}
      <button onClick={() => toggleSection("general")} style={{ marginBottom: "10px", width: "100%" }}>
        Physical Properties {expandedSections.general ? "▲" : "▼"}
      </button>
      {expandedSections.general && (
        <div>
          <div>
            <label>
              Density (rho):
              <input
                type="number"
                value={physicalModels.rho}
                onChange={(e) => handleInputChange("rho", parseFloat(e.target.value))}
                style={{
                  marginLeft: "10px",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  width: "80%",
                  marginBottom: "10px",
                }}
              />
            </label>
          </div>
          {/* Additional General Parameters */}
          {/* Add more fields here */}
        </div>
      )}

      {/* Numerical Settings */}
      <button onClick={() => toggleSection("numericalSettings")} style={{ marginBottom: "10px", width: "100%" }}>
        Numerical Settings {expandedSections.numericalSettings ? "▲" : "▼"}
      </button>
      {expandedSections.numericalSettings && (
        <div>
          <div>
            <label>
              Default DDT Scheme:
              <select
                value={physicalModels.numericalSettings.ddtSchemes.default}
                onChange={(e) =>
                  handleInputChange("numericalSettings", e.target.value, "ddtSchemes", "default")
                }
                style={{
                  marginLeft: "10px",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  width: "80%",
                  marginBottom: "10px",
                }}
              >
                <option value="Euler">Euler</option>
                <option value="Backward">Backward</option>
              </select>
            </label>
          </div>
          {/* Add more Numerical Settings fields */}
        </div>
      )}

      {/* Solver Settings */}
      <button onClick={() => toggleSection("solverSettings")} style={{ marginBottom: "10px", width: "100%" }}>
        Solver Settings {expandedSections.solverSettings ? "▲" : "▼"}
      </button>
      {expandedSections.solverSettings && (
        <div>
          <div>
            <label>
              U - Solver Type:
              <select
                value={physicalModels.solverSettings.U.type}
                onChange={(e) => handleInputChange("solverSettings", e.target.value, "U", "type")}
                style={{
                  marginLeft: "10px",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                  width: "80%",
                  marginBottom: "10px",
                }}
              >
                <option value="PBiCGStab">PBiCGStab</option>
                <option value="PCG">PCG</option>
              </select>
            </label>
          </div>
          {/* Add more Solver Settings fields */}
        </div>
      )}

      {/* Download Button */}
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
          }}
        >
          Download Physical Properties (.yaml)
        </button>
      </div>
    </div>
  );
}

export default PhysicalModels;
