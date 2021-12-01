import CryptoJS from "crypto-js";

/**
 * Encrypt Using CryptoJS
 * @param _str string you want to encrypt
 * @return cipher text
 * */
export const encrypt = (_str: string) => {
    // Encrypt
    var ciphertext = CryptoJS.AES.encrypt(_str, 'secret key 123').toString();
    return ciphertext
}
/**
 * Decrypt Using CryptoJS
 * @param _str string you want to decrypt
 * @return cipher text
 * */
export const decrypt = (_str: string) => {

    // Decrypt
    var bytes = CryptoJS.AES.decrypt(_str, 'secret key 123');
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
}


