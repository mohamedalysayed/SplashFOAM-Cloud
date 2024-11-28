import React, { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Box3, Vector3, Mesh } from "three";
import { Html } from "@react-three/drei";

function STLViewer({ fileUrl }) {
  const [geometry, setGeometry] = useState(null);
  const { camera } = useThree();
  const controlsRef = useRef();

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

          if (controlsRef.current) {
            controlsRef.current.target.set(0, 0, 0);
            controlsRef.current.update();
          }

          setGeometry(geometry);
        },
        undefined,
        (error) => {
          console.error("Error loading STL file:", error);
        }
      );
    }
  }, [fileUrl, camera]);

  return geometry ? (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="gray" metalness={0.8} roughness={0.2} />
    </mesh>
  ) : (
    <Html>
      <div style={{ color: "white" }}>No file loaded</div>
    </Html>
  );
}

export default STLViewer;