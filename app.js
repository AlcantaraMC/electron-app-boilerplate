const { create } = require('domain');
const { app, BrowserWindow, Menu } = require ('electron');
const path = require ('path');

/** constant to check if the OS is Macintosh */
const isOnMacintosh = process.platform === 'darwin';

/** constant to check if the environment is development */
const isDevelopmentEnv = process.env.NODE_ENV !== 'development';

/** create main window using electron */
function createMainWindow () {

    const mainWindow = new BrowserWindow ({
        title: "Electron Boilerplate Code",
        width: isDevelopmentEnv ? 900 : 500,
        height: 500,
        center: true,
    });

    /** opens the developer tools if isDevelopmentEnv is set to true */
    if (isDevelopmentEnv) {
        mainWindow.webContents.openDevTools ();
    }

    mainWindow.loadFile (path.join (__dirname, './renderers/index.html'));
}

/** create another window for about page */
function createAboutWindow () {

    const aboutWindow = new BrowserWindow ({
        title: "Electron Boilerplate Code - About",
        width: isDevelopmentEnv ? 500 : 500,
        height: 500,
        center: true,
    });

    /** opens the developer tools if isDevelopmentEnv is set to true */
    // if (isDevelopmentEnv) {
    //     mainWindow.webContents.openDevTools ();
    // }

    aboutWindow.loadFile (path.join (__dirname, './renderers/about.html'));

}


/** 
 * instantiate the window using the function...
 * returns a promise.
*/
app
    .whenReady ()
    .then (() => {
        createMainWindow ();

        /** add the custom menu */
        const mainMenu = Menu.buildFromTemplate (menu);
        Menu.setApplicationMenu (mainMenu);

        /** checks if there are no active windows, if true, creates a window */
        app.on ('activate', () => {
            if (BrowserWindow.getAllWindows ().length === 0) {
                createMainWindow ();
            }
        })
    });

/** customizing the menu */
// const menu = [
//     {
//         label: "File",
//         submenu: [
//             {
//                 label: "Quit",
//                 click: () => { app.quit (); },
//                 accelerator: 'CmdOrCtrl+Q'
//             }
//         ]
//     }
// ];

/** custom menu using roles */
const menu = [
    {
        role: "fileMenu"
    },
    ...(!isOnMacintosh ? [{
        label: "Help",
        submenu: [
            {
                label: "About",
                click: createAboutWindow,
                accelerator: 'CmdOrCtrl+H'
            }
        ]
    }] : []),
];

/** for cross-platform exiting */
app.on ('window-all-closed', () => {

    /** exits the application if not on a macOS */
    if (!isOnMacintosh) {
        app.quit ();
    }

});