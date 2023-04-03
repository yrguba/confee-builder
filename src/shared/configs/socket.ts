import { io, Socket } from 'socket.io-client';

import { http } from '../constanst';
import { TokenService } from '../services';

function $socket(): Socket {
    const tokens = TokenService.get();
    return io(http.url, {
        extraHeaders: {
            Authorization: `Bearer ${tokens?.access_token ? tokens.access_token : ''}`,
        },
        forceNew: true,
    });
}

export default $socket;
