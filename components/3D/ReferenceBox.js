import React from "react";

function ReferenceBox() {
  return (
    <mesh>
      <boxGeometry args={[10, 10, 10]} />
      <meshBasicMaterial color="grey" wireframe opacity={0.5} transparent />
    </mesh>
  );
}

export default ReferenceBox;
