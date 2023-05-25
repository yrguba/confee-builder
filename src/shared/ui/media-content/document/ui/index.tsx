import React from 'react';

import Icons from './icons';
import styles from './styles.module.scss';
import { DocumentProps } from '../types';

function Document(props: DocumentProps) {
    const { url, size, name } = props;

    return (
        <a href="/" download={name}>
            <div className={styles.wrapper}>
                <div className={styles.icon}>
                    <Icons variants="doc" />
                </div>
                <div className={styles.info}>
                    <div className={styles.name}>{name}</div>
                </div>
            </div>
        </a>
    );
}

export default Document;
