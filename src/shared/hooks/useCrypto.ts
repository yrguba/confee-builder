import CryptoJS from 'crypto-js';

import { appService } from 'entities/app';

function useCrypto(word: string, action: 'encode' | 'decode') {
    const { crypto } = appService.getSecret();
    if (action === 'encode') return CryptoJS.AES.encrypt(word, crypto || 'w').toString();
    const bytes = CryptoJS.AES.decrypt(word, crypto || 'w');
    return bytes.toString(CryptoJS.enc.Utf8);
}
export default useCrypto;
