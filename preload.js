/** electron preloader script */

/** import context bridge object from electron */
const { contextBridge } = require ("electron");


/** this creates a listing of exposed functions from the nodejs
 * process into the commonjs (front-end) environment.
 * 
 * this example only shows the versions of each component.
 * we can expose variables as well.
 * 
 * we then call the functions (in this instace) as 'versions.node()' etc.
 * 
 * NOTE: the 'webPreferences' property must be set in the
 * window generator for the exposed functions to be accessible;
 * creating this file is not sufficient to expose them.
 * 
 * e.g. 
 * const win = new BrowserWindow ({
 *  ... other options,
 * webPreferences: {
 *      preload: '/path/to/preload/script.js',
 *      contextIsolation: true,
 *      nodeIntegration: true
 * },
 *  ... other options,
 * });
 */
contextBridge.exposeInMainWorld ('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});