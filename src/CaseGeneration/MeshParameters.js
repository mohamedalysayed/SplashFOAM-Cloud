import React, { useState } from "react";
import YAML from "yaml";

function MeshParameters() {
  const [meshParams, setMeshParams] = useState({
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
      { name: "front", type: "wall", faces: [0, 1, 5, 4] },
      { name: "back", type: "wall", faces: [2, 3, 7, 6] },
      { name: "bottom", type: "wall", faces: [0, 1, 2, 3] },
      { name: "top", type: "wall", faces: [4, 5, 6, 7] },
    ],
  });

  const handleInputChange = (field, value, subField) => {
    setMeshParams((prev) => {
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
    const yamlStr = YAML.stringify({ meshSettings: meshParams });
    const blob = new Blob([yamlStr], { type: "text/yaml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "meshSettings.yaml";
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
        Mesh Parameters
      </h2>

      {/* Mesh Name */}
      <div>
        <label>
          Name:
          <input
            type="text"
            value={meshParams.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
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

      {/* Scale */}
      <div>
        <label>
          Scale:
          <input
            type="number"
            value={meshParams.scale}
            onChange={(e) => handleInputChange("scale", parseFloat(e.target.value))}
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

      {/* Domain Specifications */}
      <h3>Domain Specs</h3>
      {["minx", "maxx", "miny", "maxy", "minz", "maxz", "nx", "ny", "nz"].map(
        (field) => (
          <div key={field}>
            <label>
              {field}:
              <input
                type="number"
                value={meshParams.domain[field]}
                onChange={(e) =>
                  handleInputChange("domain", parseFloat(e.target.value), field)
                }
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
        )
      )}

      {/* Patches */}
      <h3>Patches</h3>
      {meshParams.patches.map((patch, index) => (
        <div key={index}>
          <label>
            Patch Name:
            <input
              type="text"
              value={patch.name}
              onChange={(e) =>
                setMeshParams((prev) => {
                  const updatedPatches = [...prev.patches];
                  updatedPatches[index].name = e.target.value;
                  return { ...prev, patches: updatedPatches };
                })
              }
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
          <label>
            Type:
            <input
              type="text"
              value={patch.type}
              onChange={(e) =>
                setMeshParams((prev) => {
                  const updatedPatches = [...prev.patches];
                  updatedPatches[index].type = e.target.value;
                  return { ...prev, patches: updatedPatches };
                })
              }
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
          Download Mesh Settings (.yaml)
        </button>
      </div>
    </div>
  );
}

export default MeshParameters;
