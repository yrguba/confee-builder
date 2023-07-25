import { useState } from 'react';

import { http } from '../constanst';
import { TokenService } from '../services';

const ws = new WebSocket(http.socketUrl);

type Returned = {
    sendMessage: (event: string, message: string) => void;
    onmessage: (event: any) => void;
    onclose: (event: any) => void;
    onerror: (event: any) => void;
};

function useWebSocket(): Returned {
    const token = TokenService.get()?.access_token;
    ws.onopen = function () {
        console.log('wdad');
        ws.send(
            JSON.stringify({
                event: 'UWS_CLIENT_IDENTIFICATION',
                data: {
                    token: token || '',
                },
            })
        );
    };
    ws.onmessage = function (event) {
        return event;
    };

    ws.onclose = function (event) {
        console.log('Соединение закрыто');
    };

    ws.onerror = function (error) {
        console.log(`Ошибка: ${error}`);
    };

    const sendMessage = (event: string, message: string) => {
        ws.send(
            JSON.stringify({
                event,
                message,
            })
        );
    };
    return { sendMessage, onmessage: ws.onmessage, onclose: ws.onclose, onerror: ws.onerror };
}

export default useWebSocket;
