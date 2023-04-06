import { io, Socket } from 'socket.io-client';

import { http } from '../constanst';
import { TokenService } from '../services';

const socketIo = io(http.url, {
    extraHeaders: {
        Authorization: `Bearer ${TokenService.get()?.access_token || ''}`,
    },
    forceNew: true,
});

export default socketIo;
