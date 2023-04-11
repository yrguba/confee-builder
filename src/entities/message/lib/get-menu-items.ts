import moment from 'moment/moment';

import useMessageStore from '../model/store';
import { MessageMenuItem, MessageProxy } from '../model/types';

function getMenuItems(message: MessageProxy): MessageMenuItem[] {
    const setEditableMessage = useMessageStore.use.setEditableMessage();
    const setDeletedMessage = useMessageStore.use.setDeletedMessage();

    const defaultItems: MessageMenuItem[] = [
        { id: 0, title: 'Ответить на сообщение', icon: 'answer', onClick: () => console.log('ss') },
        { id: 1, title: 'Переслать сообщение', icon: 'forward', onClick: () => console.log('ss') },
        { id: 2, title: 'Скопировать текст', icon: 'copy', onClick: () => console.log('ss') },
        { id: 3, title: 'Редактировать сообщение', icon: 'edit', onClick: () => setEditableMessage(message) },
        { id: 4, title: 'Удалить сообщение', icon: 'delete', onClick: () => setDeletedMessage([message]) },
        { id: 5, title: 'Упомянуть автора', icon: 'mention', onClick: () => console.log('ss') },
        { id: 6, title: 'Преобразовать в задачу', icon: 'convert', onClick: () => console.log('ss') },
    ];
    const items: MessageMenuItem[] = [];
    defaultItems.forEach((item, index) => {
        if (message.isMy) {
            if (item.id === 4) items.push(item);
            if (item.id === 3 && moment().unix() - moment(message.created_at).unix() < 86400) items.push(item);
        }
        if (item.id !== 4 && item.id !== 3) items.push(item);
    });
    return items;
}

export default getMenuItems;
