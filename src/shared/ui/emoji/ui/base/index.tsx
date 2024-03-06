import EmojiPicker, { Emoji, Theme, EmojiStyle } from 'emoji-picker-react';
import React, { useRef } from 'react';

import { useEasyState, useStyles, useTheme, useClickAway } from 'shared/hooks';

import styles from './styles.module.scss';
import Box from '../../../box';
import Dropdown from '../../../dropdown';
import Icons from '../../../icons';
import { BaseEmojiProps } from '../../types';

function EmojiBase(props: BaseEmojiProps) {
    const { openCloseTrigger, clickOnEmoji } = props;

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

    return (
        <div className={styles.wrapper}>
            <Box.Animated visible={visible.value} className={classes} ref={pickerRef}>
                <EmojiPicker
                    lazyLoadEmojis
                    emojiStyle={EmojiStyle.APPLE}
                    width={300}
                    height={400}
                    theme={theme.value === 'light' ? Theme.LIGHT : Theme.DARK}
                    onEmojiClick={click}
                />
            </Box.Animated>
            <div onClick={() => visible.set(true)}>
                <Icons variant="emoji" />
            </div>
        </div>
    );
}
//
export default EmojiBase;
