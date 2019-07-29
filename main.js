const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// Listen for app to be ready
app.on('ready', function () {
  // Create new window
  mainWindow = new BrowserWindow({});
  // Load html into window
  // file://dirname/mainWindow.html
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({ label: '' });
  }
  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  mainWindow.webContents.openDevTools();
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Create menu template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item',
      },
      {
        label: 'Remove Item'
      },
      {
        label: 'Quit',
        accelerator: 'CommandOrControl+Q',
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CommandOrControl+Z',
      },
      {
        label: 'Redo',
        accelerator: 'CommandOrControl+Shift+Z',
      },
      {
        label: 'Cut',
        accelerator: 'CommandOrControl+X',
      },
      {
        label: 'Copy',
        accelerator: 'CommandOrControl+C',
      },
      {
        label: 'Paste',
        accelerator: 'CommandOrControl+V',
      }
    ]
  }
];
