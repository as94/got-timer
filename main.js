const {app, BrowserWindow} = require('electron')

let mainWindow

function createWindow () {

  mainWindow = new BrowserWindow({
    width: 680,
    height: 420,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.setMenu(null);

  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('timer-start');
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})