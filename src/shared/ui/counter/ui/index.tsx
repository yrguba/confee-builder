import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { usePrevious } from 'shared/hooks';

import styles from './styles.module.scss';
import { CounterProps } from '../types';

function Counter(props: CounterProps) {
    const { children, height = 35, maxVisibleNumber = 500 } = props;
    const prevCount = usePrevious(children);
    const [number, setNumber] = useState<string>(String(children));
    const fontSize = height - 8;

    useEffect(() => {
        if (children > maxVisibleNumber) {
            setNumber(`${maxVisibleNumber}...`);
        } else {
            setNumber(String(children));
        }
    }, [children]);

    const wrapperAnimations = {
        animate: {
            width: String(children).length * fontSize,
        },
    };

    const childrenAnimations = {
        initial: {
            y: children < maxVisibleNumber ? prevCount && (children > prevCount ? -200 : 200) : 0,
        },
        animate: {
            y: 0,
        },
        exit: {
            y: children < maxVisibleNumber ? prevCount && (children < prevCount ? -200 : 200) : 0,
        },
    };

    return (
        <motion.div {...wrapperAnimations} className={styles.wrapper} style={{ height, fontSize }}>
            <AnimatePresence mode="wait" key={children}>
                <motion.div {...childrenAnimations}>{number}</motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

export default Counter;
