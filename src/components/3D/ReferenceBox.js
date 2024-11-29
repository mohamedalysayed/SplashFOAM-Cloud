import React from "react";

function ReferenceBox() {
  return (
    <mesh>
      <boxGeometry args= {[5, 5, 5]} />
      <meshBasicMaterial color="white" wireframe opacity={0.0} transparent />
      {/* <meshBasicMaterial color="grey" wireframe opacity={0.5} transparent /> */}
    </mesh>
  );
}

export default ReferenceBox;
