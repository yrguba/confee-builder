import React from 'react';
import { useWindowSize } from 'react-use';

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

    const { width } = useWindowSize();

    const btns: BaseTypes.Item[] = [
        // { id: 0, title: 'Аудио', icon: 'phone', payload: '', callback: actions?.audioCall },
        // { id: 1, title: 'Видео', icon: 'videocam', payload: '', callback: actions?.videoCall },
        { id: 1, title: 'Чат', icon: 'chat', payload: '', callback: actions?.getChat },
        {
            id: 2,
            title: 'Выключить уведомления',
            payload: '',
            icon: !contact?.muted ? 'unmute' : 'mute',
            callback: () => actions?.mute(),
            hidden: width <= 563,
        },
        {
            id: 3,
            title: 'Удалить',
            icon: 'delete',
            payload: '',
            callback: () => actions?.delete && actions?.delete(),
            hidden: width <= 563,
        },
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
        {
            id: 1,
            title: 'Выключить уведомления',
            icon: <Icons.Player variant={!contact?.muted ? 'unmute' : 'mute'} />,
            callback: () => actions?.mute(),
            hidden: width >= 563,
        },
        {
            id: 2,
            title: 'Удалить',
            icon: <Icons variant="delete" />,
            callback: () => actions?.delete && actions?.delete(),
            hidden: width >= 563,
        },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <ContextMenu x={-208} trigger="mouseup" clickAway={() => visibleMenu.set(false)} items={menuItems} visible={visibleMenu.value} />
                <div className={styles.avatar}>
                    <Avatar loading={loading} clickAvatar={clickAvatar} size={width > 563 ? 201 : 100} img={contact?.avatar} />
                </div>
                <div className={styles.btns}>
                    {btns
                        .filter((i) => !i.hidden)
                        .map((i) => (
                            <Button key={i.id} variant="shadow" width={width < 465 ? '80px' : '100px'} direction="vertical" onClick={i.callback}>
                                {i.id === 2 ? <Icons.Player variant={i.icon} /> : <Icons variant={i.icon} />}
                            </Button>
                        ))}
                </div>
                <div className={styles.description}>
                    <div className={styles.name}>
                        <Title variant="H1">{contact?.full_name}</Title>
                    </div>
                    <div className={styles.networkStatus}>
                        <Title primary={false} variant="Body16">{`был(а) ${contact?.userProxy?.networkStatus}`}</Title>
                    </div>
                    <div className={styles.info}>
                        <UserInfoView user={contact?.userProxy || null} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactProfileView;
