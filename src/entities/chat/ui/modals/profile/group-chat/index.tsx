import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef } from 'react';
import { useWindowSize } from 'react-use';

import { messageTypes } from 'entities/message';
import { useEasyState, UseEasyStateReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Title, Icons, Avatar, Button, IconsTypes, ContextMenu, ContextMenuTypes, Input, ModalTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { Box } from '../../../../../../shared/ui';
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
    clickAvatar: () => void;
    clickUser?: (data: { user?: UserProxy; employee?: EmployeeProxy }) => void;
    removeMember: (id: number, name: string) => void;
} & BaseTypes.Statuses;

function GroupChatProfileModalView(props: Props) {
    const { removeMember, clickUser, clickAvatar, chat, actions, mediaTypes, files } = props;

    const visibleMenu = useEasyState(false);

    const btns = [
        { id: 0, icon: 'call', callback: () => actions('goMeet') },
        {
            id: 1,
            icon: chat?.is_muted ? 'unmute' : 'mute',
            callback: async () => {
                actions('mute');
            },
        },
        {
            id: 2,
            icon: 'logout',
            hidden: !chat?.is_group,
            callback: () => {
                actions('leave');
                visibleMenu.set(false);
            },
            isRed: true,
        },
        { id: 3, title: 'Ещё', icon: 'more', payload: '', callback: () => visibleMenu.set(true), hidden: !chat?.isOwner },
    ];

    const menuItems = [
        {
            id: 0,
            title: 'Редактировать',
            icon: <Icons variant="edit" />,
            callback: () => {
                actions('open-edit');
                visibleMenu.set(false);
            },
        },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    <Avatar clickAvatar={clickAvatar} size={145} img={chat?.avatar || ''} name={chat?.name || ''} />
                </div>

                <div className={styles.btns}>
                    {btns
                        .filter((i) => !i.hidden)
                        .map((i: any) => (
                            <Button
                                variant="shadow"
                                width={`${100 / btns.filter((i) => !i.hidden).length}%`}
                                direction="vertical"
                                key={i.id}
                                onClick={i.callback}
                            >
                                <Icons variant={i.icon} />
                            </Button>
                        ))}
                </div>
            </div>
            <div className={styles.mainInfo}>
                <div className={styles.name}>
                    <Title textAlign="left" variant="H1">
                        {chat?.name}
                    </Title>
                    {!chat?.is_personal && <CompanyTagView name="TFN" />}
                </div>
                <Title textAlign="left" primary={false} variant="Body16">
                    {chat?.subtitle}
                </Title>
                <div className={styles.border} />
                <Title variant="H4M" primary={false}>
                    Описание
                </Title>
                <Title variant="H3M" textWrap wordBreak>
                    {chat?.description}
                </Title>
            </div>
            <ContextMenu
                x={-120}
                y={20}
                onClick={() => visibleMenu.set(false)}
                trigger="mouseup"
                items={menuItems}
                visible={visibleMenu.value}
                clickAway={() => visibleMenu.set(false)}
            />

            <ChatProfileContentView
                removeMember={removeMember}
                files={files}
                chat={chat}
                mediaTypes={mediaTypes}
                clickUser={clickUser}
                addMemberClick={() => actions('add-members')}
            />
        </div>
    );
}

export default GroupChatProfileModalView;
