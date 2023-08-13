import { Emoji, EmojiStyle } from 'emoji-picker-react';
import React from 'react';

import styles from './styles.module.scss';
import { reactionConverter } from '../../../../lib';
import { EmojiListProps } from '../../types';

function EmojiList(props: EmojiListProps) {
    const { onClick, emojiList, wrap } = props;

    return (
        <div className={styles.wrapper} style={{ flexWrap: wrap ? 'wrap' : 'nowrap' }}>
            {emojiList.map((emojiCode) => (
                <div onClick={() => onClick(emojiCode)} key={emojiCode} className={styles.item}>
                    <Emoji emojiStyle={EmojiStyle.NATIVE} unified={emojiCode} size={24} />
                </div>
            ))}
        </div>
    );
}

export default EmojiList;
