import React from "react";
import HelloWorld from "components/HelloWorld";
import viteLogo from "/vite.png";
import "./styles/App.css";

export default function App() {
    return (
        <>
            <img src={viteLogo} width={200} />
            <HelloWorld />
            <p>Data received from ipcMain: {window.api.sendSync("test")}</p>
        </>
    );
}
