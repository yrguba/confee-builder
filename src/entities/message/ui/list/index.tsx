import React, { useRef, UIEvent, forwardRef } from 'react';

import { useScroll, useSize } from 'shared/hooks';
import { baseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { BaseInputProps } from '../../../../shared/ui/input/types';
import { Massage } from '../../model/types';
import TextMessageView from '../message/text';

type Props = {
    messages: Massage[];
    handleScroll: (target: any) => void;
} & baseTypes.Statuses;

const MessagesListView = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
    const { messages, handleScroll } = props;

    return (
        <div className={styles.wrapper} ref={ref} onScroll={handleScroll}>
            {messages.map((message) => (
                <div key={message.id} className={styles.messageWrapper}>
                    <div className={styles.messageContent}>
                        <TextMessageView message={message} />
                    </div>
                </div>
            ))}
        </div>
    );
});

export default MessagesListView;
