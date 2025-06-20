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

These themes are designed to enhance the readability of dCBOR and Envelope files, but they must be activated manually from the Command Palette (`Cmd+Shift+P`) by selecting `Preferences: Color Theme` and choosing one of the themes. They can also be activated from the extension info page in the Extensions view.
