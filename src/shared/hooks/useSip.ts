import axios from 'axios';
import JsSIP from 'jssip';

const ip = '79.137.209.164';
const port = '41413';
const pass = 'bf8c7669af148ada38a0d6ff323a065f';
const socket = new JsSIP.WebSocketInterface(`wss://${ip}:${port}`);
socket.via_transport = 'TCP';
const configuration = {
    sockets: [socket],
    uri: 'sip:119@79.137.209.164',
    password: 'bf8c7669af148ada38a0d6ff323a065f',
};
const tauriSip = {
    sip: 'sip:00015@79.137.209.164',
    pass: '1MQaEtmtETAguoLY',
};
const browserSip = {
    sip: 'sip:00001@79.137.209.164',
    pass: 'yj0OPzEOJ0JIMqqcO',
};
const sip = new JsSIP.UA(configuration);
// JsSIP.debug.enable('JsSIP:*');
// JsSIP.debug.disable();
function useSip(data: { sip?: string; pass?: string }) {
    // sip.start();
    // sip.on('connected', function (e) {
    //     console.log('connected sip', e);
    // });
    //
    // sip.on('disconnected', function (e) {
    //     console.log('disconnected sip', e);
    // });
    //
    // console.log('connected socket', socket.onconnect());
    // console.log('connected sip', sip.isConnected());
    return {};
}

export default useSip;
