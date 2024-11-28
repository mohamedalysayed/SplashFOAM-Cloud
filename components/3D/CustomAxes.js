import React from "react";
import { CylinderGeometry, MeshBasicMaterial, Mesh } from "three";
import { useFrame } from "@react-three/fiber";

function CustomAxes() {
  const axes = [];

  const axisRadius = 0.05;
  const axisLength = 5;

  // X-axis (Red)
  const xAxis = new Mesh(
    new CylinderGeometry(axisRadius, axisRadius, axisLength, 32),
    new MeshBasicMaterial({ color: "red" })
  );
  xAxis.rotation.z = -Math.PI / 2; // Rotate to align along X-axis
  xAxis.position.x = axisLength / 2;
  axes.push(xAxis);

  // Y-axis (Green)
  const yAxis = new Mesh(
    new CylinderGeometry(axisRadius, axisRadius, axisLength, 32),
    new MeshBasicMaterial({ color: "green" })
  );
  yAxis.position.y = axisLength / 2;
  axes.push(yAxis);

  // Z-axis (Blue)
  const zAxis = new Mesh(
    new CylinderGeometry(axisRadius, axisRadius, axisLength, 32),
    new MeshBasicMaterial({ color: "blue" })
  );
  zAxis.rotation.x = Math.PI / 2; // Rotate to align along Z-axis
  zAxis.position.z = axisLength / 2;
  axes.push(zAxis);

  return (
    <>
      {axes.map((axis, index) => (
        <primitive key={index} object={axis} />
      ))}
    </>
  );
}

export default CustomAxes;
