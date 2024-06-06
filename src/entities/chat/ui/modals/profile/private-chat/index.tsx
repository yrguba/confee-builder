import React from 'react';

import { CompanyTagView, CompanyCardView } from 'entities/company';
import { messageTypes } from 'entities/message';
import { UserInfoView } from 'entities/user';
import { useEasyState, UseEasyStateReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Title, Icons, Avatar, Button, IconsTypes, Dropdown, DropdownTypes, ContextMenuTypes, ContextMenu } from 'shared/ui';

import styles from './styles.module.scss';
import { EmployeeProxy } from '../../../../../company/model/types';
import { UserProxy } from '../../../../../user/model/types';
import { ChatProxy, PrivateChatActions } from '../../../../model/types';
import ChatProfileContentView from '../content';

type Props = {
    chat: ChatProxy | BaseTypes.Empty;
    user?: UserProxy;
    employee?: EmployeeProxy;
    actions: (actions: PrivateChatActions) => void;
    mediaTypes: UseEasyStateReturnType<messageTypes.MediaContentType | null>;
    files: messageTypes.File[] | BaseTypes.Empty;
    clickAvatar: () => void;
    currentChat: boolean;
    isMy: boolean;
} & BaseTypes.Statuses;

function PrivateChatProfileModalView(props: Props) {
    const { isMy, currentChat, user, employee, chat, actions, mediaTypes, files, clickAvatar } = props;

    const visibleMenu = useEasyState(false);

    const btns = [
        { id: 0, title: 'Конференция', icon: 'call', payload: '', callback: () => actions('goMeet') },
        { id: 1, title: 'Написать', icon: 'messages', payload: '', callback: () => actions('message'), hidden: currentChat },
        {
            id: 0,
            title: !chat?.is_muted ? 'Выключить уведомления' : 'Включить уведомления',
            icon: chat?.is_muted ? 'unmute' : 'mute',
            callback: async () => {
                actions('mute');
            },
        },
        {
            id: 1,
            title: 'Удалить',
            icon: 'delete',
            callback: () => {
                actions('delete');
                visibleMenu.set(false);
            },
            isRed: true,
        },
        // { id: 2, title: 'Ещё', icon: 'more', payload: '', callback: () => visibleMenu.set(true), hidden: !chat },
    ];

    const menuItems: ContextMenuTypes.ContextMenuItem[] = [
        {
            id: 0,
            title: !chat?.is_muted ? 'Выключить уведомления' : 'Включить уведомления',
            icon: <Icons variant={chat?.is_muted ? 'unmute' : 'mute'} />,
            callback: async () => {
                actions('mute');
            },
        },
        {
            id: 1,
            title: 'Удалить',
            icon: <Icons variant="delete" />,
            callback: () => {
                actions('delete');
                visibleMenu.set(false);
            },
            isRed: true,
        },
    ];

    const name = user?.full_name || employee?.full_name || '';
    const avatar = user?.avatar || employee?.avatar || '';
    const status = user?.networkStatus || employee?.status || '';

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.avatar}>
                    <Avatar clickAvatar={clickAvatar} size={145} img={avatar} name={name} />
                </div>

                <div className={styles.btns}>
                    {!isMy &&
                        btns
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
                    <Title maxLength={22} textAlign="left" variant="H1">
                        {isMy ? 'Вы' : chat?.name}
                    </Title>
                    {!chat?.is_personal && <CompanyTagView name="TFN" />}
                </div>
                <Title textAlign="left" primary={false} variant="Body16">
                    {chat?.subtitle}
                </Title>
                <div className={styles.border} />
                {(user || employee?.user) && (
                    <div className={styles.secondaryInfo}>
                        <UserInfoView user={user || employee?.userProxy} />
                    </div>
                )}
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
            {employee && (
                <div className={styles.companyCard}>
                    <CompanyCardView
                        visibleArrow={false}
                        avatar={employee?.companies[0]?.avatar || ''}
                        style={{ width: '100%', maxWidth: 'none', backgroundColor: 'var(--bg-secondary)' }}
                        status={employee.status}
                        position={employee.position || ''}
                        title={employee.companies[0]?.name || ''}
                        subtitle={employee.departments[0]?.name || ''}
                    />
                </div>
            )}
            {!isMy && <ChatProfileContentView files={files} chat={chat} mediaTypes={mediaTypes} />}
        </div>
    );
}

export default PrivateChatProfileModalView;
