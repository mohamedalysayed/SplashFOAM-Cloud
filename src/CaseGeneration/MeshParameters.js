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
    snappyHexSteps: {
      castellatedMesh: "true",
      snap: "true",
      addLayers: "true",
    },
    geometry: [],
    castellatedMeshControls: {
      maxLocalCells: 2000000,
      maxGlobalCells: 5000000,
      minRefinementCells: 5,
      maxLoadUnbalance: 0.1,
      nCellsBetweenLevels: 5,
      features: [],
      refinementSurfaces: [],
      resolveFeatureAngle: 30,
      refinementRegions: [],
      locationInMesh: [0, 0, 0],
      allowFreeStandingZoneFaces: "true",
    },
    snapControls: {
      nSmoothPatch: 3,
      tolerance: 2.0,
      nSolveIter: 100,
      nRelaxIter: 8,
      nFeatureSnapIter: 10,
      implicitFeatureSnap: "false",
      explicitFeatureSnap: "true",
      multiRegionFeatureSnap: "false",
    },
    addLayersControls: {
      relativeSizes: "true",
      expansionRatio: 1.2,
      finalLayerThickness: 0.3,
      minThickness: 0.001,
      nGrow: 0,
      featureAngle: 180,
      nRelaxIter: 5,
      nSmoothSurfaceNormals: 1,
      nSmoothNormals: 3,
      nSmoothThickness: 10,
      maxFaceThicknessRatio: 0.5,
      maxThicknessToMedialRatio: 0.3,
      minMedianAxisAngle: 90,
      nBufferCellsNoExtrude: 0,
      nLayerIter: 10,
    },
    meshQualityControls: {
      maxNonOrtho: 75,
      maxBoundarySkewness: 4,
      maxInternalSkewness: 4,
      maxConcave: 180,
      minTetQuality: 1.0e-30,
      minVol: 1.0e-30,
      minArea: 1.0e-30,
      minTwist: 0.001,
      minDeterminant: 0.001,
      minFaceWeight: 0.01,
      minVolRatio: 0.01,
      minTriangleTwist: -1,
      nSmoothScale: 4,
      errorReduction: 0.75,
    },
    mergeTolerance: 1.0e-06,
    debug: 0,
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
      <h2 style={{ textAlign: "center", color: "black", marginBottom: "20px" }}>
        blockMesh
      </h2>

      {/* Mesh Name */}
      <div>
        <label>Name:</label>
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
      </div>

      {/* Scale */}
      <div>
        <label>Scale:</label>
        <input
          type="number"
          value={meshParams.scale}
          onChange={(e) =>
            handleInputChange("scale", parseFloat(e.target.value))
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
      </div>

      {/* Domain Specifications */}
      <h3>Domain Specs</h3>
      {["minx", "maxx", "miny", "maxy", "minz", "maxz", "nx", "ny", "nz"].map(
        (field) => (
          <div key={field}>
            <label>{field}:</label>
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
          </div>
        )
      )}

      {/* Patches */}
      <h3>Patches</h3>
      {meshParams.patches.map((patch, index) => (
        <div key={index}>
          <label>Patch Name:</label>
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
          <label>Type:</label>
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
        </div>
      ))}

      {/* SnappyHexMesh Section */}
      <h3>SnappyHexMesh Parameters</h3>
      {Object.keys(meshParams.snappyHexSteps).map((field) => (
        <div key={field}>
          <label>{field}:</label>
          <input
            type="text"
            value={meshParams.snappyHexSteps[field]}
            onChange={(e) =>
              handleInputChange("snappyHexSteps", e.target.value, field)
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
        </div>
      ))}

      {/* Other Sections */}
      {["castellatedMeshControls", "snapControls", "addLayersControls", "meshQualityControls"].map(
        (section) => (
          <div key={section}>
            <h4>{section}</h4>
            {Object.keys(meshParams[section]).map((field) => (
              <div key={field}>
                <label>{field}:</label>
                <input
                  type="text"
                  value={meshParams[section][field]}
                  onChange={(e) =>
                    handleInputChange(section, e.target.value, field)
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
              </div>
            ))}
          </div>
        )
      )}

      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
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
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.6)",
            transition: "transform 0.3s",
          }}
        >
          Download Mesh Settings (.yaml)
        </button>
      </div>
    </div>
  );
}

export default MeshParameters;
