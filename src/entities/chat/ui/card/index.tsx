import React, { forwardRef } from 'react';

import { CompanyTagView } from 'entities/company';
import { BaseTypes } from 'shared/types';
import { Title, Counter, Icons, Avatar, Dropdown, ContextMenuTypes, ContextMenu } from 'shared/ui';

import styles from './styles.module.scss';
import { useEasyState } from '../../../../shared/hooks';
import { chat_gtp_id } from '../../lib/constants';
import { PrivateChatActions, GroupChatActions, ChatProxy } from '../../model/types';

type Props = {
    clickOnChat: (arg: ChatProxy) => void;
    chat: ChatProxy;
    active: boolean;
    chatMenuAction: (action: PrivateChatActions | GroupChatActions, chat: ChatProxy) => void;
    description?: string;
} & BaseTypes.Statuses;

const ChatCardView = forwardRef((props: Props, refs: any) => {
    const { description, clickOnChat, chat, active, chatMenuAction } = props;

    const visibleMenu = useEasyState(false);

    const clickContextMenu = (e: any) => {
        e.preventDefault();
        chat.id !== chat_gtp_id && visibleMenu.toggle();
    };

    const menuItems: ContextMenuTypes.ContextMenuItem[] = [
        // {
        //     id: 0,
        //     title: chat?.chat_pinned ? 'Открепить' : 'Закрепить',
        //     icon: <Icons variant="pin" />,
        //     callback: async () => {
        //         chatMenuAction('pin', chat);
        //     },
        // },
        {
            id: 1,
            title: !chat?.is_muted ? 'Выключить уведомления' : 'Включить уведомления',
            icon: <Icons variant={chat.is_muted ? 'unmute' : 'mute'} />,
            callback: async () => {
                chatMenuAction('mute', chat);
            },
        },
        {
            id: 2,
            title: 'Удалить чат',
            isRed: true,
            icon: <Icons variant="delete" />,
            callback: async () => {
                chatMenuAction('delete', chat);
            },
        },
    ];

    return (
        <div
            ref={refs.lastChat}
            onMouseLeave={() => visibleMenu.set(false)}
            onContextMenu={clickContextMenu}
            key={chat?.id}
            className={`${styles.wrapper} ${active ? styles.wrapper_active : ''}`}
            onClick={() => clickOnChat(chat)}
        >
            <ContextMenu visible={visibleMenu.value} items={menuItems} />
            <div className={styles.body}>
                <div className={styles.avatar}>
                    {chat.is_group && (
                        <div className={`${styles.icon} ${active ? styles.icon_active : ''}`}>
                            <Icons variant="group-chat" />
                        </div>
                    )}
                    <Avatar
                        networkStatus={chat?.secondUser?.networkStatus}
                        // employeeStatuses={chat.secondEmployee?.status}
                        size={52}
                        img={chat.avatar}
                        name={chat?.name}
                    />
                </div>
                <div className={styles.content}>
                    <div className={styles.row}>
                        <div className={styles.left}>
                            <Title variant="H3S">{chat?.name}</Title>
                            {!chat.is_personal && <CompanyTagView name="TFN" />}
                        </div>
                        <div className={styles.right}>
                            <Title textAlign="right" variant="caption1M" primary={false}>
                                {chat?.date}
                            </Title>
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.left}>
                            {chat.is_group && chat?.last_message?.type !== 'system' && <div className={styles.authorName}>{chat.authorLastMessage}: </div>}
                            <Title primary={false} variant="H3R">
                                {description || chat?.lastMessageTitle}
                            </Title>
                        </div>
                        <div className={styles.right}>
                            {chat.is_muted && <Icons.Player size={14} variant="mute" />}
                            {chat.chat_pinned && <Icons size={14} variant="pin" />}
                            {chat.pending_messages_count ? (
                                <Counter variant="primary" height={18} maxVisibleNumber={99}>
                                    {chat?.pending_messages_count}
                                </Counter>
                            ) : (
                                chat?.checkIsMyLastMessage && <Icons variant={chat?.last_message?.users_have_read.length ? 'double-check' : 'check'} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
export default ChatCardView;
