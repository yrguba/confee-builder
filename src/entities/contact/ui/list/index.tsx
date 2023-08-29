import React from 'react';

import { BaseTypes } from 'shared/types';
import { Box, Title, Counter, Icons, Avatar, Button } from 'shared/ui';

import styles from './styles.module.scss';
import { ContactProxy } from '../../model/types';

type Props = {
    contacts: ContactProxy[];
    clickOnUser: (arg: ContactProxy) => void;
    activeUserId: number | null;
} & BaseTypes.Statuses;

function ContactsListView(props: Props) {
    const { contacts, activeUserId, clickOnUser, loading } = props;

    return (
        <Box.Animated visible loading={loading} className={styles.wrapper}>
            <div className={styles.list}>
                {contacts.map((contact, index: number) => (
                    <div
                        key={contact.id}
                        className={`${styles.item} ${activeUserId === contact.id ? styles.item_active : ''}`}
                        onClick={() => clickOnUser(contact)}
                    >
                        <div className={styles.body}>
                            <div className={styles.avatar}>
                                <Avatar size={52} img="" name={contact.full_name} />
                            </div>
                            <div className={styles.content}>
                                <div className={styles.row}>
                                    <div className={styles.left}>
                                        <Title variant="H3S">{contact.full_name}</Title>
                                        <Button tag>TFN</Button>
                                    </div>
                                    <div className={styles.right}>
                                        <Title textAlign="right" variant="caption1M" primary={false}>
                                            {/* {contact.date} */}wf
                                        </Title>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.left}>
                                        <Title primary={false} variant="H3R">
                                            {/* {chat.lastMessageTitle} */}rgrdg
                                        </Title>
                                    </div>
                                    <div className={styles.right}>efsefe</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Box.Animated>
    );
}

export default ContactsListView;
