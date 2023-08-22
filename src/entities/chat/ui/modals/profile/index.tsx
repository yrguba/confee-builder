import React from 'react';

import { messageTypes } from 'entities/message';
import { userService } from 'entities/user';
import { UseEasyStateReturnType, useList } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Title, Box, Icons, Avatar, Button, IconsTypes, TabBar, Card, Image } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy, Actions } from '../../../model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    actions: (actions: Actions) => void;
    mediaTypes: UseEasyStateReturnType<messageTypes.MediaContentType | null>;
    filesData: messageTypes.File[] | BaseTypes.Empty;
} & BaseTypes.Statuses;

function ChatProfileModalView(props: Props) {
    const { chat, actions, mediaTypes, filesData } = props;

    const btns: BaseTypes.Item<IconsTypes.BaseIconsVariants, any>[] = [
        { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: () => actions('audioCall') },
        { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: () => actions(' videoCall') },
        { id: 2, title: 'Ещё', icon: 'more', payload: '', callback: () => console.log('Ещё') },
    ];

    const secondaryInfo: { id: number; title: string; subtitle: string }[] = [
        { id: 0, title: 'Никнейм', subtitle: chat?.secondMember?.nickname || '' },
        { id: 1, title: 'Номер телефона', subtitle: chat?.secondMember?.phone || '' },
    ];

    function Members() {
        return (
            <Card.List
                items={chat?.members.map((i) => ({
                    id: i.id,
                    img: i.avatar?.path || '',
                    name: userService.getFullName(i),
                    title: userService.getFullName(i),
                    subtitle: userService.getUserNetworkStatus(i),
                }))}
            />
        );
    }

    function Images() {
        return <Image.List items={filesData?.map((i, index) => ({ img: i.link, id: index, width: '25%', height: '122px' }))} />;
    }

    const mediaList = useList<messageTypes.MediaContentType | null>(
        [
            { id: 'Участники', hidden: chat?.is_group, payload: null, element: <Members /> },
            { id: 'Фото', payload: 'images', element: <Images /> },
            { id: 'Видео', payload: 'videos', element: <div>Медиа</div> },
            { id: 'Аудио', payload: 'audios', element: <div>Аудио</div> },
            { id: 'Файлы', payload: 'documents', element: <div>Файлы</div> },
        ],
        (data) => mediaTypes.set(data.payload),
        [filesData]
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainInfo}>
                <Avatar size={200} img={chat?.avatar} />
                <div className={styles.name}>
                    <Title textAlign="center" variant="H3B">
                        {chat?.name}
                    </Title>
                    <Button tag>tfn</Button>
                </div>
                <Title textAlign="center" variant="caption1M">
                    {chat?.subtitle}
                </Title>
            </div>
            <div className={styles.btns}>
                {btns.map((i) => (
                    <Button key={i.id} direction="vertical" prefixIcon={<Icons variant={i.icon} />} onClick={i.callback}>
                        {i.title}
                    </Button>
                ))}
            </div>
            {!chat?.is_group && (
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
            <div className={styles.media}>
                <div className={styles.tabBar}>
                    <TabBar.WithLine
                        wrapperStyle={{ justifyContent: 'space-around' }}
                        activeItemId={mediaList.activeItem.id}
                        items={mediaList.variants.map((i) => ({
                            id: i,
                            title: i,
                            callback: () => mediaList.setActiveItem(i),
                        }))}
                    />
                </div>
                <div className={styles.mediaList}>
                    <Box.Animated visible animationVariant="autoHeight" key={mediaList.activeItem.id}>
                        {mediaList.activeItem.element}
                    </Box.Animated>
                </div>
            </div>
        </div>
    );
}

export default ChatProfileModalView;
