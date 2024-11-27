const viewerContainer = document.getElementById("viewer");

// Create the VTK.js rendering environment
const fullScreenRenderer = vtk.Rendering.Misc.vtkFullScreenRenderWindow.newInstance({
    container: viewerContainer,
    background: [0.1, 0.1, 0.1], // Default black background
});
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();
const interactor = fullScreenRenderer.getInteractor();

// Function to add a grid
function addGrid() {
    const gridSource = vtk.Filters.Sources.vtkGridSource.newInstance({
        xLength: 100,
        yLength: 100,
        zLength: 0,
        xResolution: 10,
        yResolution: 10,
    });
    const gridMapper = vtk.Rendering.Core.vtkMapper.newInstance();
    const gridActor = vtk.Rendering.Core.vtkActor.newInstance();

    gridMapper.setInputConnection(gridSource.getOutputPort());
    gridActor.setMapper(gridMapper);
    gridActor.getProperty().setColor(0.5, 0.5, 0.5); // Gray
    renderer.addActor(gridActor);

    // Refresh rendering
    renderWindow.render();
}

// Function to add axes
function addAxes() {
    const axes = vtk.Rendering.Core.vtkAxesActor.newInstance();
    axes.setTotalLength(50, 50, 50);
    axes.getXAxisCaptionActor2D().getCaptionTextProperty().setColor(1, 0, 0); // Red for X
    axes.getYAxisCaptionActor2D().getCaptionTextProperty().setColor(0, 1, 0); // Green for Y
    axes.getZAxisCaptionActor2D().getCaptionTextProperty().setColor(0, 0, 1); // Blue for Z
    renderer.addActor(axes);

    // Refresh rendering
    renderWindow.render();
}

// Function to load and render STL files
function loadSTLFile(file) {
    const reader = new FileReader();
    reader.onload = (event) => {
        const arrayBuffer = event.target.result;
        const stlReader = vtk.IO.Geometry.vtkSTLReader.newInstance();
        const mapper = vtk.Rendering.Core.vtkMapper.newInstance();
        const actor = vtk.Rendering.Core.vtkActor.newInstance();

        stlReader.parseAsArrayBuffer(arrayBuffer);
        mapper.setInputConnection(stlReader.getOutputPort());
        actor.setMapper(mapper);
        actor.getProperty().setColor(0.8, 0.8, 0.8); // Default gray
        renderer.addActor(actor);

        // Refresh rendering and reset camera
        resetCamera();
    };
    reader.readAsArrayBuffer(file);
}

// Reset the camera
function resetCamera() {
    renderer.resetCamera();
    renderWindow.render();
}

// Change the background color
function changeBackground(color) {
    if (color === "black") {
        renderer.setBackground(0.1, 0.1, 0.1);
    } else if (color === "white") {
        renderer.setBackground(1.0, 1.0, 1.0);
    } else if (color === "cyanGradient") {
        renderer.setBackground(0.0, 1.0, 1.0);
    } else if (color === "greyGradient") {
        renderer.setBackground(0.5, 0.5, 0.5);
    }
    renderWindow.render();
}

// Initialize scene
addGrid();
addAxes();
resetCamera();

// Event listeners
document.getElementById("fileInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".stl")) {
        loadSTLFile(file);
    } else {
        alert("Only STL files are currently supported.");
    }
});

document.getElementById("resetViewButton").addEventListener("click", resetCamera);

document.getElementById("backgroundDropdown").addEventListener("change", (event) => {
    changeBackground(event.target.value);
});
