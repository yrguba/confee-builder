import React, { ReactNode } from 'react';

import { BaseTypes } from 'shared/types';
import { AudioPlayer } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../model/types';
import Wrapper from '../wrapper';

type Props = {
    message: MessageProxy;
    reactionClick: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function VoiceMessageView(props: Props) {
    const { message, reactionClick } = props;

    return (
        <Wrapper message={message} reactionClick={reactionClick}>
            <div className={styles.wrapper}>{/* <AudioPlayer.Voice url={http.url + message.files[0].url} size={message.files[0].size} /> */}</div>
        </Wrapper>
    );
}

export default VoiceMessageView;
