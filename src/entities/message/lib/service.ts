import { useQueryClient } from '@tanstack/react-query';

import { ViewerService } from '../../viewer';
import { Message } from '../model/types';

class MessageService {
    getNameMessageAuthor(message: Message) {
        const viewer = ViewerService.getViewer();
        return message?.user?.id === viewer?.id ? 'Вы' : message.user.name;
    }
}

export default new MessageService();
