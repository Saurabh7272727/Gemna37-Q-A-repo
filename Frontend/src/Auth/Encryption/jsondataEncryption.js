import CryptoJS from 'crypto-js';


// Encryption function
function encryptData(data) {
    try {
        const jsonString = JSON.stringify(data);
        return CryptoJS.AES.encrypt(jsonString, import.meta.env.VITE_APP_JSON_SECRET_KEY).toString();
    } catch (error) {
        return "unknown token reverser"
    }

}

// Decryption function
function decryptData(encryptedData) {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedData, import.meta.env.VITE_APP_JSON_SECRET_KEY);
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        return "unknown token reverser"
    }
}



export { encryptData, decryptData };