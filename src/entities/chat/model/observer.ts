import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';

import { UniversalStorage } from 'shared/services';

import { ChatService } from '../index';

function chatObserver() {
    const location = useLocation();
    const params = useParams();

    if (params.chat_id) {
        ChatService.subscribeToChat(Number(params.chat_id));
    }
}

export default chatObserver;
