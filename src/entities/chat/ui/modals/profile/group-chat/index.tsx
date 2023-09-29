import React from 'react';

import { messageTypes } from 'entities/message';
import { UseEasyStateReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Title, Icons, Avatar, Button, IconsTypes, Dropdown, DropdownTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { CompanyTagView } from '../../../../../company';
import { EmployeeProxy } from '../../../../../company/model/types';
import { UserProxy } from '../../../../../user/model/types';
import { ChatProxy, GroupChatActions } from '../../../../model/types';
import ChatProfileContentView from '../content';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    actions: (actions: GroupChatActions) => void;
    mediaTypes: UseEasyStateReturnType<messageTypes.MediaContentType | null>;
    files: messageTypes.File[] | BaseTypes.Empty;
    selectFile: () => void;
    getScreenshot: (data: string) => void;
    clickAvatar: () => void;
    updateChatName: (name: string) => void;
    clickUser: (data: { user?: UserProxy; employee?: EmployeeProxy }) => void;
} & BaseTypes.Statuses;

function GroupChatProfileModalView(props: Props) {
    const { clickUser, clickAvatar, chat, actions, mediaTypes, files, getScreenshot, selectFile, updateChatName } = props;

    const btns: BaseTypes.Item<IconsTypes.BaseIconsVariants, any>[] = [
        { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: () => actions('audioCall') },
        { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: () => actions('videoCall') },
        { id: 2, title: 'Ещё', icon: 'more', payload: '', callback: () => '' },
    ];

    const menuItems: DropdownTypes.DropdownMenuItem[] = [
        {
            id: 0,
            title: 'Покинуть чат',
            icon: <Icons variant="delete" />,
            hidden: !chat?.is_group,
            callback: () => actions('leave'),
            isRed: true,
        },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.mainInfo}>
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
                <div className={styles.name}>
                    <Title
                        animateTrigger={chat?.name}
                        updCallback={chat?.is_personal ? (name) => updateChatName(String(name)) : undefined}
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
            <ChatProfileContentView files={files} chat={chat} mediaTypes={mediaTypes} clickUser={clickUser} addMemberClick={() => actions('add-members')} />
        </div>
    );
}

export default GroupChatProfileModalView;
