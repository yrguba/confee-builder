import React, { useEffect, useRef } from 'react';
import { useUpdateEffect } from 'react-use';

import { useEasyState, useWindowMouseClick } from 'shared/hooks';
import { Box } from 'shared/ui/index';

import styles from './styles.module.scss';
import { BaseContextMenuProps } from '../../types';

function ContextMenu(props: BaseContextMenuProps) {
    const { trigger, visible, items, disabled } = props;
    const clickCoord = useWindowMouseClick(trigger);

    const elementRef = useRef<HTMLDivElement>(null);

    const { innerHeight, innerWidth } = window;
    const wrapperSize = useEasyState<any>({ width: 0, height: 0 });
    const outsideY = useEasyState(0);
    const outsideX = useEasyState(0);
    const padding = 12;

    useUpdateEffect(() => {
        setTimeout(() => {
            if (elementRef.current && visible) {
                new ResizeObserver((entries) => {
                    const elementRect = entries[0].contentRect;

                    wrapperSize.set({ height: elementRect?.height, width: elementRect?.width });

                    if (elementRect.height + clickCoord.y > innerHeight) {
                        outsideY.set(elementRect.height + clickCoord.y - innerHeight);
                    } else {
                        outsideY.set(0);
                    }

                    if (clickCoord.x + elementRect.width > innerWidth) {
                        outsideX.set(clickCoord.x + elementRect.width - innerWidth);
                    } else {
                        outsideX.set(0);
                    }
                }).observe(elementRef.current);
            }
        }, 0);
    }, [elementRef.current]);

    const getTop = () => {
        if (wrapperSize.value.height) {
            if (outsideY.value > 0) {
                return clickCoord.y - outsideY.value - padding - 12;
            }
            return clickCoord.y;
        }
        return clickCoord.y;
    };

    const getLeft = () => {
        if (wrapperSize.value.width) {
            if (outsideX.value > 0) {
                return innerWidth - wrapperSize.value.width - padding;
            }
            return clickCoord.x;
        }
        return clickCoord.x;
    };

    return (
        <Box.Animated
            animationVariant="visibleHidden"
            ref={elementRef}
            style={{ top: getTop(), left: getLeft() }}
            className={styles.wrapper}
            visible={visible}
            presence
        >
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
