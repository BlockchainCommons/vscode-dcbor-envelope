# VS Code Syntax‑Highlighting Extension

This extension provides syntax hVS Code will open a new window with the extension enabled. Open a file with the `.dcbor`, `.envelope`, or `.cbor` extension, or a markdown (`.md`) file with ` ```dcbor `, ` ```envelope `, or ` ```cbor ` code fences to see the highlighting.ghlighting for Deterministic CBOR (dCBOR) and Gordian Envelope files in Visual Studio Code.

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
- Special constants and keywords
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
3. Launch VS Code with the extension loaded:

```bash
code --extensionDevelopmentPath=$(pwd)
```

VS Code will open a new window with the extension enabled. Open a file with the `.dcbor` or `.envelope` extension, or a markdown (`.md`) file with ` ```dcbor ` or ` ```envelope ` code fences to see the highlighting.
