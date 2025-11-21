const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let controlWindow;
let timerWindow;

function createWindows() {
 controlWindow = new BrowserWindow({
  width: 1000,
  height: 900,
  resizable: true,        // allow resize
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
  }
});


  timerWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  controlWindow.loadFile('control.html');
  timerWindow.loadFile('timer.html');
}

// Receive control-window events → forward to timer window
ipcMain.on('timer-action', (_, data) => {
  timerWindow.webContents.send('timer-action', data);
});

app.whenReady().then(createWindows);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindows();
});
