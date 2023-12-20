import React from 'react';

import { UseEasyStateReturnType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Avatar, Button, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    callStartedState: UseEasyStateReturnType<boolean>;
    microphoneState: UseEasyStateReturnType<boolean>;
} & BaseTypes.Statuses;

function MeetView(props: Props) {
    const { callStartedState, microphoneState } = props;

    return <div className={styles.wrapper}>JitsiView</div>;
}

export default MeetView;
