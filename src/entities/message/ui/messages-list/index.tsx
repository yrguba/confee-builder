import React, { useRef, UIEvent, forwardRef } from 'react';

import { useScroll, useSize, useStyles } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Dropdown } from 'shared/ui';

import styles from './styles.module.scss';
import { useInView } from '../../../../shared/hooks';
import { BaseInputProps } from '../../../../shared/ui/input/types';
import { Massage, MessageMenuItem } from '../../model/types';
import MessageMenuView from '../menu';
import SystemMessageView from '../message/system';
import TextMessageView from '../message/text';

type Props = {
    pages: Array<Massage[]> | BaseTypes.Empty;
    handleScroll: (target: any) => void;
    textMessageMenuItems: MessageMenuItem[];
    reactionClick: (arg: string) => void;
} & BaseTypes.Statuses;

function MessagesListView(props: Props) {
    const { pages, handleScroll, textMessageMenuItems, reactionClick } = props;

    // const { ref, inView, entry } = useInView({
    //     /* Optional options */
    //     threshold: 0,
    // });

    return (
        <div className={styles.wrapper} onScroll={handleScroll}>
            {pages?.map((page) =>
                page?.map((message) => (
                    <div key={message.id} className={styles.messageWrapper}>
                        {message.message_type === 'system' ? (
                            <SystemMessageView text="rtwdawdwd" />
                        ) : (
                            <div className={styles.messageContent}>
                                <Dropdown
                                    trigger="right-click"
                                    position="right-center"
                                    content={<MessageMenuView reactionClick={reactionClick} items={textMessageMenuItems} />}
                                >
                                    <TextMessageView message={message} />
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
