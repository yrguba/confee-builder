import { motion, AnimateSharedLayout } from 'framer-motion';
import React from 'react';

import { useStyles } from 'shared/hooks';
import { getRandomString } from 'shared/lib';

import styles from './styles.module.scss';
import { TabBarWithLineProps } from '../../types';

const layoutId = getRandomString(5);
function TabBarWithLine(props: TabBarWithLineProps) {
    const { items, activeItemId, variant = '', wrapperStyle } = props;

    // const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    // const { events } = useDraggableScroll(ref);

    const classes = useStyles(styles, 'body', {
        [variant]: variant,
    });

    return (
        <div className={styles.wrapper} style={wrapperStyle}>
            <AnimateSharedLayout>
                {items.map((i) => (
                    <div key={i.id} onClick={i.callback} className={`${styles.item} ${activeItemId === i.id ? styles.item_active : ''}`}>
                        {i.title}
                        {activeItemId === i.id && <motion.div layoutId={layoutId} className={styles.line} />}
                    </div>
                ))}
            </AnimateSharedLayout>
        </div>
    );
}

export default TabBarWithLine;
