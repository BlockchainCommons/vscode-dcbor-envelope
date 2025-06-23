# Switching Syntax Highlighting

Ensures proper scoping of this extension's syntax highlighting.

```json
{
    "Alice": {
        "knows": "Bob"
    }
}
```

```envelope
"Alice" [
    "knows": "Bob"
]
```

```json
{
    "Alice": {
        "knows": "Bob"
    }
}
```

```envelope
"Alice" [
    "knows": "Bob"
]
```

```swift
let envelope: Envelope = [
    "Alice": [
        "knows": "Bob"
    ]
]
```

```envelope
"Alice" [
    "knows": "Bob"
]
```

```python
envelope = {
    "Alice": {
        "knows": "Bob"
    }
}
```

```envelope
"Alice" [
    "knows": "Bob"
]
```
