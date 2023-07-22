const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bg = "white";
let context = canvas.getContext("2d");
context.fillStyle = bg;
context.fillRect(0, 0, canvas.width, canvas.height);

let isDrawing = false;
const fadeTime = 3000;

canvas.addEventListener("pointerdown", start, false);
canvas.addEventListener("pointermove", draw, false);
canvas.addEventListener("pointerout", stop, false);
canvas.addEventListener("pointerup", stop, false);

let strokeId = 0;
let currStroke;
let timer;
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
  clearTimeout(timer);
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
  }
}

function stop(e) {
  if (isDrawing) {
    context.stroke();
    context.closePath();
    isDrawing = false;
    strokeId++;

    currStroke.x.length !== 0 && ipcRenderer.send(currStroke);

    timer = setTimeout(clearCanvas, fadeTime);
  }

  e.preventDefault();
}

function clearCanvas() {
  const display = document.getElementById("displayTag");

  context.fillStyle = bg;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect(0, 0, canvas.width, canvas.height);
  ipcRendererNewContent.send(display.innerText);
}

window.Bridge.text((e, v) => {
  const display = document.getElementById("displayTag");
  display.innerText = v;
});
