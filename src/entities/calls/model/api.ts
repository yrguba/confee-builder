import { useWebSocket } from 'shared/hooks';

import { SocketIn, SocketOut } from './types';

class CallsApi {
    socket = useWebSocket<SocketIn, SocketOut>();
}

export default new CallsApi();
