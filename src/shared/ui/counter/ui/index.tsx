import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { usePrevious, useStyles } from 'shared/hooks';

import styles from './styles.module.scss';
import { CounterProps } from '../types';

function Counter(props: CounterProps) {
    const { children = 0, height = 16, maxVisibleNumber = 500, zeroVisible = false, variant = 'primary' } = props;
    const prevCount = usePrevious(children);
    const [number, setNumber] = useState<string>(String(children));
    const fontSize = height - 8;

    useEffect(() => {
        if (children > maxVisibleNumber) {
            setNumber(`${maxVisibleNumber}+`);
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

    const classes = useStyles(styles, 'wrapper', {
        [variant]: variant,
    });

    if (!zeroVisible && children === 0) return null;

    return (
        <motion.div className={classes} style={{ height, fontSize }}>
            <AnimatePresence mode="wait" key={children}>
                <motion.div {...childrenAnimations}>{number}</motion.div>
            </AnimatePresence>
        </motion.div>
    );
}

export default Counter;
