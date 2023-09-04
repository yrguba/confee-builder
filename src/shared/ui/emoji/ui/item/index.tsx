import { Emoji, EmojiStyle, EmojiClickData } from 'emoji-picker-react';
import React from 'react';

import styles from './styles.module.scss';
import { EmojiItemProps } from '../../types';

function EmojiItem(props: EmojiItemProps) {
    const { unified, clickOnEmoji } = props;

    return (
        <div className={styles.wrapper} onClick={() => clickOnEmoji && clickOnEmoji(unified)}>
            <Emoji emojiStyle={EmojiStyle.NATIVE} unified={unified} size={24} />
        </div>
    );
}

export default EmojiItem;
