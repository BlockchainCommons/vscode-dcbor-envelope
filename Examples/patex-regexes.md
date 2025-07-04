```patex
# Regexes inside parentheses
tagged(/regex/, "value")
foo(/regex/, "Bar")
baz(/regex/)
(/regex/)

# Bare regexes (not to be confused with inline comments in dCBOR diagnostic notation)
/Hello/

# Regexes in prefixed single-quoted strings
h'/abc/'
digest'/regex/'
date'/2023-.*/'

# Regexes in bare single-quoted strings
'/abc/'
```
