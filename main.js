const { app, BrowserWindow, utilityProcess } = require("electron");
const path = require("path");

let mainWindow;

app.on("ready", () => {
  /**
   * Create another process that will run backend code
   */
  utilityProcess.fork(path.join(__dirname, "/backend/server.js"), []);

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadFile("./renderer/public/index.html");
});

// Graceful exit
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    processes.forEach(function(proc) {
      proc.kill();
    });
    app.quit();
  }
});
