import * as vscode from 'vscode';
import { ThemeManager } from './themeManager';

export function activate(context: vscode.ExtensionContext) {
  console.log('dCBOR-Envelope extension is active');

  // Initialize theme manager but don't apply theme globally
  const themeManager = ThemeManager.getInstance(context);

  // Register language configuration for dcbor and envelope files
  vscode.languages.setLanguageConfiguration('dcbor-envelope', {
    brackets: [
      ['{', '}'],
      ['[', ']'],
      ['(', ')'],
      ['«', '»'],
      ['❰', '❱'],
      ['<<', '>>']
    ]
  });

  // Register markdown token provider to enhance the markdown code blocks
  const markdownSelector = { language: 'markdown', scheme: '*' };
  const tokenProvider = vscode.languages.registerDocumentHighlightProvider(markdownSelector, {
    provideDocumentHighlights(document, position, token) {
      return [];  // Just to enable the feature
    }
  });
  context.subscriptions.push(tokenProvider);

  // Listen for theme changes and update accordingly
  context.subscriptions.push(
    vscode.window.onDidChangeActiveColorTheme(() => {
      // Logic to refresh decorations or highlights when theme changes
      // This might involve re-applying decorations with new colors
    })
  );
}

export function deactivate() {}
