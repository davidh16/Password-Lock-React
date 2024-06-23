import CryptoJS from "crypto-js";

const secret = import.meta.env.VITE_RESPONSE_SECRET_KEY;
const iv = import.meta.env.VITE_RESPONSE_SECRET_VECTOR;

function decodeBase64(input) {
    return CryptoJS.enc.Base64.parse(input);
}
export function decryptResponse(cipherText){

    const key = CryptoJS.enc.Utf8.parse(secret);
    const iv1 = CryptoJS.enc.Hex.parse(iv);

    const decrypted = CryptoJS.AES.decrypt({
        ciphertext: decodeBase64(cipherText.data)
    }, key, {
        iv: iv1,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
    });

    return CryptoJS.enc.Utf8.stringify(decrypted);
}