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

    console.log(decrypted.words)
    console.log(CryptoJS.enc.Utf8.stringify(decrypted.words))

    try {
        const utf8String = CryptoJS.enc.Utf8.stringify(decrypted);
        console.log("Decrypted UTF-8 String:", utf8String);
    } catch (e) {
        console.error("Error converting decrypted data to UTF-8:", e.message);
        // Handle the error, perhaps by logging the raw data or using a fallback encoding
    }

    return CryptoJS.enc.Utf8.stringify(decrypted);
}