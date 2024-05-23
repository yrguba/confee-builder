import React from 'react';

import { UserInfoView, userTypes } from 'entities/user';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { useEasyState } from '../../../../shared/hooks';
import { Avatar, Button, ContextMenu, ContextMenuTypes, Dropdown, DropdownTypes, Icons, Title } from '../../../../shared/ui';
import { ContactProxy } from '../../model/types';

type Props = {
    contact: ContactProxy | BaseTypes.Empty;
    clickAvatar: () => void;
    back: () => void;
    actions: userTypes.UserCardActions;
    updName: (name: string) => void;
} & BaseTypes.Statuses;

function ContactProfileView(props: Props) {
    const { updName, loading, clickAvatar, contact, back, actions } = props;
    const visibleMenu = useEasyState(false);

    const btns: BaseTypes.Item[] = [
        // { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: actions?.audioCall },
        // { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: actions?.videoCall },
        { id: 1, title: 'Чат', icon: 'chat', payload: '', callback: actions?.getChat },
        { id: 2, title: 'Выключить уведомления', payload: '', icon: 'mute', callback: () => actions?.mute() },
        { id: 3, title: 'Удалить', icon: 'delete', payload: '', callback: () => actions?.delete && actions?.delete() },
        { id: 4, title: 'Ещё', icon: 'more', payload: '', callback: visibleMenu.toggle },
    ];

    const menuItems: ContextMenuTypes.ContextMenuItem[] = [
        {
            id: 0,
            title: 'Редактировать контакт',
            icon: <Icons variant="edit" />,
            callback: () => {
                actions?.openChangeNameModal && actions?.openChangeNameModal();
                visibleMenu.set(false);
            },
        },
        // { id: 1, title: 'Выключить уведомления', icon: <Icons.Player variant="mute" />, callback: () => actions?.mute() },
        { id: 2, title: 'Удалить', icon: <Icons variant="delete" />, callback: () => actions?.delete && actions?.delete() },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatarBlock}>
                <Avatar loading={loading} clickAvatar={clickAvatar} circle={false} size={201} img={contact?.avatar} />
                <div className={styles.name}>
                    <Title variant="H1">{contact?.full_name}</Title>
                </div>
                <ContextMenu clickAway={() => visibleMenu.set(false)} trigger="mouseup" items={menuItems} visible={visibleMenu.value} />
                <div className={styles.btns}>
                    {btns.map((i) => (
                        <Button key={i.id} variant="shadow" width="61px" direction="vertical" onClick={i.callback}>
                            {i.id === 2 ? <Icons.Player variant={i.icon} /> : <Icons variant={i.icon} />}
                        </Button>
                    ))}
                </div>
            </div>
            <div className={styles.userInfo}>
                <UserInfoView user={contact?.userProxy || null} />
            </div>
        </div>
    );
}

export default ContactProfileView;
