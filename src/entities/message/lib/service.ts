import { useQueryClient } from '@tanstack/react-query';

import { Message } from '../model/types';

class MessageService {
    checkIsSelf(message: Message) {
        const queryClient = useQueryClient();
        console.log(message);
    }
}

export default new MessageService();
