import React from 'react';

import { UserCardView } from 'entities/user';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { ContactProxy } from '../../model/types';

type Props = {
    contact: ContactProxy | BaseTypes.Empty;
    back: () => void;
    updateName: (name: string | number | undefined) => void;
    remove: () => void;
} & BaseTypes.Statuses;

function ContactProfileView(props: Props) {
    const { contact, back, updateName, remove } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <UserCardView
                    actions={{
                        delete: remove,
                        videoCall: () => console.log('videoCall'),
                        audioCall: () => console.log('audioCall'),
                        getChat: () => console.log('getChat'),
                        mute: () => console.log('mute'),
                    }}
                    visibleHeader
                    type="contact"
                    visibleActionsMenu
                    name={contact?.full_name}
                    aboutMe=""
                    avatar=""
                    birth=""
                    phone={contact?.phone}
                    nickname=""
                    email=""
                />
            </div>
        </div>
    );
}

export default ContactProfileView;
