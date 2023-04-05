import { useQueryClient } from '@tanstack/react-query';

import { Message } from '../model/types';

class MessageService {
    checkIsSelf(message: Message) {
        const queryClient = useQueryClient();
    }
}

export default new MessageService();
