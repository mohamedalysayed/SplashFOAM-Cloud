import React, { useMemo } from "react";
import { CylinderGeometry, ConeGeometry, MeshBasicMaterial, Mesh, Group } from "three";

function CustomAxes() {
  const axes = useMemo(() => {
    const axesGroup = new Group();

    const axisRadius = 0.02; // Thickness of the axes
    const axisLength = 2.5; // Length of the axes
    const arrowLength = 0.2; // Length of the arrowheads
    const arrowRadius = 0.06; // Radius of the arrowheads

    // Function to create an axis with an arrowhead
    const createAxisWithArrow = (color, axisRotation, arrowPosition, arrowRotation) => {
      // Axis (cylinder)
      const axis = new Mesh(
        new CylinderGeometry(axisRadius, axisRadius, axisLength, 32),
        new MeshBasicMaterial({ color })
      );

      // Arrowhead (cone)
      const arrow = new Mesh(
        new ConeGeometry(arrowRadius, arrowLength, 32),
        new MeshBasicMaterial({ color })
      );

      // Position and rotation
      arrow.position.set(arrowPosition.x, arrowPosition.y, arrowPosition.z);
      arrow.rotation.set(arrowRotation.x, arrowRotation.y, arrowRotation.z);

      // Combine axis and arrow
      const axisGroup = new Group();
      axis.rotation.set(axisRotation.x, axisRotation.y, axisRotation.z);
      axis.position.set(arrowPosition.x / 2, arrowPosition.y / 2, arrowPosition.z / 2); // Center the cylinder
      axisGroup.add(axis, arrow);

      return axisGroup;
    };

    // X-axis (Red)
    const xAxis = createAxisWithArrow(
      "red",
      { x: 0, y: 0, z: -Math.PI / 2 }, // Rotate the cylinder to align with the X-axis
      { x: axisLength, y: 0, z: 0 }, // Arrowhead at the positive X end
      { x: 0, y: 0, z: -Math.PI / 2 } // Rotate arrowhead to point along X-axis
    );
    axesGroup.add(xAxis);

    // Y-axis (Green)
    const yAxis = createAxisWithArrow(
      "green",
      { x: 0, y: 0, z: 0 }, // No rotation for Y-axis cylinder
      { x: 0, y: axisLength, z: 0 }, // Arrowhead at the positive Y end
      { x: 0, y: Math.PI / 2, z: 0 } // Rotate arrowhead to point along Y-axis
    );
    axesGroup.add(yAxis);

    // Z-axis (Blue)
    const zAxis = createAxisWithArrow(
      "blue",
      { x: Math.PI / 2, y: 0, z: 0 }, // Rotate the cylinder to align with the Z-axis
      { x: 0, y: 0, z: axisLength }, // Arrowhead at the positive Z end
      { x: Math.PI / 2, y: 0, z: 0 } // No rotation needed for Z-axis arrowhead
    );
    axesGroup.add(zAxis);

    return axesGroup;
  }, []); // Dependencies: None

  return <primitive object={axes} />;
}

export default CustomAxes;
