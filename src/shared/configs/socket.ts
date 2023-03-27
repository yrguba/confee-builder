import { io, Socket } from 'socket.io-client';

import { http } from '../constanst';
import { TokenService } from '../services';

async function $socket(): Promise<Socket> {
    const tokens = await TokenService.get();
    return io(http.url, {
        extraHeaders: {
            Authorization: `Bearer ${tokens ? tokens.access_token : ''}`,
        },
        forceNew: true,
    });
}

export default $socket;
