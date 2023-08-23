import React from 'react';

import styles from './styles.module.scss';
import { AudioListProps } from '../../types';
import AudioPlayer from '../base';

function AudioList(props: AudioListProps) {
    const { items } = props;

    return (
        <div className={styles.wrapper}>
            {items?.map((i) => (
                <AudioPlayer key={i.id} {...i} />
            ))}
        </div>
    );
}

export default AudioList;
