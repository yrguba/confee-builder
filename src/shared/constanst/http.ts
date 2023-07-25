const dev = 'https://dev.api.confee.ru';
// const prod = 'http://prod.hoolichat.ru';
const local = 'http://localhost:5000';

export const host = window.location.href.split('/')[2];
export const url = dev;
export const socketUrl = 'wss://dev.ws.confee.ru:9003/ws';
export const api_version = process.env.REACT_APP_API_VERSION;
