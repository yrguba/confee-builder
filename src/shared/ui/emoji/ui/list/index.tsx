import { Emoji } from 'emoji-picker-react';
import React from 'react';

import styles from './styles.module.scss';
import { reactionConverter } from '../../../../lib';
import { EmojiListProps } from '../../types';

function EmojiList(props: EmojiListProps) {
    const { onClick, emojiList } = props;

    return (
        <div className={styles.wrapper}>
            {emojiList.map((emojiCode) => (
                <div onClick={() => onClick(emojiCode)} key={emojiCode} className={styles.item}>
                    <Emoji unified={reactionConverter(emojiCode, 'unicode')} size={24} />
                </div>
            ))}
        </div>
    );
}

export default EmojiList;
