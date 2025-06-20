# Markdown Example

This document demonstrates embedding dCBOR diagnostic notation and Gordian Envelope notation within a Markdown file. If the `dCBOR-Envelope` extension is enabled, the following sections will be rendered accordingly.

## dCBOR Diagnostic Notation

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

# known values
'123' / known value /
'knownValue' / named known value /
'' / the Unit known value /
'0'
Unit

# simple values
true, false, null

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

# Examples from EDN I-D
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

## Gordian Envelope Notation

```envelope
# Gordian Envelope Notation Example

"Alice" [
    "knows": "Bob"
]

{
    ARID(4676635a) [
        'isA': "Certificate of Completion"
        "certificateNumber": "123-456-789"
        "continuingEducationUnits": 1
        "expirationDate": 2028-01-01
        "firstName": "James"
        "issueDate": 2020-01-01
        "lastName": "Maxwell"
        "photo": "This is James Maxwell's photo."
        "professionalDevelopmentHours": 15
        "subject": "RF and Microwave Engineering"
        "topics": ["Subject 1", "Subject 2"]
        'controller': "Example Electrical Engineering Board"
        'issuer': "Example Electrical Engineering Board"
    ]
} [
    'note': "Signed by Example Electrical Engineering Board"
    'signed': Signature
]

Bytes(16) [
    'isA': 'Seed'
    'attachment': {
        "Attachment Data V1"
    } [
        'conformsTo': "https://example.com/seed-attachment/v1"
        'vendor': "com.example"
    ]
    'attachment': {
        "Attachment Data V2"
    } [
        'conformsTo': "https://example.com/seed-attachment/v2"
        'vendor': "com.example"
    ]
    'name': "Alice's Seed"
    'note': "This is the note."
]

"subject" [
    "predicate" [
        "predicate-predicate": "predicate-object"
    ]
    : "object" [
        "object-predicate": "object-object"
    ]
]

Digest(8cc96cdb771176e835114a0f8936690b41cfed0df22d014eedd64edaea945d59)

'' [
    "foo": "bar"
]

ELIDED [
    "knows": "Bob"
]

"Alice" [
    ELIDED (2)
]

ENCRYPTED [
    'hasSecret': EncryptedKey(Argon2id)
    'hasSecret': EncryptedKey(HKDF(SHA256))
    'hasSecret': EncryptedKey(Scrypt)
]

Digest(26d05af5) [
    "format": "EPUB"
    "work": ARID(7fb90a9d) [
        'isA': "novel"
        "author": ARID(9c747ace) [
            'dereferenceVia': "LibraryOfCongress"
            'name': "Ayn Rand"
        ]
        "isbn": "9780451191144"
        'dereferenceVia': "LibraryOfCongress"
        'name': "Atlas Shrugged" [
            'language': "en"
        ]
        'name': "La rebelión de Atlas" [
            'language': "es"
        ]
    ]
    'dereferenceVia': "IPFS"
]

{
    {
        {
            ARID(4676635a) [
                'isA': "Certificate of Completion"
                "expirationDate": 2028-01-01
                "firstName": "James"
                "lastName": "Maxwell"
                "subject": "RF and Microwave Engineering"
                'issuer': "Example Electrical Engineering Board"
                ELIDED (7)
            ]
        } [
            'note': "Signed by Example Electrical Engineering Board"
            'signed': Signature
        ]
    } [
        "employeeHiredDate": 2022-01-01
        "employeeStatus": "active"
    ]
} [
    'note': "Signed by Employer Corp."
    'signed': Signature
]

COMPRESSED

ENCRYPTED [
    'hasRecipient': SealedMessage
    'hasRecipient': SealedMessage
    'hasSecret': EncryptedKey(Argon2id)
    'sskrShare': SSKRShare
]

{
    "Alpha" [
        'salt': Salt
    ]
} [
    'note' [
        'salt': Salt
    ]
    : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." [
        'salt': Salt
    ]
]
```
