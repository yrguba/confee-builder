import JsSIP from 'jssip';

import { appService } from 'entities/app';

function useSip() {
    const socket = new JsSIP.WebSocketInterface('wss://sip.myhost.com');
    const configuration = {
        sockets: [socket],
        uri: 'sip:alice@example.com',
        password: 'superpassword',
    };

    const ua = new JsSIP.UA(configuration);
}

export default useSip;
