import React, { useRef, useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import * as THREE from "three"; // Import THREE for geometric operations
import { Html } from "@react-three/drei";

function STLViewer({ fileUrl }) {
  const [geometry, setGeometry] = useState(null); // Holds the imported STL geometry
  const { camera, scene } = useThree(); // Access the Three.js camera and scene
  const controlsRef = useRef(); // Ref for OrbitControls

  // Debugging: Log the provided props
  useEffect(() => {
    console.log("STL file URL:", fileUrl);
  }, [fileUrl]);

  useEffect(() => {
    if (fileUrl) {
      const loader = new STLLoader();

      // Load the STL file
      loader.load(
        fileUrl,
        (loadedGeometry) => {
          const boundingBox = new THREE.Box3().setFromObject(new THREE.Mesh(loadedGeometry)); // Correctly use THREE.Mesh
          const center = new THREE.Vector3();
          boundingBox.getCenter(center); // Center of the geometry
          const size = new THREE.Vector3();
          boundingBox.getSize(size); // Size of the geometry
          const maxAxis = Math.max(size.x, size.y, size.z); // Maximum dimension

          // Center the geometry at the origin
          loadedGeometry.translate(-center.x, -center.y, -center.z);

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

          setGeometry(loadedGeometry); // Save the loaded geometry
        },
        undefined,
        (error) => {
          console.error("Error loading STL file:", error); // Handle loading errors
        }
      );
    }
  }, [fileUrl, camera]);

  // Add multiple lights to illuminate the geometry from all directions
  useEffect(() => {
    const lights = [
      new THREE.DirectionalLight("white", 1),
      new THREE.DirectionalLight("white", 1),
      new THREE.DirectionalLight("white", 1),
      new THREE.DirectionalLight("white", 1),
    ];

    // Set light positions around the object
    lights[0].position.set(10, 10, 10); // Top-right
    lights[1].position.set(-10, 10, 10); // Top-left
    lights[2].position.set(10, -10, 10); // Bottom-right
    lights[3].position.set(-10, -10, 10); // Bottom-left

    // Add lights to the scene
    lights.forEach((light) => scene.add(light));

    return () => {
      // Clean up lights when component is unmounted
      lights.forEach((light) => scene.remove(light));
    };
  }, [scene]);

  return (
    <>
      {/* Render the imported STL geometry if available */}
      {geometry && (
        <mesh geometry={geometry}>
          <meshStandardMaterial color="brown" metalness={0.9} roughness={0.1} />
        </mesh>
      )}

      {/* Display message when no geometry is loaded */}
      {!geometry && (
        <Html>
          <div style={{ color: "red", fontSize: "16px", textAlign: "center" }}>
            No geometry loaded
          </div>
        </Html>
      )}
    </>
  );
}

export default STLViewer;
