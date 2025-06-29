```envpat
LEAF
ARRAY({1,2})
BOOL
BOOL(true)
BOOL(false)
BSTR
BSTR(h'0102')
BSTR(/abc/)
CBOR([1, 2, 3])
CBOR(ur:envelope/aabbccdd)
DATE
DATE(2023-12-24...2023-12-26)
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
LEAF
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

```envpat
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
