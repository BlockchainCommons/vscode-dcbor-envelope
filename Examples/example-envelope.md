# Gordian Envelope Notation

```envelope
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
```

```envelope
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
```

```envelope
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

Unit [
    "foo": "bar"
]

'0' [
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
    : "Lorem ipsum dolor sit amet, consectetur adipiscing elit." [
        'salt': Salt
    ]
]

request(ARID(c66be27d)) [
    'body': «do_it» [
        ❰arg1❱: Type1
        ❰arg2❱: Type2
    ]
    'senderPublicKey': PublicKeyBase
    'senderContinuation': ENCRYPTED [
        'hasRecipient': SealedMessage
    ]
]
```
