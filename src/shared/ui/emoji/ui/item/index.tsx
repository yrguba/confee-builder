import { Emoji, EmojiStyle, EmojiClickData } from 'emoji-picker-react';
import React from 'react';

import styles from './styles.module.scss';
import { appService } from '../../../../../entities/app';
import { useEasyState } from '../../../../hooks';
import { EmojiItemProps } from '../../types';

function EmojiItem(props: EmojiItemProps) {
    const { emoji, clickOnEmoji, size = 18 } = props;

    const unified = emoji.codePointAt(0)?.toString(16) || '';

    return (
        <div className={styles.wrapper} onClick={() => clickOnEmoji && clickOnEmoji(emoji)}>
            <Emoji emojiStyle={EmojiStyle.APPLE} lazyLoad unified={unified} size={size} />
        </div>
    );
}

export default EmojiItem;
