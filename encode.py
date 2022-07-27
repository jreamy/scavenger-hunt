import json
import sys

import time
time.clock = time.process_time

import base64
import hashlib
from Crypto import Random
from Crypto.Util import Padding
from Crypto.Cipher import AES

filename = sys.argv[1] if len(sys.argv) > 1 else "example.json" 
with open(filename) as f:
    hints = json.load(f)

out = []
for hint in hints:

    # hash the lower(alpha_numeric(password))
    key = hashlib.sha256()
    key.update("".join(filter(str.isalnum, hint["password"].lower())).encode("utf-8"))
    cipher = AES.new(key.hexdigest()[:16].encode("utf-8"), AES.MODE_ECB)
    print("pw:", key.hexdigest()[:16].encode("utf-8"))

    # encrypt the message using the hash as the key
    message = Padding.pad(hint["message"].encode("utf-8"), 16)
    ciphertext = base64.b64encode(cipher.encrypt(message))
    print("message", "|", message, "|", ciphertext.decode("utf-8"))
    
    cipher = AES.new(key.hexdigest()[:16].encode("utf-8"), AES.MODE_ECB)
    print(Padding.unpad(cipher.decrypt(base64.b64decode(ciphertext)), 16).decode("utf-8"))
    
    h = hashlib.sha256()
    h.update(hint["message"].encode("utf-8"))

    # store results
    out.append({
        "hint": hint["hint"],
        "encoded": ciphertext.decode("utf8"),
        "hash": h.hexdigest(),
    })

with open("app/src/encrypted.json", "w") as f:
    json.dump(out, f)
