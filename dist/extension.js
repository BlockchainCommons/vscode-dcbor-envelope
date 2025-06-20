"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const themeManager_1 = require("./themeManager");
function activate(context) {
    console.log('dCBOR-Envelope extension is active');
    // Initialize theme manager
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
    // When creating decorations or syntax highlights, get colors from the theme manager
    // For example:
    // const hexColor = themeManager.getColorForScope('constant.numeric.hex.dcbor');
    // const hexDecoration = vscode.window.createTextEditorDecorationType({
    //   color: hexColor
    // });
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