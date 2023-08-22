import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Title, Counter, Icons, Avatar, Button, IconsTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../../model/types';

type Props = {
    chat: ChatProxy;
    deleteChat: () => void;
} & BaseTypes.Statuses;

function ChatProfileModalView(props: Props) {
    const { chat, deleteChat } = props;

    const btns: BaseTypes.Item<IconsTypes.BaseIconsVariants, any>[] = [
        { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: () => console.log('Аудио') },
        { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: () => console.log('Видео') },
        { id: 2, title: 'Ещё', icon: 'more', payload: '', callback: () => console.log('Ещё') },
    ];

    const secondaryInfo: { id: number; title: string; subtitle: string }[] = [
        { id: 0, title: 'Никнейм', subtitle: chat.secondMember?.nickname || '' },
        { id: 1, title: 'Номер телефона', subtitle: chat.secondMember?.phone || '' },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainInfo}>
                <Avatar size={200} img={chat.avatar} />
                <div className={styles.name}>
                    <Title textAlign="center" variant="H3B">
                        {chat.name}
                    </Title>
                    <Button tag>tfn</Button>
                </div>
                <Title textAlign="center" variant="caption1M">
                    {chat.subtitle}
                </Title>
            </div>
            <div className={styles.btns}>
                {btns.map((i) => (
                    <Button key={i.id} direction="vertical" prefixIcon={<Icons variant={i.icon} />}>
                        {i.title}
                    </Button>
                ))}
            </div>
            {!chat.is_group && (
                <div className={styles.secondaryInfo}>
                    {secondaryInfo.map((i) => (
                        <div key={i.id} className={styles.item}>
                            <Title variant="H4M" primary={false}>
                                {i.title}
                            </Title>
                            <Title variant="H3M">{i.subtitle}</Title>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ChatProfileModalView;
