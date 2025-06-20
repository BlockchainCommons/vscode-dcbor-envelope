# VS Code Syntax‑Highlighting Extension

This extension provides syntax highlighting for Deterministic CBOR (dCBOR) and Gordian Envelope files in Visual Studio Code.

## Supported Syntax Features

The extension highlights various syntax elements including:

- Regular strings (double and single quoted)
- Prefixed strings (any alphabetic prefix followed by a single-quoted string, like `h'data'` or `b'binary'`)
- Numbers and dates
- Arrays and maps
- Special constants and keywords

## VS Code development deployment

1. Run `npm install` to install dependencies.
2. Build the extension with `npm run compile`.
3. Launch VS Code with the extension loaded:

```bash
code --extensionDevelopmentPath=$(pwd)
```

VS Code will open a new window with the extension enabled. Open a file with the `.dcbor` or `.envelope` extension, or a markdown (`.md`) file with ` ```dcbor ` or ` ```envelope ` code fences to see the highlighting.
