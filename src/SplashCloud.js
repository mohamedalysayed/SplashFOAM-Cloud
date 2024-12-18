import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import STLViewer from "./components/3D/STLViewer";
import ReferenceBox from "./components/3D/ReferenceBox";
import AxisLabels from "./components/3D/AxisLabels";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CustomAxes from "./components/3D/CustomAxes";
import { generateHelpManual } from "./utils/generateHelpManual";
import GenerateCase from "./CaseGeneration/GenerateCase";

function SplashCloud() {
  // References for file input and camera controls
  const fileInputRef = useRef();
  const controlsRef = useRef();
  const canvasRef = useRef(); // Reference for the canvas element to capture screenshots

  // State for STL file URL
  const [fileUrl, setFileUrl] = useState(null);

  // State for canvas background and axes visibility
  const [background, setBackground] = useState("linear-gradient(black, gray)"); // Default background
  const [axesVisible, setAxesVisible] = useState(true);

  // States for YAML aggregation (Mesh, Physical Models, and Simulation Parameters)
  const [meshParams, setMeshParams] = useState({});
  const [physicalModels, setPhysicalModels] = useState({});
  const [simulationParams, setSimulationParams] = useState({});

  // Camera setup and resize handler
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(10, 10, 10);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }

    const handleResize = () => {
      const canvas = document.querySelector("canvas");
      if (canvas && controlsRef.current) {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        controlsRef.current.object.aspect = width / height;
        controlsRef.current.object.updateProjectionMatrix();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle STL file upload and set URL
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".stl")) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      console.log("STL file uploaded:", file.name);
    } else {
      alert("Unsupported file type. Please upload an STL file.");
    }
  };

  // Reset camera to its default position
  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(5, 5, 5);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  // Adjust camera to align to X, Y, or Z view
  const handleSetView = (axis) => {
    if (controlsRef.current) {
      switch (axis) {
        case "X":
          controlsRef.current.object.position.set(10, 0, 0);
          break;
        case "Y":
          controlsRef.current.object.position.set(0, 10, 0);
          break;
        case "Z":
          controlsRef.current.object.position.set(0, 0, 10);
          break;
        default:
          break;
      }
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  // Save Screenshot Functionality
  const saveScreenshot = () => {
    const canvas = canvasRef.current.querySelector("canvas");
    if (canvas) {
      // Ask user for format selection
      const format = prompt("Enter format (png, jpeg, webp):", "png");
      if (["png", "jpeg", "webp"].includes(format)) {
        canvas.toBlob(
          (blob) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `screenshot.${format}`;
            link.click();
          },
          `image/${format}`,
          1.0
        );
      } else {
        alert("Invalid format! Please enter png, jpeg, or webp.");
      }
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header Component */}
      <Header backToLanding />

      {/* Profile Theme Selector */}
      <div style={{ padding: "10px", background: "#000", color: "white", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* <label style={{ fontWeight: "bold" }}>Profile Theme:</label> */}
          <select
            onChange={(e) => setBackground(e.target.value)}
            style={{ padding: "5px", borderRadius: "4px" }}
          >
            <option value="linear-gradient(black, gray)">Black to Gray</option>
            <option value="black">Black</option>
            <option value="lightgray">Light Gray</option>
            <option value="linear-gradient(blue, white)">Blue to White</option>
            <option value="linear-gradient(green, black)">Green to Black</option>
            <option value="linear-gradient(orange, yellow)">Orange to Yellow</option>
            <option value="white">White</option>
          </select>
          {/* Screenshot Button */}
          <button onClick={saveScreenshot} style={screenshotButtonStyle}>
            Save Snapshot
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", position: "relative" }} ref={canvasRef}>
        {/* Sidebar Component */}
        <Sidebar
          fileInputRef={fileInputRef}
          setBackground={setBackground}
          setAxesVisible={setAxesVisible}
          handleFileUpload={handleFileUpload}
          handleResetCamera={handleResetCamera}
          handleDownloadManual={generateHelpManual}
          setMeshParams={setMeshParams}
          setPhysicalModels={setPhysicalModels}
          setSimulationParams={setSimulationParams}
        />

        {/* 3D Canvas */}
        <Canvas
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            background: background,
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-10, -10, -10]} intensity={1.0} />

          {/* Grid and Axes */}
          <gridHelper args={[8, 16]} />
          {axesVisible && <CustomAxes />}
          {axesVisible && <AxisLabels />}
          <ReferenceBox />

          {/* Orbit Controls */}
          <OrbitControls ref={controlsRef} enableRotate enablePan enableZoom makeDefault />

          {/* STL File Viewer */}
          {fileUrl && <STLViewer fileUrl={fileUrl} />}
        </Canvas>

        {/* Generate Case and View Buttons */}
        <div style={{ position: "absolute", bottom: 20, right: 20, display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ position: "relative", textAlign: "center" }}>
            <GenerateCase meshParams={meshParams} physicalModels={physicalModels} simulationParams={simulationParams} />
            <div
              style={{
                position: "absolute",
                top: "-30px",
                left: "50%",
                transform: "translateX(-50%)",
                color: "white",
                background: "rgba(0, 0, 0, 0.7)",
                padding: "5px",
                borderRadius: "5px",
                fontSize: "12px",
                visibility: "hidden",
                transition: "visibility 0.3s",
              }}
              className="tooltip"
            >
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <button onClick={() => handleSetView("X")} style={viewButtonStyle}>
              +X
            </button>
            <button onClick={() => handleSetView("Y")} style={viewButtonStyle}>
              +Y
            </button>
            <button onClick={() => handleSetView("Z")} style={viewButtonStyle}>
              +Z
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const viewButtonStyle = {
  padding: "8px 12px",
  background: "gray",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background 0.3s",
};

const screenshotButtonStyle = {
  padding: "8px 12px",
  background: "darkcyan",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "background 0.3s",
};

export default SplashCloud;
