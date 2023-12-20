import { useWebSocket } from 'shared/hooks';

import { SocketIn, SocketOut } from './types';

class MeetApi {
    socket = useWebSocket<SocketIn, SocketOut>();
}

export default new MeetApi();
