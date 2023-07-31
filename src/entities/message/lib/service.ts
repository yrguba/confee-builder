import { useQueryClient } from '@tanstack/react-query';

import { ViewerService } from '../../viewer';
import { Message } from '../model/types';

class MessageService {
    getNameMessageAuthor(message: Message) {
        const viewerId = ViewerService.getId();
        return message?.author?.id === viewerId ? 'Вы' : message?.author?.first_name;
    }
}

export default new MessageService();
