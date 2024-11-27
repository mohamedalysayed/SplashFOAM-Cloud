import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Box3, Vector3, Mesh } from "three";

// STL Viewer Component
function STLViewer({ fileUrl }) {
  const [geometry, setGeometry] = useState(null);
  const { camera, controls } = useThree();

  useEffect(() => {
    if (fileUrl) {
      const loader = new STLLoader();
      loader.load(
        fileUrl,
        (geometry) => {
          const mesh = new Mesh(geometry);
          const boundingBox = new Box3().setFromObject(mesh);
          const center = new Vector3();
          boundingBox.getCenter(center);
          const size = new Vector3();
          boundingBox.getSize(size);
          const maxAxis = Math.max(size.x, size.y, size.z);

          geometry.translate(-center.x, -center.y, -center.z);

          const distance = maxAxis * 2.5;
          camera.position.set(0, 0, distance);
          camera.near = distance / 100;
          camera.far = distance * 10;
          camera.updateProjectionMatrix();

          if (controls) {
            controls.target.set(center.x, center.y, center.z);
            controls.update();
          }

          setGeometry(geometry);
        },
        undefined,
        (error) => {
          console.error("Error loading STL file:", error);
        }
      );
    }
  }, [fileUrl, camera, controls]);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="gray" metalness={0.5} roughness={0.5} />
    </mesh>
  );
}

// Transparent Gridded Reference Box Component
function ReferenceBox() {
  return (
    <mesh>
      <boxGeometry args={[10, 10, 10]} />
      <meshBasicMaterial color="blue" wireframe opacity={0.3} transparent />
    </mesh>
  );
}

// Main App Component
function App() {
  const fileInputRef = useRef();
  const [fileUrl, setFileUrl] = useState(null);
  const [background, setBackground] = useState("lightcyan");
  const [axesVisible, setAxesVisible] = useState(true);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };

  const handleBackgroundChange = (event) => {
    const value = event.target.value;
    setBackground(value);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: background }}>
      {/* App Name */}
      <header
        style={{
          textAlign: "center",
          padding: "10px 0",
          fontSize: "24px",
          fontWeight: "bold",
          background: "#282c34",
          color: "#ffffff",
          position: "relative",
        }}
      >
        Splash Cloud
      </header>

      {/* Main Content */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Vertical Button Panel */}
        <div style={{ width: "200px", padding: "10px", background: "#f0f0f0" }}>
          <button
            onClick={() => fileInputRef.current.click()}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          >
            Load Geometry
          </button>
          <select
            onChange={handleBackgroundChange}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          >
            <option value="lightcyan">Light Cyan</option>
            <option value="linear-gradient(black, grey)">Grey to Black</option>
            <option value="linear-gradient(black, white)">Black to White</option>
            <option value="white">Plain White</option>
          </select>
          <button disabled style={{ width: "100%", padding: "10px", marginBottom: "10px", opacity: 0.6 }}>
            Reset Camera (Disabled)
          </button>
          <button
            onClick={() => setAxesVisible((prev) => !prev)}
            style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
          >
            Toggle Axes
          </button>
          <button disabled style={{ width: "100%", padding: "10px", marginBottom: "10px", opacity: 0.6 }}>
            Screenshot (Disabled)
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".stl"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </div>

        {/* Canvas for 3D Viewer */}
        <Canvas style={{ flex: 1 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} />
          <gridHelper args={[10, 10]} />
          {axesVisible && <axesHelper args={[5]} />}
          <ReferenceBox />
          <OrbitControls />
          {fileUrl && <STLViewer fileUrl={fileUrl} />}
        </Canvas>
      </div>
    </div>
  );
}

export default App;
