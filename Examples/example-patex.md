# Gordian Pattern Expression Languages (patex)

## dCBOR Patex

### Value Patterns

```patex
# Booleans
bool
true
false

# Binary Strings
bstr
h'0102'
h'(/abc/)

# Dates
date
date'2023-12-24'
date'2023-12-24...'
date'...2023-12-26'
date'2023-12-24...2023-12-26'
date'/2023-.*/'

# Known Values
known
'32'
'name'
'/regex/'

# Null
null

# Numbers
number
42
10...20
>=5
<=5
>23
<23
NaN
Infinity
-Infinity

# Text
text
"Hello"
/Hello/
```

### Structure Patterns

```patex
# Digests
digest
digest'00112233'
digest'ur:digest/aabbccdd'
digest'/regex/'

# Arrays
[*]
[{3}]
[{3,5}]
[{3,}]
[42]
["a", "b", "c"]
[(*)*, 42, (*)*]
[42, (*)*]
[(*)*, 42]

# Maps
{*}
{{3}}
{{3,5}}
{{3,}}
{text: *, number: 42}

# Tagged Values
tagged
tagged(42, "value")
tagged(date, 1234)
tagged(/regex/, "value")
```

### Meta Patterns

```patex
# And
>=52 & <100

# Any
*

# Capture
@name(text)

# Not
!"hi"

# Or
text | number | date

# Repeat
( 42 )
( 42 )*
( 42 )?
( 42 )+
( 42 ){3, 5}
( 42 )*?
( 42 )??
( 42 )+?
( 42 ){3, 5}?
( 42 )*+
( 42 )?+
( 42 )++
( 42 ){3, 5}+

# Search
search(text)
```

## Envelope Patterns

### CBOR Pattern
```patex
cbor("text")
```

### Structure Patterns

```patex
leaf
assert
assertpred ( patex )
assertobj ( patex )
digest ( hex )
digest ( ur:digest/value )
node
node ( { n, m } )
obj
obj ( patex )
obscured
elided
encrypted
compressed
pred
pred ( patex )
subj
subj ( patex )
wrapped
unwrap
```

```patex
leaf
[{1,2}]
bool
true
false
cbor([1, 2, 3])
cbor(ur:envelope/aabbccdd)
date
date'2023-12-24...2023-12-26'
DATE(/2023-.*/)
KNOWN
KNOWN('value')
KNOWN('123')
MAP
MAP(2)
MAP({1,2})
NUMBER
NUMBER(42)
NUMBER(10...20)
NUMBER(>=5)
NUMBER(<=5)
NUMBER(>23)
NUMBER(<23)
NUMBER(NaN)
TAG
TAG(4)
TAG(date)
TAG(/da.*/)
TEXT
TEXT("Hello")
TEXT(/h.*o/)

ASSERT
ASSERTPRED(TEXT)
ASSERTOBJ(TEXT)
DIGEST(00112233)
DIGEST(ur:digest/aabbccdd)
NODE
NODE({1,2})
OBJ
OBJ(TEXT)
OBSCURED
ELIDED
ENCRYPTED
COMPRESSED
PRED
PRED(TEXT)
SUBJECT
SUBJECT(TEXT)
WRAPPED
UNWRAP

ANY
NONE
TEXT & TEXT & TEXT
TEXT | TEXT | TEXT
@cap(TEXT)
!TEST
(TEXT)
(TEXT)*
(TEXT)?
(TEXT)+
(TEXT){2,4}
(TEXT)*?
(TEXT)??
(TEXT)+?
(TEXT){2,4}?
(TEXT)*+
(TEXT)?+
(TEXT)++
(TEXT){2,4}+
SEARCH(TEXT)
TEXT > TEXT > TEXT

SEARCH(ASSERTOBJ(TEXT|NUMBER))
SEARCH(ASSERTPRED(TEXT("firstName"))>OBJ(TEXT("James")))
SEARCH(@cap(ASSERTPRED(TEXT("firstName"))>OBJ(TEXT("James"))))
SEARCH(NODE({13}))
DIGEST(a1b2c3)&(!OBSCURED)
(WRAPPED)*>NODE
SEARCH((WRAPPED)*>NODE)
SEARCH(ELIDED)
@num(NUMBER(42))
@num(NUMBER(42))|@num(NUMBER(>40))
@outer(@inner(NUMBER(42)))
@n(NUMBER(2))
BOOL(true)
TEXT("Hello")
TEXT(/h.*o/)
NUMBER(42)
NUMBER(>=5)
NUMBER(1...3)
NUMBER(NaN)
leaf
ARRAY({2,4})
BSTR(h'0102')
BSTR(/abc/)
DATE(2023-12-24...2023-12-26)
DATE(/2023-.*/)
MAP({2,4})
NULL
TAG(date)
TAG(/da.*/)
KNOWN('date')
KNOWN(/da.*/)
CBOR([1, 2, 3])
CBOR({1: 2})
CBOR(1("hi"))
BOOL(true)|BOOL(false)
BOOL(true) & BOOL(false)
BOOL(true)>BOOL(false)
ANY > BOOL(true) & BOOL(false) > NONE | ANY > BOOL(true) & BOOL(false) >
```

```patex
ANY
!TEXT("hi")
!ANY & NONE
SEARCH(TEXT)
(WRAPPED)*
(NUMBER){2,4}+
@outer(@inner(TEXT("hi")))
UNWRAP(NODE)
SUBJECT(TEXT("hi"))
ASSERTPRED(TEXT("hi"))
OBJ ( TEXT("hi") )
NODE
(UNWRAP)*>NODE
@cap((WRAPPED)*)>UNWRAP>NODE
@cap((WRAPPED>UNWRAP)*)>NODE
```
