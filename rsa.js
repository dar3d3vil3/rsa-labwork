const bigInt = require('big-integer');

const generateRandomPrimes = (bits) => {

    const min = bigInt.one.shiftLeft(bits - 1);
    const max = bigInt.one.shiftLeft(bits).prev();
    
    while (true) {
        let p = bigInt.randBetween(min, max);
        if (p.isProbablePrime(256)) {
            return p;
        }
    }
}

const generateKeys = (keysize=256) => {
    const e = bigInt(65537);

    let p;
    let q;
    let totient;

    do {
        p = generateRandomPrimes(keysize / 2);
        q = generateRandomPrimes(keysize / 2);
        totient = p.prev().multiply(q.prev());
        while(bigInt.gcd(e, totient).notEquals(bigInt.one)) {
            e++;
        }
    } while (bigInt.gcd(e, totient).notEquals(1));

    return {
        e,
        n: p.multiply(q),
        d: e.modInv(totient),
    };
}

const encode = (str) => {
    const codes = str
        .split('')
        .map(i => i.charCodeAt())
        .join('');
    return bigInt(codes);
}

const decode = (code) => {
    const stringified = code.toString();
    let string = '';

    for (let i = 0; i < stringified.length; i += 2) {
        let num = Number(stringified.substr(i, 2));

        if (num <= 30) {
            string += String.fromCharCode(Number(stringified.substr(i, 3)));
            i++;
        } else {
            string += String.fromCharCode(num);
        }
    }

    return string;
}

const encryptMsg = (msg, publicKey) => {
    const encodedMsg = encode(msg);
    return bigInt(encodedMsg).modPow(publicKey.e, publicKey.n);
}

const decryptMsg = (encryptedMsg, privateKey) => {
    const code = bigInt(encryptedMsg).modPow(privateKey.d, privateKey.n);
    return decode(code);
}

module.exports = {
    generateKeys,
    encode,
    decode,
    encryptMsg,
    decryptMsg,
};