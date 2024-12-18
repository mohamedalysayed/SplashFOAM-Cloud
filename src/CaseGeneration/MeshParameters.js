import React, { useState, useEffect } from "react";

function MeshParameters({ setMeshParams }) {
  // State for Mesh Parameters
  const [meshParams, setLocalMeshParams] = useState({
    name: "meshSettings",
    scale: 1.0,
    domain: {
      minx: -3.0,
      maxx: 5.0,
      miny: -1.0,
      maxy: 1.0,
      minz: 0.0,
      maxz: 2.0,
      nx: 50,
      ny: 20,
      nz: 20,
    },
    patches: [
      { name: "inlet", type: "patch", faces: [0, 4, 7, 3] },
      { name: "outlet", type: "patch", faces: [1, 5, 6, 2] },
    ],
    snappyHexSteps: {
      castellatedMesh: "true",
      snap: "true",
      addLayers: "true",
    },
  });

  // Synchronize local state with parent state
  useEffect(() => {
    setMeshParams(meshParams);
  }, [meshParams, setMeshParams]);

  // Handle input changes dynamically
  const handleInputChange = (field, value, subField) => {
    setLocalMeshParams((prev) => {
      if (subField) {
        return {
          ...prev,
          [field]: { ...prev[field], [subField]: value },
        };
      }
      return { ...prev, [field]: value };
    });
  };

  // Add a new patch dynamically
  const handleAddPatch = () => {
    setLocalMeshParams((prev) => ({
      ...prev,
      patches: [
        ...prev.patches,
        { name: "newPatch", type: "patch", faces: [] }, // Default new patch
      ],
    }));
  };

  // Remove a patch dynamically
  const handleRemovePatch = (index) => {
    setLocalMeshParams((prev) => ({
      ...prev,
      patches: prev.patches.filter((_, i) => i !== index),
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
      <h2 style={{ textAlign: "center", color: "black", marginBottom: "20px" }}>
        Mesh Parameters
      </h2>

      {/* Mesh Name */}
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={meshParams.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Scale */}
      <div>
        <label>Scale:</label>
        <input
          type="number"
          value={meshParams.scale}
          onChange={(e) =>
            handleInputChange("scale", parseFloat(e.target.value) || 1.0)
          }
          style={inputStyle}
        />
      </div>

      {/* Domain Specifications */}
      <h3>Domain</h3>
      {Object.keys(meshParams.domain).map((key) => (
        <div key={key}>
          <label>{key}:</label>
          <input
            type="number"
            value={meshParams.domain[key]}
            onChange={(e) =>
              handleInputChange("domain", parseFloat(e.target.value) || 0, key)
            }
            style={inputStyle}
          />
        </div>
      ))}

      {/* Patches */}
      <h3>Patches</h3>
      {meshParams.patches.map((patch, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <label>Patch {index + 1} Name:</label>
          <input
            type="text"
            value={patch.name}
            onChange={(e) => {
              const updatedPatches = [...meshParams.patches];
              updatedPatches[index].name = e.target.value;
              setLocalMeshParams((prev) => ({
                ...prev,
                patches: updatedPatches,
              }));
            }}
            style={inputStyle}
          />
          <button
            onClick={() => handleRemovePatch(index)}
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
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
        onClick={handleAddPatch}
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
        Add Patch
      </button>
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

export default MeshParameters;
