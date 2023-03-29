import { motion } from 'framer-motion';
import React from 'react';

import styles from './styles.module.scss';
import { NavbarWithLineProps } from '../../types';

function WithLine(props: NavbarWithLineProps) {
    const { item, activeItemId, items, direction = 'row', gap = 12 } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles[direction]} style={{ gap }}>
                {items.map((i) => (
                    <div className={styles.item} key={i.id}>
                        {item(i)}
                        {i.id === activeItemId && <motion.div className={styles.line} layoutId="line" />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default WithLine;
