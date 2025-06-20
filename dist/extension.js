"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    const applyDarkThemeCommand = vscode.commands.registerCommand('dcbor-envelope.applyDarkTheme', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield vscode.workspace.getConfiguration().update('workbench.colorTheme', 'dCBOR Envelope Dark', vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage('dCBOR Envelope Dark theme applied successfully!');
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to apply dCBOR Envelope Dark theme: ${error}`);
        }
    }));
    const applyLightThemeCommand = vscode.commands.registerCommand('dcbor-envelope.applyLightTheme', () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield vscode.workspace.getConfiguration().update('workbench.colorTheme', 'dCBOR Envelope Light', vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage('dCBOR Envelope Light theme applied successfully!');
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to apply dCBOR Envelope Light theme: ${error}`);
        }
    }));
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