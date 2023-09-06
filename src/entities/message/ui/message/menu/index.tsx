import moment from 'moment';
import React, { ReactNode, useCallback, useEffect } from 'react';

import { useArray, useEasyState } from 'shared/hooks';
import { getEnding } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Box, IconsTypes, Icons, Title, Emoji, Dropdown, Card } from 'shared/ui';

import styles from './styles.module.scss';
import { createMemo } from '../../../../../shared/hooks';
import { chatTypes } from '../../../../chat';
import { userProxy } from '../../../../user';
import { UserProxy, User } from '../../../../user/model/types';
import { messageService } from '../../../index';
import { MessageMenuActions, MessageProxy } from '../../../model/types';

type Props = {
    chat: chatTypes.Chat | BaseTypes.Empty;
    message: MessageProxy;
    messageMenuAction: (action: MessageMenuActions, message: MessageProxy) => void;
    sendReaction: (emoji: string, messageId: number) => void;
} & BaseTypes.Statuses;

const memoReadUsers = createMemo((users: User[] | BaseTypes.Empty, users_ids: number[]) => {
    const arr: UserProxy[] = [];
    users?.forEach((user) => {
        if (users_ids.includes(user.id)) {
            arr.push(userProxy(user));
        }
    });
    return arr;
});

function MessageMenu(props: Props) {
    const { messageMenuAction, message, sendReaction, chat } = props;

    const items: BaseTypes.Item<IconsTypes.BaseIconsVariants, MessageMenuActions | 'read'>[] = [
        { id: 0, title: 'Ответить', icon: 'reply', payload: 'reply' },
        { id: 1, title: 'Изменить', icon: 'edit', payload: 'edit' },
        { id: 2, title: 'Закрепить', icon: 'pin', payload: 'fixed' },
        { id: 3, title: 'Копировать текст', icon: 'copy', payload: 'copy' },
        { id: 4, title: 'Переслать', icon: 'redirect', payload: 'forward' },
        { id: 5, title: 'Удалить', icon: 'delete', payload: 'delete' },
        { id: 6, title: 'Выделить', icon: 'check-circle', payload: 'highlight' },
        {
            id: 7,
            title: `${message.users_have_read.length} ${getEnding(message.users_have_read.length, ['просмотр', 'просмотра', 'просмотров'])}`,
            icon: 'double-check',
            payload: 'read',
        },
    ];
    const reactions = ['1f4a3', '1f440', '26d4', '1f49c', '1f4a5', '1f34c', '1f44c', '1f44d'];

    const visibleAllReactions = useEasyState(false);

    const { array, deleteByIds, deleteById } = useArray({
        initialArr: items,
    });

    const readUsers = memoReadUsers(chat?.members, message.users_have_read);

    useEffect(() => {
        if (!message.users_have_read?.length) deleteById(7);
        if (!message.isMy) deleteByIds([1, 5]);
        if (!message.isMy || moment().unix() - moment(message.created_at).unix() > 86400) deleteById(1);
        if (message.type !== 'text') deleteById(3);
    }, []);

    const reactionClick = (emoji: string) => {
        sendReaction(emoji, message.id);
    };

    return (
        <Box className={styles.wrapper}>
            <div className={styles.reactions}>
                <div className={styles.baseList}>
                    <div className={styles.list}>
                        {reactions.map((i) => (
                            <Emoji.Item key={i} unified={i} clickOnEmoji={reactionClick} />
                        ))}
                    </div>
                    <div
                        className={styles.btn}
                        onClick={(e) => {
                            e.stopPropagation();
                            visibleAllReactions.toggle();
                        }}
                    >
                        <Icons.ArrowAnimated variant="rotate" activeAnimate={visibleAllReactions.value} initialDeg={0} animateDeg={90} />
                    </div>
                </div>
                <Box.Animated visible={visibleAllReactions.value} animationVariant="autoHeight">
                    <div className={styles.allList}>
                        {reactions.map((i) => (
                            <Emoji.Item key={i} unified={i} clickOnEmoji={reactionClick} />
                        ))}
                    </div>
                </Box.Animated>
            </div>
            <div className={styles.items}>
                {array.map((i) => (
                    <Dropdown
                        key={i.id}
                        trigger="hover"
                        position={message.isMy ? 'left-center' : 'right-center'}
                        content={
                            <Card.List
                                items={readUsers.map((i) => ({
                                    id: i.id,
                                    img: i.avatar,
                                    name: i.full_name,
                                    title: i.full_name,
                                    subtitle: '',
                                }))}
                            />
                        }
                        disabled={i.payload !== 'read'}
                    >
                        <div className={styles.item} onClick={() => i.payload !== 'read' && messageMenuAction(i.payload, message)}>
                            <Icons variant={i.icon} />
                            <Title variant="H3M">{i.title}</Title>
                        </div>
                    </Dropdown>
                ))}
            </div>
        </Box>
    );
}

export default MessageMenu;
