import React from 'react';

import { SearchChats, TabsChats } from 'features/chat';
import { useHeightMediaQuery } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Title, Counter, Icons, Avatar, Button, IconsTypes, Card } from 'shared/ui';

import styles from './styles.module.scss';
import { contactTypes } from '../../index';
import { ContactProxy, Actions } from '../../model/types';

type Props = {
    contacts: ContactProxy[] | BaseTypes.Empty;
    clickOnUser: (arg: ContactProxy) => void;
    activeUserId: number | null;
    actions: (data?: { action: Actions; contact: contactTypes.ContactProxy }) => void;
} & BaseTypes.Statuses;

function ContactsListView(props: Props) {
    const { contacts, activeUserId, clickOnUser, actions, loading } = props;
    const miniSearch = useHeightMediaQuery().to('sm');

    const items: BaseTypes.Item<
        IconsTypes.BaseIconsVariants | IconsTypes.PlayerIconsVariants,
        Actions,
        { action: Actions; contact: contactTypes.ContactProxy }
    >[] = [
        { id: 0, icon: 'phone', callback: actions, payload: 'audioCall' },
        { id: 1, icon: 'messages', callback: actions, payload: 'message' },
        { id: 2, icon: 'mute', callback: actions, payload: 'mute' },
        { id: 3, icon: 'delete', callback: actions, payload: 'delete' },
    ];

    return (
        <Box.Animated visible loading={loading} className={styles.wrapper}>
            {!miniSearch && (
                <div className={styles.search}>
                    <SearchChats />
                </div>
            )}
            <div className={styles.tabs}>
                <TabsChats />
            </div>
            <div className={styles.list}>
                {contacts?.map((contact, index: number) => (
                    <div key={contact.id} className={`${styles.item} ${activeUserId === contact.id ? styles.item_active : ''}`}>
                        <div className={styles.body}>
                            <div className={styles.card}>
                                <Card
                                    onClick={() => clickOnUser(contact)}
                                    size="m"
                                    name={contact?.full_name}
                                    img=""
                                    title={contact?.full_name}
                                    subtitle={contact.phone || ''}
                                />
                            </div>
                            <div className={styles.icons}>
                                {items.map((i) => (
                                    <Button.Circle
                                        key={i.id}
                                        radius={36}
                                        onClick={() => i.callback && i.callback({ action: i.payload, contact })}
                                        variant="inherit"
                                    >
                                        {i.icon === 'mute' ? <Icons.Player variant={i.icon} /> : <Icons variant={i.icon as IconsTypes.BaseIconsVariants} />}
                                    </Button.Circle>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Box.Animated>
    );
}

export default ContactsListView;
