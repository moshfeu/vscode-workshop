// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import playerSounds from 'play-sound';

const player = playerSounds();
const logger = vscode.window.createOutputChannel('vscode workshop');

const isProduction = process.env.NODE_ENV === 'production';

const folder = isProduction ? 'dist' : 'src';
logger.appendLine(`folder ${folder}`);

const say = require('say');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let myName: string;
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vscode-workshop" is now active!');

  const inputBox = vscode.window.createInputBox();
  inputBox.title = 'What is your name?';
  inputBox.placeholder = 'Dana';
  inputBox.show();
  inputBox.onDidAccept(() => {
    myName = inputBox.value;
    say.speak(`Hello ${inputBox.value}`);
    inputBox.hide();
  });
  inputBox.onDidHide(() => {
    if (!myName) {
      inputBox.show();
    }
  });

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vscode-workshop.buzz', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
    const path = `${context.extensionPath}/${folder}/assets/buzzer.mp3`;
    logger.appendLine(`Loading audio from ${path}`);
    console.log(path);
    setTimeout(() => {
      say.speak(`${myName}!`);
    }, 500);
    player.play(path, (err) => {
      if (err) {
        console.error(err.message);
      }
    });
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
