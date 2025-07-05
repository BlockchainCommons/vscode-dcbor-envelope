```patex
# Regexes inside parentheses
tagged(/regex/, "value")
foo(/regex/, "Bar")
baz(/regex/)
(/regex/)

# Bare regexes (not to be confused with inline comments in dCBOR diagnostic notation)
/regex/

# Regexes in prefixed single-quoted strings
h'/regex/'
digest'/regex/'
date'/regex/'

# Regexes in bare single-quoted strings
'/regex/'
```

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
