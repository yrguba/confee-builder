import { useQueryClient } from '@tanstack/react-query';

import { Massage } from '../model/types';

class MessageService {
    checkIsSelf(message: Massage) {
        const queryClient = useQueryClient();
        console.log(message);
    }
}

export default new MessageService();
