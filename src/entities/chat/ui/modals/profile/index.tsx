import React from 'react';

import { messageTypes } from 'entities/message';
import { UseEasyStateReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Title, Box, Icons, Avatar, Button, IconsTypes, TabBar, Card, Image, Document, AudioPlayer, Dropdown, DropdownTypes } from 'shared/ui';

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
    updateChatName: (name: string) => void;
} & BaseTypes.Statuses;

function ChatProfileModalView(props: Props) {
    const { chat, actions, mediaTypes, files, getScreenshot, selectFile, updateChatName } = props;

    const btns: BaseTypes.Item<IconsTypes.BaseIconsVariants, any>[] = [
        { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: () => actions('audioCall') },
        { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: () => actions('videoCall') },
        { id: 2, title: 'Ещё', icon: 'more', payload: '', callback: () => '' },
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
        { id: 4, type: 'voices', title: 'Голосовые' },
        { id: 5, type: 'documents', title: 'Файлы' },
    ];

    const menuItems: DropdownTypes.DropdownMenuItem[] = [
        {
            id: 0,
            title: chat?.is_group ? 'Покинуть чат' : ' Удалить',
            icon: <Icons variant="delete" />,
            hidden: !chat?.is_group,
            callback: () => actions(chat?.is_group ? 'leave' : 'delete'),
            isRed: true,
        },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainInfo}>
                {chat?.is_group ? (
                    <Avatar.Change
                        size={200}
                        img={chat?.avatar || ''}
                        name={chat?.name || ''}
                        deleteFile={() => ''}
                        selectFile={selectFile}
                        getScreenshot={getScreenshot}
                    />
                ) : (
                    <Avatar size={200} img={chat?.avatar} name={chat?.name || ''} />
                )}
                <div className={styles.name}>
                    <Title animateTrigger={chat?.name} updCallback={(name) => updateChatName(String(name))} textAlign="center" variant="H3B">
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
                    <Dropdown.Menu position="bottom-center" items={menuItems} key={i.id} disabled={i.id !== 2}>
                        <Button direction="vertical" prefixIcon={<Icons variant={i.icon} />} onClick={i.callback}>
                            {i.title}
                        </Button>
                    </Dropdown.Menu>
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
                                                img: i.avatar || '',
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
                                            url: i.link || '',
                                            width: 'auto',
                                            height: '122px',
                                        }))}
                                    />
                                ),
                            },
                            {
                                visible: mediaTypes.value === 'documents',
                                item: (
                                    <div className={styles.documents}>
                                        <Document.List
                                            items={files?.map((i, index) => ({
                                                id: index,
                                                url: i.link || '',
                                                name: i.name,
                                                extension: i.extension,
                                            }))}
                                        />
                                    </div>
                                ),
                            },
                            {
                                visible: mediaTypes.value === 'voices' || mediaTypes.value === 'audios',
                                item: (
                                    <div className={styles.audios}>
                                        <AudioPlayer.List
                                            items={files?.map((i, index) => ({
                                                id: index,
                                                url: i.link || '',
                                            }))}
                                        />
                                    </div>
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
