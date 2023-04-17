import { useParams } from 'react-router';
import { usePrevious } from 'react-use';

import { useTheme } from '../../../shared/hooks';
import { ChatService } from '../../chat';

function appObserver() {
    useTheme();

    const params = useParams();
    const prev = usePrevious(params.chat_id);

    if (params.chat_id) {
        if (prev) ChatService.unsubscribeFromChat(Number(prev));
        ChatService.subscribeToChat(Number(params.chat_id));
    } else if (prev) ChatService.unsubscribeFromChat(Number(prev));
}

export default appObserver;
