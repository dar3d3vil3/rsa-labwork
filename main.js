const RSA = require('./rsa');

const keys = RSA.generateKeys(512);

const message = 'hello world';

const encryptedMsg = RSA.encryptMsg(message, {
    e: keys.e,
    n: keys.n
})
const decryptedMsg = RSA.decryptMsg(encryptedMsg, {
    d: keys.d,
    n: keys.n,
})
console.log(`decryptedMsg: ${decryptedMsg}`);

if(message === decryptedMsg) {
    console.log('The Encryption is correct');
}

