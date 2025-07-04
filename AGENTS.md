# Development Guide for dCBOR Envelope VS Code Extension

- See `README.md` for general information about the extension.

## Testing in Development Mode

1. Run `npm install` to install dependencies.
2. Build the extension with `npm run build`.
3. Run the tests with `npm test` to run the unit tests.
4. Launch VS Code with the extension loaded:

```bash
code --extensionDevelopmentPath=$(pwd)
```

- VS Code will open a new window with the extension enabled.
- Open a file with the `.dcbor`, `.envelope`, or `.cbor` extension, or a markdown (`.md`) file with ` ```dcbor `, ` ```envelope `, ` ```cbor `, or ` ```patex ` code fences to see the highlighting.
- To use the color themes, go to the Command Palette (`Cmd+Shift+P`) and select `Preferences: Color Theme`, then choose either `dCBOR Envelope Dark` or `dCBOR Envelope Light`.

## Installing in Your Main VS Code Installation

### Install from VSIX Package

1. Install the `vsce` tool globally if you haven't already:

```bash
npm install -g @vscode/vsce
```

2. Package your extension into a VSIX file:

```bash
vsce package
```

This will create a file like `dcbor-envelope-0.1.0.vsix` in your project directory.

3. Install the VSIX file in your main VS Code:

```bash
code --install-extension dcbor-envelope-0.1.0.vsix
```

### Install it from within VS Code

1. Open VS Code.
2. Go to the Extensions view (`Cmd+Shift+X`).
3. Click on the "..." menu at the top-right of the Extensions view.
4. Select "Install from VSIX...".
5. Navigate to and select your VSIX file.

## Resources

- [Sublime Text Scope Naming](https://www.sublimetxt.com/docs/scope_naming.html)
