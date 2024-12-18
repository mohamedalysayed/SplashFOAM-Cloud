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
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

function SplashCloud() {
  const fileInputRef = useRef();
  const controlsRef = useRef();
  const canvasRef = useRef();

  const [fileUrl, setFileUrl] = useState(null);
  const [background, setBackground] = useState("linear-gradient(black, gray)");
  const [axesVisible, setAxesVisible] = useState(true);
  const [meshParams, setMeshParams] = useState({});
  const [physicalModels, setPhysicalModels] = useState({});
  const [simulationParams, setSimulationParams] = useState({});
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.object.position.set(10, 10, 10);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, []);

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
    const canvas = canvasRef.current.querySelector("canvas");
    if (canvas) {
      const format = prompt("Enter format (png, jpeg, webp):", "png");
      if (["png", "jpeg", "webp"].includes(format)) {
        canvas.toBlob((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `screenshot.${format}`;
          link.click();
        }, `image/${format}`);
      } else {
        alert("Invalid format! Use png, jpeg, or webp.");
      }
    }
  };

  // Upload YAML to AWS S3
  const uploadToAWS = async () => {
    setUploadStatus("Uploading...");
    const s3 = new S3Client({
      region: "eu-north-1",
      credentials: {
        accessKeyId: "AKIAEXAMPLE1234567890",
        secretAccessKey: "wJalrXUtnFEXAMPLEKEY/bPxRfiCYEXAMPLEKEY",
      },
    });

    const yamlData = JSON.stringify({
      meshParams,
      physicalModels,
      simulationParams,
    });

    const params = {
      Bucket: "your-s3-bucket-name",
      Key: "generated_case.yaml",
      Body: yamlData,
      ContentType: "application/x-yaml",
    };

    try {
      const command = new PutObjectCommand(params);
      await s3.send(command);
      setUploadStatus("Upload successful!");
    } catch (error) {
      console.error("AWS Upload Error:", error);
      setUploadStatus("Upload failed!");
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header backToLanding />
      <div style={{ padding: "10px", background: "#000", color: "white", display: "flex", justifyContent: "flex-end" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <select onChange={(e) => setBackground(e.target.value)} style={selectStyle}>
            <option value="linear-gradient(black, gray)">Black to Gray</option>
            <option value="black">Black</option>
            <option value="lightgray">Light Gray</option>
            <option value="linear-gradient(blue, white)">Blue to White</option>
            <option value="linear-gradient(green, black)">Green to Black</option>
            <option value="linear-gradient(orange, yellow)">Orange to Yellow</option>
            <option value="white">White</option>
          </select>
          <button onClick={saveScreenshot} style={screenshotButtonStyle}>Save Snapshot</button>
          <button onClick={uploadToAWS} style={awsButtonStyle}>Upload to AWS</button>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", position: "relative" }} ref={canvasRef}>
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
        <Canvas style={{ flex: 1, width: "100%", height: "100%", background }}>
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
      <p style={{ textAlign: "center", color: "white" }}>{uploadStatus}</p>
    </div>
  );
}

const selectStyle = { padding: "5px", borderRadius: "4px" };
const screenshotButtonStyle = { padding: "8px 12px", background: "darkcyan", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" };
const awsButtonStyle = { padding: "8px 12px", background: "darkorange", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" };
const buttonContainerStyle = { position: "absolute", bottom: 20, right: 20, display: "flex", flexDirection: "column", gap: "10px" };
const viewButtonStyle = { padding: "8px 12px", background: "gray", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" };

export default SplashCloud;
