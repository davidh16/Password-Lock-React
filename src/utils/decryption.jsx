import CryptoJS from "crypto-js";

function decodeBase64(input) {
    return CryptoJS.enc.Base64.parse(input);
}
export function decryptResponse(cipherText){

    const key = CryptoJS.enc.Utf8.parse(process.env.RESPONSE_SECRET_KEY);
    const iv1 = CryptoJS.enc.Hex.parse(process.env.RESPONSE_SECRET_VECTOR);

    const decrypted = CryptoJS.AES.decrypt({
        ciphertext: decodeBase64(cipherText.data)
    }, key, {
        iv: iv1,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
    });

    try {
        const byteArray = new Uint8Array(decrypted.sigBytes);
        for (let i = 0; i < decrypted.sigBytes; i++) {
            byteArray[i] = (decrypted.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        }
        const utf8String = new TextDecoder().decode(byteArray);
        console.log("Decrypted UTF-8 String:", utf8String);
    } catch (e) {
        console.error("Error converting decrypted data to UTF-8:", e.message);
    }

    return CryptoJS.enc.Utf8.stringify(decrypted);
}