import React, { ReactNode } from 'react';

import { baseTypes } from 'shared/types';
import { Avatar } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
    avatar: string;
    name: string;
    date: string;
} & baseTypes.Statuses;

function Wrapper(props: Props) {
    const { children, avatar, name, date } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.avatar}>
                <Avatar size={32} img={avatar} name={name} />
            </div>
            <div className={styles.mainColumn}>
                <div className={styles.content}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.message}>{children}</div>
                </div>
                <div className={styles.date}>{date}</div>
            </div>
        </div>
    );
}

export default Wrapper;
