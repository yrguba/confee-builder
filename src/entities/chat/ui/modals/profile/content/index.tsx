import React from 'react';

import { messageTypes } from 'entities/message';
import { UseEasyStateReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Icons, Button, TabBar, Card, Image, Document, AudioPlayer, VideoPlayer } from 'shared/ui';

import styles from './styles.module.scss';
import { employeeProxy } from '../../../../../company';
import { userProxy } from '../../../../../user';
import { ChatProxy } from '../../../../model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    addMemberClick?: () => void;
    mediaTypes: UseEasyStateReturnType<messageTypes.MediaContentType | null>;
    files: messageTypes.File[] | BaseTypes.Empty;
    clickUser?: (member: any) => void;
} & BaseTypes.Statuses;

function ChatProfileContentView(props: Props) {
    const { clickUser, chat, addMemberClick, mediaTypes, files } = props;

    const tabs: { id: number; type: messageTypes.MediaContentType | null; title: string; hidden?: boolean }[] = [
        { id: 0, type: null, title: 'Участники', hidden: !chat?.is_group },
        { id: 1, type: 'images', title: 'Фото' },
        { id: 2, type: 'videos', title: 'Видео' },
        { id: 3, type: 'audios', title: 'Аудио' },
        { id: 4, type: 'voices', title: 'Голосовые' },
        { id: 5, type: 'documents', title: 'Файлы' },
    ];

    return (
        <div className={styles.wrapper}>
            {chat?.is_group && (
                <div className={styles.addContact}>
                    <Button.Circle variant="inherit" onClick={addMemberClick}>
                        <Icons variant="add-contact" />
                    </Button.Circle>
                </div>
            )}
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
                    animationVariant="autoHeight"
                    items={[
                        {
                            visible: !mediaTypes.value,
                            item: (
                                <div className={styles.members}>
                                    <Card.List
                                        items={
                                            chat?.is_personal
                                                ? chat?.members.map((i) => {
                                                      const user = userProxy(i);
                                                      return {
                                                          id: user?.id || '',
                                                          img: user?.avatar || '',
                                                          name: user?.full_name || '',
                                                          title: user?.full_name || '',
                                                          subtitle: user?.networkStatus || '',
                                                          onClick: () => clickUser && clickUser(user),
                                                      };
                                                  })
                                                : chat?.employee_members.map((i) => {
                                                      const user = employeeProxy(i);
                                                      return {
                                                          id: user?.id || '',
                                                          img: user?.avatar || '',
                                                          name: user?.full_name || '',
                                                          title: user?.full_name || '',
                                                          subtitle: user?.status || '',
                                                          companyNames: ['TFN'],
                                                      };
                                                  })
                                        }
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
                                        url: i.url || '',
                                        width: 'auto',
                                        height: '120px',
                                    }))}
                                />
                            ),
                        },
                        {
                            visible: mediaTypes.value === 'videos',
                            item: (
                                <VideoPlayer.List
                                    items={files?.map((i, index) => ({
                                        id: index,
                                        url: i.url || '',
                                        width: 'auto',
                                        height: '120px',
                                        visibleCover: true,
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
                                            url: i.url || '',
                                            name: i.name,
                                            extension: i.extension,
                                            size: i.size,
                                        }))}
                                    />
                                </div>
                            ),
                        },
                        {
                            visible: mediaTypes.value === 'voices' || mediaTypes.value === 'audios',
                            item: (
                                <div className={styles.audios}>
                                    {files?.map((i, index) => (
                                        <AudioPlayer.Card key={i.id} url={i.url} name={i.name || ''} size={i.size ? +i.size : 0} />
                                    ))}
                                </div>
                            ),
                        },
                    ]}
                />
            </div>
        </div>
    );
}

export default ChatProfileContentView;