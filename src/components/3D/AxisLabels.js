import React from "react";
import { Text } from "@react-three/drei";

function AxisLabels() {
  return (
    <>
      {/* X-Axis Label */}
      <Text
        position={[2.8, 0, 0]} // Adjust position as needed
        fontSize={0.5} // Control thickness and size
        color="black"//"red"
        anchorX="center" // Center the text alignment
        anchorY="middle"
      >
        X
      </Text>

      {/* Y-Axis Label */}
      <Text
        position={[0, 2.8, 0]} // Adjust position as needed
        fontSize={0.5} // Control thickness and size
        color="black"//"green"
        anchorX="center"
        anchorY="middle"
      >
        Y
      </Text>

      {/* Z-Axis Label */}
      <Text
        position={[0, 0, 2.8]} // Adjust position as needed
        fontSize={0.5} // Control thickness and size
        color="black"//"blue"
        anchorX="center"
        anchorY="middle"
      >
        Z
      </Text>
    </>
  );
}

export default AxisLabels;
