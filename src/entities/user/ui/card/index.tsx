import React from 'react';

import { BaseTypes } from 'shared/types';
import { Avatar, Box, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    avatar: string;
    name: string;
    nickname: string;
    phone: string;
    birth: string;
    aboutMe: string;
} & BaseTypes.Statuses;

function UserCardView(props: Props) {
    const { avatar, name, nickname, aboutMe, birth, phone, loading } = props;

    const secondaryInfo: { id: number; title: string; subtitle: string }[] = [
        { id: 0, title: 'Никнейм', subtitle: `@${nickname}` },
        { id: 1, title: 'Номер телефона', subtitle: phone },
        { id: 2, title: 'Дата рождения', subtitle: birth },
        { id: 3, title: 'О себе', subtitle: '' },
    ];

    return (
        <Box.Animated visible loading={loading} className={styles.wrapper}>
            <Avatar circle={false} size={375} img={avatar} />
            <div className={styles.info}>
                <Title variant="H1">{name}</Title>
                <div className={styles.secondaryInfo}>
                    {secondaryInfo.map((i) => (
                        <div key={i.id} className={styles.item}>
                            <Title variant="H4M" primary={false}>
                                {i.title}
                            </Title>
                            <Title variant="H3M">{i.subtitle}</Title>
                        </div>
                    ))}
                </div>
            </div>
        </Box.Animated>
    );
}

export default UserCardView;
