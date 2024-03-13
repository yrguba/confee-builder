import ReconnectingWebSocket from 'reconnecting-websocket';

import { appService } from 'entities/app';
import { tokensService } from 'entities/viewer';

const { socketUrl } = appService.getUrls();
const ws = new ReconnectingWebSocket(socketUrl);

type Returned<In, Out> = {
    sendMessage: (event: Out, message?: any) => void;
    onMessage: (callback: (arg: any) => void) => void;
};

function useWebSocket<In, Out>(): Returned<In, Out> {
    const token = tokensService.get()?.access_token;

    ws.onopen = function () {
        ws.send(
            JSON.stringify({
                event: 'Auth',
                data: {
                    token: token || '',
                },
            })
        );
    };

    const onMessage = (callback: (arg: any) => void) => {
        ws.addEventListener('message', function (e) {
            const data = JSON.parse(e.data);
            console.log('socket-event', data);
            if (process.env.REACT_APP_DEBUG === 'true') {
                console.log('socket-event', data);
            }
            callback(data);
            // if (data.event === event || event === 'all') {
            //     callback(data);
            // }
        });
    };

    ws.onclose = function (event) {};

    const sendMessage = (event: Out, data: string) => {
        ws.readyState &&
            ws.send(
                JSON.stringify({
                    event,
                    data,
                })
            );
    };

    return { sendMessage, onMessage };
}

export default useWebSocket;
