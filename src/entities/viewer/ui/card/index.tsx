import React from 'react';

import { Avatar, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    avatar: string;
    name: string;
};

function Card(props: Props) {
    const { avatar, name } = props;

    return (
        <div className={styles.card}>
            <Title align="right" width={100} secondary size={14}>
                {name}
            </Title>
            <Avatar size={31} />
        </div>
    );
}

export default Card;
