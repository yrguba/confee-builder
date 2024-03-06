import EmojiPicker, { Emoji, Theme, EmojiStyle } from 'emoji-picker-react';
import React, { useRef } from 'react';
import { useUpdateEffect } from 'react-use';

import { useEasyState, useStyles, useTheme, useClickAway, useThrottle } from 'shared/hooks';

import styles from './styles.module.scss';
import Box from '../../../box';
import Dropdown from '../../../dropdown';
import Icons from '../../../icons';
import { BaseEmojiProps } from '../../types';

const [throttleMouseMove] = useThrottle((cb) => cb(), 1000);

function EmojiBase(props: BaseEmojiProps) {
    const { onMouseMove, openCloseTrigger, clickOnEmoji } = props;

    const pickerRef = useRef(null);

    const theme = useTheme();

    const visible = useEasyState(false);

    const click = (data: any) => {
        clickOnEmoji(data.emoji);
    };

    useClickAway(pickerRef, () => {
        visible.set(false);
    });

    const classes = useStyles(styles, 'picker', {
        visible,
    });

    useUpdateEffect(() => {
        openCloseTrigger && openCloseTrigger(visible.value);
    }, [visible.value]);

    return (
        <div className={styles.wrapper}>
            <Box.Animated
                visible={visible.value}
                className={classes}
                ref={pickerRef}
                onMouseMove={() => {
                    onMouseMove && throttleMouseMove(onMouseMove);
                }}
            >
                <EmojiPicker
                    lazyLoadEmojis
                    emojiStyle={EmojiStyle.APPLE}
                    width={300}
                    height={400}
                    theme={theme.value === 'light' ? Theme.LIGHT : Theme.DARK}
                    onEmojiClick={click}
                />
            </Box.Animated>
            <div onClick={() => visible.set(true)} className={styles.btn}>
                <Icons variant="emoji" />
            </div>
        </div>
    );
}
//
export default EmojiBase;
