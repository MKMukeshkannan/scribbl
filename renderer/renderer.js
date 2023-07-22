// const form = document.querySelector("#form");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const text = document.getElementById("name");
//   ipcRenderer.send(text.value);
// });

const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext("2d");
context.fillStyle = "red";
context.fillRect(0, 0, canvas.width, canvas.height);

let isDrawing = false;

canvas.addEventListener("pointerdown", start, false);
canvas.addEventListener("pointermove", draw, false);
canvas.addEventListener("pointerout", stop, false);
canvas.addEventListener("pointerup", stop, false);

let strokeId = 0;
let currStroke;

function start(e) {
  currStroke = {
    id: `pending-${strokeId}`,
    pointerType: "PEN",
    x: [],
    y: [],
    t: [],
    p: [],
  };
  isDrawing = true;
  context.beginPath();
  context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  e.preventDefault();
}

function draw(e) {
  if (isDrawing) {
    context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();

    currStroke.x.push(e.x);
    currStroke.y.push(e.y);
    currStroke.t.push(e.timeStamp);
    currStroke.p.push(1);

    // console.log(e);
  }
}

function stop(e) {
  if (isDrawing) {
    context.stroke();
    context.closePath();
    isDrawing = false;
    strokeId++;

    ipcRenderer.send(currStroke);
  }

  e.preventDefault();
}
