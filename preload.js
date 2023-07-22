const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (title) => ipcRenderer.send("stroke", title),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});

contextBridge.exposeInMainWorld("ipcRendererNewContent", {
  send: (title) => ipcRenderer.send("content", title),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});

contextBridge.exposeInMainWorld("Bridge", {
  text: (callback) => ipcRenderer.on("text", callback),
});
