import { useState } from 'react';

import { AppService } from 'entities/app';

import { TokenService } from '../services';

const { socketUrl } = AppService.getUrls();
const ws = new WebSocket(socketUrl);

type Returned = {
    sendMessage: (event: string, message: string) => void;
    onMessage: (event: string, callback: (arg: any) => void) => void;
    onclose: (event: any) => void;
};

function useWebSocket(): Returned {
    const token = TokenService.get()?.access_token;
    ws.onopen = function () {
        ws.send(
            JSON.stringify({
                event: 'UWS_CLIENT_IDENTIFICATION',
                data: {
                    token: token || '',
                },
            })
        );
    };

    const onMessage = (event: string, callback: (arg: any) => void) => {
        ws.addEventListener('message', function (e) {
            const data = JSON.parse(e.data);
            if (data.event === event) {
                callback(data);
            }
        });
    };

    ws.onclose = function (event) {
        console.log('Соединение закрыто');
    };

    const sendMessage = (event: string, message: string) => {
        ws.send(
            JSON.stringify({
                event,
                message,
            })
        );
    };
    return { sendMessage, onMessage, onclose: ws.onclose };
}

export default useWebSocket;
