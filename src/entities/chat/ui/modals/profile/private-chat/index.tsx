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
    visibleChatBtn: boolean;
    visibleBtns?: boolean;
} & BaseTypes.Statuses;

function PrivateChatProfileModalView(props: Props) {
    const { user, employee, chat, actions, mediaTypes, files, clickAvatar, visibleChatBtn, visibleBtns = true } = props;

    const visibleMenu = useEasyState(false);

    const btns: BaseTypes.Item<IconsTypes.BaseIconsVariants, any>[] = [
        { id: 0, title: 'Конференция', icon: 'videocam', payload: '', callback: () => actions('goMeet') },
        { id: 1, title: 'Написать', icon: 'messages', payload: '', callback: () => actions('message'), hidden: !visibleChatBtn },
        { id: 2, title: 'Ещё', icon: 'more', payload: '', callback: () => visibleMenu.set(true) },
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
            <div className={styles.mainInfo}>
                <Avatar clickAvatar={clickAvatar} size={200} img={avatar} name={name} />
                <div className={styles.name}>
                    <Title textAlign="center" variant="H1">
                        {name}
                    </Title>
                    {!chat?.is_personal && <CompanyTagView name="TFN" />}
                </div>
                <Title textAlign="center" variant="H3R">
                    {status}
                </Title>
            </div>
            <ContextMenu
                onClick={() => visibleMenu.set(false)}
                trigger="mouseup"
                items={menuItems}
                visible={visibleMenu.value}
                clickAway={() => visibleMenu.set(false)}
            />
            <div className={styles.btns}>
                {visibleBtns &&
                    btns
                        .filter((i) => !i.hidden)
                        .map((i) => (
                            <Button variant="bg-secondary" direction="vertical" prefixIcon={<Icons variant={i.icon} />} key={i.id} onClick={i.callback}>
                                {i.title}
                            </Button>
                        ))}
            </div>
            {(user || employee?.user) && (
                <div className={styles.secondaryInfo}>
                    <UserInfoView user={user || employee?.userProxy} />
                </div>
            )}
            {employee && (
                <div className={styles.companyCard}>
                    <CompanyCardView
                        avatar={employee?.companies[0]?.avatar || ''}
                        style={{ width: '100%', maxWidth: 'none' }}
                        status={employee.status}
                        position={employee.position || ''}
                        title={employee.companies[0]?.name || ''}
                        subtitle={employee.departments[0]?.name || ''}
                    />
                </div>
            )}
            <ChatProfileContentView files={files} chat={chat} mediaTypes={mediaTypes} />
        </div>
    );
}

export default PrivateChatProfileModalView;
