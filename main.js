const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

app.on("ready", () => {
  // Create the main menu
  const template = [
    // { role: 'appMenu' }
    {
      label: app.name,
      submenu: [
        { role: 'about' },
        { type: 'separator' }, // Separator added here
        {
          label: 'Settings',
          click: () => {
            // Placeholder for opening a simple message window on click
            console.log("Settings clicked");
            // Create a simple message box when "Settings" is clicked
            mainWindow.webContents.executeJavaScript(`alert('Settings clicked')`);
          }
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    // Other roles can be included here as necessary
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [
        { role: 'close' } // or { role: 'quit' } based on needs
      ]
    },
    // Other submenu items can go here
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Create BrowserWindow
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  mainWindow.loadFile("./renderer/public/index.html");
});

// Graceful exit
app.on("window-all-closed", () => {
  app.quit();
});