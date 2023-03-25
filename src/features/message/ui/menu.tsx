import React, { ReactNode } from 'react';

import { MessageMenuView, messageTypes } from 'entities/message';

import { Dropdown } from '../../../shared/ui';

type Props = {
    children: ReactNode;
};

function MessageMenu(props: Props) {
    const { children } = props;

    const items: messageTypes.MessageMenuItem[] = [
        { id: 0, title: 'Ответить на сообщение', icon: 'answer' },
        { id: 1, title: 'Переслать сообщение', icon: 'forward' },
        { id: 2, title: 'Скопировать текст', icon: 'copy' },
        { id: 3, title: 'Редактировать сообщение', icon: 'edit' },
        { id: 4, title: 'Удалить сообщение', icon: 'delete' },
        { id: 5, title: 'Упомянуть автора', icon: 'mention' },
        { id: 6, title: 'Преобразовать в задачу', icon: 'convert' },
    ];

    const reactionClick = (data: any) => {
        console.log(data);
    };

    return <Dropdown content={<MessageMenuView reactionClick={reactionClick} items={items} />}>{children}</Dropdown>;
}

export default MessageMenu;
