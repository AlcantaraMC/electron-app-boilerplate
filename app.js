const { app, BrowserWindow, Menu } = require ('electron');
const path = require ('path');

/** constant to check if the OS is Macintosh */
const isOnMacintosh = process.platform === 'darwin';

/** constant to check if the environment is development */
const isDevelopmentEnv = process.env.NODE_ENV !== 'development';

/** suppress chromium errors */
// app.commandLine.appendSwitch('ignore-gpu-blacklist');
// app.commandLine.appendSwitch('disable-gpu');
// app.commandLine.appendSwitch('disable-gpu-compositing');
app.disableHardwareAcceleration();

/** create main window using electron */

function generateRender (rendererPath, settingsObj) {

    const genericWindow = new BrowserWindow( settingsObj );
    genericWindow.loadFile (path.join (__dirname, `./renderers/${rendererPath}`));

    genericWindow.webContents.openDevTools ();

    /** start maximized */
    if (settingsObj.title === "Electron Boilerplate Code") {
        genericWindow.maximize ();
    }
}

/** 
 * instantiate the window using the function...
 * returns a promise.
*/
app
    .whenReady ()
    .then (() => {
        generateRender ("index.html", {
            title: "Electron Boilerplate Code",
            center: true,
            webPreferences: {
                preload: path.join ( __dirname, "preload.js" ),
                contextIsolation: true,
                nodeIntegration: true
            },
        });

        /** add the custom menu */
        const mainMenu = Menu.buildFromTemplate (menu);
        Menu.setApplicationMenu (mainMenu);

        /** checks if there are no active windows, if true, creates a window */
        app.on ('activate', () => {
            if (BrowserWindow.getAllWindows ().length === 0) {
                generateRender ("index.html", {
                    title: "Electron Boilerplate Code",
                    center: true,
                    webPreferences: {
                        preload: path.join ( __dirname, "preload.js" ),
                        contextIsolation: true,
                        nodeIntegration: true
                    },
                });
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
                click: () => {
                    generateRender ("about.html", {
                        title: "About | Electron Boilerplate Code",
                        width: 300,
                        height: 300,
                        minimizable: false,
                        maximizable: false,
                    });
                },
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