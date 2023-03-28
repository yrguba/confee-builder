import React, { useState } from 'react';

import { useInput } from 'shared/hooks';
import { baseTypes } from 'shared/types';
import { Button, Input, Reactions } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';
import { MessageMenuItem } from '../../model/types';

type Props = {
    onKeyDown: (arg: any) => void;
    onChange: (arg: any) => void;
    btnClick: (arg?: any) => void;
    value: string;
} & baseTypes.Statuses;

function MessageInputView(props: Props) {
    const { onKeyDown, btnClick, onChange, value, loading } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.input}>
                <div className={styles.icon}>
                    <Icons variants="clip" />
                </div>
                <div className={styles.textarea}>
                    <Input.Textarea value={value} onChange={onChange} onKeyDown={onKeyDown} />
                </div>
            </div>
            <div className={styles.sendBtn}>
                <Button.Circle disabled={!value || loading} active onClick={btnClick}>
                    <Icons variants="arrow" />
                </Button.Circle>
            </div>
        </div>
    );
}

export default MessageInputView;
