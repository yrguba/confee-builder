import { useEffect } from 'react';

import { useWebSocket } from 'shared/hooks';

type SocketIn = 'ChatCreated' | 'ChatDeleted' | ' ChatMembersCreated' | 'ChatMembersDeleted' | 'ChatUpdated' | 'ChatPendingMessagesCountUpdated';
type SocketOut = '';

function chatGateway() {
    const { onMessage } = useWebSocket<SocketIn, SocketOut>();

    useEffect(() => {
        onMessage('ChatUpdated', (data) => {
            console.log(data);
        });
    }, []);
}

export default chatGateway;
