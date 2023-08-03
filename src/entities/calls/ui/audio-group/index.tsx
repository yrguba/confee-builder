import React from 'react';

import { UseEasyStateReturnedType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Button, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    callStartedState: UseEasyStateReturnedType<boolean>;
    microphoneState: UseEasyStateReturnedType<boolean>;
} & BaseTypes.Statuses;

function GroupAudioCallView(props: Props) {
    const { callStartedState, microphoneState } = props;

    return (
        <div className={styles.wrapper}>
            <Title textAlign="center" variant="H1">
                GroupAudioCallView
            </Title>
            <div className={styles.body}>
                <Avatar img="" size={200} />
                <Title textAlign="center" variant="H1">
                    name name name name name name name name name name name name name name name name name
                </Title>
            </div>
            <div className={styles.footer}>
                <div className={styles.btn}>
                    <Button.Circle variant={microphoneState.value ? 'tertiary' : 'primary'} onClick={() => microphoneState.set(!microphoneState.value)}>
                        <Icons variant={microphoneState.value ? 'microphone-off' : 'microphone'} />
                    </Button.Circle>
                    <Title textAlign="center" variant="H4M">
                        {microphoneState.value ? 'Вкл. звук' : 'Выкл. звук'}
                    </Title>
                </div>
                <div className={styles.btn}>
                    <Button.Circle variant={callStartedState.value ? 'negative' : 'primary'} onClick={() => callStartedState.set(!callStartedState.value)}>
                        <Icons variant={callStartedState.value ? 'call-end' : 'phone'} />
                    </Button.Circle>
                    <Title textAlign="center" variant="H4M">
                        {callStartedState.value ? 'Завершить' : 'Принять'}
                    </Title>
                </div>
            </div>
        </div>
    );
}

export default GroupAudioCallView;
