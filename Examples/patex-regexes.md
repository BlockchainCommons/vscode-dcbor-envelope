## Regexes in various contexts

```patex
# Regexes inside parentheses
tagged(/abc/, "value")
foo(/abc/, "Bar")
baz(/abc/)
(/abc/)

# Bare regexes (not to be confused with inline comments in dCBOR diagnostic notation)
/abc/

# Regexes in prefixed single-quoted strings
h'/abc/'
digest'/abc/'
date'/abc/'

# Regexes in bare single-quoted strings
'/abc/'
```

## Regexes using syntactic placeholders

```patex
# Regexes inside parentheses
tagged(/<regex>/, "value")
foo(/<regex>/, "Bar")
baz(/<regex>/)
(/<regex>/)

# Bare regexes (not to be confused with inline comments in dCBOR diagnostic notation)
/<regex>/

# Regexes in prefixed single-quoted strings
h'/<regex>/'
digest'/<regex>/'
date'/<regex>/'

# Regexes in bare single-quoted strings
'/<regex>/'
```
