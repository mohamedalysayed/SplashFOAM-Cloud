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

function SplashCloud() {
  const fileInputRef = useRef();
  const [fileUrl, setFileUrl] = useState(null); // URL for STL file
  const [background, setBackground] = useState("black"); // Default background
  const [axesVisible, setAxesVisible] = useState(true); // Toggles axes visibility
  const controlsRef = useRef();

  // Initialize the camera position and handle resizing
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(10, 10, 10); // Set camera isometric view
      controlsRef.current.target.set(0, 0, 0); // Focus on origin
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
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle STL file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".stl")) {
      const url = URL.createObjectURL(file);
      setFileUrl(url); // Set STL file URL
      console.log("STL file uploaded:", file.name); // Debugging
    } else {
      alert("Unsupported file type. Please upload an STL file.");
    }
  };

  // Reset camera position
  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(5, 5, 5); // Reset camera to isometric position
      controlsRef.current.target.set(0, 0, 0); // Reset target to origin
      controlsRef.current.update();
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header backToLanding />

      <div style={{ flex: 1, display: "flex", position: "relative" }}>
        <Sidebar
          fileInputRef={fileInputRef}
          setBackground={setBackground} // Allow Sidebar to update background
          setAxesVisible={setAxesVisible} // Allow Sidebar to toggle axes
          handleFileUpload={handleFileUpload} // Handle file uploads
          handleResetCamera={handleResetCamera} // Reset camera
          handleDownloadManual={generateHelpManual} // Download manual
        />
        <Canvas
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            background: background, // Apply the selected background color
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-10, -10, -10]} intensity={1.0} />

          {/* Grid Helper */}
          <gridHelper args={[8, 16]} />

          {/* Axes and Reference Box */}
          {axesVisible && <CustomAxes />}
          {axesVisible && <AxisLabels />}
          <ReferenceBox />

          {/* Orbit Controls */}
          <OrbitControls ref={controlsRef} enableRotate enablePan enableZoom makeDefault />

          {/* STL File Viewer */}
          {fileUrl && (
            <>
              {console.log("Rendering STL file:", fileUrl)}
              <STLViewer fileUrl={fileUrl} />
            </>
          )}
        </Canvas>
      </div>
    </div>
  );
}

export default SplashCloud;
