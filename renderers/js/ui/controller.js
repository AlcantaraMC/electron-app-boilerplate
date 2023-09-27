/**
 * Below is a demonstration of how exposed NodeJS components, functions, etc. 
 * can be accessed in the frontend.
 * 
 * In 'preload.js', the functions versions.node(), versions.chrome(), and versions.electron()
 * are defined via the Electron ContextBridge object.
 */


const v = document.querySelector ('#versions');

const versionsInfo = `<i>Node: ${versions.node()}<br/>Chrome: ${versions.chrome()}<br/>Electron: ${versions.electron()}<i>`;

v.innerHTML = versionsInfo;