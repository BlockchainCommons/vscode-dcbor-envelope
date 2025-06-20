import * as vscode from 'vscode';

export const lightTheme = {
    // Define light theme specific colors
    tokenColors: {
        // Customize light theme token colors
        envelope: new vscode.ThemeColor('editor.foreground'),
        envelopeFormatted: new vscode.ThemeColor('editorInfo.foreground'),
        envelopeSubject: new vscode.ThemeColor('editor.selectionBackground'),
        envelopePredicate: new vscode.ThemeColor('editorWarning.foreground'),
        envelopeObject: new vscode.ThemeColor('editor.foreground'),
        envelopeAssertion: new vscode.ThemeColor('editorInfo.foreground'),
        envelopeBase: new vscode.ThemeColor('editor.infoForeground'),
    }
};
