import { appService } from 'entities/app';
import { tokensService } from 'entities/viewer';

const { socketUrl, localSocketUrl } = appService.getUrls();
const ws = new WebSocket(socketUrl);

type Returned<In, Out> = {
    sendMessage: (event: Out, message?: any) => void;
    onMessage: (event: In, callback: (arg: any) => void) => void;
};

function useWebSocket<In, Out>(): Returned<In, Out> {
    const token = tokensService.get()?.access_token;
    let isReady = false;
    ws.onopen = function () {
        isReady = true;
        ws.send(
            JSON.stringify({
                event: 'UWS_CLIENT_IDENTIFICATION',
                data: {
                    token: token || '',
                },
            })
        );
    };

    const onMessage = (event: In, callback: (arg: any) => void) => {
        ws.addEventListener('message', function (e) {
            const data = JSON.parse(e.data);
            if (data.event === event) {
                callback(data);
            }
        });
    };

    ws.onclose = function (event) {};

    const sendMessage = (event: Out, data: string) => {
        isReady &&
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
