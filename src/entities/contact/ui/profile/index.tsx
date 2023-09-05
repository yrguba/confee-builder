import React from 'react';

import { UserCardView } from 'entities/user';
import { BaseTypes } from 'shared/types';
import { Avatar, Button, Dropdown, DropdownTypes, Icons, IconsTypes, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { ContactProxy } from '../../model/types';

type Props = {
    contact: ContactProxy | BaseTypes.Empty;
    back: () => void;
    updateName: (name: string | number | undefined) => void;
} & BaseTypes.Statuses;

function ContactProfileView(props: Props) {
    const { contact, back, updateName } = props;

    const secondaryInfo: { id: number; title: string; subtitle: string }[] = [
        { id: 0, title: 'Никнейм', subtitle: '' },
        { id: 1, title: 'Номер телефона', subtitle: contact?.phone || '' },
    ];

    const menuItems: DropdownTypes.DropdownMenuItem[] = [
        {
            id: 0,
            title: '',
            icon: <Icons variant="delete" />,
            callback: () => '',
        },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <UserCardView visibleActionsMenu name={contact?.full_name || ''} aboutMe="" avatar="" birth="" phone={contact?.phone || ''} nickname="" />
            </div>
        </div>
    );
}

export default ContactProfileView;
