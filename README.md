# VS Code Syntax‑Highlighting Extension

This extension provides syntax hVS Code will open a new window with the extension enabled. Open a file with the `.dcbor`, `.envelope`, or `.cbor` extension, or a markdown (`.md`) file with ` ```dcbor `, ` ```envelope `, or ` ```cbor ` code fences to see the highlighting for Deterministic CBOR (dCBOR) and Gordian Envelope files in Visual Studio Code.

The extension provides two color themes that provide a much more specific look for dCBOR and Envelope notation: `dCBOR Envelope Dark` and `dCBOR Envelope Light`. These themes are designed to enhance the readability of dCBOR and Envelope files, but they must be activated manually.

## Supported Syntax Features

The extension highlights various syntax elements including:

- Regular strings (double and single quoted)
- Prefixed strings (any alphabetic prefix followed by a single-quoted string, like `h'data'` or `b'binary'`)
- Multi-line prefixed strings that can span across multiple lines with inline comments
- Numbers in various formats:
  - Decimal integers and floating point (`42`, `3.14`)
  - Hexadecimal (`0x1267`)
  - Binary (`0b10010011`)
  - Octal (`0o755`)
  - Scientific notation (`1.2e10`, `0x18p-4`)
- Dates in ISO format
- Arrays and maps
- Special constants and keywords used in dCBOR and Envelope notation
- Ellipsis notation (`...` or `…`) highlighted in comment color

### Multi-line String Examples

```dcbor
h'68 65 6c /doubled l!/ 6c 6f /hello/
20 /space/
77 6f 72 6c 64' /world/
```

The extension provides consistent coloration for:
- Prefixed strings (entire string including prefix has the same color)
- Inline comments within multiline strings are highlighted differently

Examples from RFC8610:

```dcbor
h'48656c6c6f20776f726c64'
h'48 65 6c 6c 6f 20 77 6f 72 6c 64'
h'48 65 6c 6c 6f
20 77 6f 72 6c 64'
```

### Numeric Format Examples

```dcbor
# Standard decimal
4711
-123
1.5

# Hexadecimal
0x1267

# Binary
0b10010011001111

# Hexadecimal floating point with binary exponent
0x1.8p0     # 1.5 (1.5 × 2^0)
0x18p-4     # 1.5 (24 × 2^-4 = 24/16 = 1.5)
0x3.ap5     # 116.0 (3.625 × 2^5)
```

## VS Code development deployment

1. Run `npm install` to install dependencies.
2. Build the extension with `npm run compile`.
3. Launch VS Code with the extension loaded:

```bash
code --extensionDevelopmentPath=$(pwd)
```

VS Code will open a new window with the extension enabled. Open a file with the `.dcbor` or `.envelope` extension, or a markdown (`.md`) file with ` ```dcbor ` or ` ```envelope ` code fences to see the highlighting.

## Development

### Testing in Development Mode

1. Run `npm install` to install dependencies.
2. Build the extension with `npm run compile`.
3. Launch VS Code with the extension loaded:

```bash
code --extensionDevelopmentPath=$(pwd)
```

VS Code will open a new window with the extension enabled. Open a file with the `.dcbor`, `.envelope`, or `.cbor` extension, or a markdown (`.md`) file with ` ```dcbor `, ` ```envelope `, or ` ```cbor ` code fences to see the highlighting.

### Installing in Your Main VS Code Installation

#### Option 1: Install from VSIX Package

1. Package your extension into a VSIX file:

```bash
npm install -g @vscode/vsce
vsce package
```

This will create a file like `dcbor-envelope-0.1.0.vsix` in your project directory.

1. Install the VSIX file in your main VS Code:

```bash
code --install-extension dcbor-envelope-0.1.0.vsix
```

Alternatively, you can install it from within VS Code:
- Open VS Code
- Go to Extensions view (Cmd+Shift+X)
- Click on the "..." menu (top-right of the Extensions view)
- Select "Install from VSIX..."
- Navigate to and select your VSIX file

#### Option 2: Create a Symlink

For a more development-friendly approach that automatically reflects your changes:

1. Navigate to your VS Code extensions directory:

```bash
cd ~/.vscode/extensions
```

2. Create a symlink to your extension directory:

```bash
ln -s /Users/wolf/Dropbox/DevProjects/BlockchainCommons/dcbor-envelope dcbor-envelope
```

3. Restart VS Code completely

#### Testing the Installation

After installing:

1. Restart VS Code if it was already open
2. Open a file with `.dcbor`, `.envelope`, or `.cbor` extension
3. Or create a Markdown file with code blocks using the ` ```dcbor ` syntax
4. Verify that syntax highlighting works correctly

If you need to make changes, update your extension and either:
- Repackage and reinstall (Option 1)
- Just restart VS Code if using symlinks (Option 2)

### Theme Usage

This extension comes with specialized themes for dCBOR and Envelope files, but they're not automatically applied to prevent affecting your entire VS Code color scheme.

#### Option 1: Use with your current theme (Recommended)

The syntax highlighting will work with any VS Code theme. The extension's language grammar provides proper syntax highlighting while respecting your current VS Code theme.

#### Option 2: Apply dedicated themes

If you want to use the dedicated dCBOR/Envelope themes:

1. Open the Command Palette (`Cmd+Shift+P`)
2. Type "dCBOR Envelope: Apply Dark Theme" or "dCBOR Envelope: Apply Light Theme"
3. To revert to your previous theme, open the Command Palette and select your preferred theme

**Note:** Applying the extension's themes will change your entire VS Code color theme, not just dCBOR/Envelope files.
