import React, { ReactNode } from 'react';

import { useDate } from 'shared/hooks';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../model/types';
import Wrapper from '../wrapper';

type Props = {
    message: MessageProxy;
    reactionClick: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function TextMessageView(props: Props) {
    const { message, reactionClick } = props;
    return (
        <Wrapper message={message} reactionClick={reactionClick}>
            <div className={styles.wrapper}>{message.text}</div>
        </Wrapper>
    );
}

export default TextMessageView;
