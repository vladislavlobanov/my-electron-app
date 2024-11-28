const { app, BrowserWindow } = require('electron');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
  });

  mainWindow.loadFile('./renderer/public/index.html');
});

// Graceful exit
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
