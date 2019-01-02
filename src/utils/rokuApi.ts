import axios from 'axios';
import * as vscode from 'vscode';
import * as rokudeploy from 'roku-deploy';
import * as fs from 'fs';
import * as path from 'path';

function getConfigs() {
  return vscode.workspace.getConfiguration('roku-development');
}

function getRokuIp() {
  return getConfigs().get('ip');
}

export function pressHome() {
  return axios.post(`http://${getRokuIp()}:8060/keypress/home`);
}

export function getDebugConsoleCommand(): string {
  return `telnet ${getRokuIp()} 8085`;
}

export function getRokuDevice(): string {
  return `Roku device [${getRokuIp()}]`;
}

async function deployApp() {
  const currentFolders = vscode.workspace.workspaceFolders;
  const config = getConfigs();
  const ip: string | undefined = config.get('ip');
  const username: string | undefined = config.get('username');
  const password: string | undefined = config.get('password');
  const dir: string | undefined = config.get('dir')

  if (!currentFolders) {
    vscode.window.showErrorMessage('Unable to launch your application');
    return;
  }
  else if (!ip || !password) {
    vscode.window.showErrorMessage(
      'Check your settings for this extension. IP and Password are required.'
    );
    return;
  }

  let currentFolder = currentFolders[0].uri.fsPath;
  if (dir != "") {
    currentFolder = path.join(currentFolder, dir);
  }

  fs.readdir(currentFolder, async function (error, fileNames) {
    if (error) {
      return;
    } else {

      const ignoreHiddenFiles = fileNames.filter(file => !file.startsWith("."));

      try {
        await rokudeploy.deploy({
          host: ip,
          password: password,
          rootDir: currentFolder,
          outDir: currentFolder + "/.out",
          files: ignoreHiddenFiles,
          username: username,
        });
        vscode.window.showInformationMessage('Application launched successfully');
      } catch (error) {
        vscode.window.showErrorMessage('Unable to launch your application');
      }
    }
  });
}

export async function deploy() {
  await pressHome();
  await deployApp();
}
