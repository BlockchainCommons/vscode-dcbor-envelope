import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class ThemeManager {
  private static instance: ThemeManager;
  private darkTheme: any;
  private lightTheme: any;

  private constructor(context: vscode.ExtensionContext) {
    const darkThemePath = path.join(context.extensionPath, 'themes', 'dcbor-envelope-dark-color-theme.json');
    const lightThemePath = path.join(context.extensionPath, 'themes', 'dcbor-envelope-light-color-theme.json');

    this.darkTheme = JSON.parse(fs.readFileSync(darkThemePath, 'utf8'));
    this.lightTheme = JSON.parse(fs.readFileSync(lightThemePath, 'utf8'));
  }

  public static getInstance(context?: vscode.ExtensionContext): ThemeManager {
    if (!ThemeManager.instance && context) {
      ThemeManager.instance = new ThemeManager(context);
    }
    return ThemeManager.instance;
  }

  public getCurrentTheme(): any {
    const isDarkTheme = vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.Dark ||
                       vscode.window.activeColorTheme.kind === vscode.ColorThemeKind.HighContrast;

    return isDarkTheme ? this.darkTheme : this.lightTheme;
  }

  public getTokenColors(): any[] {
    return this.getCurrentTheme().tokenColors;
  }

  public getColorForScope(scope: string): string | undefined {
    const theme = this.getCurrentTheme();

    for (const token of theme.tokenColors) {
      if (typeof token.scope === 'string' && token.scope === scope) {
        return token.settings.foreground;
      } else if (Array.isArray(token.scope) && token.scope.includes(scope)) {
        return token.settings.foreground;
      }
    }

    return undefined;
  }
}
