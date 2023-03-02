import CryptoJS from 'crypto-js';

import { secrets } from 'shared/constanst';

function useCrypto(word: string, action: 'encode' | 'decode') {
    if (action === 'encode') return CryptoJS.AES.encrypt(word, secrets.crypto || 'w').toString();
    const bytes = CryptoJS.AES.decrypt(word, secrets.crypto || 'w');
    return bytes.toString(CryptoJS.enc.Utf8);
}
export default useCrypto;
