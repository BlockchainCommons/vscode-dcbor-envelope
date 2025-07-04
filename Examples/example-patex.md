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
h'/abc/'

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
cbor
cbor("text")
cbor(ur:digest/value)
cbor(/regex/)
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
date'/2023-.*/'
known
'value'
'123'
{*}
{{2}}
{{1,2}}
number
42
10...20
>=5
<=5
>23
<23
NaN
tagged
tagged(4)
tagged(date)
tagged(/da.*/)
text
"Hello"
/h.*o/

assert
assertpred(text)
assertobj(text)
digest(00112233)
digest(ur:digest/aabbccdd)
node
node({1,2})
obj
obj(text)
obscured
elided
encrypted
compressed
pred
pred(text)
subject
subject(text)
wrapped
unwrap

*
text & text & text
text | text | text
@cap(text)
!test
(text)
(text)*
(text)?
(text)+
(text){2,4}
(text)*?
(text)???
(text)+?
(text){2,4}?
(text)*+
(text)?+
(text)++
(text){2,4}+
search(text)
text -> text -> text

search(assertobj(text|number))
search(assertpred("firstName")>OBJ("James"))
search(@cap(assertpred("firstName")>OBJ("James")))
search(node({13}))
digest(a1b2c3)&(!obscured)
(wrapped)*>node
search((wrapped)*>node)
search(ELIDED)
@num(42)
@num(42)|@num(>40)
@outer(@inner(42))
@n(2)
true
"Hello"
TEXT(/h.*o/)
42
>=5
1...3
NaN
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
true | false
true & false
true > false
* > true & false > NONE | * > true & false >
```

```patex
*
!"hi"
!* & NONE
search(text)
(wrapped)*
(number){2,4}+
@outer(@inner("hi"))
UNWRAP(node)
SUBJECT("hi")
assertpred("hi")
OBJ ( "hi" )
node
(UNWRAP)*>node
@cap((wrapped)*)>UNWRAP>node
@cap((wrapped>UNWRAP)*)>node
```
