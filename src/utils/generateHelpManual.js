import jsPDF from "jspdf";

export function generateHelpManual() {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text("Splash Cloud - Help Manual", 10, 20);

  doc.setFontSize(12);
  doc.text("Features:", 10, 30);
  doc.text(
    "1. Load Geometry: Use the 'Load Geometry' button to load .STL files into the viewer.\n" +
      "2. Change Background: Select different background colors using the dropdown.\n" +
      "3. Toggle Axes: Show or hide the axes helper in the scene.\n" +
      "4. Reference Box: A transparent reference box is displayed by default for orientation.\n" +
      "5. 3D Viewer: Use the mouse to rotate, zoom, and pan in the 3D space.",
    10,
    40
  );

  doc.text(
    "Keyboard and Mouse Controls:",
    10,
    100
  );
  doc.text(
    "- Left Mouse Button: Rotate the camera\n" +
      "- Middle Mouse Button: Pan the camera\n" +
      "- Scroll Wheel: Zoom in and out",
    10,
    110
  );

  doc.setFontSize(10);
  doc.text("Generated by Splash Cloud.", 10, 180);
  doc.save("Splash_Cloud_Help_Manual.pdf");
}