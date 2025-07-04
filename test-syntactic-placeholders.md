# Test Syntactic Placeholders

This file demonstrates that syntactic placeholders now work in the contexts specified in lines 14-18 of `example-patex.md`.

```patex
h'<hex>'
h'/<regex>/'
"<text>"
date'<iso-date>'
```

Additional test cases:

```patex
# More prefixed string examples with placeholders
digest'<hex>'
node'<repeat>'
cbor'<dcbor-patex>'
bstr'<binary-data>'

# Regex examples with placeholders
h'/<hex-regex>/'
date'/<iso-date-pattern>/'
digest'/<hash-pattern>/'

# Double-quoted strings with placeholders
"<text-content>"
"<placeholder-example>"
"<something-else>"

# Mixed examples
tagged(<tag>, "<value>")
@<name>(<placeholder>)
<patex> | <dcbor-patex>
```
