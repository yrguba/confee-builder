import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { ChatTypes, ChatCardView } from '../../../chat';
import { ChatProxy } from '../../../chat/model/types';

type Props = {
    chats: ChatTypes.ChatProxy[] | BaseTypes.Empty;
    selectedChats: ChatTypes.ChatProxy[];
    setSelectedChats: (chat: ChatProxy) => void;
} & BaseTypes.Statuses;

function ChatsListModal(props: Props) {
    const { chats, selectedChats, setSelectedChats } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Переслать</div>
            <div className={styles.list}>
                {chats?.length &&
                    chats.map((chat) => (
                        <div key={chat.id} className={`${styles.item} ${selectedChats.find((i) => i.id === chat.id) && styles.item_active}`}>
                            <ChatCardView chat={chat} onClick={setSelectedChats} />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ChatsListModal;
