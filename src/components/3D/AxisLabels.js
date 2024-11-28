import React from "react";
import { Text } from "@react-three/drei";

function AxisLabels() {
  return (
    <>
      {/* X-Axis Label */}
      <Text
        position={[5, 0, 0]} // Adjust position as needed
        fontSize={0.5} // Control thickness and size
        color="red"
        anchorX="center" // Center the text alignment
        anchorY="middle"
      >
        X
      </Text>

      {/* Y-Axis Label */}
      <Text
        position={[0, 5, 0]} // Adjust position as needed
        fontSize={0.5} // Control thickness and size
        color="green"
        anchorX="center"
        anchorY="middle"
      >
        Y
      </Text>

      {/* Z-Axis Label */}
      <Text
        position={[0, 0, 5]} // Adjust position as needed
        fontSize={0.5} // Control thickness and size
        color="blue"
        anchorX="center"
        anchorY="middle"
      >
        Z
      </Text>
    </>
  );
}

export default AxisLabels;
