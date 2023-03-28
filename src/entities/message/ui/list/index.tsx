import React, { useRef, UIEvent, forwardRef } from 'react';

import { useScroll, useSize } from 'shared/hooks';
import { baseTypes } from 'shared/types';
import { Dropdown } from 'shared/ui';

import styles from './styles.module.scss';
import { BaseInputProps } from '../../../../shared/ui/input/types';
import { Massage, MessageMenuItem } from '../../model/types';
import MessageMenuView from '../menu';
import TextMessageView from '../message/text';

type Props = {
    messages: Massage[];
    handleScroll: (target: any) => void;
    textMessageMenuItems: MessageMenuItem[];
    reactionClick: (arg: string) => void;
} & baseTypes.Statuses;

const MessagesListView = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
    const { messages, handleScroll, textMessageMenuItems, reactionClick } = props;

    return (
        <div className={styles.wrapper} ref={ref} onScroll={handleScroll}>
            {messages.map((message) => (
                <div key={message.id} className={styles.messageWrapper}>
                    <div className={styles.messageContent}>
                        <Dropdown
                            trigger="right-click"
                            position="right-center"
                            content={<MessageMenuView reactionClick={reactionClick} items={textMessageMenuItems} />}
                        >
                            <TextMessageView message={message} />
                        </Dropdown>
                    </div>
                </div>
            ))}
        </div>
    );
});

export default MessagesListView;
