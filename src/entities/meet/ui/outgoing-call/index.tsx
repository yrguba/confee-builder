import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Avatar, Button, Title } from '../../../../shared/ui';

type Props = {
    joining: (value: boolean) => void;
    avatar?: string;
    name?: string;
} & BaseTypes.Statuses;

function OutgoingCallView(props: Props) {
    const { joining, avatar, name } = props;

    return (
        <div className={styles.wrapper}>
            <Avatar size={170} img={avatar} />
            <Title textAlign="center" variant="H2">
                {name}
            </Title>
            <Title textAlign="center" variant="H3R">
                звоним
            </Title>
            ждем
        </div>
    );
}

export default OutgoingCallView;
