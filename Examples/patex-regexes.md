```patex
# Working: Regexes inside parentheses
tagged(/regex/, "value")
foo(/regex/, "Bar")
baz(/regex/)
(/regex/)

# Not working: Bare regexes (confused with comment in dCBOR diagnostic notation)
/Hello/

# Not working: Regexes in prefixed single-quoted strings
h'/abc/'
digest'/regex/'
date'/2023-.*/'
```
