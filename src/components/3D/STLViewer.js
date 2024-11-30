import React, { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { Box3, Vector3, Mesh } from "three";
import { Html } from "@react-three/drei";

function STLViewer({ fileUrl, blockMeshGeometry }) {
  const [geometry, setGeometry] = useState(null); // Holds the imported STL geometry
  const { camera } = useThree(); // Access the Three.js camera
  const controlsRef = useRef(); // Ref for OrbitControls

  // Debugging: Log the provided props
  useEffect(() => {
    console.log("STL file URL:", fileUrl);
    console.log("BlockMesh geometry:", blockMeshGeometry);
  }, [fileUrl, blockMeshGeometry]);

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

          // Set camera to an isometric view for STL geometry
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

  return (
    <>
      {/* Render the imported STL geometry if available */}
      {geometry ? (
        <mesh geometry={geometry}>
          <meshStandardMaterial color="gray" metalness={0.8} roughness={0.2} />
        </mesh>
      ) : (
        <Html>
          <div style={{ color: "red", fontSize: "16px", textAlign: "center" }}>
            No STL file loaded
          </div>
        </Html>
      )}

      {/* Render the dynamic blockMesh if blockMeshGeometry is provided */}
      {blockMeshGeometry && blockMeshGeometry.domain && (
        <mesh>
          <boxGeometry
            args={[
              blockMeshGeometry.domain.maxx - blockMeshGeometry.domain.minx,
              blockMeshGeometry.domain.maxy - blockMeshGeometry.domain.miny,
              blockMeshGeometry.domain.maxz - blockMeshGeometry.domain.minz,
            ]}
          />
          <meshStandardMaterial
            color="cyan"
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
      )}
    </>
  );
}

export default STLViewer;
