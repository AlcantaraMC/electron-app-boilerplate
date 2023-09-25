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
app.disableHardwareAcceleration()

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
 * THIS FUNCTION IS A GENERAL PURPOSE FUNCTION FOR 
 * INSTANTIATING WINDOWS
 * 
 * @param {string} windowTitle : the title to display on the window title bar 
 * @param {string} renderPath : the HTML file or URL to render in the window
 * @param {int} width : the width of the window
 * @param {int} height : the height of the window 
 * @param {boolean} openDevTools : opens the devtools if set true, hides otherwise 
 */
function generateRender ( windowTitle, renderPath, width, height, openDevTools) {

    const genericWindow = new BrowserWindow ({
        title: windowTitle,
        width: width,
        height: height,
        minHeight: 600,
        minWidth: 1024,
        center: true,
    });

    if (openDevTools) {
        genericWindow.webContents.openDevTools ();
    }

    genericWindow.loadFile (path.join (__dirname, `./renderers/${renderPath}`));

    /** start maximized */
    genericWindow.maximize ();
}

/** 
 * instantiate the window using the function...
 * returns a promise.
*/
app
    .whenReady ()
    .then (() => {
        generateRender (
            "Electron Boilerplate Code",
            "index.html",
            1200,
            600,
            false
        );

        /** add the custom menu */
        const mainMenu = Menu.buildFromTemplate (menu);
        Menu.setApplicationMenu (mainMenu);

        /** checks if there are no active windows, if true, creates a window */
        app.on ('activate', () => {
            if (BrowserWindow.getAllWindows ().length === 0) {
                generateRender (
                    "Electron Boilerplate Code",
                    "index.html",
                    1200,
                    600,
                    false
                );
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
                    generateRender (
                        "About Electron Boilerplate Code",
                        "about.html",
                        300,
                        300,
                        false
                    );
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