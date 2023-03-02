import CryptoJS from 'crypto-js';

function useCrypto(word: string, action: 'encode' | 'decode') {
    const secret = process.env.REACT_APP_CRYPTO_SECRET;
    if (action === 'encode') return CryptoJS.AES.encrypt(word, secret || 'w').toString();
    const bytes = CryptoJS.AES.decrypt(word, secret || 'w');
    return bytes.toString(CryptoJS.enc.Utf8);
}
export default useCrypto;
