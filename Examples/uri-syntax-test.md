# URI Syntax Test

This file demonstrates the updated URI literal syntax that now recognizes any URI scheme, not just `ur:`.

## Examples of supported URI schemes:

```dcbor
# Original ur: URIs still work
ur:envelope/tpsotaaodnoyadgdjlssmkcklgoskseodnyteofwwfylkiftaydpdsjz
ur:date/cyisdadmlasgtapttl

# HTTP/HTTPS URLs
https://example.com/path/to/resource
http://localhost:3000/api/data

# File URLs
file:///Users/user/documents/file.txt

# FTP URLs
ftp://ftp.example.com/files/document.pdf

# Custom schemes
bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
mailto:user@example.com
tel:+1234567890

# Data URLs
data:text/plain;base64,SGVsbG8gV29ybGQ=

# Other common schemes
ldap://ldap.example.com/cn=John,dc=example,dc=com
news:comp.lang.javascript
urn:isbn:1234567890
```

All of these URI formats should now be properly highlighted with the syntax coloring.
