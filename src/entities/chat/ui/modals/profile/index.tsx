import React from 'react';

import { messageTypes } from 'entities/message';
import { UseEasyStateReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Title, Box, Icons, Avatar, Button, IconsTypes, TabBar, Card, Image, Document, AudioPlayer, Dropdown, DropdownTypes, VideoPlayer } from 'shared/ui';

import styles from './styles.module.scss';
import { getVideoCover } from '../../../../../shared/lib';
import { CompanyTagView, employeeProxy, CompanyCardView } from '../../../../company';
import { userProxy, UserInfoView } from '../../../../user';
import { ChatProxy, Actions } from '../../../model/types';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    actions: (actions: Actions) => void;
    mediaTypes: UseEasyStateReturnType<messageTypes.MediaContentType | null>;
    files: messageTypes.File[] | BaseTypes.Empty;
    selectFile: () => void;
    getScreenshot: (data: string) => void;
    clickAvatar: () => void;
    updateChatName: (name: string) => void;
    clickUser: (member: any) => void;
} & BaseTypes.Statuses;

function ChatProfileModalView(props: Props) {
    const { clickUser, clickAvatar, chat, actions, mediaTypes, files, getScreenshot, selectFile, updateChatName } = props;

    const btns: BaseTypes.Item<IconsTypes.BaseIconsVariants, any>[] = [
        { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: () => actions('audioCall') },
        { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: () => actions('videoCall') },
        { id: 2, title: 'Ещё', icon: 'more', payload: '', callback: () => '' },
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
                {chat?.is_group && chat.is_personal ? (
                    <Avatar.Change
                        clickAvatar={clickAvatar}
                        dropdownLeft={90}
                        size={200}
                        img={chat?.avatar || ''}
                        name={chat?.name || ''}
                        deleteFile={() => ''}
                        selectFile={selectFile}
                        getScreenshot={getScreenshot}
                    />
                ) : (
                    <Avatar clickAvatar={clickAvatar} size={200} img={chat?.avatar} name={chat?.name || ''} />
                )}
                <div className={styles.name}>
                    <Title
                        animateTrigger={chat?.name}
                        updCallback={chat?.is_personal && chat.is_group ? (name) => updateChatName(String(name)) : undefined}
                        textAlign="center"
                        variant="H1"
                    >
                        {chat?.name}
                    </Title>
                    {!chat?.is_personal && <CompanyTagView name="TFN" />}
                </div>
                <Title textAlign="center" variant="H3R">
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
            {chat?.secondEmployee && (
                <div className={styles.companyCard}>
                    <CompanyCardView
                        width="100%"
                        status={chat.secondEmployee.status}
                        position={chat.secondEmployee.position || ''}
                        title={chat.secondEmployee.companies[0]?.name || ''}
                        subtitle={chat.secondEmployee.departments[0]?.name || ''}
                    />
                </div>
            )}
            {!chat?.is_group && chat?.is_personal && (
                <div className={styles.secondaryInfo}>
                    <UserInfoView user={chat.secondUser} />
                </div>
            )}
            <div className={styles.media}>
                {chat?.is_group && (
                    <div className={styles.addContact}>
                        <Button.Circle variant="inherit" onClick={() => actions('add-members')}>
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
                                                              onClick: () => clickUser(user),
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
        </div>
    );
}

export default ChatProfileModalView;
