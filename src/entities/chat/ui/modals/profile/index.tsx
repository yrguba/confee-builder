import React, { useEffect } from 'react';

import { messageTypes } from 'entities/message';
import { UseEasyStateReturnType, useUpdateEffect } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Title, Box, Icons, Avatar, Button, IconsTypes, TabBar, Card, Image } from 'shared/ui';

import styles from './styles.module.scss';
import { userService } from '../../../../user';
import { ChatProxy, Actions } from '../../../model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    actions: (actions: Actions) => void;
    mediaTypes: UseEasyStateReturnType<messageTypes.MediaContentType | null>;
    files: messageTypes.File[] | BaseTypes.Empty;
    selectFile: () => void;
    getScreenshot: (data: string) => void;
} & BaseTypes.Statuses;

function ChatProfileModalView(props: Props) {
    const { chat, actions, mediaTypes, files, getScreenshot, selectFile } = props;

    const btns: BaseTypes.Item<IconsTypes.BaseIconsVariants, any>[] = [
        { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: () => actions('audioCall') },
        { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: () => actions(' videoCall') },
        { id: 2, title: 'Ещё', icon: 'more', payload: '', callback: () => console.log('Ещё') },
    ];

    const secondaryInfo: { id: number; title: string; subtitle: string }[] = [
        { id: 0, title: 'Никнейм', subtitle: chat?.secondMember?.nickname || '' },
        { id: 1, title: 'Номер телефона', subtitle: chat?.secondMember?.phone || '' },
    ];

    const tabs: { id: number; type: messageTypes.MediaContentType | null; title: string; hidden?: boolean }[] = [
        { id: 0, type: null, title: 'Участники', hidden: !chat?.is_group },
        { id: 1, type: 'images', title: 'Фото' },
        { id: 2, type: 'videos', title: 'Видео' },
        { id: 3, type: 'audios', title: 'Аудио' },
        { id: 4, type: 'documents', title: 'Файлы' },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainInfo}>
                {chat?.is_group ? (
                    <Avatar.Change size={200} img={chat?.avatar || ''} deleteFile={() => ''} selectFile={selectFile} getScreenshot={getScreenshot} />
                ) : (
                    <Avatar size={200} img={chat?.avatar} />
                )}
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
                        items={tabs
                            .filter((i) => !i.hidden)
                            .map((i) => ({
                                id: i.id,
                                title: i.title,
                                callback: () => mediaTypes.set(i.type),
                            }))}
                    />
                </div>
                <div className={styles.mediaList}>
                    <Box.Replace
                        items={[
                            {
                                visible: !mediaTypes.value,
                                item: (
                                    <div className={styles.members}>
                                        <Card.List
                                            items={chat?.members.map((i) => ({
                                                id: i.id,
                                                img: i.avatar?.path || '',
                                                name: userService.getFullName(i),
                                                title: userService.getFullName(i),
                                                subtitle: userService.getUserNetworkStatus(i),
                                            }))}
                                        />
                                    </div>
                                ),
                            },
                            {
                                visible: mediaTypes.value === 'images',
                                item: (
                                    <Image.List
                                        items={files?.map((i, index) => ({
                                            id: index,
                                            img: i.link || '',
                                            width: 'auto',
                                            height: '122px',
                                        }))}
                                    />
                                ),
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChatProfileModalView;
