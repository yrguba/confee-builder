import React, { Fragment } from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import MessageService from '../../../lib/service';
import { Message, MessageProxy } from '../../../model/types';
import Icons from '../../menu/icons';
import TextMessageView from '../text';
import Wrapper from '../wrapper';

type Props = {
    message: MessageProxy;
    forwardedMessages: Message[];
    reactionClick: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function ForwardedMessagesView(props: Props) {
    const { message, forwardedMessages, reactionClick } = props;

    return (
        <Wrapper message={message} reactionClick={reactionClick}>
            <div className={styles.wrapper}>
                <div className={styles.title}>{message.text}</div>
                <div className={styles.list}>
                    <div className={styles.leftColumn}>
                        <Icons variants="forward" />
                    </div>
                    <div className={styles.messagesColumn}>
                        {forwardedMessages?.map((message: any) => (
                            <div key={message.id} className={styles.message}>
                                <div className={styles.userName}> {MessageService.getNameMessageAuthor(message)}</div>
                                <TextMessageView message={message} wrapper={false} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default ForwardedMessagesView;
