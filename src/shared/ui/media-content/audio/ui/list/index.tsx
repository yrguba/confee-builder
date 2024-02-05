import React from 'react';

import styles from './styles.module.scss';
import Audio from '../..';
import { AudioListProps } from '../../types';

function AudioList(props: AudioListProps) {
    const { items } = props;

    return (
        <div className={styles.wrapper}>
            {items?.map((i) => (
                <Audio key={i.id} {...i} />
            ))}
        </div>
    );
}

export default AudioList;
