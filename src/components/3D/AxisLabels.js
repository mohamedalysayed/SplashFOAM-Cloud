import React from "react";
import { Text } from "@react-three/drei";

function AxisLabels() {
  const labelOffset = 3.0; // Distance from the origin

  return (
    <>
      {/* X-Axis Label */}
      <Text
        position={[labelOffset, 0, 0]} // Place further along the X-axis
        fontSize={0.5} // Reduced font size for balance
        color="#ff0000" // Red for X-axis
        font="https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxM.woff" // Lightweight web font
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05} // Add a thicker outline for better contrast
        outlineColor="#000000" // Black outline
      >
        X
      </Text>

      {/* Y-Axis Label */}
      <Text
        position={[0, labelOffset, 0]} // Place further along the Y-axis
        fontSize={0.5}
        color="#00ff00" // Green for Y-axis
        font="https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxM.woff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        Y
      </Text>

      {/* Z-Axis Label */}
      <Text
        position={[0, 0, labelOffset]} // Place further along the Z-axis
        fontSize={0.5}
        color="#0000ff" // Blue for Z-axis
        font="https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxM.woff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.05}
        outlineColor="#000000"
      >
        Z
      </Text>
    </>
  );
}

export default AxisLabels;
