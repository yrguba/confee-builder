import React, { Fragment } from 'react';

import { useDate } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { EmojiTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { Message, MessageProxy } from '../../../model/types';
import Icons from '../../menu/icons';
import ImageMessageView from '../image';
import TextMessageView from '../text';
import { MainWrapper } from '../wrapper';

type Props = {
    message: MessageProxy;
    forwardedMessages: Message[];
    reactionClick: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function ForwardedMessagesView(props: Props) {
    const { message, forwardedMessages, reactionClick } = props;

    return (
        <MainWrapper message={message} reactionClick={reactionClick}>
            <div className={styles.wrapper}>
                <div className={styles.title}>{message.text}</div>
                <div className={styles.list}>
                    <div className={styles.leftColumn}>
                        <Icons variants="forward" />
                    </div>
                    <div className={styles.messagesColumn}>
                        {forwardedMessages?.map((message: any) => (
                            <Fragment key={message.id}>
                                {message.message_type === 'text' && <TextMessageView message={message} forwarded reactionClick={() => ''} />}
                                {/* {message.message_type === 'images' && <ImageMessageView message={message} reactionClick={reactionClick} />} */}
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </MainWrapper>
    );
}

export default ForwardedMessagesView;
