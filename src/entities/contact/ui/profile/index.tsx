import React from 'react';

import { UserInfoView, userTypes } from 'entities/user';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Avatar, Button, Dropdown, DropdownTypes, Icons, Title } from '../../../../shared/ui';
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

    const btns: BaseTypes.Item[] = [
        { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: actions?.audioCall },
        // { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: actions?.videoCall },
        { id: 1, title: 'Чат', icon: 'chat', payload: '', callback: actions?.getChat },
        // { id: 3, title: 'Ещё', icon: 'more', payload: '', callback: () => '' },
        { id: 2, title: 'Выключить уведомления', payload: '', icon: 'mute', callback: () => actions?.mute() },
        { id: 3, title: 'Удалить', icon: 'delete', payload: '', callback: () => actions?.delete && actions?.delete() },
    ];

    const moreBtn: DropdownTypes.DropdownMenuItem[] = [
        { id: 0, title: 'Выключить уведомления', icon: <Icons.Player variant="mute" />, callback: () => actions?.mute() },
        { id: 1, title: 'Удалить', icon: <Icons variant="delete" />, callback: () => actions?.delete && actions?.delete() },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatarBlock}>
                <Avatar loading={loading} clickAvatar={clickAvatar} circle={false} size={201} img={contact?.avatar} />
                <div className={styles.name}>
                    <Title variant="H1">{contact?.full_name}</Title>
                </div>
                <div className={styles.btns}>
                    {btns.map((i) => (
                        <Dropdown.Menu position="bottom-center" items={moreBtn} key={i.id} disabled={i.title !== 'Ещё'}>
                            <Button variant="shadow" width="61px" direction="vertical" onClick={i.callback}>
                                {i.id === 2 ? <Icons.Player variant={i.icon} /> : <Icons variant={i.icon} />}
                            </Button>
                        </Dropdown.Menu>
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
