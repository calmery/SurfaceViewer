import * as fs from "fs";
import * as path from "path";
import * as url from "url";
import * as electron from "electron";

// Helper Functions

const getAbsoluteFilePath = (filePath: string): string | undefined => {
  try {
    const result = fs.statSync(filePath);

    if (result.isFile()) {
      return filePath;
    }

    if (result.isDirectory()) {
      return getAbsoluteFilePath(path.join(filePath, "index.html"));
    }
  } catch (_) {
    // Pass
  }
};

// Main

export default (directoryPath: string) => {
  const scheme = 'app';
  const absoluteDirectoryPath = path.resolve(
    electron.app.getAppPath(),
    directoryPath
  );

  const handler = (request, callback) => {
    const indexPath = path.join(absoluteDirectoryPath, "index.html");
    const filePath = path.join(
      absoluteDirectoryPath,
      new url.URL(request.url).pathname
    );

    callback({ path: getAbsoluteFilePath(filePath) || indexPath });
  };

  electron.protocol.registerStandardSchemes([scheme], { secure: true });
  electron.app.on("ready", () => {
    electron.session.defaultSession.protocol.registerFileProtocol(
      scheme,
      handler
    );
  });

  return (browserWindow: electron.BrowserWindow) => {
    browserWindow.loadURL(`${scheme}://-`);
  }
};
