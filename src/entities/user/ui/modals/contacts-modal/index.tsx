import React, { useState } from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Box, Button, Icons, Input, LoadingIndicator } from 'shared/ui';

import styles from './styles.module.scss';
import { useInput, useStyles } from '../../../../../shared/hooks';
import { ViewerTypes } from '../../../../viewer';
import { User } from '../../../model/types';
import UserStatusView from '../../status';

type Props = {
    openAddContactsModal: () => void;
} & BaseTypes.Statuses;

function ContactsModalView(props: Props) {
    const { openAddContactsModal } = props;

    const searchInput = useInput();

    const [activeTab, setActiveTab] = useState(0);

    const btns = [
        { id: 0, title: 'Все', onClick: () => setActiveTab(0) },
        { id: 1, title: 'Softworks', onClick: () => setActiveTab(1) },
        { id: 2, title: 'Личные', onClick: () => setActiveTab(2) },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.title}>Контакты</div>
                <div className={styles.search}>
                    <Input width="100%" {...searchInput} placeholder="Поиск" prefixIcon="search" clearIcon />
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.nav}>
                    {btns.map((btn) => (
                        <Button key={btn.id} chips variant={btn.id === activeTab ? 'primary' : 'secondary'} onClick={btn.onClick}>
                            {btn.title}
                        </Button>
                    ))}
                </div>
                <div className={styles.list}>dwd</div>
            </div>
            <div className={styles.footer}>
                <Button onClick={openAddContactsModal} prefixIcon={<Icons variants="addContact" />} variant="secondary">
                    Добавить контакт
                </Button>
            </div>
        </div>
    );
}

export default ContactsModalView;
