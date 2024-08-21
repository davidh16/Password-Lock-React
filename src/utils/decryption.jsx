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

    try {
        const base64String = CryptoJS.enc.Base64.stringify(decrypted);
        console.log("Decrypted Base64 String:", base64String);
    } catch (e) {
        console.error("Error converting decrypted data to BASE64:", e.message);
        // Handle the error, perhaps by logging the raw data or using a fallback encoding
    }

    try {
        const hexString = CryptoJS.enc.Hex.stringify(decrypted);
        console.log("Decrypted Hex String:", hexString);
    } catch (e) {
        console.error("Error converting decrypted data to hex:", e.message);
        // Handle the error, perhaps by logging the raw data or using a fallback encoding
    }

    try {
        const byteArray = CryptoJS.enc.Hex.parse(decrypted.toString(CryptoJS.enc.Hex));
        const utf8String = new TextDecoder().decode(new Uint8Array(byteArray.words));
        console.log("Decrypted UTF-8 String using TextDecoder:", utf8String);
    } catch (e) {
        console.error("Error converting decrypted data to BUFFER", e.message);
        // Handle the error, perhaps by logging the raw data or using a fallback encoding
    }

    try {
        const utf8String = CryptoJS.enc.Utf8.stringify(decrypted);
        console.log("Decrypted UTF-8 String:", utf8String);
    } catch (e) {
        console.error("Error converting decrypted data to UTF-8:", e.message);
        // Handle the error, perhaps by logging the raw data or using a fallback encoding
    }






    return CryptoJS.enc.Utf8.stringify(decrypted);
}