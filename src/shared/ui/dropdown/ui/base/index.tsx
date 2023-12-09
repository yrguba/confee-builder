import React, { forwardRef, RefObject, useEffect, useRef, useState } from 'react';
import { mergeRefs } from 'react-merge-refs';
import { useElementDimensions } from 'react-screen-hooks';
import { useUpdateEffect, useWindowSize } from 'react-use';

import { useCallbackRef, useClickAway, useEasyState, useReverseTimer, useSize, useStyles, useWindowMouseClick } from 'shared/hooks';
import { Box } from 'shared/ui/index';

import styles from './styles.module.scss';
import { useDimensionsObserver, useInView } from '../../../../hooks';
import { BaseDropdownProps } from '../../types';

function Dropdown(props: BaseDropdownProps) {
    const { openCloseTrigger, reverseX, reverseY, visible, content, trigger, onClick, animationVariant = 'visibleHidden', disabled, clickAway } = props;

    const clickCoord = useWindowMouseClick(trigger);

    const elementRef = useRef<HTMLDivElement>(null);

    const wrapperSize = useEasyState<any>({ width: 0, height: 0 });
    const outsideBottom = useEasyState(0);

    useClickAway(elementRef, () => {
        clickAway && clickAway();
    });

    const classes = useStyles(styles, 'wrapper', {});

    useUpdateEffect(() => {
        if (elementRef.current) {
            new ResizeObserver((entries) => {
                const elementRect = entries[0].contentRect;
                console.log(elementRect.width);

                wrapperSize.set({ height: elementRect?.height, width: elementRect?.width });

                const { innerHeight, innerWidth } = window;
            }).observe(elementRef.current);
        }
    }, [elementRef.current]);

    useEffect(() => {
        openCloseTrigger && openCloseTrigger(visible);
    }, [visible]);

    const getTop = () => {
        if (wrapperSize.value.height) {
            if (reverseY) {
                return clickCoord.y - wrapperSize.value.height;
            }
            return clickCoord.y;
        }
        return clickCoord.y;
    };

    const getLeft = () => {
        if (wrapperSize.value.width && clickCoord.x) {
            if (reverseX) {
                return clickCoord.x - wrapperSize.value.width;
            }
            return clickCoord.x;
        }
        return clickCoord.x;
    };

    return (
        <Box.Animated
            ref={elementRef}
            animationVariant={animationVariant}
            style={{ top: getTop(), left: getLeft() }}
            className={classes}
            visible={visible}
            presence
            onClick={(e) => {
                onClick && onClick();
                e.stopPropagation();
            }}
        >
            {content}
        </Box.Animated>
    );
}

export default Dropdown;
