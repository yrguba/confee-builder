import React, { ReactNode } from 'react';

import { useDate } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { EmojiTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../model/types';
import { MainWrapper, WrapperForForwarded } from '../wrapper';

type Props = {
    message: MessageProxy;
    reactionClick: (messageId: number, reaction: string) => void;
    forwarded?: boolean;
} & BaseTypes.Statuses;

function TextMessageView(props: Props) {
    const { message, reactionClick, forwarded } = props;

    function Message() {
        return <div className={styles.wrapper}>{message.text}</div>;
    }

    return forwarded ? (
        <WrapperForForwarded message={message}>
            <Message />
        </WrapperForForwarded>
    ) : (
        <MainWrapper message={message} reactionClick={reactionClick}>
            <Message />
        </MainWrapper>
    );
}

export default TextMessageView;
