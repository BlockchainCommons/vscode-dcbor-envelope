# dCBOR Diagnostic Notation

```dcbor
# dCBOR Diagnostic Notation Example

# string
"Quoted string"

# number
20
1234.0

# binary data
h'cafebabe'
b64'AQIDBAUGBwgJCg=='

# tagged value
100("Hello")
date(2023-10-01)
tag-name("hello")

# UR literal
ur:envelope/tpsotaaodnoyadgdjlssmkcklgoskseodnyteofwwfylkiftaydpdsjz
ur:date/cyisdadmlasgtapttl

# Line comment
/ block comment /

# known values (tag #6.40000(u64))
'123' / known value /
'date' / named known value /

# The Unit known value #6.40000(0) represents a type with a single inhabitant as
# well as the single inhabitant of that type. It represents the absence of the
# _possibility_ of a value, which is different from the absence of a
# possibly-present value represented by `null`.
''
'0'
Unit

# simple values
[true, false, null]

# array
["A", 32, "B"]
[[["Nested", "Array"]]]

# map
{"key": "value", "number": 42, "boolean": true, "nullValue": null}

# data structures
200(   / envelope /
    [
        {
            201("C"):   / leaf /
            201("D")   / leaf /
        },
        {
            201("E"):   / leaf /
            201("F")   / leaf /
        }
    ]
)

200(   / envelope /
    201(-42)   / leaf /
)

200(   / envelope /
    201(   / leaf /
        40001(   / digest /
            h'8cc96cdb771176e835114a0f8936690b41cfed0df22d014eedd64edaea945d59'
        )
    )
)

555({1: h'6fc4981e8da778332bf93342f3f77d3a'})

49(
    [
        1,
        h'536f6d65206d7973746572696573206172656e2774206d65616e7420746f20626520736f6c7665642e',
        [
            707(
                [
                    1,
                    h'2b9238e19eafbc154b49ec89edd4e0fb1368e97332c6913b4beb637d1875824f3e43bd7fb0c41fb574f08ce00247413d3ce2d9466e0ccfa4a89b92504982710a'
                ]
            ),
            707(
                [
                    1,
                    h'0f9c7af36804ffe5313c00115e5a31aa56814abaa77ff301da53d48613496e9c51a98b36d55f6fb5634fdb0123910cfa4904f1c60523df41013dc3749b377900'
                ]
            )
        ]
    ]
)

300(
    {
        1:
        h'59f2293a5bce7d4de59e71b4207ac5d2',
        2:
        1(1614124800),
        3:
        "Dark Purple Aqua Love",
        4:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }
)

# Examples from RFC8949
# https://www.rfc-editor.org/rfc/rfc8949.html#name-diagnostic-notation

0("2013-03-21T20:04:00Z")

1(1363896240)

true
false
null

# not valid in dCBOR, but included for completeness
undefined
simple(42)

0
100.0
3.14159
-42
-0.1
Infinity
-Infinity
NaN

# Examples from Appendix G of RFC8610
# https://www.rfc-editor.org/rfc/rfc8610#appendix-G

h'48656c6c6f20776f726c64'
h'48 65 6c 6c 6f 20 77 6f 72 6c 64'
h'4 86 56c 6c6f
20776 f726c64'

'hello world'
h'68656c6c6f20776f726c64'

<<1>>              h'01'
<<1, 2>>           h'0102'
<<"foo", null>>    h'63666F6FF6'
<<>>               h''

"Hello world"
"Hello " "world"
"Hello" h'20' "world"
"" h'48656c6c6f20776f726c64' ""

'Hello world'
'Hello ' 'world'
'Hello ' h'776f726c64'
'Hello' h'20' 'world'
'' h'48656c6c6f20776f726c64' '' b64''
h'4 86 56c 6c6f' h' 20776 f726c64'

4711
0x1267
0o11147
0b1001001100111

1.5
0x1.8p0
0x18p-4

h'68656c6c6f20776f726c64'
h'68 65 6c /doubled l!/ 6c 6f /hello/
20 /space/
77 6f 72 6c 64' /world/

/grasp-message/ [/M_DISCOVERY/ 1, /session-id/ 10584416,
                /objective/ [/objective-name/ "opsonize",
                            /D, N, S/ 7, /loop-count/ 105]]

# Examples from Appendix H of RFC8610
# https://www.rfc-editor.org/rfc/rfc8610#appendix-H

{
    "application": "conchometry",
    "reputons": [
        {
            "rater": "Ephthianura",
            "assertion": "codding",
            "rated": "sphaerolitic",
            "rating": 0.34133473256800795,
            "confidence": 0.9481983064298332,
            "expires": 1568,
            "unplaster": "grassy"
        },
        {
            "rater": "nonchargeable",
            "assertion": "raglan",
            "rated": "alienage",
            "rating": 0.5724646875815566,
            "sample-size": 3514,
            "Aldebaran": "unchurched",
            "puruloid": "impersonable",
            "uninfracted": "pericarpoidal",
            "schorl": "Caro"
        },
        {
            "rater": "precollectable",
            "assertion": "Merat",
            "rated": "thermonatrite",
            "rating": 0.19164006323936977,
            "confidence": 0.6065252103391268,
            "normal-rating": 0.5187773690879303,
            "generated": 899,
            "speedy": "solidungular",
            "noviceship": "medicine",
            "checkrow": "epidictic"
        }
    ]
}

# Examples from EDN Literals I-D
# https://www.ietf.org/archive/id/draft-ietf-cbor-edn-literals-08.html

dt'1969-07-21T02:56:16Z',
dt'1969-07-21T02:56:16.5Z',
DT'1969-07-21T02:56:16Z'

-14159024,
-14159023.5,
1(-14159024)

ip'192.0.2.42',
IP'192.0.2.42',
IP'192.0.2.0/24',
ip'2001:db8::42',
IP'2001:db8::42',
IP'2001:db8::/64'

h'c000022a',
52(h'c000022a'),
52([24,h'c00002']),
h'20010db8000000000000000000000042',
54(h'20010db8000000000000000000000042'),
54([64,h'20010db8'])

[1, 2, ..., 3]
,
{ "a": 1,
  "b": ...,
  ...: ...
}

[1, 2, 888(null), 3]
,
{ "a": 1,
  "b": 888(null),
  888(null): 888(null)
}

{ "contract": /CPA/888(["Herewith I buy", 888(null),
                        "gned: Alice & Bob"]),
  "signature": 888([h'4711', 888(null), h'0815']),
}

{ "contract": "Herewith I buy" /.../ "gned: Alice & Bob",
  "signature": h'4711/.../0815',
  # ...: ...
}
```
