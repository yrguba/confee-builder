import React from 'react';

import { CompanyTagView, CompanyCardView } from 'entities/company';
import { messageTypes } from 'entities/message';
import { UserInfoView } from 'entities/user';
import { UseEasyStateReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Title, Icons, Avatar, Button, IconsTypes, Dropdown, DropdownTypes } from 'shared/ui';

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

    const btns: BaseTypes.Item<IconsTypes.BaseIconsVariants, any>[] = [
        { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: () => actions('audioCall') },
        { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: () => actions('videoCall') },
        { id: 2, title: 'Написать', icon: 'messages', payload: '', callback: () => actions('message'), hidden: !visibleChatBtn },
        { id: 3, title: 'Ещё', icon: 'more', payload: '', callback: () => '' },
    ];

    const menuItems: DropdownTypes.DropdownMenuItem[] = [
        {
            id: 0,
            title: 'Удалить',
            icon: <Icons variant="delete" />,
            callback: () => actions('delete'),
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
            <div className={styles.btns}>
                {visibleBtns &&
                    btns
                        .filter((i) => !i.hidden)
                        .map((i) => (
                            <Dropdown.Menu position="bottom-center" items={menuItems} key={i.id} disabled={i.id !== 3}>
                                <Button direction="vertical" prefixIcon={<Icons variant={i.icon} />} onClick={i.callback}>
                                    {i.title}
                                </Button>
                            </Dropdown.Menu>
                        ))}
            </div>
            {employee && (
                <div className={styles.companyCard}>
                    <CompanyCardView
                        width="100%"
                        status={employee.status}
                        position={employee.position || ''}
                        title={employee.companies[0]?.name || ''}
                        subtitle={employee.departments[0]?.name || ''}
                    />
                </div>
            )}
            {user && (
                <div className={styles.secondaryInfo}>
                    <UserInfoView user={user} />
                </div>
            )}
            <ChatProfileContentView files={files} chat={chat} mediaTypes={mediaTypes} />
        </div>
    );
}

export default PrivateChatProfileModalView;
