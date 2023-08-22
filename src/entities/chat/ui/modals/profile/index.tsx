import React from 'react';

import { messageTypes } from 'entities/message';
import { useEasyState } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Title, Image, Icons, Avatar, Button, IconsTypes, TabBar } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy, Actions } from '../../../model/types';

type Props = {
    chat: ChatProxy;
    actions: (actions: Actions) => void;
} & BaseTypes.Statuses;

function ChatProfileModalView(props: Props) {
    const { chat, actions } = props;

    const activeMedia = useEasyState<messageTypes.MediaContentType>('images');

    const btns: BaseTypes.Item<IconsTypes.BaseIconsVariants, any>[] = [
        { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: () => actions('audioCall') },
        { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: () => actions(' videoCall') },
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
                    <Button key={i.id} direction="vertical" prefixIcon={<Icons variant={i.icon} />} onClick={i.callback}>
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
            <div>
                <div>{/* <TabBar.WithLine /> */}</div>
                <div>
                    <Image.List items={[]} />
                </div>
            </div>
        </div>
    );
}

export default ChatProfileModalView;
