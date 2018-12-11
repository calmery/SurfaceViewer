import { app, BrowserWindow } from "electron";
import * as path from "path";
import serve from "./serve";

const launch = serve(path.resolve(__dirname, "../renderer"));

app.on("ready", () => {
  const browserWindow = new BrowserWindow({
    width: 1024,
    height: 768
  });

  // Main

  launch(browserWindow);
});
