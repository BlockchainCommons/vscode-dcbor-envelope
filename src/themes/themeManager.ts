import * as vscode from 'vscode';
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

export class ThemeManager {
    private static instance: ThemeManager;
    private currentTheme: any;

    private constructor() {
        this.updateThemeBasedOnVSCode();

        // Listen for theme changes in VSCode
        vscode.window.onDidChangeActiveColorTheme(() => {
            this.updateThemeBasedOnVSCode();
        });
    }

    public static getInstance(): ThemeManager {
        if (!ThemeManager.instance) {
            ThemeManager.instance = new ThemeManager();
        }
        return ThemeManager.instance;
    }

    private updateThemeBasedOnVSCode(): void {
        const currentKind = vscode.window.activeColorTheme.kind;

        if (currentKind === vscode.ColorThemeKind.Dark || currentKind === vscode.ColorThemeKind.HighContrast) {
            this.currentTheme = darkTheme;
        } else {
            this.currentTheme = lightTheme;
        }
    }

    public getTheme(): any {
        return this.currentTheme;
    }

    public getTokenColor(tokenName: string): vscode.ThemeColor {
        return this.currentTheme.tokenColors[tokenName];
    }
}
