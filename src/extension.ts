'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "roku-development" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let deployDisposable = vscode.commands.registerCommand('extension.deploy', () => {
        // The code you place here will be executed every time your command is executed

        const config = vscode.workspace.getConfiguration("roku-development");
        const ipAddress = config.get("ip");

        // Display a message box to the user
        vscode.window.showInformationMessage(`Deploying app to Roku device [${ipAddress}]`);
    });


    context.subscriptions.push(deployDisposable);

    let debugDisposable = vscode.commands.registerCommand('extension.debug', () => {
        // The code you place here will be executed every time your command is executed
        const rokuDebugConsoleName = "Roku debug console";

        let rokuConsole = vscode.window.terminals.find(terminal => terminal.name === rokuDebugConsoleName);

        // Close any instances of Roku debug console before running again
        if (rokuConsole) {
            rokuConsole.dispose();
        }

        const config = vscode.workspace.getConfiguration("roku-development");
        const ipAddress = config.get("ip");
        const command = `telnet ${ipAddress} 8085`;
        
        rokuConsole = vscode.window.createTerminal(rokuDebugConsoleName);
        rokuConsole.sendText(command);

        rokuConsole.show();

        // Display a message box to the user
        vscode.window.showInformationMessage(`Started debug console for Roku device [${ipAddress}]`);
    });

    context.subscriptions.push(debugDisposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}