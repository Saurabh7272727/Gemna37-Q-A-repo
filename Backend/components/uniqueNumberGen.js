import crypto from 'crypto';

function generateSecureOTP(length = 6) {
    if (length < 4 || length > 10) {
        throw new Error('OTP length should be between 4 and 10 digits');
    }

    // Generate cryptographically strong random bytes
    const buffer = crypto.randomBytes(length);
    const hex = buffer.toString('hex');

    // Convert to numeric OTP
    let otp = '';
    for (let i = 0; i < hex.length && otp.length < length; i++) {
        const char = hex[i];
        if (!isNaN(parseInt(char))) {
            otp += char;
        }
    }

    // If we don't have enough digits, pad with zeros
    while (otp.length < length) {
        otp += '0';
    }

    return otp.substring(0, length);
}

// Usage
export default generateSecureOTP   // More secure 6-digit OTP