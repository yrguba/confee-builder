import { motion, AnimateSharedLayout } from 'framer-motion';
import React from 'react';

import { useEasyState, useStyles } from 'shared/hooks';
import { getRandomString } from 'shared/lib';

import styles from './styles.module.scss';
import { TabBarWithLineProps, TabBarItem } from '../../types';

const layoutId = getRandomString(5);
function TabBarWithLine(props: TabBarWithLineProps) {
    const { items, activeItemId, variant = '', wrapperStyle, visibleBorder = true } = props;

    // const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    // const { events } = useDraggableScroll(ref);
    const active = useEasyState<TabBarItem>(items.find((i) => i.id === activeItemId) || items[0]);

    const click = (item: TabBarItem) => {
        active.set(item);
        item.callback();
    };

    return (
        <div className={styles.wrapper} style={wrapperStyle}>
            <AnimateSharedLayout>
                {items.map((i) => (
                    <div key={i.id} onClick={() => click(i)} className={`${styles.item} ${active.value.id === i.id ? styles.item_active : ''}`}>
                        {i.title}
                        {active.value.id === i.id && <motion.div layoutId={layoutId} className={styles.line} />}
                    </div>
                ))}
            </AnimateSharedLayout>
            {visibleBorder && <div className={styles.border} />}
        </div>
    );
}

export default TabBarWithLine;
