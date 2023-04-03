import React, { useRef, UIEvent, forwardRef, useEffect, RefObject } from 'react';

import { useScroll, useSize, useStyles, useInView, useScrollTo } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Dropdown } from 'shared/ui';
import { BaseInputProps } from 'shared/ui/input/types';

import styles from './styles.module.scss';
import { Massage, MessageMenuItem } from '../../model/types';
import MessageMenuView from '../menu';
import SystemMessageView from '../message/system';
import TextMessageView from '../message/text';

type Props = {
    pages: Array<Massage[]> | BaseTypes.Empty;
    handleScroll: (target: any) => void;
    textMessageMenuItems: MessageMenuItem[];
    reactionClick: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function MessagesListView(props: Props) {
    const { pages, handleScroll, textMessageMenuItems, reactionClick } = props;

    const firstUnreadMessage = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (firstUnreadMessage.current) {
            firstUnreadMessage.current.style.backgroundColor = 'red';
            firstUnreadMessage.current.scrollIntoView({ block: 'center' });
        }
    }, [firstUnreadMessage.current, pages]);
    console.log(pages);
    return (
        <div className={styles.wrapper} onScroll={handleScroll}>
            {pages?.map((page) =>
                page?.map((message, index) => (
                    <div
                        key={message.id}
                        className={styles.messageWrapper}
                        ref={!firstUnreadMessage.current && message.message_status === 'pending' ? firstUnreadMessage : null}
                    >
                        {message.message_type === 'system' ? (
                            <SystemMessageView text="rtwdawdwd" />
                        ) : (
                            <div className={styles.messageContent}>
                                <Dropdown
                                    trigger="right-click"
                                    position="right-center"
                                    content={<MessageMenuView reactionClick={(reaction) => reactionClick(message.id, reaction)} items={textMessageMenuItems} />}
                                >
                                    <TextMessageView message={message} reactionClick={reactionClick} />
                                </Dropdown>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default MessagesListView;
