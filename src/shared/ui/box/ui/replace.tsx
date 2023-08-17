import { motion, AnimatePresence } from 'framer-motion';
import React, { forwardRef, useEffect, useState } from 'react';

import styles from './styles.module.scss';
import LoadingIndicator from '../../loading-indicator';
import * as animationVariants from '../animation-variants';
import { ReplaceBoxProps } from '../types';

const ReplaceBox = forwardRef((props: ReplaceBoxProps, ref: any) => {
    const { items, animationVariant = 'visibleHidden', toggle, loading, ...motionDivAttrs } = props;

    const [visibleItemId, setVisibleItemId] = useState<number>(-1);

    const vars: Record<keyof typeof animationVariants, object> = animationVariants;

    const variant = vars[animationVariant];

    const load = (
        <motion.div style={{ overflow: 'hidden' }} className={styles.animateLoading} {...variant}>
            <LoadingIndicator visible />
        </motion.div>
    );

    useEffect(() => {
        const foundIndex = items.findIndex((i) => i.visible);
        setVisibleItemId(foundIndex);
    }, [items]);

    return (
        <AnimatePresence mode="wait" initial={false}>
            {loading
                ? load
                : items.map(
                      ({ visible, item }, index) =>
                          visible && (
                              <motion.div {...variant} {...motionDivAttrs} key={index}>
                                  {item}
                              </motion.div>
                          )
                  )}
        </AnimatePresence>
    );
});

export default ReplaceBox;
