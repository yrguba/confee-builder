import moment from 'moment';
import React, { useEffect } from 'react';

import { useArray, useEasyState } from 'shared/hooks';
import { getEnding } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Box, IconsTypes, Icons, Title, Card } from 'shared/ui';

import styles from './styles.module.scss';
import { createMemo } from '../../../../../shared/hooks';
import { chatTypes } from '../../../../chat';
import { CurrentShortMember } from '../../../../chat/model/types';
import { messageDictionaries } from '../../../index';
import { MediaContentType, MessageMenuActions, MessageProxy } from '../../../model/types';

type Props = {
    chat: chatTypes.ChatProxy | BaseTypes.Empty;
    message: MessageProxy;
    messageMenuAction: (action: MessageMenuActions, message: MessageProxy) => void;
    sendReaction?: (emoji: string, messageId: number) => void;
    downloadFileType: MediaContentType;
} & BaseTypes.Statuses;

const memoReadUsers = createMemo((members: CurrentShortMember[] | BaseTypes.Empty, users_ids: number[]) => {
    const arr: CurrentShortMember[] = [];
    members?.forEach((member) => {
        if (users_ids.includes(member?.id)) {
            arr.push(member);
        }
    });
    return arr;
});

function MessageMenuView(props: Props) {
    const { downloadFileType, messageMenuAction, message, sendReaction, chat } = props;

    const items: BaseTypes.Item<IconsTypes.BaseIconsVariants, MessageMenuActions | 'read'>[] = [
        { id: 0, title: 'Ответить', icon: 'reply', payload: 'reply' },
        { id: 1, title: 'Изменить', icon: 'edit', payload: 'edit', hidden: !message.isMy || moment().unix() - moment(message.created_at).unix() > 86400 },
        // { id: 2, title: 'Закрепить', icon: 'pin', payload: 'fixed' },
        { id: 3, title: 'Копировать текст', icon: 'copy', payload: 'copy', hidden: message.type !== 'text' },
        { id: 10, title: 'Копировать выделенное', icon: 'copy', payload: 'copySelectedText', hidden: !window?.getSelection()?.toString() },
        { id: 4, title: 'Переслать', icon: 'redirect', payload: 'forward' },
        { id: 5, title: 'Удалить', icon: 'delete', payload: 'delete', hidden: !message.isMy },
        { id: 6, title: 'Выделить', icon: 'check-circle', payload: 'highlight' },
        // { id: 7, title: 'Воспроизвести', icon: 'melody', payload: 'play' },
        {
            id: 8,
            title: downloadFileType ? `Скачать ${messageDictionaries.mediaContent[downloadFileType]}` : '',
            icon: 'save',
            payload: 'save',
            hidden: !downloadFileType,
        },
        {
            id: 9,
            title: `${message.users_have_read.length} ${getEnding(message.users_have_read.length, ['просмотр', 'просмотра', 'просмотров'])}`,
            icon: 'double-check',
            payload: 'read',
            hidden: !message.users_have_read?.length || !chat?.is_group,
        },
    ];
    const reactions = ['1f4a3', '1f440', '26d4', '1f49c', '1f4a5', '1f34c', '1f44c', '1f44d'];

    const visibleAllReactions = useEasyState(false);
    const visibleUsers = useEasyState(false);

    const { array, deleteByIds, deleteById } = useArray({
        initialArr: items,
    });

    const readUsers = memoReadUsers(chat?.currentShortMembers, message.users_have_read);

    return (
        <div className={styles.wrapper} onWheel={(e) => e.stopPropagation()}>
            {/* <div className={styles.reactions}> */}
            {/*    <div className={styles.baseList}> */}
            {/*        <div className={styles.list}> */}
            {/*            {reactions.map((i) => ( */}
            {/*                <Emoji.Item key={i} unified={i} clickOnEmoji={reactionClick} /> */}
            {/*            ))} */}
            {/*        </div> */}
            {/*        <div */}
            {/*            className={styles.btn} */}
            {/*            onClick={(e) => { */}
            {/*                e.stopPropagation(); */}
            {/*                visibleAllReactions.toggle(); */}
            {/*            }} */}
            {/*        > */}
            {/*            <Icons.ArrowAnimated variant="rotate" activeAnimate={visibleAllReactions.value} initialDeg={0} animateDeg={90} /> */}
            {/*        </div> */}
            {/*    </div> */}
            {/*    <Box.Animated visible={visibleAllReactions.value} animationVariant="autoHeight"> */}
            {/*        <div className={styles.allList}> */}
            {/*            {reactions.map((i) => ( */}
            {/*                <Emoji.Item key={i} unified={i} clickOnEmoji={reactionClick} /> */}
            {/*            ))} */}
            {/*        </div> */}
            {/*    </Box.Animated> */}
            {/* </div> */}
            <div className={styles.items}>
                <Box.Animated visible={visibleUsers.value} className={styles.users} onMouseLeave={() => visibleUsers.set(false)}>
                    <Card.List
                        items={readUsers.map((i) => ({
                            // onClick: () => openChatProfileModal(),
                            id: i.id,
                            img: i.avatar,
                            name: i.full_name,
                            title: i.full_name,
                            subtitle: '',
                        }))}
                    />
                </Box.Animated>

                {array
                    .filter((i) => !i.hidden)
                    .map((i) => (
                        <div
                            key={i.id}
                            className={styles.item}
                            onClick={() => i.payload !== 'read' && messageMenuAction(i.payload, message)}
                            onMouseEnter={() => i.payload === 'read' && visibleUsers.set(true)}
                        >
                            <Icons variant={i.icon} />
                            <Title variant="H3M">{i.title}</Title>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default MessageMenuView;
