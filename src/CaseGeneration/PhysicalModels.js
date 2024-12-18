import React, { useState, useEffect } from "react";

function PhysicalModels({ setPhysicalModels }) {
  // State for Physical Models
  const [physicalModels, setLocalPhysicalModels] = useState({
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
      },
      laplacianSchemes: { default: "Gauss linear limited 0.5" },
      relaxationFactors: { U: 0.7, k: 0.7, omega: 0.7, p: 0.3 },
    },
    solverSettings: {
      U: { type: "PBiCGStab", preconditioner: "DILU", tolerance: 1.0e-5, relTol: 0.01 },
      p: { type: "PCG", preconditioner: "DIC", tolerance: 1.0e-5, relTol: 0.01 },
    },
  });

  // Synchronize local state with parent state
  useEffect(() => {
    setPhysicalModels(physicalModels);
  }, [physicalModels, setPhysicalModels]);

  // Handle input changes dynamically
  const handleInputChange = (field, value, subField, subSubField) => {
    setLocalPhysicalModels((prev) => {
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

  // Add or remove gravity components dynamically
  const handleAddGravity = () => {
    setLocalPhysicalModels((prev) => ({
      ...prev,
      g: [...prev.g, 0],
    }));
  };

  const handleRemoveGravity = (index) => {
    setLocalPhysicalModels((prev) => ({
      ...prev,
      g: prev.g.filter((_, i) => i !== index),
    }));
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
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Physical Models</h2>

      {/* General Parameters */}
      <div>
        <label>Density (rho):</label>
        <input
          type="number"
          value={physicalModels.rho}
          onChange={(e) => handleInputChange("rho", parseFloat(e.target.value) || 1.0)}
          style={inputStyle}
        />
      </div>
      <div>
        <label>Kinematic Viscosity (nu):</label>
        <input
          type="number"
          value={physicalModels.nu}
          onChange={(e) => handleInputChange("nu", parseFloat(e.target.value) || 1.0e-6)}
          style={inputStyle}
        />
      </div>

      {/* Gravity */}
      <h3>Gravity (g)</h3>
      {physicalModels.g.map((value, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center" }}>
          <label>g[{index}]:</label>
          <input
            type="number"
            value={value}
            onChange={(e) => {
              const updatedG = [...physicalModels.g];
              updatedG[index] = parseFloat(e.target.value) || 0;
              handleInputChange("g", updatedG);
            }}
            style={inputStyle}
          />
          <button
            onClick={() => handleRemoveGravity(index)}
            style={{
              marginLeft: "10px",
              padding: "5px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={handleAddGravity}
        style={{
          marginTop: "10px",
          padding: "8px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Add Gravity Component
      </button>

      {/* Numerical Settings */}
      <h3>Numerical Settings</h3>
      {Object.entries(physicalModels.numericalSettings).map(([key, value]) => (
        <div key={key}>
          <label>{key}:</label>
          <input
            type="text"
            value={value.default || ""}
            onChange={(e) =>
              handleInputChange("numericalSettings", e.target.value, key, "default")
            }
            style={inputStyle}
          />
        </div>
      ))}

      {/* Solver Settings */}
      <h3>Solver Settings</h3>
      {Object.entries(physicalModels.solverSettings).map(([solver, settings]) => (
        <div key={solver} style={{ marginBottom: "10px" }}>
          <label>{solver} Type:</label>
          <input
            type="text"
            value={settings.type || ""}
            onChange={(e) =>
              handleInputChange("solverSettings", e.target.value, solver, "type")
            }
            style={inputStyle}
          />
          <label>Preconditioner:</label>
          <input
            type="text"
            value={settings.preconditioner || ""}
            onChange={(e) =>
              handleInputChange("solverSettings", e.target.value, solver, "preconditioner")
            }
            style={inputStyle}
          />
        </div>
      ))}
    </div>
  );
}

const inputStyle = {
  marginLeft: "10px",
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  width: "80%",
  marginBottom: "10px",
};

export default PhysicalModels;
