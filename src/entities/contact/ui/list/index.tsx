import React from 'react';

import { useWidthMediaQuery, useHeightMediaQuery, UseArrayReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Box, Title, Counter, Icons, Avatar, Button, IconsTypes, Card, Dropdown, TabBarTypes, TabBar, Input } from 'shared/ui';

import styles from './styles.module.scss';
import { contactTypes } from '../../index';
import { ContactProxy, Actions } from '../../model/types';

type Props = {
    contacts: ContactProxy[] | BaseTypes.Empty;
    clickOnUser: (arg: ContactProxy) => void;
    activeUserId: number | null;
    actions: (data?: { action: Actions; contact: contactTypes.ContactProxy }) => void;
    tabs: UseArrayReturnType<TabBarTypes.TabBarItem>;
} & BaseTypes.Statuses;

function ContactsListView(props: Props) {
    const { contacts, activeUserId, clickOnUser, actions, tabs, loading } = props;
    const mdWidthSize = useWidthMediaQuery().to('md');
    const smHeightSize = useHeightMediaQuery().to('sm');

    const items: BaseTypes.Item<
        IconsTypes.BaseIconsVariants | IconsTypes.PlayerIconsVariants,
        Actions,
        { action: Actions; contact: contactTypes.ContactProxy }
    >[] = [
        { id: 0, icon: 'phone', callback: actions, payload: 'audioCall', title: '' },
        { id: 1, icon: 'messages', callback: actions, payload: 'message', title: '' },
        { id: 2, icon: 'mute', callback: actions, payload: 'mute', title: '' },
        { id: 4, icon: 'delete', callback: actions, payload: 'delete', title: '' },
    ];

    return (
        <Box.Animated visible loading={loading} className={styles.wrapper}>
            {!smHeightSize && (
                <div className={styles.search}>
                    <Input prefixIcon="search" />
                </div>
            )}
            <div className={styles.tabs}>
                <TabBar items={tabs.array} activeItemId={0} />
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
                                {!mdWidthSize ? (
                                    items.map((i) => (
                                        <Button.Circle
                                            key={i.id}
                                            radius={36}
                                            onClick={() => i.callback && i.callback({ action: i.payload, contact })}
                                            variant="inherit"
                                        >
                                            {i.icon === 'mute' ? <Icons.Player variant={i.icon} /> : <Icons variant={i.icon as IconsTypes.BaseIconsVariants} />}
                                        </Button.Circle>
                                    ))
                                ) : (
                                    <Dropdown.Menu items={items as any}>
                                        <Icons variant="more" />
                                    </Dropdown.Menu>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Box.Animated>
    );
}

export default ContactsListView;
