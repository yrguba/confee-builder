import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Avatar, Button, Title } from '../../../../shared/ui';

type Props = {
    joining: (value: boolean) => void;
    avatar?: string;
    name?: string;
} & BaseTypes.Statuses;

function PreJoinView(props: Props) {
    const { joining, avatar, name } = props;

    return (
        <div className={styles.wrapper}>
            <Avatar size={170} img={avatar} />
            <Title textAlign="center" variant="H2">
                {name}
            </Title>
            <Title textAlign="center" variant="H3R">
                приглашает присоединиться к конференции
            </Title>
            <div className={styles.btns}>
                <Button onClick={() => joining(false)} variant="secondary">
                    Отклонить
                </Button>
                <Button onClick={() => joining(true)}>Присоединиться</Button>
            </div>
        </div>
    );
}

export default PreJoinView;
