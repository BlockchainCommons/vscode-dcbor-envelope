# VS Code Syntax‑Highlighting Extension

Use this as a scratch pad for notes on progress.

## VS Code development deployment

1. Run `npm install` to install dependencies.
2. Build the extension with `npm run compile`.
3. Launch VS Code with the extension loaded:

```bash
code --extensionDevelopmentPath=$(pwd)
```

VS Code will open a new window with the extension enabled. Open a file with the `.dcbor` or `.envelope` extension, or a markdown (`.md`) file with ` ```dcbor ` or ` ```envelope ` code fences to see the highlighting.
