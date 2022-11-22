import { ipcRenderer, contextBridge } from "electron";

declare global {
    interface Window {
        api: typeof api;
    }
}

const api = {
    send: (channel: string, ...args: any[]): void => {
        ipcRenderer.send(channel, args);
    },
    sendSync: (channel: string, ...args: any[]): any => {
        return ipcRenderer.sendSync(channel, args);
    },
    on: (channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void): void => {
        ipcRenderer.on(channel, listener);
    }
};

contextBridge.exposeInMainWorld("api", api);
