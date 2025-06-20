"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const themeManager_1 = require("./themeManager");
function activate(context) {
    console.log('dCBOR-Envelope extension is active');
    // Initialize theme manager but don't apply theme globally
    const themeManager = themeManager_1.ThemeManager.getInstance(context);
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
            return []; // Just to enable the feature
        }
    });
    context.subscriptions.push(tokenProvider);
    // Register a command to manually apply the dCBOR theme if desired
    const applyDarkThemeCommand = vscode.commands.registerCommand('dcbor-envelope.applyDarkTheme', () => {
        vscode.workspace.getConfiguration().update('workbench.colorTheme', 'dCBOR Envelope Dark', vscode.ConfigurationTarget.Global);
    });
    const applyLightThemeCommand = vscode.commands.registerCommand('dcbor-envelope.applyLightTheme', () => {
        vscode.workspace.getConfiguration().update('workbench.colorTheme', 'dCBOR Envelope Light', vscode.ConfigurationTarget.Global);
    });
    context.subscriptions.push(applyDarkThemeCommand, applyLightThemeCommand);
    // Listen for theme changes and update accordingly
    context.subscriptions.push(vscode.window.onDidChangeActiveColorTheme(() => {
        // Logic to refresh decorations or highlights when theme changes
        // This might involve re-applying decorations with new colors
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map