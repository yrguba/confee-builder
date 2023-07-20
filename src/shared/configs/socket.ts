import { io } from 'socket.io-client';

import { http } from '../constanst';
import { TokenService } from '../services';

const token = TokenService.get()?.access_token;

const socketIo = {};
//     io(http.url, {
//     extraHeaders: {
//         Authorization: `Bearer ${token || ''}`,
//     },
//     // forceNew: true,
// });

export default socketIo;
