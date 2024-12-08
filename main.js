const { app, BrowserWindow, Menu } = require("electron");
const electronReload = require("electron-reload");

electronReload(__dirname, {});
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
            // Send IPC message to renderer to open Settings modal
            if (mainWindow) {
              mainWindow.webContents.send('open-settings');
            }
          }
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    // { role: 'fileMenu' }
    {
      label: 'File',
      submenu: [
        { role: 'close' } // or { role: 'quit' } based on needs
      ]
    },
    // You can add other menu items here if necessary
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  // Create BrowserWindow
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    ...(process.platform !== 'darwin' ? { titleBarOverlay: true } : {}),
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration
      contextIsolation: false, // Disable context isolation
    }
  });

  mainWindow.loadFile("./renderer/public/index.html");

  // Optional: Open DevTools for debugging
  // mainWindow.webContents.openDevTools();
});

// Graceful exit
app.on("window-all-closed", () => {
  app.quit();
});