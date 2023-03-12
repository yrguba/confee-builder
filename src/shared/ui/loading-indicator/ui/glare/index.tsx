import React from 'react';

import styles from './styles.module.scss';
import { GlareProps } from '../../types';

function Glare(props: GlareProps) {
    const { visible } = props;

    return visible ? <div className={styles.glare} /> : null;
}

export default Glare;
