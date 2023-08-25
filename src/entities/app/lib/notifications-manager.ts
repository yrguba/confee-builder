import { userService } from 'entities/user';
import { NotificationTypes } from 'shared/ui';

import { Message } from '../../message/model/types';

type Events = 'MessageCreated';
function notificationsManager(data: { event: Events; data: { message: Message } }, notification: NotificationTypes.UseReturnedType) {
    switch (data.event) {
        case 'MessageCreated':
            if (data.data.message.type === 'system') return notification.info({ title: data.data.message.text });
            const { last_name, first_name } = data?.data?.message?.author;
            notification.info({ title: `Новое сообщение от ${first_name || ''} ${last_name || ''}`, scope: 'desktop' });
    }
}

export default notificationsManager;
