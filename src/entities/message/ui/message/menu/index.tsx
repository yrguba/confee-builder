import moment from 'moment';
import React, { ReactNode, useEffect } from 'react';

import { useArray, useEasyState } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, IconsTypes, Icons, Title, Emoji } from 'shared/ui';

import styles from './styles.module.scss';
import { chatTypes } from '../../../../chat';
import { MessageMenuActions, MessageProxy } from '../../../model/types';

type Props = {
    chat: chatTypes.Chat | BaseTypes.Empty;
    message: MessageProxy;
    messageMenuAction: (action: MessageMenuActions, message: MessageProxy) => void;
    sendReaction: (emoji: string, messageId: number) => void;
} & BaseTypes.Statuses;

function MessageMenu(props: Props) {
    const { messageMenuAction, message, sendReaction, chat } = props;

    const items: BaseTypes.Item<IconsTypes.BaseIconsVariants, MessageMenuActions>[] = [
        { id: 0, title: 'Ответить', icon: 'reply', payload: 'reply' },
        { id: 1, title: 'Изменить', icon: 'edit', payload: 'edit' },
        { id: 2, title: 'Закрепить', icon: 'pin', payload: 'fixed' },
        { id: 3, title: 'Копировать текст', icon: 'copy', payload: 'copy' },
        { id: 4, title: 'Переслать', icon: 'redirect', payload: 'forward' },
        { id: 5, title: 'Удалить', icon: 'delete', payload: 'delete' },
        { id: 6, title: 'Выделить', icon: 'check-circle', payload: 'highlight' },
    ];
    const reactions = ['1f4a3', '1f440', '26d4', '1f49c', '1f4a5', '1f34c', '1f44c', '1f44d'];

    const visibleAllReactions = useEasyState(false);

    const { array, deleteByIds, deleteById } = useArray({
        initialArr: items,
    });

    useEffect(() => {
        if (!message.isMy) deleteByIds([1, 5]);
        if (!message.isMy || moment().unix() - moment(message.created_at).unix() > 86400 || message.type !== 'text') deleteById(1);
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
                    <div className={styles.btn} onClick={visibleAllReactions.toggle}>
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
                    <div className={styles.item} key={i.id} onClick={() => messageMenuAction(i.payload, message)}>
                        <Icons variant={i.icon} />
                        <Title variant="H3M">{i.title}</Title>
                    </div>
                ))}
            </div>
        </Box>
    );
}

export default MessageMenu;
