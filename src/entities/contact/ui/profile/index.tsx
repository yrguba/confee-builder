import React from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { ContactProxy } from '../../model/types';

type Props = {
    contact: ContactProxy | BaseTypes.Empty;
} & BaseTypes.Statuses;

function ContactProfileView(props: Props) {
    const { contact } = props;

    const items = [
        { id: 0, title: contact?.full_name || '', subtitle: 'Имя и фамилия' },
        { id: 1, title: contact?.phone || '', subtitle: 'Номер телефона' },
    ];

    return (
        <div className={styles.wrapper}>
            <Title variant="H2">Личная информация</Title>
            <div className={styles.body}>
                {items.map((item) => (
                    <div key={item.id} className={styles.item}>
                        {item.id === 0 && <Avatar img="" name={contact?.full_name} />}
                        <div className={styles.left}>
                            <div className={styles.aboutMe}>
                                <Title textWrap variant="H3M">
                                    {item.title}
                                </Title>
                            </div>
                            <Title primary={false} variant="H4M">
                                {item.subtitle}
                            </Title>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ContactProfileView;
