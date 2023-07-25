import React from 'react';

import { Button } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {};

function PrivacySettingsView(props: Props) {
    const items = [
        { id: 0, title: 'Кто может витеть мой статус:', value: 'Все пользователи' },
        { id: 1, title: 'Кто может витеть мои отпуска:', value: 'Мой отдел' },
        { id: 2, title: 'Кто может писать мне сообщения:', value: 'Все пользователи' },
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Настройки приватности</div>
            <div className={styles.body}>
                {items.map((i) => (
                    <div key={i.id} className={styles.item}>
                        <div className={styles.item_title}>{i.title}</div>
                        <div className={styles.item_value}>
                            <Button.Link active>{i.value}</Button.Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PrivacySettingsView;
