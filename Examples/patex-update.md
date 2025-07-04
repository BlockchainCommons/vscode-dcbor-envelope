Theses changes are for the patex grammar. They do not affect the dCBOR/Envelope grammar.

```patex
# These keywords are now lowercase. After the change, they should be classified like the ones before `->`, and display in the same color.
BOOL -> bool
BSTR -> bstr
TEXT -> text
NUMBER -> number
DATE -> date
KNOWN -> known
DIGEST -> digest
TAG -> tagged
SEARCH -> search
CBOR -> cbor
ASSERT -> assert
ASSERTPRED -> assertpred
ASSERTOBJ -> assertobj
NODE -> node
OBJ -> obj
PRED -> pred
OBSCURED -> obscured
ELIDED -> elided
ENCRYPTED -> encrypted
COMPRESSED -> compressed
WRAPPED -> wrapped
UNWRAP -> unwrap

# These keywords are now removed and should display like the unclassified word `FOO`:

true false null
FOO

ARRAY -> # removed
MAP -> # removed
NULL -> # removed (we now use `null` as the literal value and the pattern for the literal value)
```
