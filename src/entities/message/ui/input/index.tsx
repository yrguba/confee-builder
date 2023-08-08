import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';

import { UseEasyStateReturnedType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Input, Emoji, Dropdown, Icons } from 'shared/ui';

import InputMenu from './menu';
import styles from './styles.module.scss';

type Props = {
    onKeyDown: (arg: any) => void;
    messageTextState: UseEasyStateReturnedType<string>;
    btnClick: (arg?: any) => void;
    clickOnEmoji: (arg?: any) => void;
} & BaseTypes.Statuses;

function MessageInputView(props: Props) {
    const { messageTextState, onKeyDown, clickOnEmoji, btnClick, loading } = props;

    const params = useParams();

    return (
        <div className={styles.wrapper}>
            <div className={styles.input}>
                <Dropdown top={-16} position="right-top" content={<InputMenu inputMenuAction={() => ''} />}>
                    <div className={styles.icon}>
                        <Icons variant="add" />
                    </div>
                </Dropdown>

                <div className={styles.textarea}>
                    <Input.Textarea value={messageTextState.value} onChange={(e) => messageTextState.set(e.target.value)} onKeyDown={onKeyDown} />
                </div>
                <div className={styles.emoji}>
                    <Emoji clickOnEmoji={clickOnEmoji} />
                </div>
            </div>
            <div className={styles.btnColumn}>
                <div className={styles.sendBtn}>
                    <Button.Circle active onClick={btnClick}>
                        <Icons variant="add" />
                    </Button.Circle>
                </div>
            </div>
        </div>
    );
}

export default MessageInputView;
