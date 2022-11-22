import { app } from "electron";

app.on("web-contents-created", (_event, contents) => {
    contents.on("will-navigate", (event) => {
        event.preventDefault();
    });
});
