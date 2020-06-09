const RSA = require("./rsa");

const keys = RSA.generateKeys(512);

const message = "hello there i am using RSA Encryption.";

console.log(`Original Message: ${message}`);

const encryptedMsg = RSA.encryptMsg(message, {
    e: keys.e,
    n: keys.n,
});

console.log(`Encrypted Messsage: ${encryptedMsg}`);

const decryptedMsg = RSA.decryptMsg(encryptedMsg, {
    d: keys.d,
    n: keys.n,
});

console.log(`Decrypted Message: ${decryptedMsg}`);

if (message === decryptedMsg) {
    console.log("The Encryption is correct");
}
