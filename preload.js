const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  sendTimerAction: (action, value) =>
    ipcRenderer.send('timer-action', { action, value }),

  onTimerAction: (callback) =>
    ipcRenderer.on('timer-action', (_, data) => callback(data)),
});
