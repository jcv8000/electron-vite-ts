import { spawn } from "child_process";
import { createServer, build } from "vite";
import electron from "electron";

/** @type {import("node:child_process").ChildProcess} */
let electronApp = null;
let killable = false;

function watchMain() {

    /** @type {import("net").AddressInfo} */
    const address = server.httpServer.address();
    Object.assign(process.env, {
        VITE_DEV_SERVER_HOSTNAME: address.address,
        VITE_DEV_SERVER_PORT: address.port,
        VITE_DEV_SERVER_URL: `http://${address.address}:${address.port}`
    });

    return build({
        configFile: "packages/main/vite.config.ts",
        mode: "development",
        plugins: [
            {
                name: "electron-main-watcher",
                closeBundle() {
                    restart();
                }
            }
        ],
        build: {
            watch: {}
        }
    });
}

/**
 * @param {import("vite").ViteDevServer} server 
 */
function watchPreload(server) {
    return build({
        configFile: "packages/preload/vite.config.ts",
        mode: "development",
        plugins: [{
            name: "electron-preload-watcher",
            closeBundle() {
                // If you don't want the entire app to shut down and restart
                // when the preload is modified, replace the line below with
                // server.ws.send({ type: "full-reload" });
                restart();
            }
        }],
        build: {
            watch: {}
        }
    });
}

function start() {
    electronApp = spawn(electron, ["."], { stdio: "inherit" });
    electronApp.addListener("exit", process.exit);
}

function restart() {
    if (electronApp !== null && killable) {
        electronApp.removeListener("exit", process.exit);
        electronApp.kill("SIGINT");

        start();

        console.log("Restarting app...");
    }
}

const server = await createServer({ configFile: "packages/renderer/vite.config.ts" });

await server.listen();
await watchPreload(server);
await watchMain();

start();

setTimeout(() => {
    killable = true;
}, 700);
