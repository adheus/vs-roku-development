import axios from 'axios';
import * as vscode from 'vscode';

function getConfigs() {
  return vscode.workspace.getConfiguration('roku-development');
}

function getRokuIp() {
  return getConfigs().get('ip');
}

export function pressHome() {
  axios.post(`http://${getRokuIp()}:8060/keypress/home`);
}
