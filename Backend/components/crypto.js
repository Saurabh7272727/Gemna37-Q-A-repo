import CryptoJS from 'crypto-js';


// Encryption function
function encryptData(data) {
    const jsonString = JSON.stringify(data);
    return CryptoJS.AES.encrypt(jsonString, process.env.JSON_SECRET_KEY).toString();
}

// Decryption function
function decryptData(encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.JSON_SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}



export { encryptData, decryptData };