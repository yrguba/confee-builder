import { Web } from 'sip.js';

import { appService } from 'entities/app';

function useSip() {
    const ip = '79.137.209.164:41413';
    const port = '41413';
    const pass = 'bf8c7669af148ada38a0d6ff323a065f';
    const socketHost = `wss://${ip}`;

    // const options: Web.SimpleUserOptions = {
    //     // aor: 'sip:alice@example.com', // caller
    //     userAgentOptions: { authorizationPassword: 'yj0OPzEOJ0JIMqqcO', authorizationUsername: '00001' },
    //     media: {
    //         constraints: { audio: true, video: false }, // audio only call
    //         // remote: { audio: getAudioElement('remoteAudio') }, // play remote audio
    //     },
    // };
    //
    // // WebSocket server to connect with
    // const server = appService.getUrls().socketUrl;
    //
    // // Construct a SimpleUser instance
    // const simpleUser = new Web.SimpleUser(server, options);
    // simpleUser
    //     .connect()
    //     .then((e) => {
    //         console.log('eeeee', e);
    //         simpleUser.call('sip:bob@example.com');
    //     })
    //     .catch((error: Error) => {
    //         console.log('nooooo', error);
    //     });
}

export default useSip;
