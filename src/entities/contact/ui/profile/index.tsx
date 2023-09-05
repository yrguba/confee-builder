import React from 'react';

import { UserCardView } from 'entities/user';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { ContactProxy } from '../../model/types';

type Props = {
    contact: ContactProxy | BaseTypes.Empty;
    back: () => void;
    updateName: (name: string | number | undefined) => void;
} & BaseTypes.Statuses;

function ContactProfileView(props: Props) {
    const { contact, back, updateName } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <UserCardView
                    visibleHeader
                    type="contact"
                    visibleActionsMenu
                    name={contact?.full_name || ''}
                    aboutMe=""
                    avatar=""
                    birth=""
                    phone={contact?.phone || ''}
                    nickname=""
                />
            </div>
        </div>
    );
}

export default ContactProfileView;
