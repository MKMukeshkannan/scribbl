const {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  Tray,
  Menu,
} = require("electron");
require("dotenv").config();
const applescript = require("applescript");
const path = require("path");
const WebSocket = require("ws");
const computeHmac = require("./computeHmac.js");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    //titleBarStyle: "hiddenInset",
    //focusable: false,
    //alwaysOnTop: true,
    acceptFirstMouse: true,
    hasShadow: false,
    //type: "panel",

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  win.loadFile("./renderer/index.html");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  const ws = new WebSocket("wss://cloud.myscript.com/api/v4.0/iink/document");
  let isCompleteLoading = false;
  ws.on("error", console.error);

  ws.on("open", function open() {
    console.log("Connecting to the SOCKET . . .");
    const msg = {
      type: "newContentPackage",
      applicationKey: "6c2c1f0a-5277-481b-8a3c-d6fd075b623c",
      xDpi: 90,
      yDpi: 90,
      viewSizeHeight: 800,
      viewSizeWidth: 800,
    };

    ws.send(JSON.stringify(msg));
  });

  ws.on("message", function message(data) {
    console.log("Received: ", JSON.parse(data), "\n");

    const receivedData = JSON.parse(data);

    if (receivedData.type === "ack") {
      const hmac = computeHmac(
        receivedData.hmacChallenge,
        process.env.APPLICATION_KEY,
        process.env.HMAC_KEY
      );

      ws.send(JSON.stringify({ type: "hmac", hmac }));

      const configuration = JSON.stringify({
        type: "configuration",
        alwaysConnected: true,
        lang: "en_US",
        gesture: { enable: true },
        export: {
          "image-resolution": 300,
          jiix: {
            "bounding-box": false,
            strokes: false,
            text: { chars: false, words: true },
          },
        },
        renderer: {
          debug: { "draw-text-boxes": false, "draw-image-boxes": false },
        },
        math: {
          mimeTypes: ["application/x-latex", "application/mathml+xml"],
          solver: {
            enable: true,
            "fractional-part-digits": 3,
            "decimal-separator": ".",
            "rounding-mode": "half up",
            "angle-unit": "deg",
          },
          margin: { bottom: 10, left: 15, right: 15, top: 10 },
          eraser: { "erase-precisely": false },
        },
        text: {
          guides: { enable: true },
          smartGuide: true,
          smartGuideFadeOut: { enable: false, duration: 10000 },
          mimeTypes: ["text/plain", "application/vnd.myscript.jiix"],
          margin: { top: 20, left: 10, right: 10 },
          eraser: { "erase-precisely": false },
        },
        diagram: {
          mimeTypes: ["application/vnd.myscript.jiix"],
          margin: { bottom: 10, left: 15, right: 15, top: 10 },
        },
        "raw-content": { recognition: { text: false, shape: false } },
      });
      const ContentPart = JSON.stringify({
        type: "newContentPart",
        contentType: "TEXT",
        mimeTypes: ["text/plain", "application/vnd.myscript.jiix"],
      });
      const Theme = JSON.stringify({
        type: "setTheme",
        theme:
          "ink {\ncolor: #000000;\n-myscript-pen-width: 1;\n-myscript-pen-fill-style: none;\n-myscript-pen-fill-color: #FFFFFF00;\n}\n.math {\nfont-family: STIXGeneral;\n}\n.math-solved {\nfont-family: STIXGeneral;\ncolor: #A8A8A8FF;\n}\n.text {\nfont-family: MyScriptInter;\nfont-size: 10;\n}\n",
      });

      ws.send(configuration);
      ws.send(ContentPart);
      ws.send(Theme);

      isCompleteLoading = true;

      ipcMain.on("stroke", (e, stroke) => {
        const addStroke = { type: "addStrokes", strokes: [{ ...stroke }] };

        console.log(`Sent: ${{ ...addStroke }}`);
        ws.send(JSON.stringify(addStroke));
      });
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("ready", () => {
  const tray = new Tray(path.join(__dirname, "icon.png")); // Provide the path to your icon image

  const contextMenu = Menu.buildFromTemplate([
    { label: "Item 1", type: "normal" },
    { label: "Item 2", type: "normal" },
    { type: "separator" },
    { label: "Quit", type: "normal", click: app.quit },
  ]);

  tray.setToolTip("My App"); // Set the tooltip for the tray icon
  tray.setContextMenu(contextMenu); // Set the context menu for the tray icon
});
