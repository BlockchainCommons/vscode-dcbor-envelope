# VS Code Syntax‑Highlighting Extension

This extension provides syntax highlighting for:

- CBOR (Concise Binary Object Representation)
- Deterministic CBOR (dCBOR)
- Gordian Envelope notation

It provides a single syntax highlighting grammar that supports all three formats, allowing you to work with CBOR diagnostic notation, dCBOR, and Envelope notation seamlessly.

Filename extensions supported:

- `.cbor`
- `.dcbor`
- `.envelope`

Opening a file with any of these extensions will apply the same syntax highlighting.

Markdown code fences supported:

- ` ```cbor`
- ` ```dcbor`
- ` ```envelope`

# Color Themes

The extension provides two color themes that provide a much more specific look for dCBOR and Envelope notation:

- `dCBOR Envelope Dark`
- `dCBOR Envelope Light`

These themes are designed to enhance the readability of dCBOR and Envelope files, but they must be activated manually.

## Development

### Testing in Development Mode

1. Run `npm install` to install dependencies.
2. Build the extension with `npm run build`.
3. Launch VS Code with the extension loaded:

```bash
code --extensionDevelopmentPath=$(pwd)
```

VS Code will open a new window with the extension enabled. Open a file with the `.dcbor`, `.envelope`, or `.cbor` extension, or a markdown (`.md`) file with ` ```dcbor `, ` ```envelope `, or ` ```cbor ` code fences to see the highlighting.

### Installing in Your Main VS Code Installation

#### Install from VSIX Package

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

Alternatively, you can install it from within VS Code:
- Open VS Code
- Go to Extensions view (Cmd+Shift+X)
- Click on the "..." menu (top-right of the Extensions view)
- Select "Install from VSIX..."
- Navigate to and select your VSIX file
