import React, { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Box3, Vector3, Mesh } from "three";
import { Html } from "@react-three/drei";

function STLViewer({ fileUrl }) {
  const [geometry, setGeometry] = useState(null); // Holds the STL geometry
  const { camera } = useThree(); // Access the Three.js camera
  const controlsRef = useRef(); // Ref for OrbitControls

  useEffect(() => {
    if (fileUrl) {
      const loader = new STLLoader();

      // Load the STL file
      loader.load(
        fileUrl,
        (geometry) => {
          const mesh = new Mesh(geometry); // Create a Three.js mesh
          const boundingBox = new Box3().setFromObject(mesh); // Calculate bounding box
          const center = new Vector3();
          boundingBox.getCenter(center); // Center of the geometry
          const size = new Vector3();
          boundingBox.getSize(size); // Size of the geometry
          const maxAxis = Math.max(size.x, size.y, size.z); // Maximum dimension

          // Center the geometry at the origin
          geometry.translate(-center.x, -center.y, -center.z);

          // Set camera to an isometric view
          const distance = maxAxis * 3; // Zoomed-out distance (adjustable)
          camera.position.set(distance, distance, distance); // Isometric diagonal view
          camera.near = distance / 100; // Adjust near clipping plane
          camera.far = distance * 10; // Adjust far clipping plane
          camera.lookAt(0, 0, 0); // Focus on the origin
          camera.updateProjectionMatrix();

          // Update controls if available
          if (controlsRef.current) {
            controlsRef.current.target.set(0, 0, 0);
            controlsRef.current.update();
          }

          setGeometry(geometry); // Save the loaded geometry
        },
        undefined,
        (error) => {
          console.error("Error loading STL file:", error); // Handle loading errors
        }
      );
    }
  }, [fileUrl, camera]);

  // If no geometry is loaded, show a message
  return geometry ? (
    <mesh geometry={geometry}>
      {/* Standard material for the mesh */}
      <meshStandardMaterial color="gray" metalness={0.8} roughness={0.2} />
    </mesh>
  ) : (
    <Html>
      <div style={{ color: "red", fontSize: "16px", textAlign: "center" }}>
        No file loaded
      </div>
    </Html>
  );
}

export default STLViewer;
