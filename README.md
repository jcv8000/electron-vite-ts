# electron-vite-ts

Vite + Electron + TypeScript + ESLint Template (React by default) with Hot Reloading for main, preload, and renderer

## Preload hot reloading

By default I have the `watch.mjs` script set up so the entire app process gets killed and restarted whenever the `preload` is modified.

If you want to change this, edit `scripts/watch.mjs` in the `watchPreload` function to say:

```ts
plugins: [{
    name: "electron-preload-watcher",
    closeBundle() {
        server.ws.send({ type: "full-reload" }); // instead of restart();
    }
}],
```