const { create } = require('domain');
const { app, BrowserWindow } = require ('electron');
const path = require ('path');

const isOnMacintosh = process.platform === 'darwin';

/** create main window using electron */
function createMainWindow () {

    const mainWindow = new BrowserWindow ({
        title: "Electron Boilerplate Code",
        width: 500,
        height: 600,
    });

    mainWindow.loadFile (path.join (__dirname, './renderers/index.html'));
}

/** 
 * instantiate the window using the function...
 * returns a promise.
*/
app
    .whenReady ()
    .then (() => {
        createMainWindow ();

        /** checks if there are no active windows, if true, creates a window */
        app.on ('activate', () => {
            if (BrowserWindow.getAllWindows ().length === 0) {
                createMainWindow ();
            }
        })
    });


/** for cross-platform exiting */
app.on ('window-all-closed', () => {

    /** exits the application if not on a macOS */
    if (!isOnMacintosh) {
        app.quit ();
    }

});