import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import STLViewer from "./components/3D/STLViewer";
import ReferenceBox from "./components/3D/ReferenceBox";
import AxisLabels from "./components/3D/AxisLabels";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CustomAxes from "./components/3D/CustomAxes";

function SplashCloud() {
  const fileInputRef = useRef();
  const [fileUrl, setFileUrl] = useState(null);
  const [background, setBackground] = useState("linear-gradient(black, white)");
  const [axesVisible, setAxesVisible] = useState(true);
  const controlsRef = useRef();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar
          fileInputRef={fileInputRef}
          setBackground={setBackground}
          setAxesVisible={setAxesVisible}
          handleFileUpload={handleFileUpload}
          handleResetCamera={handleResetCamera}
        />
        <Canvas style={{ flex: 1 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-10, -10, -10]} intensity={1.0} />
          <gridHelper args={[10, 10]} />
          {axesVisible && <CustomAxes />}
          {axesVisible && <AxisLabels />}
          <ReferenceBox />
          <OrbitControls ref={controlsRef} enableRotate enablePan enableZoom makeDefault />
          {fileUrl && <STLViewer fileUrl={fileUrl} />}
        </Canvas>
      </div>
    </div>
  );
}

export default SplashCloud;