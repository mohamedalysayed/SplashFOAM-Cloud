import React from "react";
import YAML from "yaml";

function GenerateCase({ meshParams, physicalModels, simulationParams }) {
  // Function to generate and download the collective YAML file
  const handleGenerateCase = () => {
    try {
      // Combine all the data into a single object
      const collectiveData = {
        meshSettings: meshParams, // Data from MeshParameters
        physicalProperties: physicalModels, // Data from PhysicalModels
        simulationSettings: simulationParams, // Data from SimulationSetup
      };

      // Convert the object to a YAML string
      const yamlStr = YAML.stringify(collectiveData);

      // Create a Blob object and generate a download link
      const blob = new Blob([yamlStr], { type: "text/yaml" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "OF_case.yaml"; // Name of the downloaded file
      document.body.appendChild(link); // Append to the DOM for Firefox compatibility
      link.click(); // Trigger download
      document.body.removeChild(link); // Cleanup
    } catch (error) {
      console.error("Error generating the YAML file:", error);
      alert("An error occurred while generating the YAML file. Please try again.");
    }
  };

  return (
    <div
      style={{
        padding: "15px",
      }}
    >
      {/* Description */}
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Generate Case
      </h1>
      <p
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Collects all the user-input parameters from MeshParameters, PhysicalModels, 
        and SimulationSetup to create a unified YAML file for OpenFOAM case generation.
      </p>
      {/* Button to trigger YAML generation and download */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          onClick={handleGenerateCase} // Trigger the Generate Case functionality
          style={{
            padding: "10px 20px",
            background: "limegreen",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)", // Subtle shadow
            transition: "transform 0.3s, background 0.3s", // Smooth transitions
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "lightcyan";
            e.target.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "gray";
            e.target.style.transform = "scale(1)";
          }}
        >
          Generate Case
        </button>
      </div>
    </div>
  );
}

export default GenerateCase;
