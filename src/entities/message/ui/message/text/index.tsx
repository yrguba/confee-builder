import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../model/types';
import Wrapper from '../wrapper';

type Props = {
    message: MessageProxy;
    wrapper?: boolean;
    reactionClick?: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function TextMessageView(props: Props) {
    const { message, wrapper = true, reactionClick } = props;

    function Message() {
        return <div className={styles.wrapper}>{message.text}</div>;
    }

    return !wrapper ? (
        <Message />
    ) : (
        <Wrapper message={message} reactionClick={reactionClick || (() => {})}>
            <Message />
        </Wrapper>
    );
}

export default TextMessageView;
