import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';

import { UserTypes } from 'entities/user';
import { useToggle } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Input, Emoji, Box, Dropdown } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';
import logo from '../../../../shared/ui/icons/ui/logo';
import { MessageProxy } from '../../model/types';

type Props = {
    onKeyDown: (arg: any) => void;
    onChange: (arg: any) => void;
    btnClick: (arg?: any) => void;
    clickOnEmoji: (arg?: any) => void;
    value: string;
} & BaseTypes.Statuses;

function MessageInputView(props: Props) {
    const { onKeyDown, clickOnEmoji, btnClick, onChange, value, loading } = props;

    const params = useParams();

    const textAreaRef = useRef<HTMLInputElement>(null);

    const clickBtn = () => {
        if (value) return btnClick();
    };

    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, [params.chat_id]);

    useEffect(() => {
        if (textAreaRef.current) {
            const rows = value.split(/\r\n|\r|\n/).length;
            if (rows > 1) {
                textAreaRef.current.style.height = `${rows * 17.3}px`;
                if (rows > 14) {
                    textAreaRef.current.style.height = `${12 * 17.3}px`;
                }
            } else {
                textAreaRef.current.style.height = `auto`;
            }
        }
    }, [value]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.body}>
                {/* <Dropdown top={-16} openCloseTrigger={setIsOpenInputMenu} position="right-top" content={<InputMenuView />}> */}
                {/*    <div className={styles.icon}> */}
                {/*        <Icons variants="clip" /> */}
                {/*    </div> */}
                {/* </Dropdown> */}
                <div className={styles.textarea}>
                    <Input.Textarea ref={textAreaRef} value={value} onChange={onChange} onKeyDown={onKeyDown} />
                </div>
                <div className={styles.emoji}>
                    <Emoji clickOnEmoji={clickOnEmoji} />
                </div>
            </div>
            <Button.Circle active onClick={clickBtn}>
                <Icons variants="arrow" />
            </Button.Circle>
        </div>
    );
}

export default MessageInputView;
