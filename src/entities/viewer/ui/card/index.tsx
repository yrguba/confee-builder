import React from 'react';

import { Avatar, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    avatar: string;
    name: string;
    onClick?: () => void;
};

function ViewerCardView(props: Props) {
    const { avatar, name, onClick } = props;

    return (
        <div className={styles.card} onClick={onClick}>
            <Title align="right" width={100} secondary size={14}>
                {name}
            </Title>
            <Avatar img={avatar} size={31} />
        </div>
    );
}

export default ViewerCardView;
