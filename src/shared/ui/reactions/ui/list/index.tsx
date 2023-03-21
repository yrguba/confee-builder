import { Emoji } from 'emoji-picker-react';
import React from 'react';

import styles from './styles.module.scss';
import emojiList from '../../emoji';
import { ReactionListProps } from '../../types';

function ReactionList(props: ReactionListProps) {
    const { onClick } = props;

    return (
        <div className={styles.wrapper}>
            {emojiList.map((emojiCode) => (
                <div onClick={() => onClick(emojiCode)} key={emojiCode} className={styles.item}>
                    <Emoji key={emojiCode} unified={emojiCode.toLowerCase()} size={24} />
                </div>
            ))}
        </div>
    );
}

export default ReactionList;
