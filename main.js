const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let addWindow;

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

  // Quit app when closed
  mainWindow.on('closed', function() {
    app.quit();
  })

  if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({ label: '' });
  }
  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  mainWindow.webContents.openDevTools();
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Handle create add window
function createAddWindow() {
  // Create new window
  addWindow = new BrowserWindow({
    width: 300,
    height: 300,
    title: 'Add Shopping List Item'
  });
  // Load html into window
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Garbage collection
  addWindow.on('closed', function() {
    addWindow = null;
  })
}

// Create menu template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Add Item',
        accelerator: 'CommandOrControl+N',
        click() {
          createAddWindow();
        }
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
