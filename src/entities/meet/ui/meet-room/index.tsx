import React from 'react';

import { useJitsi } from 'shared/hooks';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';

type Props = {
    meetId: string;
} & BaseTypes.Statuses;

function MeetRoomView(props: Props) {
    const { meetId } = props;
    const { ConferenceWebView } = useJitsi({ meetId });
    return (
        <div className={styles.wrapper}>
            <ConferenceWebView />
        </div>
    );
}

export default MeetRoomView;
