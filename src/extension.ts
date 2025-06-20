import * as vscode from 'vscode';
import { ThemeManager } from './themeManager';

export function activate(context: vscode.ExtensionContext) {
  console.log('dCBOR-Envelope extension is active');

  // Initialize theme manager
  const themeManager = ThemeManager.getInstance(context);

  // Register language configuration for dcbor and envelope files
  vscode.languages.setLanguageConfiguration('dcbor-envelope', {
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')']
    ]
  });

  // When creating decorations or syntax highlights, get colors from the theme manager
  // For example:
  // const hexColor = themeManager.getColorForScope('constant.numeric.hex.json');
  // const hexDecoration = vscode.window.createTextEditorDecorationType({
  //   color: hexColor
  // });

  // Listen for theme changes and update accordingly
  context.subscriptions.push(
    vscode.window.onDidChangeActiveColorTheme(() => {
      // Logic to refresh decorations or highlights when theme changes
      // This might involve re-applying decorations with new colors
    })
  );
}

export function deactivate() {}
