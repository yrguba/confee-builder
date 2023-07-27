import React, { useEffect, useState } from 'react';

import { useInput } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Collapse } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    openAddContactsModal: () => void;
} & BaseTypes.Statuses;

function ContactsModalView(props: Props) {
    const { openAddContactsModal } = props;

    const searchInput = useInput();

    const [activeTab, setActiveTab] = useState(0);
    const [ac, setAc] = useState<any>([]);
    const btns = [
        { id: 0, title: 'Все', onClick: () => setActiveTab(0) },
        { id: 1, title: 'Softworks', onClick: () => setActiveTab(1) },
        { id: 2, title: 'Личные', onClick: () => setActiveTab(2) },
    ];

    useEffect(() => {
        const arr = [];
        for (let i = 0; i < 10; i++) {
            const obj = {
                id: i,
                title: `item${i}`,
                subtitle: `sub${i}`,
            };
            arr.push(obj);
        }
        setAc(arr);
    }, []);

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
                <div className={styles.list}>
                    <Collapse subtitle="wdwd" title="wdad">
                        eff
                    </Collapse>
                </div>
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