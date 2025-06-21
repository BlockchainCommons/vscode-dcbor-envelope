# Test Envelope Pattern in Markdown

Here's an example of envelope pattern syntax:

```envpat
TEXT(/h.*o/)
DATE(/2023-.*/)
TAG(/da.*/)
BSTR(/abc/)

# Regular dcbor patterns still work
TEXT("Hello")
NUMBER(42)
BOOL(true)

# Regex patterns with flags
TEXT(/hello/i)
TEXT(/world/g)
TEXT(/test/gim)
```

And here's regular dcbor for comparison:

```dcbor
TEXT("Hello")
NUMBER(42)
BOOL(true)
/not-a-regex/
```
