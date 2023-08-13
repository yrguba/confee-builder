// import { Emoji } from 'emoji-picker-react';
import React from 'react';

import styles from './styles.module.scss';
import Avatar from '../../../avatar';
import { EmojiCounterProps } from '../../types';

function EmojiCounter(props: EmojiCounterProps) {
    const { clickOnEmoji, items, emoji, maxAvatars = 3 } = props;

    return items?.length ? (
        <div className={styles.wrapper} onClick={() => clickOnEmoji(emoji)}>
            {/* <Emoji unified={emoji.toLowerCase()} size={16} /> */}
            {maxAvatars >= items?.length ? (
                <div className={styles.avatars}>
                    {items.map((item, index: number) => (
                        <div key={index} className={styles.avatar} style={{ zIndex: items.length - index }}>
                            <Avatar size={16} name={item.name} img={item.avatar} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.count}>{items.length}</div>
            )}
        </div>
    ) : null;
}

export default EmojiCounter;
