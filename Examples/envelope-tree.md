
```json
{
    "949a991e": {
        "subj": "Hello.",
        "fcb4e2be": {
        "pred": "signed",
        "obj": "Signature"
        }
    }
}
```

```envelope
949a991e NODE
    8cc96cdb subj "Hello."
    fcb4e2be ASSERTION
        d0e39e78 pred 'signed'
        b8bb043f obj Signature
```

```envelope
949a991e NODE
    8cc96cdb subj "Hello."
    fcb4e2be ASSERTION
        d0e39e78 pred '3'
        b8bb043f obj 40020(h'd0f6b2577edb3f4b0f533e21577bc12a58aaca2604bc71e84bd4e2c81421900bca361a1a8de3b7dbfe1cb5c16e34cb8c9a78fe6f7a387e959bbb15f6f3d898d3')
```

```envelope
d595106e NODE
    13941b48 subj "Alice"
    399c974c ASSERTION
        d0e39e78 pred 'signed'
        ff10427c obj Signature
    4012caf2 ASSERTION
        db7dd21c pred "knows"
        afb8122e obj "Carol"
    78d666eb ASSERTION
        db7dd21c pred "knows"
        13b74194 obj "Bob"
```

```envelope
d595106e NODE
    13941b48 subj "Alice"
    399c974c ELIDED
    4012caf2 ELIDED
    78d666eb ELIDED
```

```envelope
66c9d594 NODE
    9e3b0673 subj WRAPPED
        b8d857f6 subj NODE
            13941b48 subj "Alice"
            4012caf2 ASSERTION
                db7dd21c pred "knows"
                afb8122e obj "Carol"
            78d666eb ASSERTION
                db7dd21c pred "knows"
                13b74194 obj "Bob"
    f13623da ASSERTION
        d0e39e78 pred 'signed'
        e30a727c obj Signature
```

```envelope
c93370e7 NODE
    0c1e45b9 subj Digest(26d05af5)
    83b00bef ASSERTION
        cdb6a696 pred 'dereferenceVia'
        15eac58f obj "IPFS"
    953cdab2 ASSERTION
        a9a86b03 pred "format"
        9536cfe0 obj "EPUB"
    eec25a61 ASSERTION
        2ddb0b05 pred "work"
        26681136 obj NODE
            0c69be6e subj ARID(7fb90a9d)
            1786d8b5 ASSERTION
                4019420b pred "isbn"
                69ff76b1 obj "9780451191144"
            5355d973 ASSERTION
                2be2d79b pred 'isA'
                6d7c7189 obj "novel"
            63cd143a ASSERTION
                14ff9eac pred 'name'
                29fa40b1 obj NODE
                    5e825721 subj "La rebelión de Atlas"
                    c8db157b ASSERTION
                        60dfb783 pred 'language'
                        b33e79c2 obj "es"
            7d6d5c1d ASSERTION
                29c09059 pred "author"
                1ba13788 obj NODE
                    3c47e105 subj ARID(9c747ace)
                    9c10d60f ASSERTION
                        cdb6a696 pred 'dereferenceVia'
                        34a04547 obj "LibraryOfCongress"
                    bff8435a ASSERTION
                        14ff9eac pred 'name'
                        98985bd5 obj "Ayn Rand"
            9c10d60f ASSERTION
                cdb6a696 pred 'dereferenceVia'
                34a04547 obj "LibraryOfCongress"
            b722c07c ASSERTION
                14ff9eac pred 'name'
                0cfacc06 obj NODE
                    e84c3091 subj "Atlas Shrugged"
                    b80d3b05 ASSERTION
                        60dfb783 pred 'language'
                        6700869c obj "en"
```

```envelope
        0b721f78 NODE
            397a2d4c subj WRAPPED
                8122ffa9 subj NODE
                    10d3de01 subj ARID(4676635a)
                    1f9ff098 ASSERTION
                        9e3bff3a pred "certificateNumber"
                        21c21808 obj "123-456-789"
                    36c254d0 ASSERTION
                        6e5d379f pred "expirationDate"
                        639ae9bf obj 2028-01-01
                    3c114201 ASSERTION
                        5f82a16a pred "lastName"
                        fe4d5230 obj "Maxwell"
                    4a9b2e4d ASSERTION
                        222afe69 pred "issueDate"
                        cb67f31d obj 2020-01-01
                    4d67bba0 ASSERTION
                        2be2d79b pred 'isA'
                        051beee6 obj "Certificate of Completion"
                    5171cbaf ASSERTION
                        3976ef74 pred "photo"
                        231b8527 obj "This is James Maxwell's photo."
                    54b3e1e7 ASSERTION
                        f13aa855 pred "professionalDevelopmentHours"
                        dc0e9c36 obj 15
                    5dc6d4e3 ASSERTION
                        4395643b pred "firstName"
                        d6d0b768 obj "James"
                    68895d8e ASSERTION
                        e6bf4dd3 pred "topics"
                        543fcc09 obj ["Subject 1", "Subject 2"]
                    8ec5e912 ASSERTION
                        2b191589 pred "continuingEducationUnits"
                        4bf5122f obj 1
                    9b3d4785 ASSERTION
                        af10ee92 pred 'controller'
                        f8489ac1 obj "Example Electrical Engineering Board"
                    caf5ced3 ASSERTION
                        8e4e62eb pred "subject"
                        202c10ef obj "RF and Microwave Engineering"
                    d3e0cc15 ASSERTION
                        6dd16ba3 pred 'issuer'
                        f8489ac1 obj "Example Electrical Engineering Board"
            46a02aaf ASSERTION
                d0e39e78 pred 'signed'
                34c14941 obj Signature
            e6d7fca0 ASSERTION
                0fcd6a39 pred 'note'
                f106bad1 obj "Signed by Example Electrical Engineering…"
```
