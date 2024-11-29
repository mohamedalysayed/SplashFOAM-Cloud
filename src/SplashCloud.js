import React, { useRef, useState, useEffect } from "react";
import MainLandingPage from "./MainLandingPage";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei"; // Import Html from drei
import STLViewer from "./components/3D/STLViewer";
import ReferenceBox from "./components/3D/ReferenceBox";
import AxisLabels from "./components/3D/AxisLabels";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CustomAxes from "./components/3D/CustomAxes";
import { generateHelpManual } from "./utils/generateHelpManual";

function SplashCloud() {
  const fileInputRef = useRef(); // Reference for file input
  const [fileUrl, setFileUrl] = useState(null); // URL of the uploaded STL file
  const [background, setBackground] = useState("linear-gradient(black, white)"); // Background style
  const [axesVisible, setAxesVisible] = useState(true); // Toggle visibility of axes
  const controlsRef = useRef(); // Reference for OrbitControls
  const [showLandingPage, setShowLandingPage] = useState(true); // Flag to show landing page or viewer

  // Set default camera position to isometric view on mount
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(5, 5, 5); // Default isometric position
      controlsRef.current.target.set(0, 0, 0); // Look at origin
      controlsRef.current.update();
    }
  }, [controlsRef, fileUrl, showLandingPage]); // Added dependencies

  // Handle file uploads (only accept STL files)
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".stl")) {
      const url = URL.createObjectURL(file);
      setFileUrl(url); // Set file URL to render the STL file
    } else {
      alert("Unsupported file type. Please upload an STL file."); // Alert for invalid file type
    }
  };

  // Reset camera to the default isometric view
  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(5, 5, 5); // Reset position
      controlsRef.current.target.set(0, 0, 0); // Look at origin
      controlsRef.current.update();
    }
  };

  // Conditional rendering: Show Landing Page or Main Viewer
  if (showLandingPage) {
    return (
      <MainLandingPage
        onGetStarted={() => setShowLandingPage(false)} // Callback to switch to the main application
      />
    );
  }

  // Main Viewer (Application)
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <Sidebar
          fileInputRef={fileInputRef} // Pass file input reference
          setBackground={setBackground} // Update background
          setAxesVisible={setAxesVisible} // Toggle axes visibility
          handleFileUpload={handleFileUpload} // Handle STL file upload
          handleResetCamera={handleResetCamera} // Reset camera position
          handleDownloadManual={generateHelpManual} // Generate and download manual
        />

        {/* Canvas Viewer */}
        <Canvas style={{ flex: 1, background: background === "black" ? "#000000" : background }}>
          {/* Scene Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-10, -10, -10]} intensity={1.0} />

          {/* Grid Helper */}
          <gridHelper args={[10, 20]} />

          {/* Custom Components */}
          {axesVisible && <CustomAxes />}
          {axesVisible && <AxisLabels />}
          <ReferenceBox />

          {/* Orbit Controls */}
          <OrbitControls ref={controlsRef} enableRotate enablePan enableZoom makeDefault />

          {/* Render STL Viewer if file is loaded */}
          {fileUrl ? (
            <STLViewer fileUrl={fileUrl} />
          ) : (
            <Html>
              <div style={{ color: "red", fontSize: "16px", textAlign: "center" }}>
                No STL file loaded.
              </div>
            </Html>
          )}
        </Canvas>
      </div>
    </div>
  );
}

export default SplashCloud;
