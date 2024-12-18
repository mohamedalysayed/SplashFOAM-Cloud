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
  const fileInputRef = useRef();
  const controlsRef = useRef();
  //const canvasRef = useRef();
  const glRef = useRef(null); // Ref to store WebGL renderer

  const [fileUrl, setFileUrl] = useState(null);
  const [background, setBackground] = useState("black");
  const [axesVisible, setAxesVisible] = useState(true);
  const [meshParams, setMeshParams] = useState({});
  const [physicalModels, setPhysicalModels] = useState({});
  const [simulationParams, setSimulationParams] = useState({});

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(10, 10, 10);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, []);

  // Define gradient mappings
  const gradientMap = {
    "gradient-cyan-black": "linear-gradient(to bottom, #00CED1, #000000)", // Cyan to Black
  };
  
  // Update WebGL background dynamically when "background" changes
  useEffect(() => {
    if (glRef.current) {
      if (background.startsWith("gradient")) {
        glRef.current.setClearColor("transparent");
        document.body.style.background = gradientMap[background]; // Apply gradient
      } else {
        glRef.current.setClearColor(background);
        document.body.style.background = "none"; // Remove gradient
      }
    }
  }, [background, gradientMap]); // Add gradientMap to the dependency array
  
  

  // Handle STL upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".stl")) {
      setFileUrl(URL.createObjectURL(file));
    } else {
      alert("Unsupported file type. Please upload an STL file.");
    }
  };

  // Reset camera
  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(5, 5, 5);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  // Set camera view
  const handleSetView = (axis) => {
    const positions = { X: [10, 0, 0], Y: [0, 10, 0], Z: [0, 0, 10] };
    if (controlsRef.current) {
      controlsRef.current.object.position.set(...positions[axis]);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  // Save Screenshot
  const saveScreenshot = () => {
    const gl = glRef.current; // Access the WebGL renderer

    if (gl) {
      const canvas = gl.domElement; // The WebGL canvas
      const format = prompt("Enter format (png, jpeg, webp):", "png");

      if (["png", "jpeg", "webp"].includes(format)) {
        // Convert the canvas content to a data URL
        const dataURL = canvas.toDataURL(`image/${format}`);

        // Trigger download
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `screenshot.${format}`;
        link.click();
      } else {
        alert("Invalid format! Use png, jpeg, or webp.");
      }
    } else {
      alert("Failed to access the renderer. Ensure the scene is loaded.");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header backToLanding />
      <div style={{ padding: "10px", background: "#000", color: "white", display: "flex", justifyContent: "flex-end" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <select
        onChange={(e) => setBackground(e.target.value)}
        style={selectStyle}
      >
        <optgroup label="Solid Colors">
          <option value="black">Black</option>
          <option value="#2F4F4F">Dark Slate Gray</option>
          <option value="#FFFFFF">White</option>
        </optgroup>
        <optgroup label="Gradients">
          <option value="gradient-cyan-black">Cyan to Black</option>
        </optgroup>
      </select>
        <button onClick={saveScreenshot} style={screenshotButtonStyle}>Save Snapshot</button>
      </div>
      </div>
      
      <div
        style={{
          flex: 1,
          display: "flex",
          position: "relative",
          background: gradientMap[background] || background, // Apply solid or gradient background
        }}
      >
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
        <Canvas
          onCreated={({ gl }) => {
            glRef.current = gl;
            gl.setClearColor("transparent"); // Transparent to show the gradient
          }}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <gridHelper args={[8, 16]} />
          {axesVisible && <CustomAxes />}
          {axesVisible && <AxisLabels />}
          <ReferenceBox />
          <OrbitControls ref={controlsRef} enableRotate enablePan enableZoom makeDefault />
          {fileUrl && <STLViewer fileUrl={fileUrl} />}
        </Canvas>
        <div style={buttonContainerStyle}>
          <GenerateCase meshParams={meshParams} physicalModels={physicalModels} simulationParams={simulationParams} />
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => handleSetView("X")} style={viewButtonStyle}>+X</button>
            <button onClick={() => handleSetView("Y")} style={viewButtonStyle}>+Y</button>
            <button onClick={() => handleSetView("Z")} style={viewButtonStyle}>+Z</button>
          </div>
        </div>
      </div>
    </div>
  );
}
const selectStyle = { padding: "5px", borderRadius: "4px" };
//const screenshotButtonStyle = { padding: "8px 12px", background: "darkcyan", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" };
const buttonContainerStyle = { position: "absolute", bottom: 20, right: 20, display: "flex", flexDirection: "column", gap: "10px" };
const viewButtonStyle = { padding: "8px 12px", background: "gray", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" };

const screenshotButtonStyle = {
  padding: "12px 20px", // Increased padding for prominence
  background: "linear-gradient(to right, #ff7e5f, #feb47b)", // Gradient background
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontWeight: "bold",
  cursor: "pointer",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)", // Soft shadow
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

// Add hover and active styles dynamically
const hoverEffect = `
  button:hover {
    transform: scale(1.05); /* Zoom effect */
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.4); /* Enhanced shadow */
  }
  button:active {
    transform: scale(0.95); /* Slight press effect */
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2); /* Reduced shadow */
  }
`;

// Injecting hoverEffect into the DOM
const styleElement = document.createElement("style");
styleElement.innerText = hoverEffect;
document.head.appendChild(styleElement);
export default SplashCloud;
