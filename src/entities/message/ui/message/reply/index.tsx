import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import MessageService from '../../../lib/service';
import { MessageProxy, Message } from '../../../model/types';
import TextMessageView from '../text';
import Wrapper from '../wrapper';

type Props = {
    message: MessageProxy;
    reply: Message;
    reactionClick: (messageId: number, reaction: string) => void;
    forwarded?: boolean;
} & BaseTypes.Statuses;

function ReplyMessageView(props: Props) {
    const { message, reply, forwarded, reactionClick } = props;

    return (
        <Wrapper message={message} reactionClick={reactionClick}>
            <div className={styles.wrapper}>
                <div className={styles.reply}>
                    <div className={styles.userName}> {MessageService.getNameMessageAuthor(reply)}</div>
                    <TextMessageView message={reply as MessageProxy} wrapper={false} />
                </div>
                <TextMessageView message={message} wrapper={false} />
            </div>
        </Wrapper>
    );
}

export default ReplyMessageView;
