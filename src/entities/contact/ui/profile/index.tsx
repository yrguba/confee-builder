import React from 'react';

import { UserCardView, userProxy, userTypes } from 'entities/user';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { ContactProxy } from '../../model/types';

type Props = {
    contact: ContactProxy | BaseTypes.Empty;
    back: () => void;
    actions: userTypes.UserCardActions;
} & BaseTypes.Statuses;

function ContactProfileView(props: Props) {
    const { contact, back, actions } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <UserCardView actions={actions} visibleHeader type="contact" visibleActionsMenu user={userProxy(contact?.user)} />
            </div>
        </div>
    );
}

export default ContactProfileView;
