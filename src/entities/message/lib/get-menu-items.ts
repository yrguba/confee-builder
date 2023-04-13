import moment from 'moment/moment';

import { useAppStore } from 'entities/app';
import { useCopyToClipboard } from 'shared/hooks';

import useMessageStore from '../model/store';
import { MessageMenuItem, MessageProxy } from '../model/types';

function getMenuItems(message: MessageProxy): MessageMenuItem[] {
    const setMessageToEdit = useMessageStore.use.setMessageToEdit();
    const setMessagesToForward = useMessageStore.use.setMessagesToForward();
    const setMessageToReply = useMessageStore.use.setMessageToReply();
    const setMessagesToDelete = useMessageStore.use.setMessagesToDelete();
    const setNotifications = useAppStore.use.setNotifications();
    const [_, copyToClipboard] = useCopyToClipboard();

    const copyText = () => {
        copyToClipboard(message.text);
        setNotifications({ text: 'Тексе скопирован в буфер' });
    };

    const items: MessageMenuItem[] = [
        { id: 0, title: 'Ответить на сообщение', icon: 'answer', onClick: () => setMessageToReply(message) },
        { id: 1, title: 'Переслать сообщение', icon: 'forward', onClick: () => setMessagesToForward([message]) },
        { id: 2, title: 'Скопировать текст', icon: 'copy', onClick: () => copyText() },
        { id: 3, title: 'Редактировать сообщение', icon: 'edit', onClick: () => setMessageToEdit(message) },
        { id: 4, title: 'Удалить сообщение', icon: 'delete', onClick: () => setMessagesToDelete([message]) },
        { id: 5, title: 'Упомянуть автора', icon: 'mention', onClick: () => console.log('ss') },
        { id: 6, title: 'Преобразовать в задачу', icon: 'convert', onClick: () => console.log('ss') },
    ];

    const findIndex = (id: number) => items.findIndex((i) => i.id === id);
    // remove copy item
    if (message.message_type !== 'text' || message.forwarded_messages.length) {
        items.splice(findIndex(2), 1);
    }
    // remove Edit item
    if (!message.isMy || moment().unix() - moment(message.created_at).unix() > 86400 || message.forwarded_messages.length || message.message_type !== 'text') {
        items.splice(findIndex(3), 1);
    }
    // remove delete item
    if (!message.isMy) {
        items.splice(findIndex(4), 1);
    }
    // remove author item
    if (message.isMy) {
        items.splice(findIndex(5), 1);
    }
    // remove task item
    if (message.forwarded_messages.length) {
        items.splice(findIndex(6), 1);
    }

    return items;
}

export default getMenuItems;
