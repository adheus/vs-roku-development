# roku-development README

This extension helps with Roku development in VS code. You can deploy and debug your code through VS Code

## Features

Commands Available:
* `> Roku: Deploy`: Installs and runs the app on the roku device.
* `> Roku: Debug console`: Opens a terminal and connects to the debug console on the roku device
* `> Roku: Deploy & Debug`: Executes "Deploy" and "Debug Console" commands consecutively

## Requirements

You need to have a Roku device on your network, go to preferences and check the Roku development section. Fill in your Roku device IP, username and password. You're good to go.

## Extension Settings

* `roku-development.ip`: The Roku device IP on your local network
* `roku-development.username`: The Roku device developer mode username. Default: rokudev
* `roku-development.password`: The Roku device password.

## Known Issues

There's an issue when running the debug console multiple times. We're working on that.

## Release Notes

This is our first release. Any feedback is welcome.

### 0.2.2

Fixed a bug when where the plugin wouldn't deploy any custom directory inside the project.

### 0.2.1

Added "Deploy & Debug command"
Renamed commands identifiers to roku.dev.[command-name]

### 0.1.1

Added icon to extension package

### 0.1.0

Initial release of Roku development extension

-----------------------------------------------------------------------------------------------------------

**Enjoy!**
