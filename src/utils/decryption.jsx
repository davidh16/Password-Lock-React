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

    console.log(decrypted)
    console.log(CryptoJS.enc.Utf8.stringify(decrypted))

    return CryptoJS.enc.Utf8.stringify(decrypted);
}