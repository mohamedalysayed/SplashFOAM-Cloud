import React, { useState } from "react";

function BlockMesh({ onGenerateMesh }) {
  const [meshParams, setMeshParams] = useState({
    minx: 0,
    maxx: 1,
    miny: 0,
    maxy: 1,
    minz: 0,
    maxz: 1,
    nx: 10,
    ny: 10,
    nz: 10,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMeshParams((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const handleGenerateMesh = () => {
    if (onGenerateMesh) {
      onGenerateMesh(meshParams); // Pass mesh params back to parent
    }
  };

  return (
    <div style={{ padding: "10px", background: "#f8f9fa", borderRadius: "8px" }}>
      <h2>BlockMesh Parameters</h2>
      <div style={{ marginBottom: "10px" }}>
        {["minx", "maxx", "miny", "maxy", "minz", "maxz"].map((param) => (
          <div key={param} style={{ marginBottom: "8px" }}>
            <label style={{ marginRight: "8px" }}>{param}:</label>
            <input
              type="number"
              name={param}
              value={meshParams[param]}
              onChange={handleInputChange}
              style={{
                padding: "6px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </div>
        ))}
        <div>
          <h4>Resolution:</h4>
          {["nx", "ny", "nz"].map((param) => (
            <div key={param} style={{ marginBottom: "8px" }}>
              <label style={{ marginRight: "8px" }}>{param}:</label>
              <input
                type="number"
                name={param}
                value={meshParams[param]}
                onChange={handleInputChange}
                style={{
                  padding: "6px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleGenerateMesh}
          style={{
            padding: "10px 15px",
            background: "cyan",
            color: "black",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Generate Mesh
        </button>
      </div>
    </div>
  );
}

export default BlockMesh;
