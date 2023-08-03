import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Avatar, Button, Icons, Title } from '../../../../shared/ui';

type Props = {} & BaseTypes.Statuses;

function PrivateAudioCallView(props: Props) {
    // const { status } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                <Avatar img="" size={200} />
                <Title textAlign="center" variant="H1">
                    name name name name name name name name name name name name name name name name name
                </Title>
            </div>
            <div className={styles.footer}>
                <div className={styles.btn}>
                    <Button.Circle>
                        <Icons variant="microphone" />
                    </Button.Circle>
                    <Title variant="H4M">rgdgdrgg</Title>
                </div>
                <div className={styles.btn}>
                    <Button.Circle variant="negative">
                        <Icons variant="call-end" />
                    </Button.Circle>
                    <Title variant="H4M">Завершить</Title>
                </div>
            </div>
        </div>
    );
}

export default PrivateAudioCallView;
