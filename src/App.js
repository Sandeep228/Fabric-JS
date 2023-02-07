import React, { useEffect } from "react";
import { fabric } from "fabric";

const canvasID = "my-canvas";

function App() {
  let fabCanvas;
  let line;
  let mouseDown = false;
  const initCanvas = () => {
    fabCanvas = new fabric.Canvas(canvasID, {
      backgroundColor: "white",
      width: window.innerWidth - 100,
      height: window.innerHeight - 200,
      isDrawingMode: false,
    });
    fabCanvas.freeDrawingBrush.color = "green";
    fabCanvas.freeDrawingBrush.width = 4;
  };

  const toggleDraw = () => {
    fabCanvas.set({ isDrawingMode: !fabCanvas.isDrawingMode });
  };

  const showReactangle = () => {
    removeEvents();
    var line, isDown, origX, origY, pointer;

    fabCanvas.on("mouse:down", function (o) {
      isDown = true;
      pointer = fabCanvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      pointer = fabCanvas.getPointer(o.e);
      line = new fabric.Rect({
        left: origX,
        top: origY,
        originX: "left",
        originY: "top",
        width: pointer.x - origX,
        height: pointer.y - origY,
        angle: 0,
        fill: "#07ff11a3",
        stroke: "black",
        transparentCorners: false,
      });
      fabCanvas.add(line);
    });

    fabCanvas.on("mouse:move", function (o) {
      if (!isDown) return;
      var pointer = fabCanvas.getPointer(o.e);

      if (origX > pointer.x) {
        line.set({ left: Math.abs(pointer.x) });
      }
      if (origY > pointer.y) {
        line.set({ top: Math.abs(pointer.y) });
      }

      line.set({ width: Math.abs(origX - pointer.x) });
      line.set({ height: Math.abs(origY - pointer.y) });

      fabCanvas.renderAll();
    });

    fabCanvas.on("mouse:up", function (o) {
      isDown = false;
    });
  };

  const showText = () => {
    const text = new fabric.Text("geekyants", {});
    text.set("top", 70);
    text.set("left", 65);
    text.set("fill", "white");
    text.set("fontWeight", "bold");
    text.set("backgroundColor", "#bf94e4");

    fabCanvas.add(text);
  };

  const showTriangle = () => {
    const triangle = new fabric.Triangle({
      width: 150,
      height: 100,
      fill: "",
      stroke: "green",
      strokeWidth: 3,
      cornerColor: "blue",
      angle: 45,
    });
    fabCanvas.add(triangle);
    fabCanvas.centerObject(triangle);
  };

  function enableSelection() {
    removeEvents();
    changeObjectSelection(true);
    fabCanvas.selection = true;
  }

  function changeObjectSelection(value) {
    fabCanvas.forEachObject(function (obj) {
      obj.selectable = value;
    });
    fabCanvas.renderAll();
  }

  const showCircle = () => {
    removeEvents();
    var circle, isDown, origX, origY;
    fabCanvas.on("mouse:down", function (o) {
      isDown = true;
      var pointer = fabCanvas.getPointer(o.e);
      origX = pointer.x;
      origY = pointer.y;
      circle = new fabric.Circle({
        left: pointer.x,
        top: pointer.y,
        radius: 1,
        strokeWidth: 1,
        fill: "#07ff11a3",
        stroke: "black",
        selectable: false,
        originX: "center",
        originY: "center",
      });
      fabCanvas.add(circle);
    });

    fabCanvas.on("mouse:move", function (o) {
      if (!isDown) return;
      var pointer = fabCanvas.getPointer(o.e);
      circle.set({ radius: Math.abs(origX - pointer.x) });
      fabCanvas.renderAll();
    });

    fabCanvas.on("mouse:up", function (o) {
      isDown = false;
    });
  };
  const showLine = () => {
    fabCanvas.on("mouse:down", startaddingline);
    fabCanvas.on("mouse:move", startdrawingline);
    fabCanvas.on("mouse:up", stopdrawingline);
    fabCanvas.selection = false;
  };

  const startaddingline = (o) => {
    mouseDown = true;
    let pointer = fabCanvas.getPointer(o.e);
    console.log(pointer.x);
    console.log(pointer.y);
    line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
      stroke: "red",
      strokeWidth: 3,
    });
    fabCanvas.add(line);

    fabCanvas.requestRenderAll();
  };

  const startdrawingline = (o) => {
    if (mouseDown === true) {
      let pointer = fabCanvas.getPointer(o.e);
      line.set({
        x2: pointer.x,
        y2: pointer.y,
      });
      fabCanvas.requestRenderAll();
    }
  };
  const showimage = () => {
    var imageElement = document.getElementById("img1");
    var image = new fabric.Image(imageElement, {
      opacity: 1,
      left: 110,
      top: 50,
    });
    fabCanvas.add(image);
  };

  const stopdrawingline = () => {
    mouseDown = false;
  };

  function removeEvents() {
    fabCanvas.off("mouse:down");
    fabCanvas.off("mouse:up");
    fabCanvas.off("mouse:move");
  }

  useEffect(() => {
    initCanvas();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Fabric.js</h3>
      <div>
        <button onClick={() => showReactangle()}>Reactangle</button>
        <button onClick={() => showCircle()}> Circle</button>
        <button onClick={() => showTriangle()}>Triangle</button>
        <button onClick={() => showText()}>Text</button>
        <button onClick={() => showLine()}>Line</button>
        <button onClick={() => enableSelection()}>selection</button>
        <button onClick={() => showimage()}>Image Add</button>
        <button onClick={() => toggleDraw()}>Drawing Mode</button>
      </div>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <canvas id={canvasID} style={{ border: "2px solid black" }} />
      </div>
    </div>
  );
}

export default App;

// setTimeout(stop_drawing, 3000);

// function stop_drawing() {
//   fabCanvas.isDrawingMode = false;
// }
