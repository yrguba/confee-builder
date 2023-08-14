import React from 'react';

import { viewerTypes } from 'entities/viewer';
import { UseEasyStateReturnedType, UseArrayReturnedType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Card, Input, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../../model/types';

type Props = {
    selectedUsers: UseArrayReturnedType<viewerTypes.Contact>;
    isGroup: UseEasyStateReturnedType<boolean>;
    createChat: () => void;
    contacts: viewerTypes.Contact[] | BaseTypes.Empty;
} & BaseTypes.Statuses;

function CreateChatModalView(props: Props) {
    const { selectedUsers, isGroup, createChat, contacts, loading } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.select}>
                <Button onClick={isGroup.toggle}>{isGroup.value ? 'group' : 'private'}</Button>
            </div>
            <div className={styles.list}>
                {contacts?.map((contact) => (
                    <div key={contact.id} className={`${styles.item} ${selectedUsers.findById(contact.id) ? styles.item_active : ''}`}>
                        <Card onClick={() => selectedUsers.pushOrDelete(contact)} title={contact.first_name || ''} subtitle={contact.phone || ''} />
                    </div>
                ))}
            </div>
            <Button loading={loading} disabled={loading} onClick={createChat}>
                create
            </Button>
        </div>
    );
}

export default CreateChatModalView;
