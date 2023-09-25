const { create } = require('domain');
const { app, BrowserWindow } = require ('electron');
const path = require ('path');

/** create main window using electron */
function createMainWindow () {

    const mainWindow = new BrowserWindow ({
        title: "Electron Boilerplate Code",
        width: 500,
        height: 600,
    });

    mainWindow.loadFile (path.join (__dirname, './renderers/index.html'));
}

/** instantiate the window using the function */
app
    .whenReady ()
    .then (() => {
        createMainWindow ();
    });