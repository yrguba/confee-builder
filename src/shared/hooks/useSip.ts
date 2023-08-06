import axios from 'axios';
import JsSIP from 'jssip';

const ip = '79.137.209.164';
const port = '41413';
const pass = 'bf8c7669af148ada38a0d6ff323a065f';

// JsSIP.debug.enable('JsSIP:*');
// JsSIP.debug.disable();
function useSip(data: { sip: string; pass: string }) {
    console.log(data);
    const socket = new JsSIP.WebSocketInterface(`wss://${ip}:${port}`);

    const configuration = {
        sockets: [socket],
        uri: 'sip:119@79.137.209.164',
        password: 'bf8c7669af148ada38a0d6ff323a065f',
    };

    const sip = new JsSIP.UA(configuration);

    return sip;
}

export default useSip;
