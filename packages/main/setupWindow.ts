import { join } from "path";
import { BrowserWindow, ipcMain } from "electron";
import isDev from "electron-is-dev";

export function createWindow() {

    const window = new BrowserWindow({
        width: 1280,
        height: 720,
        icon: join(__dirname, "../build/icon.png"),
        resizable: true,
        show: false,
        webPreferences: {
            preload: join(__dirname, "preload.cjs"),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: false
        }
    });

    if (isDev) {
        window.loadURL(process.env.VITE_DEV_SERVER_URL);
    } else {
        window.loadFile(join(__dirname, "../out/renderer/index.html"));
    }

    // window.webContents.openDevTools();

    window.webContents.on("dom-ready", () => window.show());

    ipcMain.on("minimize", () => {
        window.isMinimized() ? window.restore() : window.minimize();
    });
    ipcMain.on("maximize", () => {
        window.isMaximized() ? window.restore() : window.maximize();
    });

    ipcMain.on("close", () => {
        window.close();
    });

    ipcMain.on("test", (e) => {
        e.returnValue = 42;
    });
}
