import { app, BrowserWindow } from "electron";
import * as path from "path";
import serve from "./serve";

const launch = serve(path.resolve(__dirname, "../renderer"));

app.on("ready", () => {
  const browserWindow = new BrowserWindow();

  // DevTools

  browserWindow.webContents.openDevTools();

  // Main

  launch(browserWindow);
});
