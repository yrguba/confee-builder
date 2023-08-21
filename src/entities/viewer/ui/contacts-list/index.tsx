import React from 'react';

import { UseArrayReturnedType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Card, Icons, Box } from 'shared/ui';

import styles from './styles.module.scss';
import { Contact, ContactProxy } from '../../model/types';

type Props = {
    contacts: ContactProxy[] | BaseTypes.Empty;
    selectedContacts: UseArrayReturnedType<ContactProxy>;
} & BaseTypes.Statuses;

function ContactsListView(props: Props) {
    const { contacts, selectedContacts } = props;

    return (
        <div className={styles.wrapper}>
            {contacts?.map((user) => (
                <div key={user.id} className={styles.item} onClick={() => selectedContacts.pushOrDelete(user)}>
                    <div className={styles.info}>
                        <Card
                            onClick={() => ''}
                            key={user.id}
                            name={user?.full_name || ''}
                            title={user?.full_name || ''}
                            img={user?.avatar || ''}
                            subtitle={user?.status || ' '}
                        />
                    </div>

                    <div className={styles.selectIndicator}>
                        <Box.Animated visible={!!selectedContacts.findById(user.id)}>
                            <Icons variant="check" />
                        </Box.Animated>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ContactsListView;
