import React from "react";

function ReferenceBox() {
  return (
    <mesh>
      <boxGeometry args={[8, 8, 8]} />
      {/* Use solid material for the box */}
      <meshBasicMaterial color="grey" opacity={0.1} transparent />
    </mesh>
  );
}

export default ReferenceBox;
