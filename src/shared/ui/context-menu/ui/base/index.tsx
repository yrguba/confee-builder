import React from 'react';

import { useWindowMouseClick } from 'shared/hooks';
import { Box } from 'shared/ui/index';

import styles from './styles.module.scss';
import { BaseContextMenuProps } from '../../types';

function ContextMenu(props: BaseContextMenuProps) {
    const { trigger, visible, items, disabled } = props;
    const clickCoord = useWindowMouseClick(trigger);

    return (
        <Box.Animated animationVariant="visibleHidden" style={{ top: clickCoord.y, left: clickCoord.x }} className={styles.wrapper} visible={visible} presence>
            {items.map((i) => (
                <div
                    key={i.id}
                    className={styles.item}
                    onClick={(e) => {
                        e.stopPropagation();
                        i.callback();
                    }}
                >
                    <div className={`${styles.content} ${i.isRed && styles.content_red}`}>
                        <div>{i.icon}</div>
                        <div>{i.title}</div>
                    </div>
                </div>
            ))}
        </Box.Animated>
    );
}

export default ContextMenu;
