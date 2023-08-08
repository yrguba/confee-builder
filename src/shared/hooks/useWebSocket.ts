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

    const onMessage = (event: In, callback: (arg: any) => void) => {
        ws.addEventListener('message', function (e) {
            const data = JSON.parse(e.data);
            console.log('socket new message', data);
            if (data.event === event) {
                callback(data);
            }
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
